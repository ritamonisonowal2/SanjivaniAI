import React, { useState, useEffect, useRef } from 'react';
import { TRANSLATIONS } from '../translations';
import { Activity, Heart, Play, Square } from 'lucide-react';

export default function CprAedGuide() {
  const t = TRANSLATIONS;

  // Metronome states
  const [tickerActive, setTickerActive] = useState<boolean>(false);
  const [pulseCount, setPulseCount] = useState<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<any>(null);

  // Audio Tone generator for 110 BPM training ticker
  const playMetronomeTick = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      // Metronome high-pitch click
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      // Exponential decay to sound like a clean mechanical metronome block
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.start();
      osc.stop(ctx.currentTime + 0.1);
      
      // Update visual pulsator wave
      setPulseCount(prev => (prev + 1) % 4);
    } catch (err) {
      console.warn("Web Audio metronome blocked or unsupported in sandbox: ", err);
      // Fallback state change to keep visual metronome fully functioning
      setPulseCount(prev => (prev + 1) % 4);
    }
  };

  // Metronome timer setup for exactly 110 BPM (approx 545ms per click)
  useEffect(() => {
    if (tickerActive) {
      const intervalMs = Math.round((60 / 110) * 1000); // 110 BPM
      timerRef.current = setInterval(() => {
        playMetronomeTick();
      }, intervalMs);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [tickerActive]);

  // Clean up AudioContext on destroy
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="space-y-6" id="bystander-cpr-aed-guide">
      
      {/* Visual Workspace Subheader */}
      <div className="bg-white border border-slate-200 p-5 rounded-3xl flex flex-col sm:flex-row gap-5 justify-between items-start sm:items-center shadow-sm">
        <div className="space-y-1 text-left font-sans">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 inline-block" />
            <span className="text-xs uppercase font-mono tracking-wider font-extrabold text-rose-600 block">
              AHA Bystander Lifesaving Protocol
            </span>
          </div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">{t.cpr.title}</h3>
          <p className="text-sm text-slate-700 max-w-xl">
            {t.cpr.subtitle}
          </p>
        </div>
      </div>

      {/* Ticker BPM practicing Metronome */}
      <div className="bg-white border border-slate-200 text-slate-800 p-6 rounded-3xl shadow-sm relative overflow-hidden">
        
        {/* Subtle decorative heart grid design */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Heart className="w-32 h-32 text-rose-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10 text-left">
          <div className="md:col-span-7 lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-mono font-bold px-3 py-1 rounded inline-block uppercase tracking-wider leading-none">
                {t.cpr.tickerSub}
              </span>
              <span className="text-xs font-mono text-slate-500">| 110 BPM rhythm target</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-slate-950">{t.cpr.tickerHeader}</h4>
            <p className="text-sm text-slate-605 leading-relaxed max-w-xl font-sans">
              {t.cpr.tickerMnemonic}
            </p>
          </div>

          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center justify-center gap-4 bg-slate-50/50 p-5 rounded-2xl border border-slate-200">
            {/* Pulsating Visual Indicator Strobe */}
            <div className="flex gap-3 justify-center items-center h-12">
               {[0, 1, 2, 3].map((idx) => {
                 const isLit = tickerActive && pulseCount === idx;
                 return (
                   <span 
                     key={idx}
                     className={`rounded-full transition-all duration-100 ${
                       isLit 
                         ? 'w-6 h-6 bg-rose-500 ring-4 ring-rose-500/25 scale-110 shadow-sm' 
                         : 'w-4 h-4 bg-slate-100 border border-slate-200'
                     }`} 
                   />
                 );
               })}
            </div>

            <button
              id="metronome-toggle-btn"
              onClick={() => setTickerActive(!tickerActive)}
              className={`w-full py-3 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                tickerActive 
                  ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm' 
                  : 'bg-slate-800 hover:bg-slate-900 text-white'
              }`}
            >
              {tickerActive ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-white" />
                  {t.cpr.stopTickerBtn}
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white" />
                  {t.cpr.startTickerBtn}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main content grid: Left-side CPR steps, Right-side AED steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        
        {/* Hands-Only CPR Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
                <Heart className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400">
                  {t.cpr.cprSub}
                </h4>
                <h3 className="text-sm font-extrabold text-slate-900">{t.cpr.cprHeader}</h3>
              </div>
            </div>

            <div className="space-y-5">
              
              {/* Step 1 */}
              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-sm font-mono font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <div className="space-y-1 text-left">
                  <h5 className="text-sm font-bold text-slate-900">{t.cpr.cprStep1Title}</h5>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans">{t.cpr.cprStep1Detail}</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-sm font-mono font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <div className="space-y-1 text-left">
                  <h5 className="text-sm font-bold text-slate-900">{t.cpr.cprStep2Title}</h5>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans">{t.cpr.cprStep2Detail}</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-rose-50 border border-rose-300 text-rose-700 text-sm font-mono font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <div className="space-y-1 text-left">
                  <h5 className="text-sm font-bold text-slate-900">{t.cpr.cprStep3Title}</h5>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans">{t.cpr.cprStep3Detail}</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-rose-50 border border-rose-300 text-rose-700 text-sm font-mono font-bold flex items-center justify-center shrink-0">
                  4
                </span>
                <div className="space-y-1 text-left">
                  <h5 className="text-sm font-bold text-slate-900">{t.cpr.cprStep4Title}</h5>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans">{t.cpr.cprStep4Detail}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* AED Defibrillator play */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                <Activity className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-xs uppercase font-mono font-bold tracking-wider text-slate-400">
                  {t.cpr.aedSub}
                </h4>
                <h3 className="text-sm font-extrabold text-slate-900">{t.cpr.aedHeader}</h3>
              </div>
            </div>

            <div className="space-y-5">
              
              {/* Step 1 */}
              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-mono font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <div className="space-y-1 text-left">
                  <h5 className="text-sm font-bold text-slate-900">{t.cpr.aedStep1Title}</h5>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans">{t.cpr.aedStep1Detail}</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-amber-50 border border-amber-300 text-amber-700 text-sm font-mono font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <div className="space-y-1 text-left">
                  <h5 className="text-sm font-bold text-slate-900">{t.cpr.aedStep2Title}</h5>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans">{t.cpr.aedStep2Detail}</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-amber-50 border border-amber-300 text-amber-700 text-sm font-mono font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <div className="space-y-1 text-left">
                  <h5 className="text-sm font-bold text-slate-900">{t.cpr.aedStep3Title}</h5>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans">{t.cpr.aedStep3Detail}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
