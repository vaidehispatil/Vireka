import { supabase } from './supabase';
import type { Address, Order } from '@/store/useStore';

export const supabaseService = {
  // Addresses
  async addAddress(userId: string, address: Omit<Address, 'id'>) {
    const { data, error } = await supabase
      .from('addresses')
      .insert([
        {
          user_id: userId,
          full_name: address.name,
          phone: address.phone,
          address_line1: address.street,
          city: address.city,
          state: address.state,
          postal_code: address.pincode,
          country: 'India',
          is_default: address.isDefault
        }
      ])
      .select()
      .single();
    
    if (error) {
      console.error('Error adding address:', error);
      return null;
    }
    
    return {
      id: data.id,
      name: data.full_name,
      street: data.address_line1,
      city: data.city,
      state: data.state,
      pincode: data.postal_code,
      phone: data.phone,
      isDefault: data.is_default
    };
  },

  async getAddresses(userId: string) {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error fetching addresses:', error);
      return [];
    }
    
    return data.map(addr => ({
      id: addr.id,
      name: addr.full_name,
      street: addr.address_line1,
      city: addr.city,
      state: addr.state,
      pincode: addr.postal_code,
      phone: addr.phone,
      isDefault: addr.is_default
    }));
  },

  async updateAddress(addressId: string, address: Partial<Address>) {
    const updateData: any = {};
    
    if (address.name) updateData.full_name = address.name;
    if (address.phone) updateData.phone = address.phone;
    if (address.street) updateData.address_line1 = address.street;
    if (address.city) updateData.city = address.city;
    if (address.state) updateData.state = address.state;
    if (address.pincode) updateData.postal_code = address.pincode;
    if (address.isDefault !== undefined) updateData.is_default = address.isDefault;
    
    const { error } = await supabase
      .from('addresses')
      .update(updateData)
      .eq('id', addressId);
    
    if (error) {
      console.error('Error updating address:', error);
      return false;
    }
    
    return true;
  },

  async deleteAddress(addressId: string) {
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', addressId);
    
    if (error) {
      console.error('Error deleting address:', error);
      return false;
    }
    
    return true;
  },

  // Wishlist
  async addToWishlist(userId: string, productId: string) {
    const { error } = await supabase
      .from('wishlist')
      .insert([{ user_id: userId, product_id: productId }]);
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error adding to wishlist:', error);
      return false;
    }
    
    return true;
  },

  async removeFromWishlist(userId: string, productId: string) {
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);
    
    if (error) {
      console.error('Error removing from wishlist:', error);
      return false;
    }
    
    return true;
  },

  async getWishlist(userId: string) {
    const { data, error } = await supabase
      .from('wishlist')
      .select('product_id')
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error fetching wishlist:', error);
      return [];
    }
    
    return data.map(item => item.product_id);
  },

  // Orders
  async createOrder(userId: string, order: Omit<Order, 'id' | 'orderDate'>) {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          user_id: userId,
          total_amount: order.totalAmount,
          status: order.status,
          shipping_address: order.address,
          billing_address: order.address,
          items: order.items.map(item => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.images[0],
            quantity: item.quantity
          }))
        }
      ])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating order:', error);
      return null;
    }
    
    return data.id;
  },

  async getOrders(userId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
    
    return data.map(order => ({
      id: order.id,
      userId: order.user_id,
      items: order.items || [],
      totalAmount: order.total_amount,
      status: order.status,
      address: order.shipping_address,
      paymentMethod: order.payment_method || 'card',
      orderDate: order.created_at,
      deliveryDate: order.updated_at
    }));
  },

  async getOrderById(orderId: string) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();
    
    if (error) {
      console.error('Error fetching order:', error);
      return null;
    }
    
    return {
      id: data.id,
      userId: data.user_id,
      items: data.items || [],
      totalAmount: data.total_amount,
      status: data.status,
      address: data.shipping_address,
      paymentMethod: data.payment_method || 'card',
      orderDate: data.created_at,
      deliveryDate: data.updated_at
    };
  },

  async updateOrderStatus(orderId: string, status: string) {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId);
    
    if (error) {
      console.error('Error updating order status:', error);
      return false;
    }
    
    return true;
  },

  // Order Tracking Events
  async addTrackingEvent(orderId: string, status: string, location: string, description: string) {
    const { error } = await supabase
      .from('order_tracking_events')
      .insert([
        {
          order_id: orderId,
          status,
          location,
          description,
          timestamp: new Date().toISOString()
        }
      ]);
    
    if (error) {
      console.error('Error adding tracking event:', error);
      return false;
    }
    
    return true;
  },

  async getTrackingEvents(orderId: string) {
    const { data, error } = await supabase
      .from('order_tracking_events')
      .select('*')
      .eq('order_id', orderId)
      .order('timestamp', { ascending: true });
    
    if (error) {
      console.error('Error fetching tracking events:', error);
      return [];
    }
    
    return data || [];
  }
};
