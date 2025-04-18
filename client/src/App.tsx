import React, { useState, useEffect } from 'react';
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClient } from "./lib/queryClient";
import { useConfig, ConfigProvider } from './context/ConfigContext';

// Components
import CountdownSection from './components/CountdownSection';
import BirthdayCelebration from './components/BirthdayCelebration';
import PhotoGallery from './components/PhotoGallery';
import ConfigModal from './components/ConfigModal';
import FloatingDecorations from './components/FloatingDecorations';
import CircleDecoration from './components/CircleDecoration';
import MusicPlayer from './components/MusicPlayer';

function AppContent() {
  const { countdownEnded, setCountdownEnded, applyThemeStyles } = useConfig();
  const [configModalOpen, setConfigModalOpen] = useState(false);

  useEffect(() => {
    // Apply theme styles when component mounts
    applyThemeStyles();

    // Add font awesome script
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js';
    script.async = true;
    document.body.appendChild(script);

    // Add Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Pacifico&family=Poppins:wght@300;400;500;600&family=Quicksand:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Set page title
    document.title = "Birthday Countdown";

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, [applyThemeStyles]);

  const handleCountdownComplete = () => {
    setCountdownEnded(true);
  };

  return (
    <div className="relative overflow-hidden min-h-screen font-poppins" style={{ backgroundColor: 'var(--neutral)' }}>
      {/* Decorative elements */}
      <CircleDecoration color="bg-primary/30" top="-20px" left="-20px" size="w-64 h-64" />
      <CircleDecoration color="bg-accent/30" bottom="-32px" right="-32px" size="w-80 h-80" delay={1} />
      <CircleDecoration color="bg-secondary/20" top="50%" left="-40px" size="w-72 h-72" delay={2} />

      {/* Header */}
      <header className="container mx-auto px-4 pt-6 pb-2 relative z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-pacifico text-3xl" style={{ color: 'var(--primary)' }}>With love, from CV</h1>
          </div>
          <div className="flex items-center gap-4">
            <MusicPlayer audioSrc="/birthday-song.mp3" />
            <button 
              onClick={() => setConfigModalOpen(true)}
              className="bg-white rounded-full p-3 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2"
              style={{ color: 'var(--primary)', '--tw-ring-color': 'var(--primary)' } as React.CSSProperties}
            >
              <i className="fas fa-cog text-xl"></i>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 relative z-10">
        {!countdownEnded ? (
          <CountdownSection onComplete={handleCountdownComplete} />
        ) : (
          <BirthdayCelebration />
        )}

        <PhotoGallery />
      </main>

      <FloatingDecorations />
      <ConfigModal isOpen={configModalOpen} onClose={() => setConfigModalOpen(false)} />

      <Toaster />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ConfigProvider>
          <AppContent />
        </ConfigProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;