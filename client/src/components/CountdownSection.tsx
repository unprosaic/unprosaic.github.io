import React from 'react';
import { motion } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { useConfig } from '@/context/ConfigContext';
import { formatDate } from '@/lib/utils';

interface CountdownSectionProps {
  onComplete: () => void;
}

const CountdownSection: React.FC<CountdownSectionProps> = ({ onComplete }) => {
  const { config } = useConfig();
  const timeLeft = useCountdown(config.birthdayDate);
  
  // Call onComplete when countdown reaches zero
  React.useEffect(() => {
    if (timeLeft.isComplete) {
      onComplete();
    }
  }, [timeLeft.isComplete, onComplete]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section className="mb-16 text-center">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-pacifico text-4xl md:text-5xl lg:text-6xl mb-2" style={{ color: 'var(--primary)' }}>
          {config.recipientName}
        </h2>
        <p className="font-quicksand text-lg text-gray-600">Counting down to your special day!</p>
      </motion.div>
      
      <motion.div 
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6">
          {timeUnits.map((unit, index) => (
            <motion.div 
              key={unit.label}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
            >
              <div 
                className="w-full aspect-square rounded-lg flex items-center justify-center font-quicksand text-2xl md:text-4xl font-bold mb-2"
                style={{ backgroundColor: 'var(--accent2)', color: 'var(--primary)' }}
              >
                {String(unit.value).padStart(2, '0')}
              </div>
              <span className="text-xs md:text-sm text-gray-600 font-medium">{unit.label}</span>
            </motion.div>
          ))}
        </div>
        
        <p className="text-gray-600 font-quicksand">
          <i className="fas fa-calendar-alt mr-2" style={{ color: 'var(--primary)' }}></i>
          <span>{formatDate(config.birthdayDate)}</span>
        </p>
      </motion.div>
    </section>
  );
};

export default CountdownSection;
