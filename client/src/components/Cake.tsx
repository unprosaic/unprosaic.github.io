import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConfig } from '@/context/ConfigContext';
import { getThemeById } from './themes';
import Confetti from './Confetti';

interface CandleProps {
  position: string;
  height: string;
  color?: string;
  isBlown: boolean;
}

// Simplified Candle component without interaction
const Candle: React.FC<CandleProps> = ({ position, height, color, isBlown }) => {
  return (
    <div className={`absolute ${position} candle z-30`}>
      {/* The candle stick */}
      <div className={`w-2 ${height} ${color || 'bg-secondary'} rounded-sm mx-auto`}></div>
      
      {/* The flame or smoke */}
      {!isBlown ? (
        <motion.div 
          className="candle-flame w-6 h-8 bg-yellow-400 rounded-full mx-auto -mt-5"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
          style={{ filter: 'drop-shadow(0 0 5px rgba(255, 169, 50, 0.7))' }}
        />
      ) : (
        <motion.div 
          className="w-2 h-4 bg-gray-200/50 rounded-full mx-auto -mt-1"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, y: -10 }}
          transition={{ duration: 2 }}
        />
      )}
    </div>
  );
};

interface CakeProps {
  onAllCandlesBlown: () => void;
}

const Cake: React.FC<CakeProps> = ({ onAllCandlesBlown }) => {
  const { config } = useConfig();
  const theme = getThemeById(config.theme);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showWishMessage, setShowWishMessage] = useState(false);

  useEffect(() => {
    if (candlesBlown) {
      onAllCandlesBlown();
    }
  }, [candlesBlown, onAllCandlesBlown]);

  const candles = [
    { position: "-top-14 left-[25%]", height: "h-16", color: `bg-${theme.id === 'default' ? 'secondary' : theme.id === 'lavender' ? 'purple-300' : theme.id === 'mint' ? 'green-300' : theme.id === 'peach' ? 'orange-200' : theme.id === 'blueberry' ? 'blue-300' : 'pink-300'}` },
    { position: "-top-12 left-[75%]", height: "h-14", color: `bg-${theme.id === 'default' ? 'accent' : theme.id === 'lavender' ? 'purple-200' : theme.id === 'mint' ? 'blue-200' : theme.id === 'peach' ? 'yellow-200' : theme.id === 'blueberry' ? 'indigo-200' : 'yellow-200'}` }
  ];

  const handleMakeWish = () => {
    setCandlesBlown(true);
    setShowConfetti(true);
    setShowWishMessage(true);
    onAllCandlesBlown();
  };

  // Clear confetti after a few seconds
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="cake-container max-w-md mx-auto relative overflow-visible">
      {showConfetti && (
        <div className="absolute inset-0" style={{ zIndex: 50 }}>
          <Confetti count={120} duration={9} />
        </div>
      )}
      
      <AnimatePresence>
        {showWishMessage && (
          <motion.div 
            className="mb-6 relative z-20 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/90 px-5 py-3 rounded-full shadow-lg text-center max-w-xs mx-auto">
              <span 
                className="font-pacifico text-xl"
                style={{ color: theme.colors.primary }}
              >
                Your wish is coming true! ✨
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div 
        className="cake bg-white rounded-xl shadow-lg p-6 text-center relative"
        whileHover={{ 
          rotateY: 5,
          rotateX: -5,
          transition: { duration: 0.5 }
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Original cake base with decorative elements */}
        <div className="relative z-10">
          <div className="w-48 h-16 bg-accent mx-auto rounded-t-full"></div>
          <div 
            className="w-64 h-32 mx-auto rounded-t-3xl relative -mt-4"
            style={{ backgroundColor: theme.colors.primary }}
          >
            {/* Decorative swirl on cake */}
            <div className="absolute w-full top-12">
              <svg viewBox="0 0 100 10" className="w-full">
                <path 
                  d="M0,5 Q15,10 30,5 T60,5 T90,5 T100,5" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="2"
                  strokeOpacity="0.7"
                />
              </svg>
            </div>
            
            {/* Candles */}
            {candles.map((candle, index) => (
              <Candle 
                key={index}
                position={candle.position}
                height={candle.height}
                color={candle.color}
                isBlown={candlesBlown}
              />
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Make a Wish button instead of tap instructions */}
      {!candlesBlown ? (
        <motion.div className="text-center mt-6">
          <button
            className="px-6 py-3 rounded-full font-pacifico text-white shadow-lg"
            style={{ 
              background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})` 
            }}
            onClick={handleMakeWish}
          >
            Make a wish!
          </button>
        </motion.div>
      ) : (
        <motion.div 
          className="text-center mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p 
            className="font-pacifico text-2xl mb-2"
            style={{ color: theme.colors.primary }}
          >
            Happy Birthday!
          </p>
          <p className="font-quicksand text-gray-600">May all your dreams come true ✨</p>
        </motion.div>
      )}
    </div>
  );
};

export default Cake;
