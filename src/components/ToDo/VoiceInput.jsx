import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Loader2 } from 'lucide-react';

export default function VoiceInput({ onVoiceInput, className }) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    let recognition = null;

    const initializeSpeechRecognition = () => {
      if (!('webkitSpeechRecognition' in window)) {
        setError('Voice input is not supported in this browser');
        return null;
      }

      const instance = new window.webkitSpeechRecognition();
      instance.continuous = false;
      instance.interimResults = true;

      instance.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      instance.onerror = (event) => {
        setError(event.error === 'not-allowed' 
          ? 'Microphone access denied' 
          : 'Error occurred while listening');
        setIsListening(false);
      };

      instance.onend = () => {
        setIsListening(false);
      };

      instance.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        setTranscript(currentTranscript);
        
        if (event.results[0].isFinal) {
          onVoiceInput(currentTranscript);
          setTimeout(() => setTranscript(''), 1000);
        }
      };

      return instance;
    };

    const startListening = () => {
      if (!recognition) {
        recognition = initializeSpeechRecognition();
      }
      
      if (recognition) {
        try {
          recognition.start();
        } catch (err) {
          setError('Failed to start voice input');
        }
      }
    };

    const stopListening = () => {
      if (recognition) {
        recognition.stop();
      }
    };

    if (isListening) {
      startListening();
    } else {
      stopListening();
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [isListening, onVoiceInput]);

  const toggleListening = () => {
    setIsListening(!isListening);
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        onClick={toggleListening}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          w-full bg-rose-100 dark:bg-rose-900 
          p-6 rounded-xl shadow-lg
          flex items-center justify-center gap-3
          ${error ? 'bg-red-100 dark:bg-red-900' : ''}
          ${isListening ? 'ring-2 ring-rose-500 dark:ring-rose-400' : ''}
          focus:outline-none focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400
          transition-all duration-200
        `}
        disabled={!!error}
        aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
        title={error || 'Click to start voice input'}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isListening ? 'listening' : 'idle'}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="relative"
          >
            {isListening ? (
              <div className="relative">
                <Mic className="w-6 h-6 text-rose-600 dark:text-rose-300" />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-rose-500 dark:border-rose-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            ) : error ? (
              <MicOff className="w-6 h-6 text-red-600 dark:text-red-400" />
            ) : (
              <Mic className="w-6 h-6 text-rose-600 dark:text-rose-300" />
            )}
          </motion.div>
        </AnimatePresence>
        
        <span className={`font-medium ${
          error 
            ? 'text-red-600 dark:text-red-400' 
            : 'text-rose-600 dark:text-rose-300'
        }`}>
          {error ? error : isListening ? 'Listening...' : 'Voice Input'}
        </span>

        {isListening && (
          <Loader2 className="w-5 h-5 text-rose-600 dark:text-rose-300 animate-spin" />
        )}
      </motion.button>

      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {transcript}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}