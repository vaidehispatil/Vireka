import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Truck, Package, Globe, Clock, Shield, CheckCircle } from 'lucide-react';

const Shipping = () => {
  const shippingInfo = [
    {
      icon: <Truck className="w-8 h-8 text-purple-500" />,
      title: 'Free Shipping',
      description: 'Free shipping on all orders above ₹2,999 within India',
    },
    {
      icon: <Clock className="w-8 h-8 text-pink-500" />,
      title: 'Fast Delivery',
      description: 'Standard shipping: 5-7 business days, Express: 2-3 business days',
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-500" />,
      title: 'International Shipping',
      description: 'We ship to over 50 countries worldwide',
    },
    {
      icon: <Package className="w-8 h-8 text-pink-500" />,
      title: 'Secure Packaging',
      description: 'All items are carefully packaged to ensure safe delivery',
    },
  ];

  const shippingZones = [
    {
      zone: 'Domestic (India)',
      delivery: '5-7 business days',
      express: '2-3 business days',
      cost: 'Free on orders above ₹2,999',
      expressCost: '₹199',
    },
    {
      zone: 'South Asia (Nepal, Bangladesh, Sri Lanka)',
      delivery: '7-10 business days',
      express: '4-6 business days',
      cost: '₹999',
      expressCost: '₹1,499',
    },
    {
      zone: 'Middle East (UAE, Saudi Arabia, Qatar)',
      delivery: '10-12 business days',
      express: '5-7 business days',
      cost: '₹1,499',
      expressCost: '₹2,499',
    },
    {
      zone: 'Europe & USA',
      delivery: '12-15 business days',
      express: '7-10 business days',
      cost: '₹1,999',
      expressCost: '₹3,499',
    },
    {
      zone: 'Rest of World',
      delivery: '15-20 business days',
      express: '10-12 business days',
      cost: '₹2,499',
      expressCost: '₹4,999',
    },
  ];

  const shippingProcess = [
    {
      step: '1',
      title: 'Order Processing',
      description: 'Orders are processed within 1-2 business days. You will receive a confirmation email with order details.',
    },
    {
      step: '2',
      title: 'Quality Check',
      description: 'Each item undergoes a thorough quality check before packaging to ensure it meets our standards.',
    },
    {
      step: '3',
      title: 'Secure Packaging',
      description: 'Jewelry is carefully packaged in elegant boxes with protective materials to prevent damage.',
    },
    {
      step: '4',
      title: 'Dispatch',
      description: 'Once shipped, you will receive a tracking number via email to monitor your package.',
    },
    {
      step: '5',
      title: 'Delivery',
      description: 'Your order will be delivered to your doorstep. Signature may be required for high-value items.',
    },
  ];

  const customRegulations = [
    {
      country: 'USA',
      regulation: 'No import duties on jewelry under $800',
      note: 'Customs may inspect packages',
    },
    {
      country: 'UK',
      regulation: 'VAT may apply on orders above £135',
      note: 'Import duties may apply',
    },
    {
      country: 'UAE',
      regulation: 'Duty-free import for personal use',
      note: 'Standard customs clearance',
    },
    {
      country: 'Australia',
      regulation: 'GST applies on orders above $1,000 AUD',
      note: 'Customs inspection possible',
    },
    {
      country: 'Canada',
      regulation: 'Duties may apply on jewelry',
      note: 'GST/HST may apply',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-[#1a1a1a]/30" />
        <div className="relative z-10 text-center px-4">
          <Truck className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Shipping Information</h1>
          <p className="text-xl md:text-2xl text-gray-300">Fast, reliable, and secure delivery worldwide</p>
        </div>
      </div>

      {/* Shipping Highlights */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-6">
          {shippingInfo.map((info, index) => (
            <Card key={index} className="bg-white/5 border-purple-500/20 hover:border-purple-500/50 transition-all text-center">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">{info.icon}</div>
                <h3 className="text-white font-semibold mb-2">{info.title}</h3>
                <p className="text-gray-400 text-sm">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Shipping Zones */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Shipping Zones & Rates</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white/5 border-purple-500/20 rounded-lg">
            <thead>
              <tr className="border-b border-purple-500/20">
                <th className="p-4 text-left text-purple-300">Zone</th>
                <th className="p-4 text-left text-purple-300">Standard Delivery</th>
                <th className="p-4 text-left text-purple-300">Express Delivery</th>
                <th className="p-4 text-left text-purple-300">Standard Cost</th>
                <th className="p-4 text-left text-purple-300">Express Cost</th>
              </tr>
            </thead>
            <tbody>
              {shippingZones.map((zone, index) => (
                <tr key={index} className="border-b border-purple-500/10 hover:bg-purple-500/5 transition-all">
                  <td className="p-4 text-white font-medium">{zone.zone}</td>
                  <td className="p-4 text-gray-300">{zone.delivery}</td>
                  <td className="p-4 text-gray-300">{zone.express}</td>
                  <td className="p-4 text-gray-300">{zone.cost}</td>
                  <td className="p-4 text-gray-300">{zone.expressCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipping Process */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {shippingProcess.map((step, index) => (
            <div key={index} className="relative">
              <Card className="bg-white/5 border-pink-500/20 h-full">
                <CardHeader>
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold mb-4">
                    {step.step}
                  </div>
                  <CardTitle className="text-white text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </CardContent>
              </Card>
              {index < shippingProcess.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <div className="w-4 h-4 bg-purple-500 rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Order Tracking */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-black/20 to-[#1a1a1a]/20 border-[#333]/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <Package className="w-16 h-16 text-purple-500" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">Track Your Order</h3>
                <p className="text-gray-300">
                  Enter your order ID or tracking number to see the real-time status of your shipment.
                </p>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 whitespace-nowrap">
                Track Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* International Customs */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">International Customs Information</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customRegulations.map((regulation, index) => (
            <Card key={index} className="bg-white/5 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-500" />
                  {regulation.country}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-purple-300 text-sm font-medium">Regulation</p>
                    <p className="text-gray-300 text-sm">{regulation.regulation}</p>
                  </div>
                  <div>
                    <p className="text-pink-300 text-sm font-medium">Note</p>
                    <p className="text-gray-300 text-sm">{regulation.note}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Important Notes */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Important Notes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-white/5 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                What We Offer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Real-time tracking for all orders</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Insurance coverage for high-value items</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Discreet packaging for privacy</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Multiple delivery options to suit your needs</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-pink-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-pink-500" />
                Delivery Requirements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-pink-500 mt-1 flex-shrink-0" />
                  <span>Valid phone number required for delivery</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-pink-500 mt-1 flex-shrink-0" />
                  <span>Signature required for orders above ₹10,000</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-pink-500 mt-1 flex-shrink-0" />
                  <span>Address must be deliverable by courier service</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-pink-500 mt-1 flex-shrink-0" />
                  <span>PO Box addresses not accepted for international orders</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Shipping;