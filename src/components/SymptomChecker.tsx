import React, { useState } from 'react';
import { TRANSLATIONS } from '../translations';
import { 
  ShieldAlert, 
  Volume2, 
  HeartPulse, 
  ShieldCheck 
} from 'lucide-react';

export default function SymptomChecker() {
  const t = TRANSLATIONS;

  const [chestPain, setChestPain] = useState<number>(0);
  const [sweating, setSweating] = useState<number>(0);
  const [swelling, setSwelling] = useState<number>(0);
  const [breathlessness, setBreathlessness] = useState<number>(0);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  // Compute live match scores
  let arrestScore = 0;
  let attackScore = 0;
  let failureScore = 0;

  if (isCollapsed) {
    arrestScore = 100;
    attackScore = 75;
    failureScore = 20;
  } else {
    // Cardiac Arrest (Electrical stops) - heavily tied to breathlessness, chest pain, and severe cold sweats
    arrestScore = Math.round(Math.min(95, (breathlessness * 4 + chestPain * 3.5 + sweating * 2.5)));
    // Heart Attack (Circulatory blockage) - heavily tied to chest pain and sweating
    attackScore = Math.round(Math.min(100, (chestPain * 7 + sweating * 2.5 + breathlessness * 0.5)));
    // Heart Failure (Mechanical pump fatigue) - heavily tied to swelling and breathlessness
    failureScore = Math.round(Math.min(100, (swelling * 6 + breathlessness * 4)));
  }

  // Triage state
  let triageType: 'emergency' | 'specialist' | 'normal' = 'normal';
  if (isCollapsed || arrestScore >= 70 || attackScore >= 70) {
    triageType = 'emergency';
  } else if (failureScore >= 50 || arrestScore >= 35 || attackScore >= 35) {
    triageType = 'specialist';
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-rose-600 bg-rose-50 border-rose-200';
    if (score >= 35) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-emerald-600 bg-emerald-50 border-emerald-200';
  };

  const getProgressBarColor = (score: number) => {
    if (score >= 70) return 'bg-rose-600';
    if (score >= 35) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  return (
    <div className="space-y-6" id="symptom-checker-root">
      
      {/* Header section */}
      <div className="text-left">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-5 h-5 text-rose-500 shrink-0 animate-pulse" />
          <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900">{t.symptoms.title}</h3>
        </div>
        <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
          {t.symptoms.subtitle}
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Input Sliders Column (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm text-left">
          
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block pb-2.5 border-b border-slate-100">
            Choose Your Symptoms and Intensity
          </h4>

          {/* Unconscious Checkbox */}
          <div className="p-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl space-y-3">
            <label className="flex items-start gap-3.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isCollapsed}
                onChange={(e) => setIsCollapsed(e.target.checked)}
                className="w-5 h-5 rounded-md accent-rose-500 mt-1 cursor-pointer shrink-0"
              />
              <div className="space-y-1 text-left">
                <span className="text-sm font-black text-slate-900 block">
                  {t.symptoms.unconsciousCheck}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.symptoms.unconsciousLabel}
                </p>
              </div>
            </label>
          </div>

          {!isCollapsed && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Chest Pain Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">{t.symptoms.chestPainLabel}</span>
                    <span className="text-xs text-slate-500 leading-snug">{t.symptoms.chestPainDesc}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 shrink-0 mt-1">
                    Value: {chestPain}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={chestPain}
                  onChange={(e) => setChestPain(parseInt(e.target.value))}
                  className="w-full accent-slate-800 cursor-pointer h-2 bg-slate-100 rounded-lg outline-none"
                />
              </div>

              {/* Sudden Cold Sweat Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">{t.symptoms.sweatingLabel}</span>
                    <span className="text-xs text-slate-500 leading-snug">{t.symptoms.sweatingDesc}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 shrink-0 mt-1">
                    Value: {sweating}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={sweating}
                  onChange={(e) => setSweating(parseInt(e.target.value))}
                  className="w-full accent-slate-800 cursor-pointer h-2 bg-slate-100 rounded-lg outline-none"
                />
              </div>

              {/* Swollen Feet or Legs Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">{t.symptoms.swellingLabel}</span>
                    <span className="text-xs text-slate-500 leading-snug">{t.symptoms.swellingDesc}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 shrink-0 mt-1">
                    Value: {swelling}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={swelling}
                  onChange={(e) => setSwelling(parseInt(e.target.value))}
                  className="w-full accent-slate-800 cursor-pointer h-2 bg-slate-100 rounded-lg outline-none"
                />
              </div>

              {/* Trouble Breathing Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">{t.symptoms.breathlessnessLabel}</span>
                    <span className="text-xs text-slate-500 leading-snug">{t.symptoms.breathlessnessDesc}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 shrink-0 mt-1">
                    Value: {breathlessness}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={breathlessness}
                  onChange={(e) => setBreathlessness(parseInt(e.target.value))}
                  className="w-full accent-slate-800 cursor-pointer h-2 bg-slate-100 rounded-lg outline-none"
                />
              </div>

            </div>
          )}

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-2.5 text-xs text-slate-600 font-sans leading-normal">
            <Volume2 className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <span className="font-semibold">
              Tip: Move the sliders from 0 (no symptom) to 10 (maximum/unbearable severity) to check.
            </span>
          </div>

        </div>

        {/* Right Live Results & Triage Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-6">
          
          <div className="space-y-5 text-left">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block pb-2.5 border-b border-slate-100">
              {t.symptoms.resultsTitle}
            </h4>
            
            <p className="text-xs text-slate-500 leading-relaxed">
              {t.symptoms.resultsDesc}
            </p>

            {/* Results Progress Bars */}
            <div className="space-y-4 pt-1">
              
              {/* Cardiac Arrest */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span className="truncate">{t.symptoms.arrestTitle.split(' (')[0]}</span>
                  <span className={`px-2 py-0.5 rounded-lg border font-mono font-black text-[0.625rem] ${getScoreColor(arrestScore)}`}>
                    {t.symptoms.strengthRating}{arrestScore}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${getProgressBarColor(arrestScore)}`}
                    style={{ width: `${arrestScore}%` }}
                  />
                </div>
                <p className="text-[0.625rem] text-slate-500 leading-snug">{t.symptoms.arrestDesc}</p>
              </div>

              {/* Heart Attack */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span className="truncate">{t.symptoms.attackTitle.split(' (')[0]}</span>
                  <span className={`px-2 py-0.5 rounded-lg border font-mono font-black text-[0.625rem] ${getScoreColor(attackScore)}`}>
                    {t.symptoms.strengthRating}{attackScore}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${getProgressBarColor(attackScore)}`}
                    style={{ width: `${attackScore}%` }}
                  />
                </div>
                <p className="text-[0.625rem] text-slate-500 leading-snug">{t.symptoms.attackDesc}</p>
              </div>

              {/* Heart Failure */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span className="truncate">{t.symptoms.failureTitle.split(' (')[0]}</span>
                  <span className={`px-2 py-0.5 rounded-lg border font-mono font-black text-[0.625rem] ${getScoreColor(failureScore)}`}>
                    {t.symptoms.strengthRating}{failureScore}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${getProgressBarColor(failureScore)}`}
                    style={{ width: `${failureScore}%` }}
                  />
                </div>
                <p className="text-[0.625rem] text-slate-500 leading-snug">{t.symptoms.failureDesc}</p>
              </div>

            </div>
          </div>

          {/* Bottom Dynamic Triage Action Container */}
          <div className="pt-4 border-t border-slate-200">
            {triageType === 'emergency' && (
              <div className="p-4 bg-rose-50 border-l-4 border-rose-500 text-slate-900 rounded-2xl shadow-sm text-left space-y-2.5 animate-in fade-in duration-300">
                <div className="flex gap-2 items-center font-bold uppercase tracking-wider text-xs font-mono text-rose-700">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>EMERGENCY DISPATCH PROTOCOL</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold leading-snug text-slate-700">
                  {t.symptoms.actionTriageEmergency}
                </p>
                <div className="pt-1.5">
                  <a 
                    href="tel:112"
                    className="w-full py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow transition-all block text-center uppercase tracking-wider cursor-pointer border border-rose-700"
                  >
                    📞 Call 112 / 108 Emergency Now
                  </a>
                </div>
              </div>
            )}

            {triageType === 'specialist' && (
              <div className="p-4 bg-amber-50 border-l-4 border-amber-500 text-slate-900 rounded-2xl shadow-sm text-left space-y-2 animate-in fade-in duration-300">
                <div className="flex gap-2 items-center font-bold uppercase tracking-wider text-xs font-mono text-amber-700">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>CARDIOLOGY SCHEDULING ADVISEMENT</span>
                </div>
                <p className="text-xs sm:text-sm font-medium leading-normal text-slate-700">
                  {t.symptoms.actionTriageSpecialist}
                </p>
              </div>
            )}

            {triageType === 'normal' && (
              <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-900 rounded-2xl shadow-sm text-left space-y-1.5 animate-in fade-in duration-300">
                <div className="flex gap-1.5 items-center font-bold uppercase tracking-wider text-xs font-mono text-emerald-700">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
                  <span>{t.symptoms.actionNormalTitle}</span>
                </div>
                <p className="text-xs font-medium leading-relaxed text-slate-700">
                  {t.symptoms.actionNormalDesc}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
