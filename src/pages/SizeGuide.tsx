import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Ruler, Circle, CircleDot } from 'lucide-react';

const SizeGuide = () => {
  const [ringSize, setRingSize] = useState('');
  const [diameter, setDiameter] = useState('');

  const calculateRingSize = () => {
    if (diameter) {
      const dia = parseFloat(diameter);
      // Simple formula to estimate ring size from diameter
      const size = Math.round(dia * 3.14);
      setRingSize(size.toString());
    }
  };

  const ringSizes = [
    { india: '5', us: '4.5', uk: 'I 1/2', diameter: '14.9' },
    { india: '6', us: '5.5', uk: 'L', diameter: '15.7' },
    { india: '7', us: '6.5', uk: 'N', diameter: '16.5' },
    { india: '8', us: '7.5', uk: 'P', diameter: '17.3' },
    { india: '9', us: '8.5', uk: 'R', diameter: '18.1' },
    { india: '10', us: '9.5', uk: 'T', diameter: '18.9' },
    { india: '11', us: '10.5', uk: 'V', diameter: '19.8' },
    { india: '12', us: '11.5', uk: 'X', diameter: '20.6' },
    { india: '13', us: '12.5', uk: 'Z', diameter: '21.4' },
    { india: '14', us: '13.5', uk: 'Z+4', diameter: '22.2' },
  ];

  const bangleSizes = [
    { size: '2.2', diameter: '56', circumference: '176' },
    { size: '2.4', diameter: '60.8', circumference: '191' },
    { size: '2.6', diameter: '66', circumference: '207' },
    { size: '2.8', diameter: '71', circumference: '223' },
    { size: '2.10', diameter: '73.6', circumference: '231' },
  ];

  const necklaceLengths = [
    { name: 'Choker', length: '14-16"', description: 'Sits tightly around the neck, perfect for layering' },
    { name: 'Princess', length: '17-19"', description: 'Most popular length, sits just below the collarbone' },
    { name: 'Matinee', length: '20-24"', description: 'Elegant length that sits at the center of the chest' },
    { name: 'Opera', length: '28-36"', description: 'Dramatic length that can be doubled or worn long' },
    { name: 'Rope', length: '40+"', description: 'Very long, can be wrapped multiple times' },
  ];

  const braceletSizes = [
    { size: 'S', wrist: '5.5-6"', braceletLength: '6.5-7"' },
    { size: 'M', wrist: '6-6.5"', braceletLength: '7-7.5"' },
    { size: 'L', wrist: '6.5-7"', braceletLength: '7.5-8"' },
    { size: 'XL', wrist: '7-7.5"', braceletLength: '8-8.5"' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-[#1a1a1a]/30" />
        <div className="relative z-10 text-center px-4">
          <Ruler className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">Size Guide</h1>
          <p className="text-xl md:text-2xl text-gray-300">Find your perfect fit</p>
        </div>
      </div>

      {/* Size Calculator */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-white/5 border-purple-500/20 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl">Ring Size Calculator</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="diameter" className="text-white">Enter Ring Diameter (mm) *</Label>
              <Input
                id="diameter"
                type="number"
                step="0.1"
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
                placeholder="e.g., 17.3"
                className="bg-white/5 border-purple-500/20 text-white"
              />
            </div>
            <Button
              onClick={calculateRingSize}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Calculate Ring Size
            </Button>
            {ringSize && (
              <div className="text-center p-4 bg-black/10 rounded-lg">
                <p className="text-gray-400 mb-2">Your estimated ring size:</p>
                <p className="text-4xl font-bold text-purple-300">{ringSize} (India)</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Size Charts */}
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="rings" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/5">
            <TabsTrigger value="rings" className="data-[state=active]:bg-purple-600">
              <CircleDot className="w-4 h-4 mr-2" />
              Rings
            </TabsTrigger>
            <TabsTrigger value="bangles" className="data-[state=active]:bg-purple-600">
              <Circle className="w-4 h-4 mr-2" />
              Bangles
            </TabsTrigger>
            <TabsTrigger value="necklaces" className="data-[state=active]:bg-purple-600">
              <CircleDot className="w-4 h-4 mr-2" />
              Necklaces
            </TabsTrigger>
            <TabsTrigger value="bracelets" className="data-[state=active]:bg-purple-600">
              <CircleDot className="w-4 h-4 mr-2" />
              Bracelets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rings" className="mt-8">
            <Card className="bg-white/5 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Ring Size Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-500/20">
                        <th className="p-4 text-left text-purple-300">India</th>
                        <th className="p-4 text-left text-purple-300">US</th>
                        <th className="p-4 text-left text-purple-300">UK</th>
                        <th className="p-4 text-left text-purple-300">Diameter (mm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ringSizes.map((size, index) => (
                        <tr key={index} className="border-b border-purple-500/10 hover:bg-purple-500/5">
                          <td className="p-4 text-white font-medium">{size.india}</td>
                          <td className="p-4 text-gray-300">{size.us}</td>
                          <td className="p-4 text-gray-300">{size.uk}</td>
                          <td className="p-4 text-gray-300">{size.diameter}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bangles" className="mt-8">
            <Card className="bg-white/5 border-pink-500/20">
              <CardHeader>
                <CardTitle className="text-white">Bangle Size Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-pink-500/20">
                        <th className="p-4 text-left text-pink-300">Size (inches)</th>
                        <th className="p-4 text-left text-pink-300">Diameter (mm)</th>
                        <th className="p-4 text-left text-pink-300">Circumference (mm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bangleSizes.map((size, index) => (
                        <tr key={index} className="border-b border-pink-500/10 hover:bg-pink-500/5">
                          <td className="p-4 text-white font-medium">{size.size}</td>
                          <td className="p-4 text-gray-300">{size.diameter}</td>
                          <td className="p-4 text-gray-300">{size.circumference}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="necklaces" className="mt-8">
            <Card className="bg-white/5 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white">Necklace Length Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {necklaceLengths.map((item, index) => (
                    <div key={index} className="p-4 bg-black/10 rounded-lg border border-[#333]/20">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-semibold">{item.name}</h4>
                        <span className="text-purple-300 font-medium">{item.length}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bracelets" className="mt-8">
            <Card className="bg-white/5 border-pink-500/20">
              <CardHeader>
                <CardTitle className="text-white">Bracelet Size Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-pink-500/20">
                        <th className="p-4 text-left text-pink-300">Size</th>
                        <th className="p-4 text-left text-pink-300">Wrist Size</th>
                        <th className="p-4 text-left text-pink-300">Bracelet Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      {braceletSizes.map((size, index) => (
                        <tr key={index} className="border-b border-pink-500/10 hover:bg-pink-500/5">
                          <td className="p-4 text-white font-medium">{size.size}</td>
                          <td className="p-4 text-gray-300">{size.wrist}</td>
                          <td className="p-4 text-gray-300">{size.braceletLength}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Measurement Tips */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">How to Measure</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white/5 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CircleDot className="w-5 h-5 text-purple-500" />
                Rings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>• Use a piece of string or paper strip</li>
                <li>• Wrap it around the base of your finger</li>
                <li>• Mark where it overlaps</li>
                <li>• Measure the length in millimeters</li>
                <li>• Measure at the end of the day for best results</li>
                <li>• Consider wider bands need larger sizes</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-pink-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Circle className="w-5 h-5 text-pink-500" />
                Bangles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>• Close your fingers together</li>
                <li>• Measure the widest part of your hand</li>
                <li>• Use a flexible tape measure</li>
                <li>• Add 0.5 inch for comfortable fit</li>
                <li>• Consider knuckle size</li>
                <li>• Measure in the evening when hands are slightly larger</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CircleDot className="w-5 h-5 text-purple-500" />
                Bracelets & Necklaces
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>• Measure your wrist for bracelets</li>
                <li>• Add 0.5-1 inch for comfort</li>
                <li>• For necklaces, measure from neck to desired length</li>
                <li>• Consider your height and body type</li>
                <li>• Layering requires different lengths</li>
                <li>• Use a necklace to visualize the length</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tips */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-black/20 to-[#1a1a1a]/20 border-[#333]/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Tips for Accurate Sizing</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300">Measure multiple times for accuracy</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300">Measure in the evening when fingers are slightly larger</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300">Consider temperature - cold makes fingers smaller</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300">Measure the finger you plan to wear the ring on</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300">Wider bands require larger sizes</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300">When in doubt, size up rather than down</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SizeGuide;