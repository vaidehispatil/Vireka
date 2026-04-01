import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Package, 
  Heart, 
  LogOut, 
  Edit2, 
  Plus,
  Crown
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { formatPrice } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, addresses, orders, addAddress, deleteAddress } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user || { name: '', email: '', mobile: '' });
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    isDefault: false
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSaveProfile = () => {
    if (user) {
      // Update user in store
      Object.assign(user, editedUser);
      setIsEditing(false);
    }
  };

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.street && newAddress.city) {
      addAddress(newAddress);
      setNewAddress({ name: '', street: '', city: '', state: '', pincode: '', phone: '', isDefault: false });
      setShowAddForm(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">Please login to view your profile</h2>
          <Link to="/login">
            <Button className="gold-button text-black">Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      <div className="section-padding">
        {/* Profile Header */}
        <div className="luxury-card p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#AA8C2C] flex items-center justify-center">
              <User className="w-12 h-12 text-black" />
            </div>
            {!isEditing ? (
              <div className="text-center md:text-left flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-white font-['Playfair_Display']">
                  {user.name}
                </h1>
                <p className="text-white/60">{user.email}</p>
                <p className="text-white/60">{user.mobile}</p>
                {user.role === 'admin' && (
                  <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-sm rounded-full">
                    <Crown className="w-4 h-4" />
                    Admin
                  </span>
                )}
              </div>
            ) : (
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-white/60 text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    className="w-full px-4 py-2 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Email</label>
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                    className="w-full px-4 py-2 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2">Mobile</label>
                  <input
                    type="tel"
                    value={editedUser.mobile}
                    onChange={(e) => setEditedUser({ ...editedUser, mobile: e.target.value })}
                    className="w-full px-4 py-2 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            )}
            <div className="flex gap-3">
              {!isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditedUser(user);
                      setIsEditing(true);
                    }}
                    className="border-[#2a2a2a] text-white hover:border-[#D4AF37]"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    onClick={logout}
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleSaveProfile}
                    className="gold-button text-black"
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="border-[#2a2a2a] text-white"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="w-full bg-[#050505] border border-[#1a1a1a] p-1 mb-8 grid grid-cols-3">
            <TabsTrigger 
              value="orders" 
              className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
            >
              <Package className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger 
              value="addresses"
              className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Addresses
            </TabsTrigger>
            <TabsTrigger 
              value="wishlist"
              className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black"
            >
              <Heart className="w-4 h-4 mr-2" />
              Wishlist
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <div className="luxury-card p-6">
              <h2 className="text-xl font-bold text-white mb-6 font-['Playfair_Display']">
                My Orders
              </h2>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60">No orders yet</p>
                  <Link to="/collections">
                    <Button className="mt-4 gold-button text-black">Start Shopping</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="p-4 bg-[#050505] rounded-lg border border-[#1a1a1a]">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                        <div>
                          <p className="text-white/50 text-sm">Order #{order.id}</p>
                          <p className="text-white font-semibold">
                            {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-sm capitalize ${
                            order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                            order.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {order.status}
                          </span>
                          <span className="text-[#D4AF37] font-bold">
                            {formatPrice(order.totalAmount)}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-4 overflow-x-auto pb-2 mb-4">
                        {order.items.map((item) => (
                          <img
                            key={item.product.id}
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                        ))}
                      </div>
                      <Button
                        onClick={() => navigate(`/track-order/${order.id}`)}
                        className="w-full bg-[#D4AF37] hover:bg-[#E5C048] text-black font-semibold"
                      >
                        Track Order
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <div className="luxury-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white font-['Playfair_Display']">
                  Saved Addresses
                </h2>
                <Button
                  onClick={() => setShowAddForm(!showAddForm)}
                  variant="outline"
                  className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New
                </Button>
              </div>

              {showAddForm && (
                <div className="p-4 bg-[#050505] rounded-lg border border-[#1a1a1a] mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                      className="px-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className="px-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                      className="md:col-span-2 px-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="px-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      className="px-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="text"
                      placeholder="PIN Code"
                      value={newAddress.pincode}
                      onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      className="px-4 py-2 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                    />
                    <label className="flex items-center gap-2 text-white/60">
                      <input
                        type="checkbox"
                        checked={newAddress.isDefault}
                        onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                        className="accent-[#D4AF37]"
                      />
                      Set as default
                    </label>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button onClick={handleAddAddress} className="gold-button text-black">
                      Save Address
                    </Button>
                    <Button
                      onClick={() => setShowAddForm(false)}
                      variant="outline"
                      className="border-[#2a2a2a] text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-4 rounded-lg border ${
                      address.isDefault
                        ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                        : 'border-[#1a1a1a] bg-[#050505]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-white font-semibold">{address.name}</p>
                          {address.isDefault && (
                            <span className="px-2 py-0.5 bg-[#D4AF37]/20 text-[#D4AF37] text-xs rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-white/60 text-sm mt-1">{address.street}</p>
                        <p className="text-white/60 text-sm">
                          {address.city}, {address.state} {address.pincode}
                        </p>
                        <p className="text-white/60 text-sm">{address.phone}</p>
                      </div>
                      <button
                        onClick={() => deleteAddress(address.id)}
                        className="text-white/40 hover:text-red-400 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <div className="luxury-card p-6">
              <h2 className="text-xl font-bold text-white mb-6 font-['Playfair_Display']">
                My Wishlist
              </h2>
              <Link to="/wishlist">
                <Button className="gold-button text-black">
                  <Heart className="w-4 h-4 mr-2" />
                  View Full Wishlist
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
