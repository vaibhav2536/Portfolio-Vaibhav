import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const AmbientSoundToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio context for ambient sound
    const createAmbientSound = () => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();

        // Create a subtle ambient drone
        oscillator1.frequency.setValueAtTime(60, audioContext.currentTime);
        oscillator2.frequency.setValueAtTime(90, audioContext.currentTime);
        
        oscillator1.type = 'sine';
        oscillator2.type = 'triangle';
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);

        oscillator1.connect(filter);
        oscillator2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);

        return { audioContext, oscillator1, oscillator2, gainNode };
      } catch (error) {
        console.log('Web Audio API not supported');
        return null;
      }
    };

    let ambientSound: any = null;

    if (isPlaying && !ambientSound) {
      ambientSound = createAmbientSound();
      if (ambientSound) {
        ambientSound.oscillator1.start();
        ambientSound.oscillator2.start();
      }
    }

    return () => {
      if (ambientSound) {
        try {
          ambientSound.oscillator1.stop();
          ambientSound.oscillator2.stop();
          ambientSound.audioContext.close();
        } catch (error) {
          // Ignore cleanup errors
        }
      }
    };
  }, [isPlaying]);

  const toggleSound = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
    >
      <motion.button
        onClick={toggleSound}
        className="w-12 h-12 bg-black/20 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/30 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </motion.div>
      </motion.button>
      
      {/* Sound waves animation */}
      {isPlaying && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border border-white/20 rounded-full"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ 
                scale: [1, 2, 3], 
                opacity: [0.6, 0.3, 0] 
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AmbientSoundToggle;