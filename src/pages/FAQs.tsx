import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, HelpCircle } from 'lucide-react';

const FAQs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      category: 'General',
      icon: '❓',
      questions: [
        {
          q: 'What is Vireka?',
          a: 'Vireka is a premium jewelry brand offering exquisite handcrafted pieces including necklaces, earrings, rings, bracelets, and bridal sets. We combine traditional craftsmanship with modern design to create timeless pieces that celebrate elegance and beauty.',
        },
        {
          q: 'Where is Vireka located?',
          a: 'Vireka is an online-first jewelry brand based in India. We ship worldwide and serve customers across multiple countries. All our jewelry is crafted by skilled artisans and shipped directly to your doorstep.',
        },
        {
          q: 'How can I contact customer support?',
          a: 'You can reach our customer support team through the Contact page on our website, or email us at support@vireka.com. Our team is available Monday to Saturday, 9 AM to 6 PM IST.',
        },
      ],
    },
    {
      category: 'Orders & Shipping',
      icon: '📦',
      questions: [
        {
          q: 'How long does shipping take?',
          a: 'Standard shipping takes 5-7 business days within India. Express shipping takes 2-3 business days. International shipping typically takes 10-15 business days depending on the destination country.',
        },
        {
          q: 'Do you offer international shipping?',
          a: 'Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. You can check available countries and shipping rates during checkout.',
        },
        {
          q: 'How can I track my order?',
          a: 'Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package on our website or the carrier\'s website.',
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, UPI, net banking, and digital wallets like Apple Pay and Google Pay.',
        },
      ],
    },
    {
      category: 'Returns & Exchanges',
      icon: '🔄',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'We offer a 15-day return policy for all unused items in their original packaging. Items must be returned with all tags and certificates intact. Customized or personalized items are not eligible for returns.',
        },
        {
          q: 'How do I initiate a return?',
          a: 'To initiate a return, log into your account, go to your order history, select the item you wish to return, and follow the return request process. You can also contact our support team for assistance.',
        },
        {
          q: 'When will I receive my refund?',
          a: 'Refunds are processed within 7-10 business days after we receive and inspect the returned item. The refund will be credited to your original payment method.',
        },
        {
          q: 'Can I exchange an item for a different size or design?',
          a: 'Yes, exchanges are allowed within 15 days of delivery. You can exchange for a different size or design of the same product category. Additional charges may apply if the new item has a different price.',
        },
      ],
    },
    {
      category: 'Product Information',
      icon: '💎',
      questions: [
        {
          q: 'What materials are used in your jewelry?',
          a: 'We use high-quality materials including 18K and 22K gold, sterling silver, platinum, ethically sourced diamonds, precious gemstones, and premium cubic zirconia. All materials are certified and come with authenticity certificates.',
        },
        {
          q: 'Are your diamonds certified?',
          a: 'Yes, all our diamonds come with certificates from reputed gemological laboratories like GIA, IGI, or HRD. The certificate specifies the diamond\'s 4Cs (cut, color, clarity, and carat weight).',
        },
        {
          q: 'Do you offer customization services?',
          a: 'Yes, we offer customization services through our AI Custom Hamper feature. You can also contact us directly for bespoke jewelry design requests. Our team will work with you to create your dream piece.',
        },
        {
          q: 'How should I care for my jewelry?',
          a: 'Proper care includes storing jewelry in a soft cloth or separate compartments, avoiding contact with chemicals, cleaning with mild soap and water, and having professional cleaning done periodically. Visit our Care Guide for detailed instructions.',
        },
      ],
    },
    {
      category: 'Sizing',
      icon: '📏',
      questions: [
        {
          q: 'How do I find my ring size?',
          a: 'You can find your ring size using our size guide, which includes a printable ring sizer and measurement instructions. You can also visit a local jeweler for professional sizing.',
        },
        {
          q: 'Do you offer adjustable rings?',
          a: 'Some of our ring designs are adjustable, particularly our fashion jewelry collection. These are clearly marked on the product page. Fine jewelry rings are typically not adjustable.',
        },
        {
          q: 'What if the ring doesn\'t fit after purchase?',
          a: 'If your ring doesn\'t fit, you can exchange it within 15 days for a different size. Some rings can also be resized by a local jeweler if needed.',
        },
      ],
    },
    {
      category: 'Account & Security',
      icon: '🔐',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click on the "Sign Up" button in the top right corner of our website. Enter your email address, create a password, and fill in your details. You can also sign up using Google or Facebook for quicker registration.',
        },
        {
          q: 'What are the benefits of creating an account?',
          a: 'Account holders enjoy faster checkout, order tracking, wishlist management, exclusive offers, early access to new collections, and a personalized shopping experience.',
        },
        {
          q: 'Is my payment information secure?',
          a: 'Absolutely. We use industry-standard SSL encryption and comply with PCI DSS standards to ensure your payment information is secure. We do not store your credit card details on our servers.',
        },
        {
          q: 'How do I update my account information?',
          a: 'Log into your account and go to "Profile" to update your personal information, change your password, and manage your shipping addresses.',
        },
      ],
    },
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q =>
        q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.a.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-[#1a1a1a]/30" />
        <div className="relative z-10 text-center px-4">
          <HelpCircle className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-xl md:text-2xl text-gray-300">Find answers to common questions</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-purple-500/20 text-white placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="container mx-auto px-4 py-16">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">No results found for "{searchTerm}"</p>
            <p className="text-gray-500 mt-2">Try different keywords or browse all categories</p>
          </div>
        ) : (
          filteredCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <Card className="bg-white/5 border-purple-500/20 mb-6">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>
                    {category.category}
                  </CardTitle>
                </CardHeader>
              </Card>

              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, questionIndex) => (
                  <AccordionItem
                    key={questionIndex}
                    value={`${categoryIndex}-${questionIndex}`}
                    className="bg-white/5 border-purple-500/20 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-white hover:text-purple-300 text-left">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 pt-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))
        )}
      </div>

      {/* Still Have Questions */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-black/20 to-[#1a1a1a]/20 border-[#333]/20">
          <CardContent className="p-8 text-center">
            <HelpCircle className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Still Have Questions?</h3>
            <p className="text-gray-300 mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
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

export default FAQs;