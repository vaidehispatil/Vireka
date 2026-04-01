import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/data/products';
import { products } from '@/data/products';
import { supabaseService } from '@/lib/supabaseService';
import { supabase } from '@/lib/supabase';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: 'user' | 'admin';
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  address: Address;
  paymentMethod: string;
  orderDate: string;
  deliveryDate?: string;
}

interface StoreState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  loadUserData: (userId: string) => Promise<void>;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  
  // Wishlist
  wishlist: Product[];
  addToWishlist: (product: Product) => boolean;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => boolean;
  
  // Addresses
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => Promise<void>;
  updateAddress: (id: string, address: Partial<Address>) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  getDefaultAddress: () => Address | undefined;
  
  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'orderDate'>) => string;
  getOrders: () => Order[];
  getOrderById: (id: string) => Order | undefined;
  
  // Admin
  isAdmin: () => boolean;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: async () => {
        try {
          await supabase.auth.signOut();
        } catch (error) {
          console.error('Error signing out from Supabase:', error);
        }
        set({ user: null, isAuthenticated: false, addresses: [], orders: [] });
      },
      loadUserData: async (userId: string) => {
        try {
          // Load addresses from Supabase
          const addresses = await supabaseService.getAddresses(userId);
          set({ addresses });
          
          // Wishlist will be populated from local storage first
          
          // Load orders from Supabase
          const orders = await supabaseService.getOrders(userId);
          set({ orders });
        } catch (error) {
          console.error('Failed to load user data from Supabase:', error);
        }
      },
      
      // Cart
      cart: [],
      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        const existingItem = cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({ cart: [...cart, { product, quantity }] });
        }
      },
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.product.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        });
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        return get().cart.reduce((total, item) => 
          total + item.product.price * item.quantity, 0
        );
      },
      getCartCount: () => {
        return get().cart.reduce((count, item) => count + item.quantity, 0);
      },
      
      // Wishlist
      wishlist: [],
      addToWishlist: (product) => {
        const { wishlist, user } = get();
        
        // Check if user is logged in
        if (!user?.id) {
          return false;
        }
        
        if (!wishlist.find(p => p.id === product.id)) {
          set({ wishlist: [...wishlist, product] });
          
          // Sync to Supabase
          try {
            supabaseService.addToWishlist(user.id, product.id);
          } catch (error) {
            console.error('Failed to sync wishlist to Supabase:', error);
          }
        }
        return true;
      },
      removeFromWishlist: (productId) => {
        const { user } = get();
        set({ wishlist: get().wishlist.filter(p => p.id !== productId) });
        
        // Sync to Supabase if user is logged in
        if (user?.id) {
          try {
            supabaseService.removeFromWishlist(user.id, productId);
          } catch (error) {
            console.error('Failed to sync wishlist removal to Supabase:', error);
          }
        }
      },
      isInWishlist: (productId) => {
        return get().wishlist.some(p => p.id === productId);
      },
      toggleWishlist: (productId) => {
        const { wishlist, user } = get();
        const product = products.find(p => p.id === productId);
        
        // Check if user is logged in
        if (!user?.id) {
          return false;
        }
        
        if (wishlist.some(p => p.id === productId)) {
          // Remove from wishlist
          set({ wishlist: wishlist.filter(p => p.id !== productId) });
          
          // Sync to Supabase
          try {
            supabaseService.removeFromWishlist(user.id, productId);
          } catch (error) {
            console.error('Failed to sync wishlist toggle to Supabase:', error);
          }
        } else if (product) {
          // Add to wishlist
          set({ wishlist: [...wishlist, product] });
          
          // Sync to Supabase
          try {
            supabaseService.addToWishlist(user.id, productId);
          } catch (error) {
            console.error('Failed to sync wishlist toggle to Supabase:', error);
          }
        }
        return true;
      },
      
      // Addresses
      addresses: [],
      addAddress: async (address) => {
        const newAddress = { ...address, id: Date.now().toString() };
        // Update local state immediately
        set({ addresses: [...get().addresses, newAddress] });
        
        // Sync to Supabase if user is logged in (fire and forget)
        const { user } = get();
        if (user?.id) {
          supabaseService.addAddress(user.id, address).catch(error => {
            console.error('Failed to sync address to Supabase:', error);
          });
        }
      },
      updateAddress: async (id, address) => {
        // Update local state immediately
        set({
          addresses: get().addresses.map(a =>
            a.id === id ? { ...a, ...address } : a
          )
        });
        
        // Sync to Supabase if user is logged in (fire and forget)
        const { user } = get();
        if (user?.id) {
          supabaseService.updateAddress(id, address).catch(error => {
            console.error('Failed to sync address update to Supabase:', error);
          });
        }
      },
      deleteAddress: async (id) => {
        // Update local state immediately
        set({ addresses: get().addresses.filter(a => a.id !== id) });
        
        // Sync to Supabase if user is logged in (fire and forget)
        const { user } = get();
        if (user?.id) {
          supabaseService.deleteAddress(id).catch(error => {
            console.error('Failed to sync address deletion to Supabase:', error);
          });
        }
      },
      getDefaultAddress: () => {
        return get().addresses.find(a => a.isDefault) || get().addresses[0];
      },
      
      // Orders
      orders: [],
      addOrder: (order) => {
        const id = `ORD${Date.now()}`;
        const newOrder = { ...order, id, orderDate: new Date().toISOString() };
        set({ orders: [...get().orders, newOrder] });
        
        // Sync to Supabase if user is logged in
        const { user } = get();
        if (user?.id) {
          try {
            supabaseService.createOrder(user.id, order);
          } catch (error) {
            console.error('Failed to sync order to Supabase:', error);
          }
        }
        
        return id;
      },
      getOrders: () => get().orders,
      getOrderById: (id) => get().orders.find(o => o.id === id),
      
      // Admin
      isAdmin: () => get().user?.role === 'admin'
    }),
    {
      name: 'luxe-jewels-storage',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        addresses: state.addresses,
        orders: state.orders
      })
    }
  )
);
