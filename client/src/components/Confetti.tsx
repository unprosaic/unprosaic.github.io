import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { randomBetween, randomInt } from '@/lib/utils';
import { useConfig } from '@/context/ConfigContext';
import { getThemeById } from './themes';

interface ConfettiProps {
  count?: number;
  duration?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ count = 100, duration = 3000 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { config } = useConfig();
  const theme = getThemeById(config.theme);
  
  // Get colors from the current theme
  const colors = [
    theme.colors.primary,
    theme.colors.secondary,
    theme.colors.accent,
    theme.colors.accent2,
    '#FFFFFF'
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    
    // Create and animate confetti pieces
    const fragments = Array.from({ length: count }).map((_, i) => {
      const element = document.createElement('div');
      const color = colors[randomInt(0, colors.length - 1)];
      
      // Create a confetti piece with random shape
      element.className = 'absolute rounded-sm opacity-0 pointer-events-none';
      element.style.backgroundColor = color;
      element.style.width = `${randomInt(5, 12)}px`;
      element.style.height = `${randomInt(5, 12)}px`;
      element.style.willChange = 'transform, opacity';
      element.style.zIndex = '20';
      
      container.appendChild(element);
      
      // Random initial position
      const startX = randomInt(0, containerWidth);
      const startY = containerHeight;
      
      // Random end position
      const endX = startX + randomBetween(-containerWidth / 2, containerWidth / 2);
      const endY = randomBetween(-containerHeight / 2, 0);
      
      // Random rotation
      const rotation = randomBetween(0, 360);
      const endRotation = rotation + randomBetween(0, 720);
      
      // Random delay for staggered animation
      const delay = randomBetween(0, 300);
      
      // Animate
      element.style.left = `${startX}px`;
      element.style.top = `${startY}px`;
      element.style.transform = `rotate(${rotation}deg)`;
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = `translate(${endX - startX}px, ${endY - startY}px) rotate(${endRotation}deg)`;
        element.style.transition = `all ${duration}ms cubic-bezier(0.1, 0.2, 0.3, 1)`;
      }, delay);
      
      // Remove after animation
      setTimeout(() => {
        element.remove();
      }, duration + delay + 100);
      
      return element;
    });
    
    // Cleanup
    return () => {
      fragments.forEach(el => {
        if (el.parentNode === container) {
          container.removeChild(el);
        }
      });
    };
  }, [count, duration, colors]);
  
  return <div ref={containerRef} className="absolute inset-0 overflow-visible pointer-events-none"></div>;
};

export default Confetti;
