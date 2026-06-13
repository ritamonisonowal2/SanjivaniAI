import React, { useState, useEffect, useRef } from 'react';
import { TRANSLATIONS } from '../translations';
import { Activity, Heart, Play, Square } from 'lucide-react';

export default function CprAedGuide() {
  const t = TRANSLATIONS;

  // Metronome states
  const [tickerActive, setTickerActive] = useState<boolean>(false);
  const [pulseCount, setPulseCount] = useState<number>(0);
  const [bpm, setBpm] = useState<number>(110);
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

  // Metronome timer setup for dynamic BPM target
  useEffect(() => {
    if (tickerActive) {
      const intervalMs = Math.round((60 / bpm) * 1000);
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
  }, [tickerActive, bpm]);

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
      <div className="bg-slate-900 border border-slate-800 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        
        {/* Subtle decorative heart grid design or grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Heart className="w-32 h-32 text-rose-500 fill-rose-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10 text-left">
          <div className="md:col-span-7 lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-rose-500/10 border border-rose-500/35 text-rose-400 text-xs font-mono font-bold px-3 py-1 rounded-full inline-block uppercase tracking-wider leading-none">
                {t.cpr.tickerSub}
              </span>
              <span className="text-xs font-mono text-slate-400">| {bpm} BPM target rhythm</span>
            </div>
            <h4 className="text-base sm:text-lg font-black tracking-tight text-white">{t.cpr.tickerHeader}</h4>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xl font-sans font-medium">
              {t.cpr.tickerMnemonic}
            </p>

            {/* Quick BPM Selector Panel */}
            <div className="space-y-2.5 pt-2">
              <span className="text-[0.625rem] font-mono font-bold uppercase tracking-widest text-slate-500 block">
                Adjust metronome training speed
              </span>
              <div className="flex flex-wrap gap-2">
                {[100, 110, 120].map((presetBpm) => {
                  const isPresetActive = bpm === presetBpm;
                  return (
                    <button
                      key={presetBpm}
                      type="button"
                      onClick={() => setBpm(presetBpm)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                        isPresetActive
                          ? 'bg-rose-600 border-rose-500 text-white shadow-md shadow-rose-600/15'
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-750 text-slate-300 hover:text-white'
                      }`}
                    >
                      {presetBpm} BPM {presetBpm === 110 ? '(AHA Target)' : ''}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="md:col-span-5 lg:col-span-4 flex flex-col items-center justify-center gap-4 bg-slate-950/45 p-6 rounded-2xl border border-slate-800/60 shadow-inner">
            {/* Pulsating Visual Indicator Strobe */}
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="flex gap-3 justify-center items-center h-12">
                 {[0, 1, 2, 3].map((idx) => {
                   const isLit = tickerActive && pulseCount === idx;
                   return (
                     <span 
                       key={idx}
                       className={`rounded-full transition-all duration-100 ${
                         isLit 
                           ? 'w-6 h-6 bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.95)] ring-4 ring-rose-500/30 scale-110' 
                           : 'w-4 h-4 bg-slate-800 border border-slate-750'
                       }`} 
                     />
                   );
                 })}
              </div>
              
              {/* Pulsing heart block in sync with ticks */}
              <div className="relative flex items-center justify-center w-24 h-24 mt-2">
                <div className={`absolute inset-0 bg-rose-500/20 rounded-full blur-md transition-all duration-100 ${
                  tickerActive ? 'scale-125 opacity-100 animate-pulse-ring' : 'scale-100 opacity-0'
                }`} />
                <div className={`w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center border border-slate-800 shadow-md transition-transform duration-100 ${
                  tickerActive 
                    ? (pulseCount % 2 === 0 ? 'scale-115 shadow-rose-500/30 border-rose-500/50' : 'scale-95') 
                    : 'scale-100'
                }`}>
                  <Heart className={`w-8 h-8 text-rose-500 fill-rose-500 transition-transform duration-100 ${
                    tickerActive ? (pulseCount % 2 === 0 ? 'scale-110' : 'scale-95') : ''
                  }`} />
                </div>
              </div>
            </div>

            <button
              id="metronome-toggle-btn"
              onClick={() => setTickerActive(!tickerActive)}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border ${
                tickerActive 
                  ? 'bg-rose-600 hover:bg-rose-700 text-white border-rose-500 shadow-md shadow-rose-600/10' 
                  : 'bg-slate-800 hover:bg-slate-850 border-slate-700 text-white hover:text-rose-400'
              }`}
            >
              {tickerActive ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-white text-white" />
                  {t.cpr.stopTickerBtn}
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-white text-white" />
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
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-100">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[0.625rem] uppercase font-mono font-bold tracking-wider text-rose-600">
                  {t.cpr.cprSub}
                </h4>
                <h3 className="text-sm sm:text-base font-black text-slate-950">{t.cpr.cprHeader}</h3>
              </div>
            </div>

            <div className="space-y-4">
              
              {/* Step 1 */}
              <div className="flex gap-4 items-start bg-slate-50/35 hover:bg-slate-50 border border-slate-200/60 p-4 rounded-2xl transition-colors">
                <span className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-mono font-black flex items-center justify-center shrink-0 shadow-2xs">
                  1
                </span>
                <div className="space-y-1 text-left">
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900">{t.cpr.cprStep1Title}</h5>
                  <p className="text-[0.7rem] sm:text-xs text-slate-500 leading-relaxed font-sans">{t.cpr.cprStep1Detail}</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start bg-slate-50/35 hover:bg-slate-50 border border-slate-200/60 p-4 rounded-2xl transition-colors">
                <span className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-mono font-black flex items-center justify-center shrink-0 shadow-2xs">
                  2
                </span>
                <div className="space-y-1 text-left">
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900">{t.cpr.cprStep2Title}</h5>
                  <p className="text-[0.7rem] sm:text-xs text-slate-500 leading-relaxed font-sans">{t.cpr.cprStep2Detail}</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 items-start bg-slate-50/35 hover:bg-slate-50 border border-slate-200/60 p-4 rounded-2xl transition-colors">
                <span className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-mono font-black flex items-center justify-center shrink-0 shadow-2xs">
                  3
                </span>
                <div className="space-y-1 text-left">
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900">{t.cpr.cprStep3Title}</h5>
                  <p className="text-[0.7rem] sm:text-xs text-slate-500 leading-relaxed font-sans">{t.cpr.cprStep3Detail}</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 items-start bg-slate-50/35 hover:bg-slate-50 border border-slate-200/60 p-4 rounded-2xl transition-colors">
                <span className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-mono font-black flex items-center justify-center shrink-0 shadow-2xs">
                  4
                </span>
                <div className="space-y-1 text-left">
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900">{t.cpr.cprStep4Title}</h5>
                  <p className="text-[0.7rem] sm:text-xs text-slate-500 leading-relaxed font-sans">{t.cpr.cprStep4Detail}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* AED Defibrillator play */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[0.625rem] uppercase font-mono font-bold tracking-wider text-amber-600">
                  {t.cpr.aedSub}
                </h4>
                <h3 className="text-sm sm:text-base font-black text-slate-950">{t.cpr.aedHeader}</h3>
              </div>
            </div>

            <div className="space-y-4">
              
              {/* Step 1 */}
              <div className="flex gap-4 items-start bg-slate-50/35 hover:bg-slate-50 border border-slate-200/60 p-4 rounded-2xl transition-colors">
                <span className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm font-mono font-bold flex items-center justify-center shrink-0 shadow-2xs">
                  1
                </span>
                <div className="space-y-1 text-left">
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900">{t.cpr.aedStep1Title}</h5>
                  <p className="text-[0.7rem] sm:text-xs text-slate-500 leading-relaxed font-sans">{t.cpr.aedStep1Detail}</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start bg-slate-50/35 hover:bg-slate-50 border border-slate-200/60 p-4 rounded-2xl transition-colors">
                <span className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm font-mono font-bold flex items-center justify-center shrink-0 shadow-2xs">
                  2
                </span>
                <div className="space-y-1 text-left">
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900">{t.cpr.aedStep2Title}</h5>
                  <p className="text-[0.7rem] sm:text-xs text-slate-500 leading-relaxed font-sans">{t.cpr.aedStep2Detail}</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 items-start bg-slate-50/35 hover:bg-slate-50 border border-slate-200/60 p-4 rounded-2xl transition-colors">
                <span className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm font-mono font-bold flex items-center justify-center shrink-0 shadow-2xs">
                  3
                </span>
                <div className="space-y-1 text-left">
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900">{t.cpr.aedStep3Title}</h5>
                  <p className="text-[0.7rem] sm:text-xs text-slate-500 leading-relaxed font-sans">{t.cpr.aedStep3Detail}</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
