import React, { useState } from 'react';
import { TRANSLATIONS } from '../translations';
import { 
  ShieldAlert, 
  Volume2, 
  HeartPulse, 
  ShieldCheck 
} from 'lucide-react';

interface SymptomCheckerProps {
  onSwitchTab?: (tab: 'home' | 'matrix' | 'symptoms' | 'locator' | 'cpr' | 'medicalId') => void;
}

export default function SymptomChecker({ onSwitchTab }: SymptomCheckerProps) {
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
    if (score >= 70) return 'text-rose-700 bg-rose-50 border-rose-250 font-bold';
    if (score >= 35) return 'text-amber-700 bg-amber-50 border-amber-250 font-bold';
    return 'text-emerald-700 bg-emerald-50 border-emerald-250 font-bold';
  };

  const getProgressBarColor = (score: number) => {
    if (score >= 70) return 'bg-gradient-to-r from-rose-500 to-rose-600';
    if (score >= 35) return 'bg-gradient-to-r from-amber-400 to-amber-500';
    return 'bg-gradient-to-r from-emerald-500 to-emerald-600';
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
          <div className={`p-6 rounded-3xl border transition-all duration-300 ${
            isCollapsed 
              ? 'bg-rose-50 border-rose-450 ring-4 ring-rose-500/15 shadow-md animate-pulse' 
              : 'bg-slate-50 border-slate-200 shadow-xs'
          }`}>
            <label className="flex items-start gap-4 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isCollapsed}
                onChange={(e) => setIsCollapsed(e.target.checked)}
                className="w-5.5 h-5.5 rounded-md accent-rose-650 mt-1 cursor-pointer shrink-0"
              />
              <div className="space-y-2 text-left">
                <span className={`text-sm sm:text-base font-black block tracking-tight ${isCollapsed ? 'text-rose-950' : 'text-slate-905'}`}>
                  {t.symptoms.unconsciousCheck}
                </span>
                <p className={`text-xs sm:text-sm leading-relaxed ${isCollapsed ? 'text-rose-800 font-bold' : 'text-slate-600 font-medium'}`}>
                  {t.symptoms.unconsciousLabel}
                </p>
                {isCollapsed && (
                  <div className="flex flex-col gap-3.5 pt-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 border border-rose-250 text-rose-850 text-3xs font-extrabold tracking-wider uppercase animate-flash-fast">
                      <span className="w-2 h-2 rounded-full bg-rose-600" />
                      CRITICAL EMERGENCY: PATIENT UNCONSCIOUS
                    </div>
                    {onSwitchTab && (
                      <div className="flex flex-wrap gap-2.5 pt-1">
                        <button
                          type="button"
                          onClick={() => onSwitchTab('cpr')}
                          className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl transition-all border border-rose-500 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
                        >
                          ⚡ Open CPR Practice Metronome
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </label>
          </div>

          {!isCollapsed && (
            <div className="space-y-5 animate-in fade-in duration-200">
              
              {/* Chest Pain Slider */}
              <div className={`rounded-2xl p-5 space-y-3.5 transition-all duration-300 border ${
                chestPain > 0 ? 'bg-rose-50/15 border-rose-300 shadow-xs' : 'bg-slate-50/40 hover:bg-slate-50 border-slate-200/80'
              }`}>
                <div className="flex justify-between items-start gap-4 text-left">
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-slate-900 block flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${chestPain > 0 ? 'bg-rose-500' : 'bg-slate-350'}`} />
                      {t.symptoms.chestPainLabel}
                    </span>
                    <span className="text-xs text-slate-500 leading-relaxed block">{t.symptoms.chestPainDesc}</span>
                  </div>
                  <span className={`text-xs font-mono font-black border rounded-lg px-2.5 py-1.5 shrink-0 ${
                    chestPain > 0 ? 'text-rose-700 bg-rose-50 border-rose-200' : 'text-slate-500 bg-slate-50 border-slate-200'
                  }`}>
                    {chestPain}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={chestPain}
                  onChange={(e) => setChestPain(parseInt(e.target.value))}
                  className="w-full"
                  style={{
                    background: `linear-gradient(to right, #f43f5e 0%, #f43f5e ${chestPain * 10}%, #f1f5f9 ${chestPain * 10}%, #f1f5f9 100%)`
                  }}
                />
              </div>

              {/* Sudden Cold Sweat Slider */}
              <div className={`rounded-2xl p-5 space-y-3.5 transition-all duration-300 border ${
                sweating > 0 ? 'bg-rose-50/15 border-rose-300 shadow-xs' : 'bg-slate-50/40 hover:bg-slate-50 border-slate-200/80'
              }`}>
                <div className="flex justify-between items-start gap-4 text-left">
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-slate-900 block flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${sweating > 0 ? 'bg-rose-500' : 'bg-slate-350'}`} />
                      {t.symptoms.sweatingLabel}
                    </span>
                    <span className="text-xs text-slate-500 leading-relaxed block">{t.symptoms.sweatingDesc}</span>
                  </div>
                  <span className={`text-xs font-mono font-black border rounded-lg px-2.5 py-1.5 shrink-0 ${
                    sweating > 0 ? 'text-rose-700 bg-rose-50 border-rose-200' : 'text-slate-500 bg-slate-50 border-slate-200'
                  }`}>
                    {sweating}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={sweating}
                  onChange={(e) => setSweating(parseInt(e.target.value))}
                  className="w-full"
                  style={{
                    background: `linear-gradient(to right, #f43f5e 0%, #f43f5e ${sweating * 10}%, #f1f5f9 ${sweating * 10}%, #f1f5f9 100%)`
                  }}
                />
              </div>

              {/* Swollen Feet or Legs Slider */}
              <div className={`rounded-2xl p-5 space-y-3.5 transition-all duration-300 border ${
                swelling > 0 ? 'bg-sky-50/15 border-sky-300 shadow-xs' : 'bg-slate-50/40 hover:bg-slate-50 border-slate-200/80'
              }`}>
                <div className="flex justify-between items-start gap-4 text-left">
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-slate-900 block flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${swelling > 0 ? 'bg-sky-500' : 'bg-slate-350'}`} />
                      {t.symptoms.swellingLabel}
                    </span>
                    <span className="text-xs text-slate-500 leading-relaxed block">{t.symptoms.swellingDesc}</span>
                  </div>
                  <span className={`text-xs font-mono font-black border rounded-lg px-2.5 py-1.5 shrink-0 ${
                    swelling > 0 ? 'text-sky-700 bg-sky-50 border-sky-200' : 'text-slate-500 bg-slate-50 border-slate-200'
                  }`}>
                    {swelling}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={swelling}
                  onChange={(e) => setSwelling(parseInt(e.target.value))}
                  className="w-full"
                  style={{
                    background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${swelling * 10}%, #f1f5f9 ${swelling * 10}%, #f1f5f9 100%)`
                  }}
                />
              </div>

              {/* Trouble Breathing Slider */}
              <div className={`rounded-2xl p-5 space-y-3.5 transition-all duration-300 border ${
                breathlessness > 0 ? 'bg-rose-50/15 border-rose-300 shadow-xs' : 'bg-slate-50/40 hover:bg-slate-50 border-slate-200/80'
              }`}>
                <div className="flex justify-between items-start gap-4 text-left">
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-slate-900 block flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${breathlessness > 0 ? 'bg-rose-500' : 'bg-slate-350'}`} />
                      {t.symptoms.breathlessnessLabel}
                    </span>
                    <span className="text-xs text-slate-500 leading-relaxed block">{t.symptoms.breathlessnessDesc}</span>
                  </div>
                  <span className={`text-xs font-mono font-black border rounded-lg px-2.5 py-1.5 shrink-0 ${
                    breathlessness > 0 ? 'text-rose-700 bg-rose-50 border-rose-200' : 'text-slate-500 bg-slate-50 border-slate-200'
                  }`}>
                    {breathlessness}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={breathlessness}
                  onChange={(e) => setBreathlessness(parseInt(e.target.value))}
                  className="w-full"
                  style={{
                    background: `linear-gradient(to right, #f43f5e 0%, #f43f5e ${breathlessness * 10}%, #f1f5f9 ${breathlessness * 10}%, #f1f5f9 100%)`
                  }}
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
            <div className="space-y-4 pt-1 font-sans">
              
              {/* Cardiac Arrest */}
              <div className={`space-y-2 p-3.5 rounded-2xl border transition-all ${
                arrestScore >= 70 ? 'bg-rose-50/45 border-rose-150 shadow-xs' : 'bg-transparent border-transparent'
              }`}>
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span className="truncate font-extrabold">{t.symptoms.arrestTitle.split(' (')[0]}</span>
                  <span className={`px-2 py-0.5 rounded-lg border font-mono font-black text-[0.625rem] ${getScoreColor(arrestScore)}`}>
                    {t.symptoms.strengthRating}{arrestScore}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressBarColor(arrestScore)} ${
                      arrestScore >= 70 ? 'animate-pulse' : ''
                    }`}
                    style={{ width: `${arrestScore}%` }}
                  />
                </div>
                <p className="text-[0.625rem] text-slate-500 leading-relaxed font-sans mt-1">{t.symptoms.arrestDesc}</p>
              </div>

              {/* Heart Attack */}
              <div className={`space-y-2 p-3.5 rounded-2xl border transition-all ${
                attackScore >= 70 ? 'bg-rose-50/45 border-rose-150 shadow-xs' : 'bg-transparent border-transparent'
              }`}>
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span className="truncate font-extrabold">{t.symptoms.attackTitle.split(' (')[0]}</span>
                  <span className={`px-2 py-0.5 rounded-lg border font-mono font-black text-[0.625rem] ${getScoreColor(attackScore)}`}>
                    {t.symptoms.strengthRating}{attackScore}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressBarColor(attackScore)} ${
                      attackScore >= 70 ? 'animate-pulse' : ''
                    }`}
                    style={{ width: `${attackScore}%` }}
                  />
                </div>
                <p className="text-[0.625rem] text-slate-500 leading-relaxed font-sans mt-1">{t.symptoms.attackDesc}</p>
              </div>

              {/* Heart Failure */}
              <div className={`space-y-2 p-3.5 rounded-2xl border transition-all ${
                failureScore >= 70 ? 'bg-rose-50/45 border-rose-150 shadow-xs' : 'bg-transparent border-transparent'
              }`}>
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span className="truncate font-extrabold">{t.symptoms.failureTitle.split(' (')[0]}</span>
                  <span className={`px-2 py-0.5 rounded-lg border font-mono font-black text-[0.625rem] ${getScoreColor(failureScore)}`}>
                    {t.symptoms.strengthRating}{failureScore}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressBarColor(failureScore)} ${
                      failureScore >= 70 ? 'animate-pulse' : ''
                    }`}
                    style={{ width: `${failureScore}%` }}
                  />
                </div>
                <p className="text-[0.625rem] text-slate-500 leading-relaxed font-sans mt-1">{t.symptoms.failureDesc}</p>
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
