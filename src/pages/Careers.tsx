import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Mail, MapPin, Briefcase, Users, Heart } from 'lucide-react';

const Careers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    coverLetter: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to a backend or email service
    toast.success('Application submitted successfully! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      coverLetter: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openPositions = [
    {
      title: 'Senior Jewelry Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Lead creative direction for new jewelry collections, collaborate with artisans, and bring innovative designs to life.',
    },
    {
      title: 'E-commerce Manager',
      department: 'Marketing',
      location: 'Hybrid',
      type: 'Full-time',
      description: 'Drive online sales, manage digital marketing campaigns, and optimize the customer shopping experience.',
    },
    {
      title: 'Customer Experience Specialist',
      department: 'Support',
      location: 'Remote',
      type: 'Full-time',
      description: 'Provide exceptional customer service, handle inquiries, and ensure customer satisfaction across all touchpoints.',
    },
    {
      title: 'Content Creator',
      department: 'Marketing',
      location: 'Remote',
      type: 'Contract',
      description: 'Create engaging content for social media, blog, and marketing materials that showcase our jewelry collections.',
    },
    {
      title: 'Supply Chain Coordinator',
      department: 'Operations',
      location: 'On-site',
      type: 'Full-time',
      description: 'Manage inventory, coordinate with suppliers, and ensure timely delivery of products.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-[#1a1a1a]/30" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Join Our Team</h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">Build your career with us</p>
        </div>
      </div>

      {/* Why Work With Us */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Why Work With Us</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-white/5 border-purple-500/20 hover:border-purple-500/50 transition-all">
            <CardHeader>
              <Heart className="w-12 h-12 text-purple-500 mb-4" />
              <CardTitle className="text-white">Passionate Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Work with passionate individuals who love what they do and care about each other.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-pink-500/20 hover:border-pink-500/50 transition-all">
            <CardHeader>
              <Users className="w-12 h-12 text-pink-500 mb-4" />
              <CardTitle className="text-white">Inclusive Culture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">We celebrate diversity and foster an inclusive environment where everyone thrives.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-purple-500/20 hover:border-purple-500/50 transition-all">
            <CardHeader>
              <Briefcase className="w-12 h-12 text-purple-500 mb-4" />
              <CardTitle className="text-white">Growth Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Continuous learning and development opportunities to help you grow professionally.</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-pink-500/20 hover:border-pink-500/50 transition-all">
            <CardHeader>
              <MapPin className="w-12 h-12 text-pink-500 mb-4" />
              <CardTitle className="text-white">Flexible Work</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">Remote and hybrid options to help you maintain work-life balance.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Open Positions */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Open Positions</h2>
        <div className="grid gap-6">
          {openPositions.map((position, index) => (
            <Card key={index} className="bg-white/5 border-purple-500/20 hover:border-purple-500/50 transition-all">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-white text-2xl">{position.title}</CardTitle>
                    <CardDescription className="text-gray-400 mt-2">{position.description}</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                      {position.department}
                    </span>
                    <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">
                      {position.type}
                    </span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                      {position.location}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => {
                    setFormData({ ...formData, position: position.title });
                    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Application Form */}
      <div id="application-form" className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Apply Now</h2>
          <Card className="bg-white/5 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Application Form</CardTitle>
              <CardDescription className="text-gray-400">Fill out the form below to apply for any position</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-purple-500/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-purple-500/20 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-white/5 border-purple-500/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="position" className="text-white">Position *</Label>
                    <Input
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border-purple-500/20 text-white"
                      placeholder="Position you're applying for"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="experience" className="text-white">Years of Experience *</Label>
                  <Input
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-purple-500/20 text-white"
                    placeholder="e.g., 3 years"
                  />
                </div>

                <div>
                  <Label htmlFor="coverLetter" className="text-white">Cover Letter *</Label>
                  <Textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-white/5 border-purple-500/20 text-white"
                    placeholder="Tell us why you'd be a great fit for this role..."
                  />
                </div>

                <div>
                  <Label className="text-white">Resume/CV *</Label>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="bg-white/5 border-purple-500/20 text-white"
                  />
                  <p className="text-gray-400 text-sm mt-2">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-black/20 to-[#1a1a1a]/20 border-[#333]/20">
          <CardContent className="p-8 text-center">
            <Mail className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Questions?</h3>
            <p className="text-gray-300 mb-6">
              Have questions about working with us? Send us an email and we'll get back to you.
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Contact HR
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Careers;