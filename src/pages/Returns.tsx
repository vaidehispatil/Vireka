import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { RotateCcw, RefreshCw, AlertCircle, CheckCircle, Clock, Ban } from 'lucide-react';

const Returns = () => {
  const [formData, setFormData] = useState({
    orderId: '',
    email: '',
    reason: '',
    description: '',
  });

  const handleReturnRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Return request submitted successfully! We will review it and get back to you within 24 hours.');
    setFormData({
      orderId: '',
      email: '',
      reason: '',
      description: '',
    });
  };

  const returnPolicy = [
    {
      title: 'Return Period',
      icon: <Clock className="w-6 h-6 text-purple-500" />,
      content: 'You can return unused items within 15 days of delivery. The item must be in its original packaging with all tags and certificates intact.',
    },
    {
      title: 'Refund Process',
      icon: <RefreshCw className="w-6 h-6 text-pink-500" />,
      content: 'Refunds are processed within 7-10 business days after we receive and inspect the returned item. The amount will be credited to your original payment method.',
    },
    {
      title: 'Exchange Policy',
      icon: <RotateCcw className="w-6 h-6 text-purple-500" />,
      content: 'Exchanges are allowed within 15 days for different sizes or designs of the same category. Additional charges may apply for price differences.',
    },
  ];

  const returnSteps = [
    {
      step: '1',
      title: 'Initiate Return',
      description: 'Log into your account, go to order history, and select the item you wish to return.',
    },
    {
      step: '2',
      title: 'Provide Details',
      description: 'Select a return reason and add any additional information about why you\'re returning the item.',
    },
    {
      step: '3',
      title: 'Print Label',
      description: 'Once approved, you\'ll receive a return shipping label via email. Print it out.',
    },
    {
      step: '4',
      title: 'Pack Item',
      description: 'Pack the item securely in its original packaging with all accessories and certificates.',
    },
    {
      step: '5',
      title: 'Ship Back',
      description: 'Attach the shipping label and drop off the package at the designated courier location.',
    },
    {
      step: '6',
      title: 'Receive Refund',
      description: 'After inspection, your refund will be processed and credited to your original payment method.',
    },
  ];

  const eligibleItems = [
    'All unused jewelry in original condition',
    'Items with all tags and certificates',
    'Items purchased within the last 15 days',
    'Non-customized items',
  ];

  const ineligibleItems = [
    'Customized or personalized jewelry',
    'Items worn or damaged',
    'Items without original packaging',
    'Items returned after 15 days',
    'Earrings (hygiene reasons)',
  ];

  const returnReasons = [
    'Wrong item received',
    'Item damaged during shipping',
    'Item not as described',
    'Size doesn\'t fit',
    'Changed mind',
    'Quality issue',
    'Other',
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-[#1a1a1a]/30" />
        <div className="relative z-10 text-center px-4">
          <RotateCcw className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Returns & Exchanges</h1>
          <p className="text-xl md:text-2xl text-gray-300">Easy and hassle-free return process</p>
        </div>
      </div>

      {/* Return Policy Overview */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Our Return Policy</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {returnPolicy.map((policy, index) => (
            <Card key={index} className="bg-white/5 border-purple-500/20 hover:border-purple-500/50 transition-all">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  {policy.icon}
                  <CardTitle className="text-white text-xl">{policy.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{policy.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Return Process Steps */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">How to Return</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {returnSteps.map((step, index) => (
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
              {index < returnSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <div className="w-4 h-4 bg-purple-500 rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Eligibility */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white/5 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Eligible for Return
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {eligibleItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-red-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Ban className="w-6 h-6 text-red-500" />
                Not Eligible for Return
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {ineligibleItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <Ban className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Return Request Form */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Initiate a Return</h2>
          <Card className="bg-white/5 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Return Request Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleReturnRequest} className="space-y-6">
                <div>
                  <Label htmlFor="orderId" className="text-white">Order ID *</Label>
                  <Input
                    id="orderId"
                    value={formData.orderId}
                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                    required
                    className="bg-white/5 border-purple-500/20 text-white"
                    placeholder="e.g., VRE123456"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-white/5 border-purple-500/20 text-white"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="reason" className="text-white">Return Reason *</Label>
                  <Select value={formData.reason} onValueChange={(value) => setFormData({ ...formData, reason: value })}>
                    <SelectTrigger className="bg-white/5 border-purple-500/20 text-white">
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {returnReasons.map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description" className="text-white">Additional Details</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="bg-white/5 border-purple-500/20 text-white"
                    placeholder="Please provide more details about your return..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Submit Return Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Important Notes */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-black/20 to-[#1a1a1a]/20 border-[#333]/20">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-purple-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Important Notes</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>• Return shipping is free for defective items or wrong products received</li>
                  <li>• For other reasons, return shipping costs may apply</li>
                  <li>• Refunds to credit cards may take additional 3-5 business days to reflect in your account</li>
                  <li>• Store credits are processed immediately and can be used for future purchases</li>
                  <li>• For urgent return requests, please contact our customer support team</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Support */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-white/5 border-pink-500/20">
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-pink-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Need Help?</h3>
            <p className="text-gray-300 mb-6">
              Our customer support team is available to assist you with any return or exchange queries.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Contact Support
              </Button>
              <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/10">
                Start Live Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Returns;