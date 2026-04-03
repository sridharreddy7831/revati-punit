import React from 'react';
import { motion } from 'framer-motion';

const Venue: React.FC = () => {
    const venueAddress = "Spoorthi Resort, Beside Sukoon Colony Off Athani - Solapur, Ring Rd, Vijayapura, Karnataka 586103";
    const reliableMapUrl = `https://www.google.com/maps?q=Spoorthi+Resort+Vijayapura&output=embed`;

    return (
        <section id="venue" className="py-20 px-4 bg-transparent relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-script text-[#B76E79] mb-2">The Venue</h2>
                    <p className="text-[#FDF5E6] font-serif tracking-widest uppercase text-sm">Where we begin our journey</p>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 64 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-1 bg-[#D4AF37] mx-auto mt-4"
                    ></motion.div>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12 items-center">
                    {/* Venue Details */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2 space-y-8"
                    >
                        <div className="glass-maroon p-8 rounded-3xl border border-[#B76E79]/10 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <span className="text-8xl">🏛️</span>
                            </div>

                            <h3 className="text-2xl font-traditional text-[#B76E79] mb-4">Spoorthi Resort</h3>
                            <p className="text-[#FDF5E6] font-serif text-lg italic leading-relaxed mb-6">
                                "{venueAddress}"
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#B76E79] flex-shrink-0">
                                        📍
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#B76E79] text-sm uppercase tracking-wider">Location</p>
                                        <p className="text-[#FDF5E6]/70 text-sm">Off Athani - Solapur, Ring Rd, Vijayapura</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#B76E79] flex-shrink-0">
                                        🚗
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#B76E79] text-sm uppercase tracking-wider">Accessibility</p>
                                        <p className="text-[#FDF5E6]/70 text-sm">Easily accessible from Vijayapura central bus stand and Vijayapura Railway station.</p>
                                    </div>
                                </div>
                            </div>

                            <motion.a
                                href="https://maps.app.goo.gl/B4vvj5Qvh1t85qhi9"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-10 inline-flex items-center gap-3 px-8 py-3 bg-[#B76E79] text-white font-bold rounded-full transition-all text-xs tracking-widest uppercase"
                            >
                                Get Directions ↗
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Map Visualization */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2"
                    >
                        <div className="relative group p-4 glass rounded-[2.5rem] border border-[#D4AF37]/30 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 to-transparent rounded-[2.5rem] -z-10 blur-xl"></div>

                            <div className="w-full h-[400px] rounded-[2rem] overflow-hidden shadow-inner border-2 border-white/50">
                                <iframe
                                    src={reliableMapUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Venue Map"
                                    className="grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>

                            {/* Decorative corner element */}
                            <div className="absolute -bottom-2 -right-2 w-20 h-20 text-[#D4AF37] opacity-30 transform rotate-180 pointer-events-none">
                                <svg viewBox="0 0 100 100">
                                    <path fill="currentColor" d="M0 0 L100 0 L100 20 L20 20 L20 100 L0 100 Z" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Venue;
