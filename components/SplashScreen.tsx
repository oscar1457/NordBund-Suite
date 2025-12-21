import React, { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface SplashScreenProps {
    onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 800); // Wait for fade-out animation
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 transition-all duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 scale-105 pointer-events-none'}`}>
            {/* Background pulses */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Centered Logo Container */}
            <div className="relative flex flex-col items-center gap-6">
                {/* Animated Shield */}
                <div className="relative">
                    <div className="w-24 h-24 bg-blue-600 rounded-[28%] flex items-center justify-center shadow-[0_0_50px_-12px_rgba(37,99,235,0.6)] animate-zoom-in group animate-shimmer">
                        <ShieldCheck className="text-white w-14 h-14 drop-shadow-lg" />

                        {/* Glossy overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none rounded-[28%]"></div>
                    </div>

                    {/* Ring effect around shield */}
                    <div className="absolute inset-[-8px] border border-blue-600/20 rounded-[28%] animate-pulse-slow"></div>
                    <div className="absolute inset-[-16px] border border-blue-600/10 rounded-[28%] animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
                </div>

                {/* Text Animation */}
                <div className="flex flex-col items-center">
                    <div className="overflow-hidden">
                        <h1 className="text-5xl font-black text-white tracking-tighter leading-none animate-reveal-up" style={{ animationDelay: '0.3s' }}>
                            NORD<span className="text-blue-500 animate-reveal-up inline-block" style={{ animationDelay: '0.5s' }}>BUND</span>
                        </h1>
                    </div>
                    <div className="mt-2 overflow-hidden">
                        <p className="text-slate-400 text-sm font-medium tracking-[0.3em] uppercase animate-reveal-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                            Intelligence Analytics
                        </p>
                    </div>
                </div>

                {/* Premium loading line */}
                <div className="mt-12 w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full w-full bg-blue-600/40 -translate-x-full animate-[shimmer_3s_infinite]" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-blue-500 rounded-full -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                </div>
            </div>

            {/* Brand mark at bottom */}
            <div className="absolute bottom-10 opacity-30">
                <p className="text-white text-[10px] tracking-[0.5em] uppercase font-bold">2025 Standard</p>
            </div>
        </div>
    );
};
