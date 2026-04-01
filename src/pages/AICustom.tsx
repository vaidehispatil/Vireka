import { useState, useRef } from 'react';
import { Sparkles, Upload, Wand2, RefreshCw, Download, Share2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const AICustom = () => {
  const { user } = useAuth();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDesign, setGeneratedDesign] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('traditional');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const styles = [
    { id: 'traditional', name: 'Traditional', icon: '👑' },
    { id: 'modern', name: 'Modern', icon: '💎' },
    { id: 'vintage', name: 'Vintage', icon: '🕰️' },
    { id: 'minimalist', name: 'Minimalist', icon: '✨' },
    { id: 'bridal', name: 'Bridal', icon: '👰' },
    { id: 'statement', name: 'Statement', icon: '💫' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setGeneratedDesign(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt && !uploadedImage) {
      setError('Please provide either an image or description');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      // Build the prompt with style and description
      const fullPrompt = prompt || 'Create a beautiful jewelry piece inspired by the uploaded reference image.';

      // Call Supabase Edge Function
      const response = await fetch(
        'https://dxcgnphgnzqpgghiucdg.supabase.co/functions/v1/generate-image',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer sb_publishable_Sk2nvsmXOK7CdOQGN6LIVg_1xaQgpmA`
          },
          body: JSON.stringify({
            prompt: fullPrompt,
            style: selectedStyle
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.image_url) {
        setGeneratedDesign(data.image_url);

        // Save to Supabase if user is logged in
        if (user?.id) {
          try {
            await supabase.from('ai_custom_hampers').insert([
              {
                user_id: user.id,
                preferences: {
                  style: selectedStyle,
                  uploadedImage: uploadedImage ? 'yes' : 'no'
                },
                budget: 0,
                items: {
                  design_url: data.image_url,
                  prompt: fullPrompt
                },
                status: 'completed'
              }
            ]);
          } catch (supabaseError) {
            console.error('Error saving to Supabase:', supabaseError);
          }
        }
      } else {
        throw new Error(data.error || 'Failed to generate design');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate design. Please try again.';
      setError(errorMessage);
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      {/* Hero */}
      <div className="section-padding mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-sm uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4" />
            AI-Powered Design
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Playfair_Display']">
            Design Your <span className="gold-gradient">Dream Jewelry</span>
          </h1>
          <p className="text-white/60 text-lg">
            Use our AI technology to create custom jewelry designs. Upload a reference image or describe your vision, and let our AI bring it to life.
          </p>
        </div>
      </div>

      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Upload */}
            <div className="luxury-card p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-[#D4AF37]" />
                Upload Reference Image
              </h3>
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  uploadedImage
                    ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                    : 'border-[#2a2a2a] hover:border-[#D4AF37]/50'
                }`}
              >
                {uploadedImage ? (
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="max-h-48 mx-auto rounded-lg"
                  />
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60 mb-2">Click to upload an image</p>
                    <p className="text-white/40 text-sm">JPG, PNG up to 10MB</p>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Style Selection */}
            <div className="luxury-card p-6">
              <h3 className="text-white font-semibold mb-4">Select Style</h3>
              <div className="grid grid-cols-3 gap-3">
                {styles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-4 rounded-lg border transition-all ${
                      selectedStyle === style.id
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                        : 'border-[#2a2a2a] hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{style.icon}</span>
                    <span className="text-white text-sm">{style.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt */}
            <div className="luxury-card p-6">
              <h3 className="text-white font-semibold mb-4">Describe Your Vision</h3>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., A delicate emerald necklace with diamond accents in a floral pattern..."
                rows={4}
                className="w-full px-4 py-3 bg-[#050505] border border-[#2a2a2a] rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#D4AF37] resize-none"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || (!uploadedImage && !prompt)}
              className="w-full py-4 gold-button text-black font-semibold text-lg disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Design...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-2" />
                  Generate Design
                </>
              )}
            </Button>
          </div>

          {/* Output Section */}
          <div className="luxury-card p-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              Generated Design
            </h3>
            
            <div className="aspect-square bg-[#050505] rounded-lg flex items-center justify-center border border-[#2a2a2a]">
              {isGenerating ? (
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-[#D4AF37]/20 border-t-[#D4AF37] animate-spin" />
                  <p className="text-white/60">Creating your design...</p>
                  <p className="text-white/40 text-sm mt-2">This may take a few moments</p>
                </div>
              ) : generatedDesign ? (
                <div className="relative w-full h-full">
                  <img
                    src={generatedDesign}
                    alt="Generated Design"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Sparkles className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/40">Your AI-generated design will appear here</p>
                </div>
              )}
            </div>

            {generatedDesign && (
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-[#050505] rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Design Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-white/50">Style:</span>
                      <span className="text-white ml-2 capitalize">{selectedStyle}</span>
                    </div>
                    <div>
                      <span className="text-white/50">Estimated Price:</span>
                      <span className="text-[#D4AF37] ml-2">₹2,50,000 - ₹5,00,000</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1 gold-button text-black font-semibold">
                    Request Quote
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleGenerate}
                    className="border-[#2a2a2a] text-white hover:border-[#D4AF37]"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white font-['Playfair_Display']">
              How It <span className="gold-gradient">Works</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Upload or Describe', desc: 'Share your vision through image or text' },
              { step: '2', title: 'Select Style', desc: 'Choose from our curated design styles' },
              { step: '3', title: 'AI Generation', desc: 'Our AI creates your unique design' },
              { step: '4', title: 'Get Quote', desc: 'Receive pricing and production details' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#D4AF37]">{item.step}</span>
                </div>
                <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-16 p-6 bg-[#050505] rounded-lg border border-[#1a1a1a]">
          <p className="text-white/40 text-sm text-center">
            AI-generated designs are for visualization purposes. Final product may vary. 
            Our craftsmen will work with you to refine the design before production.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AICustom;
