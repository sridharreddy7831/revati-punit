import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SLOKAS, WEDDING_DATE } from '../constants';

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = WEDDING_DATE.getTime() - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timerInterval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  const handleSaveDate = () => {
    const event = {
      title: "Wedding Ceremony of Revati & Punitkumar",
      details: "Join us to celebrate the union of Revati & Punitkumar",
      location: "Spoorthi Resort, Beside Sukoon Colony Off Athani - Solapur, Ring Rd, Vijayapura, Karnataka 586103",
      start: "20260423T040000Z", // 09:30 AM IST is 04:00 AM UTC
      end: "20260423T050000Z"
    };

    // Construct Google Calendar URL
    const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`;

    window.open(googleUrl, '_blank');
  };

  return (
    <section id="hero" className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#0A1C14]">
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/13.jpg')`,
          filter: 'brightness(0.3)'
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.div
          className="mb-8 flex justify-center items-center h-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.5 }
            }
          }}
        >
          <div className="flex flex-col gap-2">
            {SLOKAS.map((sloka, index) => (
              <motion.p
                key={index}
                variants={{
                  hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
                  visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { duration: 1, ease: "easeOut" } }
                }}
                className="text-[#D4AF37] font-traditional text-sm md:text-lg tracking-widest italic"
              >
                {sloka}
              </motion.p>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[#D4AF37] font-traditional text-sm md:text-lg tracking-widest mb-4 uppercase"
        >
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/80 font-serif text-xs md:text-sm tracking-[0.2em] uppercase mb-2"
        >
          We invite you to celebrate the
        </motion.p>

        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
          className="text-[#D4AF37] font-script text-4xl md:text-6xl mb-6"
        >
          Wedding Ceremony
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.9 }}
          className="text-white/60 font-serif text-xs uppercase tracking-widest mb-4"
        >
          of
        </motion.p>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="text-white font-traditional text-4xl md:text-7xl lg:text-8xl mb-4 drop-shadow-lg text-center"
        >
          Revati <span className="text-[#D4AF37] font-script text-3xl md:text-6xl">&</span> Punitkumar
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 1.3, duration: 1 }}
          className="h-1 bg-[#D4AF37] mx-auto my-6"
        ></motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-white font-serif text-xl md:text-3xl italic tracking-wide mb-8"
        >
          23rd April, 2026 • Vijayapura
        </motion.p>

        {/* Countdown Timer */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="grid grid-cols-4 gap-3 sm:gap-6 max-w-md mx-auto mb-12"
        >
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hrs', value: timeLeft.hours },
            { label: 'Min', value: timeLeft.minutes },
            { label: 'Sec', value: timeLeft.seconds }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="glass-light flex flex-col items-center py-3 rounded-2xl border border-white/10 shadow-lg px-2 sm:px-4"
            >
              <span className="text-2xl md:text-4xl font-bold text-[#D4AF37] font-serif drop-shadow-md">{item.value.toString().padStart(2, '0')}</span>
              <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold mt-1">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          onClick={handleSaveDate}
          whileHover={{
            scale: 1.1,
            backgroundColor: '#D4AF37',
            color: '#FDF5E6',
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)'
          }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.9 }}
          className="inline-flex items-center gap-3 px-10 py-4 bg-[#D4AF37]/90 text-[#FDF5E6] font-bold rounded-full transition-all duration-300 shadow-2xl border-2 border-[#D4AF37] tracking-widest uppercase text-xs md:text-sm hover:z-20 relative group"
        >
          SAVE THE DATE
        </motion.button>
      </div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-50px] left-[-50px] w-48 h-48 md:w-80 md:h-80 opacity-20 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#D4AF37] fill-current">
          <path d="M100,0 C110,40 150,40 150,100 C150,160 110,160 100,200 C90,160 50,160 50,100 C50,40 90,40 100,0 Z" />
        </svg>
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-50px] right-[-50px] w-48 h-48 md:w-80 md:h-80 opacity-20 pointer-events-none"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-[#D4AF37] fill-current">
          <path d="M100,0 C110,40 150,40 150,100 C150,160 110,160 100,200 C90,160 50,160 50,100 C50,40 90,40 100,0 Z" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
