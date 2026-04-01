import { useEffect, useState } from 'react';
import { Crown } from 'lucide-react';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 800);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center transition-all duration-800 ${
        isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* 3D Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#D4AF37]/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
        
        {/* Rotating rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 border border-[#D4AF37]/20 rounded-full animate-spin-slow" />
          <div className="absolute w-80 h-80 border border-[#D4AF37]/30 rounded-full animate-spin-reverse" />
          <div className="absolute w-64 h-64 border border-[#D4AF37]/40 rounded-full animate-spin-slower" />
        </div>
        
        {/* Glowing center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* 3D Crown Animation */}
        <div className="relative mb-8">
          <div className="animate-3d-float">
            <Crown className="w-24 h-24 text-[#D4AF37] drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]" />
          </div>
          
          {/* Sparkle effects */}
          <div className="absolute -top-4 -right-4 w-4 h-4 bg-[#D4AF37] rounded-full animate-sparkle" />
          <div className="absolute -bottom-2 -left-6 w-3 h-3 bg-[#D4AF37] rounded-full animate-sparkle-delayed" />
          <div className="absolute top-1/2 -right-8 w-2 h-2 bg-[#D4AF37] rounded-full animate-sparkle" />
        </div>

        {/* Brand Name */}
        <h1 className="text-5xl md:text-6xl font-bold font-['Playfair_Display'] mb-2">
          <span className="gold-gradient animate-shimmer">VIREKA</span>
        </h1>
        <p className="text-[#D4AF37]/70 text-sm uppercase tracking-[0.3em] mb-12">
          Imitation Jewelry
        </p>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-[#1a1a1a] rounded-full overflow-hidden mb-4">
          <div 
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F4E4BC] rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Progress Text */}
        <p className="text-white/50 text-sm">
          Loading {progress}%
        </p>

        {/* Loading Messages */}
        <div className="mt-8 h-6">
          {progress < 30 && (
            <p className="text-white/40 text-sm animate-fade-in">Preparing collection...</p>
          )}
          {progress >= 30 && progress < 60 && (
            <p className="text-white/40 text-sm animate-fade-in">Loading jewelry pieces...</p>
          )}
          {progress >= 60 && progress < 90 && (
            <p className="text-white/40 text-sm animate-fade-in">Almost ready...</p>
          )}
          {progress >= 90 && (
            <p className="text-[#D4AF37] text-sm animate-fade-in">Welcome to Vireka!</p>
          )}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes spin-slower {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float-3d {
          0%, 100% { transform: translateY(0) rotateX(0) rotateY(0); }
          25% { transform: translateY(-10px) rotateX(5deg) rotateY(5deg); }
          50% { transform: translateY(0) rotateX(0) rotateY(0); }
          75% { transform: translateY(-10px) rotateX(-5deg) rotateY(-5deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
        
        .animate-spin-slower {
          animation: spin-slower 25s linear infinite;
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .animate-sparkle-delayed {
          animation: sparkle 2s ease-in-out infinite;
          animation-delay: 1s;
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, #D4AF37 0%, #F4E4BC 50%, #D4AF37 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-3d-float {
          animation: float-3d 4s ease-in-out infinite;
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
