import React from 'react';
import { motion } from 'framer-motion';
import '../styles/LoadingScreen.css';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <motion.div
        className="loading-circle"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 180, 360],
          borderRadius: ["50%", "20%", "50%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <p>Loading...</p>
    </div>
  );
}

export default LoadingScreen;
