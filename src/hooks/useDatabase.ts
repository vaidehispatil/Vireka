import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import type { Database } from '@/lib/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Address = Database['public']['Tables']['addresses']['Row'];
type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row'];
type AICustomHamper = Database['public']['Tables']['ai_custom_hampers']['Row'];
type Order = Database['public']['Tables']['orders']['Row'];

export const useDatabase = () => {
  const { user } = useAuth();

  // Profile operations
  const getProfile = async () => {
    if (!user) return null;
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    if (error) throw error;
    return data;
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('Not authenticated');
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  };

  // Address operations
  const getAddresses = async () => {
    if (!user) return [];
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });
    if (error) throw error;
    return data;
  };

  const addAddress = async (address: Omit<Address, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('Not authenticated');
    const { data, error } = await supabase
      .from('addresses')
      .insert({ ...address, user_id: user.id })
      .select()
      .single();
    if (error) throw error;
    return data;
  };

  const updateAddress = async (id: string, updates: Partial<Address>) => {
    if (!user) throw new Error('Not authenticated');
    const { data, error } = await supabase
      .from('addresses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  };

  const deleteAddress = async (id: string) => {
    if (!user) throw new Error('Not authenticated');
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', id);
    if (error) throw error;
  };

  const setDefaultAddress = async (id: string) => {
    if (!user) throw new Error('Not authenticated');
    // First, set all addresses to non-default
    await supabase
      .from('addresses')
      .update({ is_default: false })
      .eq('user_id', user.id);
    // Then set the selected address as default
    const { data, error } = await supabase
      .from('addresses')
      .update({ is_default: true })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  };

  // Wishlist operations
  const getWishlist = async () => {
    if (!user) return [];
    const { data, error } = await supabase
      .from('wishlist')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  };

  const addToWishlist = async (productId: string) => {
    if (!user) throw new Error('Not authenticated');
    const { data, error } = await supabase
      .from('wishlist')
      .insert({ user_id: user.id, product_id: productId })
      .select()
      .single();
    if (error) throw error;
    return data;
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) throw new Error('Not authenticated');
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId);
    if (error) throw error;
  };

  const isInWishlist = async (productId: string) => {
    if (!user) return false;
    const { data, error } = await supabase
      .from('wishlist')
      .select('id')
      .eq('user_id', user.id)
      .eq('product_id', productId)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  };

  // Contact submissions
  const submitContactForm = async (submission: Omit<ContactSubmission, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert(submission)
      .select()
      .single();
    if (error) throw error;
    return data;
  };

  // AI Custom Hampers
  const createCustomHamper = async (hamper: Omit<AICustomHamper, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('Not authenticated');
    const { data, error } = await supabase
      .from('ai_custom_hampers')
      .insert({ ...hamper, user_id: user.id })
      .select()
      .single();
    if (error) throw error;
    return data;
  };

  const getCustomHampers = async () => {
    if (!user) return [];
    const { data, error } = await supabase
      .from('ai_custom_hampers')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  };

  // Orders
  const createOrder = async (order: Omit<Order, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('Not authenticated');
    const { data, error } = await supabase
      .from('orders')
      .insert({ ...order, user_id: user.id })
      .select()
      .single();
    if (error) throw error;
    return data;
  };

  const getOrders = async () => {
    if (!user) return [];
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  };

  const getOrder = async (orderId: string) => {
    if (!user) return null;
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();
    if (error) throw error;
    return data;
  };

  return {
    // Profile
    getProfile,
    updateProfile,
    // Addresses
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    // Wishlist
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    // Contact
    submitContactForm,
    // AI Hampers
    createCustomHamper,
    getCustomHampers,
    // Orders
    createOrder,
    getOrders,
    getOrder,
  };
};