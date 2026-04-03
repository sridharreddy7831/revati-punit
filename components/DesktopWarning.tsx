import React, { useState, useEffect } from 'react';

const DesktopWarning: React.FC = () => {
    return (
        <div className="hidden md:flex fixed inset-0 z-[99999] bg-[#0A1C14] text-[#FDF5E6] flex-col items-center justify-center p-8 text-center min-h-screen">
            <div className="max-w-lg glass-light p-10 rounded-3xl border-2 border-[#D4AF37]/30 shadow-2xl flex flex-col items-center">
                <div className="text-6xl mb-6">📱</div>
                <h2 className="text-3xl md:text-4xl font-traditional text-[#D4AF37] mb-4">Mobile Experience Only</h2>
                <p className="text-lg md:text-xl font-serif leading-relaxed mb-6">
                    For the best experience, kindly open this invitation on a mobile device. This digital invite is beautifully crafted specifically for mobile screens.
                </p>
                <div className="animate-bounce text-[#D4AF37]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
            </div>
        </div>
    );
};

export default DesktopWarning;
