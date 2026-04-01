import { Link } from 'react-router-dom';
import { Crown, Instagram, Facebook, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'Necklaces', path: '/necklaces' },
      { name: 'Earrings', path: '/earrings' },
      { name: 'Rings', path: '/rings' },
      { name: 'Bracelets', path: '/bracelets' },
      { name: 'Bridal Sets', path: '/bridal-sets' },
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
      { name: 'Contact', path: '/contact' },
    ],
    support: [
      { name: 'FAQs', path: '/faqs' },
      { name: 'Shipping', path: '/shipping' },
      { name: 'Returns', path: '/returns' },
      { name: 'Size Guide', path: '/size-guide' },
      { name: 'Care Guide', path: '/care-guide' },
    ],
  };

  return (
    <footer className="bg-[#050505] border-t border-[#1a1a1a]">
      {/* Newsletter Section */}
      <div className="section-padding py-16 border-b border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 font-['Playfair_Display']">
            <span className="gold-gradient">Join the Vireka Family</span>
          </h3>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Subscribe to receive exclusive offers, early access to new collections, and jewelry care tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
            <button className="px-8 py-3 gold-button text-black font-semibold rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="section-padding py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Crown className="w-8 h-8 text-[#D4AF37]" />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-wider gold-gradient font-['Playfair_Display']">
                  VIREKA
                </span>
                <span className="text-[10px] tracking-[0.3em] text-[#D4AF37]/70 uppercase">
                  Imitation Jewelry
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm mb-6 max-w-xs">
              Crafting beautiful imitation jewelry since 2015. Each piece tells a story of elegance, affordability, and style.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white/60 hover:bg-[#D4AF37] hover:text-black transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <a href="tel:+919653244077" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">
                  +91 96532 44077
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <a href="mailto:vaidehispatil1306@gmail.com" className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm">
                  vaidehispatil1306@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1a1a1a]">
        <div className="section-padding py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              &copy; {currentYear} Vireka. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="#" className="text-white/40 hover:text-[#D4AF37] transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="#" className="text-white/40 hover:text-[#D4AF37] transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
