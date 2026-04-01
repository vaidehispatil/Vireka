import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sparkles, Droplets, Shield, Sun, AlertCircle, CheckCircle, Gem } from 'lucide-react';

const CareGuide = () => {
  const careTips = [
    {
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      title: 'Regular Cleaning',
      description: 'Clean your jewelry regularly with mild soap and warm water. Use a soft brush for intricate designs.',
    },
    {
      icon: <Shield className="w-6 h-6 text-pink-500" />,
      title: 'Proper Storage',
      description: 'Store each piece separately in soft cloth pouches or jewelry boxes to prevent scratches and tangling.',
    },
    {
      icon: <Droplets className="w-6 h-6 text-purple-500" />,
      title: 'Avoid Moisture',
      description: 'Remove jewelry before swimming, bathing, or exercising to prevent damage from water and sweat.',
    },
    {
      icon: <Sun className="w-6 h-6 text-pink-500" />,
      title: 'Limit Sun Exposure',
      description: 'Prolonged exposure to sunlight can fade gemstones and weaken certain metals.',
    },
  ];

  const materialCare = [
    {
      material: 'Gold Jewelry',
      tips: [
        'Clean with mild soap and warm water',
        'Use a soft cloth to polish',
        'Avoid harsh chemicals and abrasive cleaners',
        'Store separately to prevent scratches',
        'Professional cleaning recommended annually',
      ],
      donts: [
        'Don\'t wear while swimming in chlorinated water',
        'Don\'t expose to household cleaners',
        'Don\'t use toothpaste or abrasive materials',
      ],
    },
    {
      material: 'Silver Jewelry',
      tips: [
        'Polish regularly with silver polishing cloth',
        'Store in airtight bags to prevent tarnishing',
        'Clean with mild soap and water',
        'Use baking soda paste for deep cleaning',
        'Wear regularly to prevent tarnish',
      ],
      donts: [
        'Don\'t expose to sulfur-containing substances',
        'Don\'t store with other metals',
        'Don\'t use harsh chemicals',
      ],
    },
    {
      material: 'Diamond Jewelry',
      tips: [
        'Clean with ammonia-based solution weekly',
        'Use soft brush for detailed cleaning',
        'Store in individual compartments',
        'Professional cleaning twice a year',
        'Check prongs and settings regularly',
      ],
      donts: [
        'Don\'t wear during rough activities',
        'Don\'t expose to chlorine bleach',
        'Don\'t store loose together',
      ],
    },
    {
      material: 'Gemstone Jewelry',
      tips: [
        'Clean according to gemstone type',
        'Use lukewarm water and mild soap',
        'Dry with soft lint-free cloth',
        'Store away from harder gemstones',
        'Avoid ultrasonic cleaners for soft stones',
      ],
      donts: [
        'Don\'t expose to sudden temperature changes',
        'Don\'t use harsh chemicals',
        'Don\'t store in direct sunlight',
      ],
    },
    {
      material: 'Pearl Jewelry',
      tips: [
        'Wipe with soft cloth after wearing',
        'Clean with mild soap only',
        'Store in soft cloth pouch',
        'Restring periodically',
        'Allow to air dry before storage',
      ],
      donts: [
        'Don\'t expose to chemicals or perfume',
        'Don\'t store in plastic bags',
        'Don\'t use ultrasonic cleaners',
      ],
    },
  ];

  const troubleshooting = [
    {
      issue: 'Tarnished Silver',
      solution: 'Use a silver polishing cloth or create a paste with baking soda and water. Apply gently, then rinse and dry.',
    },
    {
      issue: 'Cloudy Diamonds',
      solution: 'Clean with a solution of ammonia and water, or use a jewelry cleaning solution. Scrub gently with a soft brush.',
    },
    {
      issue: 'Dull Gold',
      solution: 'Clean with mild soap and water, then polish with a jewelry cloth. For deep cleaning, visit a professional.',
    },
    {
      issue: 'Loose Stones',
      solution: 'Stop wearing immediately and take to a jeweler for repair. Regular checks can prevent this issue.',
    },
    {
      issue: 'Stuck Clasp',
      solution: 'Use a pointed tool to gently release the mechanism. If it persists, have it professionally cleaned and repaired.',
    },
  ];

  const professionalCare = [
    {
      service: 'Professional Cleaning',
      frequency: 'Every 6-12 months',
      description: 'Ultrasonic or steam cleaning removes deep-set dirt and restores brilliance.',
    },
    {
      service: 'Prong Check',
      frequency: 'Every 6 months',
      description: 'Professional inspection ensures stones are secure and settings are intact.',
    },
    {
      service: 'Rhodium Plating',
      frequency: 'Every 1-2 years',
      description: 'White gold jewelry benefits from periodic rhodium plating to maintain shine.',
    },
    {
      service: 'Restringing',
      frequency: 'Every 1-2 years',
      description: 'Pearl and beaded necklaces should be restrung to prevent breakage.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-[#1a1a1a]/30" />
        <div className="relative z-10 text-center px-4">
          <Gem className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Jewelry Care Guide</h1>
          <p className="text-xl md:text-2xl text-gray-300">Keep your precious pieces shining forever</p>
        </div>
      </div>

      {/* Essential Care Tips */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Essential Care Tips</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {careTips.map((tip, index) => (
            <Card key={index} className="bg-white/5 border-purple-500/20 hover:border-purple-500/50 transition-all">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">{tip.icon}</div>
                <h3 className="text-white font-semibold mb-2">{tip.title}</h3>
                <p className="text-gray-400 text-sm">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Material-Specific Care */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Material-Specific Care</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materialCare.map((item, index) => (
            <Card key={index} className="bg-white/5 border-pink-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Gem className="w-5 h-5 text-pink-500" />
                  {item.material}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-purple-300 font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Do's
                  </h4>
                  <ul className="space-y-1">
                    {item.tips.map((tip, i) => (
                      <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                        <span className="text-green-500">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-red-300 font-semibold mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Don'ts
                  </h4>
                  <ul className="space-y-1">
                    {item.donts.map((dont, i) => (
                      <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                        <span className="text-red-500">•</span>
                        {dont}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cleaning Methods */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Cleaning Methods</h2>
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="mild-soap" className="bg-white/5 border-purple-500/20 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-purple-300 text-left">
                Mild Soap & Water Method
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 pt-4">
                <div className="space-y-3">
                  <p>Perfect for everyday cleaning of most jewelry types.</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Mix a few drops of mild dish soap with warm water</li>
                    <li>Soak jewelry for 10-15 minutes</li>
                    <li>Gently scrub with a soft toothbrush</li>
                    <li>Rinse thoroughly with clean water</li>
                    <li>Dry with a soft, lint-free cloth</li>
                  </ol>
                  <p className="text-yellow-300 text-sm">⚠️ Not suitable for pearls or soft gemstones</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ammonia" className="bg-white/5 border-pink-500/20 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-pink-300 text-left">
                Ammonia Solution (For Diamonds & Gold)
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 pt-4">
                <div className="space-y-3">
                  <p>Effective for diamonds and gold jewelry to restore shine.</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Mix equal parts ammonia and water</li>
                    <li>Soak jewelry for 30 minutes</li>
                    <li>Scrub gently with a soft brush</li>
                    <li>Rinse thoroughly with clean water</li>
                    <li>Dry with a soft cloth</li>
                  </ol>
                  <p className="text-yellow-300 text-sm">⚠️ Do not use on pearls, opals, or other soft stones</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="baking-soda" className="bg-white/5 border-purple-500/20 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-purple-300 text-left">
                Baking Soda Paste (For Silver)
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 pt-4">
                <div className="space-y-3">
                  <p>Great for removing tarnish from silver jewelry.</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Mix baking soda with water to form a paste</li>
                    <li>Apply paste to tarnished areas</li>
                    <li>Gently rub with a soft cloth or sponge</li>
                    <li>Rinse thoroughly with warm water</li>
                    <li>Polish with a silver cloth</li>
                  </ol>
                  <p className="text-yellow-300 text-sm">⚠️ Test on a small area first, avoid on gemstones</p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="jewelry-cloth" className="bg-white/5 border-pink-500/20 rounded-lg px-6">
              <AccordionTrigger className="text-white hover:text-pink-300 text-left">
                Polishing Cloth Method
              </AccordionTrigger>
              <AccordionContent className="text-gray-300 pt-4">
                <div className="space-y-3">
                  <p>Quick and easy maintenance for daily shine.</p>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Use a specialized jewelry polishing cloth</li>
                    <li>Gently rub the jewelry in circular motions</li>
                    <li>Pay attention to intricate details</li>
                    <li>Buff to a shine</li>
                  </ol>
                  <p className="text-green-300 text-sm">✓ Safe for most jewelry types</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Common Issues & Solutions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {troubleshooting.map((item, index) => (
            <Card key={index} className="bg-white/5 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-purple-500" />
                  {item.issue}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{item.solution}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Professional Care */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Professional Care Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {professionalCare.map((service, index) => (
            <Card key={index} className="bg-white/5 border-pink-500/20 text-center">
              <CardContent className="p-6">
                <Sparkles className="w-8 h-8 text-pink-500 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">{service.service}</h3>
                <p className="text-purple-300 text-sm mb-3">{service.frequency}</p>
                <p className="text-gray-400 text-sm">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Storage Tips */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-black/20 to-[#1a1a1a]/20 border-[#333]/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Storage Best Practices</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-purple-300 font-semibold mb-3">Individual Storage</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Store each piece separately</li>
                  <li>• Use soft pouches or compartments</li>
                  <li>• Keep chains unclasped to prevent tangling</li>
                </ul>
              </div>
              <div>
                <h4 className="text-pink-300 font-semibold mb-3">Environment</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Store in a cool, dry place</li>
                  <li>• Avoid humid areas like bathrooms</li>
                  <li>• Use silica gel packets for moisture control</li>
                </ul>
              </div>
              <div>
                <h4 className="text-purple-300 font-semibold mb-3">Organization</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>• Organize by type and material</li>
                  <li>• Keep frequently worn pieces accessible</li>
                  <li>• Use jewelry boxes with soft lining</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareGuide;