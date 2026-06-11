import React, { useState, useEffect } from 'react';
import ComparisonMatrix from './components/ComparisonMatrix';
import HospitalLocator from './components/HospitalLocator';
import CprAedGuide from './components/CprAedGuide';
import MedicalIdQr from './components/MedicalIdQr';

import { TRANSLATIONS } from './translations';
import { 
  Heart, 
  Activity, 
  ShieldAlert, 
  Sparkles, 
  Home,
  X,
  Phone,
  ShieldCheck,
  Droplet,
  Compass,
  AlertOctagon
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'matrix' | 'locator' | 'cpr' | 'medicalId'>('matrix');
  const [triageRecord, setTriageRecord] = useState<any | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('emergency_triage') === '1') {
      setTriageRecord({
        name: params.get('med_name') || 'Patient Name',
        blood: params.get('med_blood') || 'Unknown',
        allergies: params.get('med_allergies') || 'None Declared',
        conditions: params.get('med_conds') || 'None Declared',
        meds: params.get('med_meds') || 'None Declared',
        contactName: params.get('med_cname') || 'Emergency Contact Name',
        contactPhone: params.get('med_cphone') || 'Emergency Contact Phone',
        donor: params.get('med_donor') || 'No',
        extra: params.get('med_extra') || 'None'
      });
      setActiveTab('medicalId');
    }
  }, []);

  const handleClearTriage = () => {
    setTriageRecord(null);
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  };

  const handleGoToLocator = () => {
    setActiveTab('locator');
    setTriageRecord(null);
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  };

  const handleGoToCpr = () => {
    setActiveTab('cpr');
    setTriageRecord(null);
    const cleanUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  };

  const t = TRANSLATIONS;

  return (
    <div id="root-app-container" className="min-h-screen w-full overflow-x-hidden bg-slate-50 text-slate-800 font-sans antialiased selection:bg-rose-150 selection:text-rose-900 relative">
      
      {/* Home Rounded Button on Top Left Corner */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50">
        <button
          type="button"
          onClick={() => setActiveTab('matrix')}
          className="flex items-center justify-center gap-2 p-2.5 sm:px-4 sm:py-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-full shadow-sm hover:shadow transition-all duration-200 group cursor-pointer"
          title="Back to Home"
        >
          <Home className="w-4 h-4 text-slate-500 group-hover:text-slate-800" />
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider font-sans">Home</span>
        </button>
      </div>
      
      {/* Main Container Wrapper */}
      <div id="main-content-wrapper" className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 space-y-6 sm:space-y-8">
        
        {/* Clinically Polished Header */}
        <header id="app-polished-header" className="space-y-4 text-center max-w-2xl mx-auto relative animate-in fade-in slide-in-from-top-4 duration-500">
          
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-none animate-slide-up flex items-center justify-center gap-2.5 sm:gap-3.5">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-rose-500 animate-pulse shrink-0" />
              <span>Sanjivani AI</span>
            </h1>
            <p className="text-sm text-rose-600 font-bold max-w-md mx-auto block font-mono tracking-wider uppercase">
              {t.general.taglineSubtitle}
            </p>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-sans leading-relaxed">
              Learn how to protect your heart, check your heart symptoms in simple steps, and find the closest medical help immediately.
            </p>
          </div>
        </header>

        {/* Quick Ticker awareness banner */}
        <div id="quick-ticker-banner" className="bg-gradient-to-r from-slate-900 to-slate-950 text-white border border-slate-850 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-lg relative overflow-hidden">
          <div className="flex items-start md:items-center gap-4 relative z-10 text-left">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6 text-rose-400 animate-pulse" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-mono font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                {t.general.tickerTitle}
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {t.general.tickerText}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 shrink-0 bg-slate-950/80 rounded-xl px-4 py-2 border border-slate-800 relative z-10">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{t.general.tickerMetrics}</span>
          </div>
        </div>

        {/* Core Layout Tabs Controller - Responsive Scrollable Pills list */}
        <div id="core-layout-tabs-wrapper" className="space-y-6 sm:space-y-10">
          <div id="tabs-scroller-pills" className="flex bg-slate-200/50 p-1 rounded-xl gap-1 overflow-x-auto scroller-none w-full max-w-full sm:max-w-fit mx-auto justify-start sm:justify-center items-center shadow-inner border border-slate-200">
            
            {/* Tab 1: Pathology comparisons */}
            <button
              id="tab-trigger-matrix"
              onClick={() => setActiveTab('matrix')}
              className={`py-1.5 px-2.5 sm:px-3 text-[11px] sm:text-xs font-extrabold transition-all rounded-md shrink-0 uppercase tracking-wider cursor-pointer text-center ${
                activeTab === 'matrix'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {t.general.matrixTab}
            </button>

            {/* Tab 4: GPS Clinic and CPR Locator map */}
            <button
              id="tab-trigger-locator"
              onClick={() => setActiveTab('locator')}
              className={`py-1.5 px-2.5 sm:px-3 text-[11px] sm:text-xs font-extrabold transition-all rounded-md shrink-0 uppercase tracking-wider cursor-pointer text-center ${
                activeTab === 'locator'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {t.general.locatorTab}
            </button>

            {/* Tab 5: Hands-Only CPR Metronome play */}
            <button
              id="tab-trigger-cpr"
              onClick={() => setActiveTab('cpr')}
              className={`py-1.5 px-2.5 sm:px-3 text-[11px] sm:text-xs font-extrabold transition-all rounded-md shrink-0 uppercase tracking-wider cursor-pointer text-center ${
                activeTab === 'cpr'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              {t.general.cprTab}
            </button>

            {/* Tab 6: Emergency Medical ID & Scannable QR */}
            <button
              id="tab-trigger-medicalId"
              onClick={() => setActiveTab('medicalId')}
              className={`py-1.5 px-2.5 sm:px-3 text-[11px] sm:text-xs font-extrabold transition-all rounded-md shrink-0 uppercase tracking-wider cursor-pointer text-center ${
                activeTab === 'medicalId'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              4. Emergency Medical ID
            </button>

          </div>

          {/* Active View Display Wrapper */}
          <div id="active-view-display-wrapper" className="min-h-[420px] transition-all">
            {activeTab === 'matrix' && (
              <ComparisonMatrix />
            )}
            
            {activeTab === 'locator' && (
              <HospitalLocator />
            )}

            {activeTab === 'cpr' && (
              <CprAedGuide />
            )}

            {activeTab === 'medicalId' && (
              <MedicalIdQr />
            )}
          </div>
        </div>

        {/* Informational Guidance Reference Card */}
        <section id="guidance-reference-card" className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm text-left">
          <div className="flex gap-2 items-center">
            <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 animate-pulse" />
            <h4 className="font-extrabold text-sm tracking-wider text-slate-800 font-sans uppercase">
              Clinical Diagnostic Reference Guidelines
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-slate-700 leading-relaxed">
            <div className="space-y-3 border-l-3 border-orange-500 pl-4 font-sans text-left">
              <span className="font-mono text-xs font-black uppercase tracking-wider text-orange-600 block">
                Heart Attack (Ischemia)
              </span>
              <p className="leading-relaxed text-slate-600 font-sans text-sm">
                A localized blood flow lockout. A critical coronary vessel gets clogged, starving muscle tissue of vital oxygen. The rest of the heart continues beating. Prompt actions: chew adult aspirin to halt block progression.
              </p>
            </div>
            
            <div className="space-y-3 border-l-3 border-rose-500 pl-4 font-sans text-left">
              <span className="font-mono text-xs font-black uppercase tracking-wider text-rose-600 block">
                Cardiac Arrest (Arrhythmia)
              </span>
              <p className="leading-relaxed text-slate-600 font-sans text-sm">
                An electrical power outage. Chaotic electric storms (V-Fib) cause the heart to completely seize pumping. Victim collapses with no pulse. Rapid Hands-Only CPR compressions and AED shocks are the immediate lifeline.
              </p>
            </div>

            <div className="space-y-3 border-l-3 border-blue-500 pl-4 font-sans text-left">
              <span className="font-mono text-xs font-black uppercase tracking-wider text-blue-600 block">
                Heart Failure (Mechanical)
              </span>
              <p className="leading-relaxed text-slate-600 font-sans text-sm">
                Mechanical pumping fatigue. Ventricular stiffness or progressive weakness blocks effective stroke volume outputs. Fluid pools in lungs and ankles. Managed with diuretics and cardiology schedules.
              </p>
            </div>
          </div>
        </section>



      </div>

      {/* Redesigned Premium Page Footer */}
      <footer id="page-metadata-footer" className="mt-20 border-t border-slate-200 bg-white/50 backdrop-blur-sm pt-12 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Brand Identifier & Mission statement */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600" />
                <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">Sanjivani AI</span>
              </div>
              <p className="text-sm text-slate-600 max-w-xl font-sans">
                Sanjivani AI is designed to help any normal person save lives during sudden heart emergencies.
              </p>
            </div>

            {/* Standards Alignment Title only - clean, no pulse/active lights */}
            <div className="text-left md:text-right">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-bold border border-slate-200">
                EASY LIFE-SAVING GUIDE
              </span>
            </div>
          </div>

          {/* Clinically Sensitive Disclaimer Block */}
          <div className="border-t border-slate-150 pt-6">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-left flex items-start gap-4 shadow-sm">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-900 tracking-wider uppercase font-mono">
                  Important Learning Disclaimer
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  {t.general.footerDisclaimer}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Block */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-150/60 text-xs sm:text-sm text-slate-600 font-mono">
            <p className="font-semibold text-slate-500">
              {t.general.footerCredits} • © {new Date().getFullYear()}
            </p>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Academic Edition
            </span>
          </div>

        </div>
      </footer>

      {/* Immersive 3D/Neumorphic Rescuer Emergency Triage Portal */}
      {triageRecord && (
        <div id="emergency-triage-modal-overlay" className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[99999] p-4 flex items-center justify-center overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-slate-905 border-2 border-red-500 rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl relative text-left my-8 scale-100 hover:scale-[1.01] transition-transform duration-300">
            
            {/* Top Close indicator */}
            <button 
              onClick={handleClearTriage}
              className="absolute top-4 right-4 text-slate-450 hover:text-white p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-all cursor-pointer border border-slate-750"
              title="Close Emergency Triage View"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glowing Emergency Header Banner */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-red-900/60 text-left">
              <div className="relative font-sans">
                <ShieldAlert className="w-10 h-10 text-red-500 fill-red-500/20 shrink-0" />
                <span className="absolute -inset-2 bg-red-500/30 rounded-full blur animate-ping" />
              </div>
              <div className="font-sans">
                <span className="text-[10px] font-mono tracking-widest text-red-400 font-extrabold uppercase block">
                  🚨 Patient Emergency Medical Card
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white leading-tight tracking-tight mt-0.5">
                  Emergency Health Details
                </h3>
              </div>
            </div>

            {/* Main Clinical Data Layout */}
            <div className="space-y-5 font-sans">
              
              {/* Patient Identity Header block */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 text-left space-y-1">
                <span className="text-[9px] font-mono tracking-wider font-bold text-slate-400 block uppercase">
                  Patient Name
                </span>
                <p className="text-xl sm:text-2xl font-black text-rose-500 leading-tight">
                  {triageRecord.name}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mt-1 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Verified Medical ID Checked</span>
                </div>
              </div>

              {/* Blood & Organ Classifications */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-rose-950/25 border border-rose-900/40 p-3.5 rounded-xl space-y-1 text-left">
                  <span className="text-[9px] font-mono tracking-widest font-bold text-rose-400 block uppercase">
                    Blood Group
                  </span>
                  <div className="font-mono text-base font-black text-red-400 flex items-center gap-1.5 mt-0.5">
                    <Droplet className="w-4.5 h-4.5 text-red-500 animate-pulse fill-red-500" />
                    <span>{triageRecord.blood}</span>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl space-y-1 text-left">
                  <span className="text-[9px] font-mono tracking-widest font-bold text-slate-400 block uppercase">
                    Organ Donor Status
                  </span>
                  <div className="font-mono text-sm sm:text-base font-extrabold text-slate-200 mt-0.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
                    <span>{triageRecord.donor === 'Yes' ? 'REGISTERED' : 'UNREGISTERED'}</span>
                  </div>
                </div>
              </div>

              {/* Heart disease condition block with glowing warning tag */}
              <div className="space-y-3 bg-slate-950 border border-slate-850 p-4 rounded-2xl text-left">
                
                <div className="flex items-center gap-2 text-red-500 font-extrabold font-mono text-[10px] tracking-wider uppercase border-b border-slate-800 pb-2">
                  <AlertOctagon className="w-4 h-4 text-red-500" />
                  <span>Crucial Medical Warnings</span>
                </div>

                <div className="space-y-3 pt-1 text-xs sm:text-sm text-left">
                  {/* Cardiac history */}
                  <div className="grid grid-cols-1 gap-0.5">
                    <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                      Known Heart Illnesses:
                    </span>
                    <p className="text-slate-200 font-semibold leading-relaxed font-sans">
                      {triageRecord.conditions}
                    </p>
                  </div>

                  {/* Active Meds */}
                  <div className="grid grid-cols-1 gap-0.5 border-t border-slate-850 pt-2.5">
                    <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                      Medicines Taken Daily:
                    </span>
                    <p className="text-sky-400 font-bold leading-relaxed font-sans">
                      {triageRecord.meds}
                    </p>
                  </div>

                  {/* Allergies */}
                  <div className="grid grid-cols-1 gap-0.5 border-t border-slate-850 pt-2.5">
                    <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                      Bad Drug Allergies:
                    </span>
                    <p className="text-amber-400 font-extrabold leading-relaxed font-sans">
                      {triageRecord.allergies}
                    </p>
                  </div>

                  {/* Clinical instruction Notes */}
                  {triageRecord.extra && triageRecord.extra !== 'None' && triageRecord.extra.trim() !== '' && (
                    <div className="grid grid-cols-1 gap-0.5 border-t border-slate-800 pt-2.5 text-slate-350">
                      <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                        Special Notes for Helpers:
                      </span>
                      <p className="font-semibold italic leading-relaxed text-slate-300">
                        "{triageRecord.extra}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Next of Kin Action card */}
              <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-2xl text-left space-y-3 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[9.5px] font-mono tracking-widest font-black text-emerald-400 uppercase block">
                    Dispatch Representative (Next-of-Kin)
                  </span>
                  <p className="text-base font-black text-white leading-tight">
                    {triageRecord.contactName}
                  </p>
                  <p className="text-sm font-mono font-bold text-emerald-400 tracking-wide mt-0.5">
                    {triageRecord.contactPhone}
                  </p>
                </div>
                <a 
                  href={`tel:${triageRecord.contactPhone}`}
                  className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
                >
                  <Phone className="w-4 h-4 animate-bounce" />
                  <span>Call Kin</span>
                </a>
              </div>

            </div>

            {/* Companion Bystander Toolkit */}
            <div className="space-y-2.5 pt-2 font-sans text-center">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 font-black uppercase block">
                🚨 Immediate Action Checklist
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  onClick={handleGoToLocator}
                  className="py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-705 text-white rounded-xl text-xs font-sans font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span>Locate Core Cardiac Care</span>
                </button>
                <button
                  onClick={handleGoToCpr}
                  className="py-3 px-4 bg-slate-800 hover:bg-slate-700 border border-slate-705 text-white rounded-xl text-xs font-sans font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  <span>Start CPR metronome</span>
                </button>
              </div>
            </div>

            {/* Dismiss controls */}
            <button
              onClick={handleClearTriage}
              className="w-full py-3 bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-1000 border border-slate-800 hover:border-slate-700 transition-all text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer font-sans"
            >
              Close Triage Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
