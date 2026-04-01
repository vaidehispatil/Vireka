import { useState } from 'react';
import { Mail, Phone, Clock, Send, Check, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Save to Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject,
            message: formData.message
          }
        ]);

      if (error) {
        console.error('Error saving contact form:', error);
        alert('Failed to send message. Please try again.');
        setIsLoading(false);
        return;
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 96532 44077'],
      action: 'tel:+919653244077'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['vaidehispatil1306@gmail.com'],
      action: 'mailto:vaidehispatil1306@gmail.com'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: ['Mon - Sat: 10AM - 8PM', 'Sunday: 12PM - 6PM'],
      action: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      {/* Hero */}
      <div className="section-padding mb-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[#D4AF37] text-sm uppercase tracking-wider mb-4 block">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Playfair_Display']">
            Contact <span className="gold-gradient">Us</span>
          </h1>
          <p className="text-white/60">
            We'd love to hear from you. Reach out to us for any inquiries, custom orders, or just to say hello.
          </p>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="section-padding mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.action}
              className="luxury-card p-6 group hover:border-[#D4AF37] transition-colors text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-[#D4AF37]/20 transition-colors">
                <info.icon className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">{info.title}</h3>
              {info.details.map((detail, i) => (
                <p key={i} className="text-white/60 text-sm">{detail}</p>
              ))}
            </a>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="section-padding">
        <div className="max-w-2xl mx-auto">
          <div className="luxury-card p-8">
            <h2 className="text-2xl font-bold text-white mb-6 font-['Playfair_Display'] text-center">
              Send us a <span className="gold-gradient">Message</span>
            </h2>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-white font-semibold text-xl mb-2">Message Sent!</h3>
                <p className="text-white/60">We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-2 block">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#D4AF37]"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Status</option>
                      <option value="custom">Custom Design</option>
                      <option value="support">Customer Support</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-2 block">Your Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help you?"
                    rows={5}
                    className="w-full px-4 py-3 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37] resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 gold-button text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5 mr-2" />
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="section-padding mt-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-['Playfair_Display']">
            Frequently Asked <span className="gold-gradient">Questions</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              q: 'What is your return policy?',
              a: 'We offer a 30-day return policy for unused items in their original packaging.'
            },
            {
              q: 'Do you offer custom designs?',
              a: 'Yes! Our AI-powered customization tool and expert designers can create unique pieces just for you.'
            },
            {
              q: 'Is my jewelry insured during shipping?',
              a: 'Absolutely. All shipments are fully insured until they reach your doorstep.'
            },
            {
              q: 'Do you provide certificates of authenticity?',
              a: 'Yes, all our real gold and diamond jewelry comes with certificates from GIA, IGI, or BIS as applicable.'
            }
          ].map((faq, index) => (
            <div key={index} className="luxury-card p-6">
              <h4 className="text-white font-semibold mb-2">{faq.q}</h4>
              <p className="text-white/60 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Bot Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Contact;
