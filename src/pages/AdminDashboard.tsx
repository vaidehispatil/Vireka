import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings,
  LogOut,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Search,
  Plus,
  Edit2,
  Trash2
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useAuth } from '@/contexts/AuthContext';
import { products, formatPrice } from '@/data/products';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, orders } = useStore();
  const { user: authUser, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Redirect if not admin - check both store and auth context
  const isAdmin = (user?.role === 'admin') || (authUser?.email?.includes('admin'));
  
  if (!isAdmin && !authUser) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl text-white mb-4">Access Denied</h2>
          <p className="text-white/60 mb-6">You don't have permission to access this page.</p>
          <Link to="/">
            <Button className="gold-button text-black">Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    logout();
    await signOut();
    navigate('/');
  };

  const stats = [
    { 
      title: 'Total Revenue', 
      value: formatPrice(orders.reduce((sum, o) => sum + o.totalAmount, 0)), 
      icon: DollarSign,
      change: '+12.5%',
      color: 'green'
    },
    { 
      title: 'Total Orders', 
      value: orders.length.toString(), 
      icon: ShoppingCart,
      change: '+8.2%',
      color: 'green'
    },
    { 
      title: 'Total Products', 
      value: products.length.toString(), 
      icon: Package,
      change: '+3',
      color: 'green'
    },
    { 
      title: 'Total Users', 
      value: '1,234', 
      icon: Users,
      change: '+156',
      color: 'green'
    }
  ];

  const recentOrders = orders.slice(0, 5);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#050505] border-r border-[#1a1a1a] min-h-screen fixed left-0 top-20">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center">
                <span className="text-black font-bold">{(user?.name || authUser?.email || 'A')[0].toUpperCase()}</span>
              </div>
              <div>
                <p className="text-white font-semibold">{user?.name || authUser?.email?.split('@')[0] || 'Admin'}</p>
                <p className="text-[#D4AF37] text-sm">Administrator</p>
              </div>
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#D4AF37] text-black'
                      : 'text-white/70 hover:bg-[#1a1a1a] hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors mt-8"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="text-3xl font-bold text-white mb-8 font-['Playfair_Display']">
                Dashboard
              </h1>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="luxury-card p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white/60 text-sm mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <TrendingUp className={`w-4 h-4 text-${stat.color}-400`} />
                      <span className={`text-${stat.color}-400 text-sm`}>{stat.change}</span>
                      <span className="text-white/40 text-sm">vs last month</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="luxury-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Recent Orders</h2>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-[#D4AF37] hover:underline text-sm"
                  >
                    View All
                  </button>
                </div>
                {recentOrders.length === 0 ? (
                  <p className="text-white/60 text-center py-8">No orders yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#1a1a1a]">
                          <th className="text-left text-white/60 py-3 px-4">Order ID</th>
                          <th className="text-left text-white/60 py-3 px-4">Date</th>
                          <th className="text-left text-white/60 py-3 px-4">Status</th>
                          <th className="text-right text-white/60 py-3 px-4">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-[#1a1a1a] last:border-0">
                            <td className="py-4 px-4 text-white">{order.id}</td>
                            <td className="py-4 px-4 text-white/60">
                              {new Date(order.orderDate).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-3 py-1 rounded-full text-xs capitalize ${
                                order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                                order.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                                'bg-yellow-500/20 text-yellow-400'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right text-[#D4AF37] font-semibold">
                              {formatPrice(order.totalAmount)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Products */}
          {activeTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white font-['Playfair_Display']">
                  Products
                </h1>
                <Button className="gold-button text-black">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3 bg-[#050505] border border-[#1a1a1a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Products Table */}
              <div className="luxury-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#1a1a1a] bg-[#050505]">
                        <th className="text-left text-white/60 py-4 px-4">Product</th>
                        <th className="text-left text-white/60 py-4 px-4">Category</th>
                        <th className="text-left text-white/60 py-4 px-4">Price</th>
                        <th className="text-left text-white/60 py-4 px-4">Stock</th>
                        <th className="text-right text-white/60 py-4 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b border-[#1a1a1a] last:border-0">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <span className="text-white">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-white/60 capitalize">{product.category}</td>
                          <td className="py-4 px-4 text-[#D4AF37] font-semibold">
                            {formatPrice(product.price)}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`${product.stock < 5 ? 'text-red-400' : 'text-white/60'}`}>
                              {product.stock} units
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 text-white/60 hover:text-[#D4AF37] transition-colors">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-white/60 hover:text-red-400 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders */}
          {activeTab === 'orders' && (
            <div>
              <h1 className="text-3xl font-bold text-white mb-8 font-['Playfair_Display']">
                Orders
              </h1>
              <div className="luxury-card p-6">
                {orders.length === 0 ? (
                  <p className="text-white/60 text-center py-8">No orders yet</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="p-4 bg-[#050505] rounded-lg border border-[#1a1a1a]">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <p className="text-white font-semibold">Order #{order.id}</p>
                            <p className="text-white/60 text-sm">
                              {new Date(order.orderDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <select
                              value={order.status}
                              className="px-3 py-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded text-white text-sm"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <span className="text-[#D4AF37] font-semibold">
                              {formatPrice(order.totalAmount)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Users */}
          {activeTab === 'users' && (
            <div>
              <h1 className="text-3xl font-bold text-white mb-8 font-['Playfair_Display']">
                Users
              </h1>
              <div className="luxury-card p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#1a1a1a]">
                        <th className="text-left text-white/60 py-3 px-4">User</th>
                        <th className="text-left text-white/60 py-3 px-4">Email</th>
                        <th className="text-left text-white/60 py-3 px-4">Role</th>
                        <th className="text-left text-white/60 py-3 px-4">Status</th>
                        <th className="text-right text-white/60 py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#1a1a1a]">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center">
                              <span className="text-black font-bold">A</span>
                            </div>
                            <span className="text-white">Admin User</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-white/60">admin@luxejewels.com</td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-xs rounded">
                            Admin
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                            Active
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button className="p-2 text-white/60 hover:text-[#D4AF37]">
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Settings */}
          {activeTab === 'settings' && (
            <div>
              <h1 className="text-3xl font-bold text-white mb-8 font-['Playfair_Display']">
                Settings
              </h1>
              <div className="luxury-card p-6">
                <h2 className="text-xl font-bold text-white mb-6">General Settings</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-[#1a1a1a]">
                    <div>
                      <p className="text-white font-medium">Store Name</p>
                      <p className="text-white/60 text-sm">Luxe Jewels</p>
                    </div>
                    <Button variant="outline" className="border-[#2a2a2a] text-white">
                      Edit
                    </Button>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-[#1a1a1a]">
                    <div>
                      <p className="text-white font-medium">Currency</p>
                      <p className="text-white/60 text-sm">Indian Rupee (₹)</p>
                    </div>
                    <Button variant="outline" className="border-[#2a2a2a] text-white">
                      Change
                    </Button>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-white font-medium">Maintenance Mode</p>
                      <p className="text-white/60 text-sm">Disable store temporarily</p>
                    </div>
                    <button className="w-12 h-6 rounded-full bg-[#2a2a2a] relative">
                      <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
