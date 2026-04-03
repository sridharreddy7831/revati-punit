import React from 'react';
import { motion } from 'framer-motion';

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split("\n");

  // Use Intl.Segmenter to safely split Kannada graphemes without breaking compound letters
  const segmenter = new Intl.Segmenter('kn', { granularity: 'grapheme' });

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 }
    }
  };

  const child = {
    hidden: { opacity: 0, scale: 0.9, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      className="text-justify text-[#D4AF37] text-[15px] sm:text-lg md:text-xl italic leading-loose px-2 md:px-6 relative z-10 block space-y-4"
    >
      {lines.map((line, lineIndex) => {
        const chars = Array.from(segmenter.segment(line)).map(s => s.segment);
        return (
          <div key={lineIndex} className="block whitespace-pre-wrap">
            {chars.map((char, charIndex) => (
              <motion.span variants={child} key={charIndex} className="inline-block">
                {char}
              </motion.span>
            ))}
          </div>
        );
      })}
    </motion.div>
  );
};

const Story: React.FC = () => {
  return (
    <section id="story" className="py-12 px-4 text-center bg-transparent relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="glass-maroon p-10 md:p-16 rounded-[2rem] border-2 border-[#B76E79]/10 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl font-script text-[#B76E79] mb-12 relative z-10"
          >
            Our Journey
          </motion.h2>

          <div className="flex flex-row justify-center items-center gap-6 sm:gap-12 overflow-visible relative z-10 mb-12">
            {/* Bride First */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center group"
            >
              <div className="relative">
                <motion.img
                  initial={{ rotate: -10, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  src="/bride.jpg"
                  alt="Revati"
                  className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full border-4 border-[#D4AF37] p-1 object-cover mb-2 shadow-lg group-hover:-rotate-3 transition-transform"
                />
                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-[#B76E79] text-white text-[8px] sm:text-[10px] px-2 sm:px-4 py-0.5 sm:py-1 rounded-full font-bold border border-[#D4AF37] shadow-md">BRIDE</div>
              </div>
              <p className="font-traditional font-bold mt-3 text-sm sm:text-xl text-[#B76E79]">Revati</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent mb-2"></div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-3xl sm:text-5xl text-[#D4AF37] drop-shadow-md"
              >
                ❤️
              </motion.div>
              <div className="w-px h-12 bg-gradient-to-t from-transparent via-[#D4AF37] to-transparent mt-2"></div>
            </motion.div>

            {/* Groom Second */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center group"
            >
              <div className="relative">
                <motion.img
                  initial={{ rotate: 10, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  src="/groom.jpg"
                  alt="Punitkumar"
                  className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full border-4 border-[#D4AF37] p-1 object-cover mb-2 shadow-lg group-hover:rotate-3 transition-transform"
                />
                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-[#B76E79] text-white text-[8px] sm:text-[10px] px-2 sm:px-4 py-0.5 sm:py-1 rounded-full font-bold border border-[#D4AF37] shadow-md">GROOM</div>
              </div>
              <p className="font-traditional font-bold mt-3 text-sm sm:text-xl text-[#B76E79]">Punitkumar</p>
            </motion.div>
          </div>

          {/* Text Matter Next */}
          <TypewriterText text={"When two souls are meant to be together, life quietly brings them closer 🤍✨. From a simple first encounter to the promise of forever 💞💍, this beautiful journey has grown with love ❤️, shared dreams 🌸🌿, and endless blessings 🙏✨, leading to a lifetime of happiness together 💑🌷"} />

        </div>
      </motion.div>
    </section>
  );
};

export default Story;
