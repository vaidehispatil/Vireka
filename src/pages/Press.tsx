import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Newspaper, Mail, Download, Calendar, ExternalLink } from 'lucide-react';

const Press = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    publication: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Press inquiry submitted successfully! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      publication: '',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const pressReleases = [
    {
      title: 'Vireka Launches Revolutionary AI-Powered Custom Jewelry Service',
      date: 'January 15, 2024',
      publication: 'TechCrunch',
      excerpt: 'Vireka introduces groundbreaking AI technology that creates personalized jewelry hampers based on individual preferences, style, and budget.',
      link: '#',
    },
    {
      title: 'Sustainable Luxury: Vireka\'s Commitment to Ethical Jewelry',
      date: 'December 20, 2023',
      publication: 'Forbes',
      excerpt: 'How Vireka is leading the industry in sustainable and ethically sourced jewelry practices while maintaining exceptional quality.',
      link: '#',
    },
    {
      title: 'Vireka Named Top 10 Jewelry E-commerce Platforms of 2024',
      date: 'November 10, 2023',
      publication: 'Business Insider',
      excerpt: 'Vireka recognized for its innovative approach to jewelry retail, exceptional customer service, and cutting-edge technology.',
      link: '#',
    },
  ];

  const mediaCoverage = [
    {
      title: 'The Future of Personalized Jewelry',
      publication: 'Vogue',
      date: 'February 2024',
      type: 'Feature',
      image: '/images/jewelry-1.jpg',
      link: '#',
    },
    {
      title: 'Behind the Scenes: Vireka\'s Design Process',
      publication: 'Elle',
      date: 'January 2024',
      type: 'Interview',
      image: '/images/jewelry-2.jpg',
      link: '#',
    },
    {
      title: 'Trending: Bold Statement Pieces for 2024',
      publication: 'Harper\'s Bazaar',
      date: 'December 2023',
      type: 'Trend Report',
      image: '/images/jewelry-3.jpg',
      link: '#',
    },
  ];

  const brandAssets = [
    {
      title: 'Brand Guidelines',
      description: 'Complete brand guidelines including logo usage, colors, and typography.',
      type: 'PDF',
      size: '5.2 MB',
    },
    {
      title: 'Press Kit',
      description: 'Company overview, team bios, and product information.',
      type: 'ZIP',
      size: '12.8 MB',
    },
    {
      title: 'Product Images',
      description: 'High-resolution product images for editorial use.',
      type: 'ZIP',
      size: '45.6 MB',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-[#1a1a1a]/30" />
        <div className="relative z-10 text-center px-4">
          <Newspaper className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Press Center</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">News, Media, & Brand Resources</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Download Press Kit
            </Button>
            <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/10">
              Contact PR Team
            </Button>
          </div>
        </div>
      </div>

      {/* Press Releases */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Press Releases</h2>
        <div className="grid gap-6">
          {pressReleases.map((release, index) => (
            <Card key={index} className="bg-white/5 border-purple-500/20 hover:border-purple-500/50 transition-all">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-white text-2xl mb-2">{release.title}</CardTitle>
                    <CardDescription className="text-gray-400 mb-4">{release.excerpt}</CardDescription>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {release.date}
                      </span>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded">
                        {release.publication}
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-500/10">
                    Read More
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Media Coverage */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Media Coverage</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {mediaCoverage.map((coverage, index) => (
            <Card key={index} className="bg-white/5 border-pink-500/20 hover:border-pink-500/50 transition-all overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-black/20 to-[#1a1a1a]/20 flex items-center justify-center">
                <Newspaper className="w-16 h-16 text-purple-500/50" />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded text-xs">
                    {coverage.type}
                  </span>
                  <span className="text-gray-500 text-sm">{coverage.date}</span>
                </div>
                <CardTitle className="text-white text-lg mb-1">{coverage.title}</CardTitle>
                <CardDescription className="text-purple-300">{coverage.publication}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-pink-500 text-pink-300 hover:bg-pink-500/10">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Read Article
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Brand Assets */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Brand Assets</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {brandAssets.map((asset, index) => (
            <Card key={index} className="bg-white/5 border-purple-500/20 hover:border-purple-500/50 transition-all">
              <CardHeader>
                <CardTitle className="text-white">{asset.title}</CardTitle>
                <CardDescription className="text-gray-400">{asset.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">{asset.type}</span>
                  <span className="text-sm text-gray-500">{asset.size}</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Press Contact Form */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Press Inquiries</h2>
          <Card className="bg-white/5 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Contact Our PR Team</CardTitle>
              <CardDescription className="text-gray-400">
                For media inquiries, interview requests, or partnership opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Your Name *</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-purple-500/20 text-white"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Email Address *</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-purple-500/20 text-white"
                    placeholder="john@media.com"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Publication/Media Outlet *</label>
                  <Input
                    name="publication"
                    value={formData.publication}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-purple-500/20 text-white"
                    placeholder="Your publication name"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Your Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-white/5 border-purple-500/20 text-white rounded-md p-3 focus:outline-none focus:border-purple-500"
                    placeholder="Tell us about your story idea or inquiry..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Submit Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Info */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-black/20 to-[#1a1a1a]/20 border-[#333]/20">
          <CardContent className="p-8 text-center">
            <Mail className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Direct Contact</h3>
            <p className="text-gray-300 mb-2">For urgent press matters, reach out directly:</p>
            <a href="mailto:press@vireka.com" className="text-purple-300 hover:text-purple-200 text-lg">
              press@vireka.com
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Press;