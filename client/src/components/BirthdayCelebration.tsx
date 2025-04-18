import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useConfig } from '@/context/ConfigContext';
import Confetti from './Confetti';
import Cake from './Cake';

const BirthdayCelebration: React.FC = () => {
  const { config } = useConfig();
  const [allCandlesBlown, setAllCandlesBlown] = useState(false);
  
  const handleAllCandlesBlown = () => {
    setAllCandlesBlown(true);
  };

  return (
    <motion.section 
      className="mb-16 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Initial celebration confetti - show when candles are blown */}
      {allCandlesBlown && (
        <div className="absolute inset-0" style={{ zIndex: 100 }}>
          <Confetti count={150} duration={9} />
        </div>
      )}
      
      <motion.div 
        className="text-center mb-8"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 
          className="font-pacifico text-5xl mb-4"
          style={{ color: 'var(--primary)' }}
        >
          {config.recipientName}
        </h2>
        <motion.div 
          className="inline-block"
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 1.5,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
        >
          <span 
            className="font-pacifico text-3xl"
            style={{ color: 'var(--primary)' }}
          >
            Happy {config.age}nd Birthday!
          </span>
        </motion.div>
        <p 
          className="font-quicksand text-lg text-gray-600 mt-4 max-w-lg mx-auto"
        >
          {config.birthdayMessage}
        </p>
      </motion.div>
      
      {/* Cake Display with make a wish button */}
      <Cake onAllCandlesBlown={handleAllCandlesBlown} />
    </motion.section>
  );
};

export default BirthdayCelebration;
