
import React from 'react';
import { motion } from 'framer-motion';
import CatIcon from './CatIcon';

const FloatingDecorations: React.FC = () => {
  const decorations = [
    {
      element: <CatIcon size={40} color="var(--primary)" />,
      position: "right-5 top-40",
      delay: 0.5
    },
    {
      element: <CatIcon size={35} color="var(--accent)" />,
      position: "left-20 top-32",
      delay: 0.8
    },
    {
      element: <i className="fas fa-birthday-cake text-3xl" style={{ color: 'var(--accent)', opacity: 0.7 }}></i>,
      position: "left-10 top-60",
      delay: 0
    },
    {
      element: <CatIcon size={30} color="var(--secondary)" />,
      position: "right-32 top-20",
      delay: 1.2
    },
    {
      element: <i className="fas fa-birthday-cake text-3xl" style={{ color: 'var(--secondary)', opacity: 0.7 }}></i>,
      position: "right-10 bottom-20",
      delay: 1
    },
    {
      element: <CatIcon size={38} color="var(--accent2)" />,
      position: "left-16 bottom-24",
      delay: 1.7
    },
    {
      element: <i className="fas fa-heart text-3xl" style={{ color: 'var(--primary)', opacity: 0.7 }}></i>,
      position: "left-5 bottom-40",
      delay: 1.5
    },
    {
      element: <CatIcon size={32} color="var(--primary)" />,
      position: "right-24 bottom-32",
      delay: 0.3
    },
    {
      element: <i className="fas fa-birthday-cake text-3xl" style={{ color: 'var(--primary)', opacity: 0.7 }}></i>,
      position: "right-16 top-72",
      delay: 0.7
    },
    {
      element: <CatIcon size={36} color="var(--secondary)" />,
      position: "left-28 top-16",
      delay: 1.3
    }
  ];

  return (
    <>
      {decorations.map((decoration, index) => (
        <motion.div
          key={index}
          className={`fixed ${decoration.position} balloon`}
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 3,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
            delay: decoration.delay
          }}
        >
          {decoration.element}
        </motion.div>
      ))}
    </>
  );
};

export default FloatingDecorations;
