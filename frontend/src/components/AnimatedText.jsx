import React from 'react';
import { animate, motion } from 'framer-motion';

const quote = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const singelWord = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 1, // Adjust this value to set the delay (in seconds)
    },
  },
};

const AnimatedText = ({ text, className = '' }) => {
  return (
    <div className="w-full mx-auto flex item-center justify-center text-clip sm:py-0 ">
      <motion.h1
        className={` inline-block w-full text-dark font-bold capitalize text-8xl ${className} text-center`}
        variants={quote}
        initial="initial"
        animate="animate"
      >
        {text.split(' ').reverse().map((word, index) => (
          <motion.span
            key={'word' + '-' + index}
            className="inline-block"
            variants={singelWord}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

export default AnimatedText;
