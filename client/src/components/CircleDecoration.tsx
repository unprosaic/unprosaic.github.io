import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CircleDecorationProps {
  className?: string;
  size?: string;
  color?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
}

const CircleDecoration: React.FC<CircleDecorationProps> = ({
  className,
  size = 'w-64 h-64',
  color = 'bg-primary/30',
  top,
  left,
  right,
  bottom,
  delay = 0
}) => {
  const position = {
    top,
    left,
    right, 
    bottom
  };

  return (
    <motion.div
      className={cn(
        "circle-decoration absolute rounded-full z-[-1]",
        size,
        color,
        className
      )}
      style={position}
      animate={{ 
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.7, 0.5]
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: Infinity,
        delay
      }}
    />
  );
};

export default CircleDecoration;
