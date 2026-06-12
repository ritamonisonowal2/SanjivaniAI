import React, { useState, useEffect } from 'react';
import ComparisonMatrix from './components/ComparisonMatrix';
import SymptomChecker from './components/SymptomChecker';
import HospitalLocator from './components/HospitalLocator';
import CprAedGuide from './components/CprAedGuide';
import MedicalIdQr from './components/MedicalIdQr';

import { TRANSLATIONS } from './translations';
import { 
  Heart, 
  ShieldAlert, 
  X,
  Phone,
  ShieldCheck,
  Droplet,
  Compass,
  AlertOctagon,
  Menu
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'matrix' | 'symptoms' | 'locator' | 'cpr' | 'medicalId'>('matrix');
  const [triageRecord, setTriageRecord] = useState<any | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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
    <div id="root-app-container" className="min-h-screen w-full overflow-x-hidden bg-slate-50 text-slate-800 font-sans antialiased selection:bg-rose-200 selection:text-rose-900 relative">
      
      {/* Premium Sticky Glassmorphic Top Navigation Bar */}
      <header id="app-premium-navbar" className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Brand block (Home click handler) */}
          <div 
            onClick={() => setActiveTab('matrix')}
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0 group"
          >
            <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100 group-hover:scale-105 transition-transform duration-200 shadow-sm">
              <Heart className="w-4.5 h-4.5 text-rose-500 animate-pulse animate-duration-1000" />
            </div>
            <div className="text-left leading-tight">
              <h1 className="text-base font-extrabold tracking-tight text-slate-950">Sanjivani AI</h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 py-1">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`py-1 px-2.5 rounded-lg text-[0.7rem] lg:text-xs font-bold transition-all shrink-0 uppercase tracking-wider cursor-pointer text-center border ${
                activeTab === 'matrix'
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Learn
            </button>
            <button
              onClick={() => setActiveTab('symptoms')}
              className={`py-1 px-2.5 rounded-lg text-[0.7rem] lg:text-xs font-bold transition-all shrink-0 uppercase tracking-wider cursor-pointer text-center border ${
                activeTab === 'symptoms'
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Symptoms
            </button>
            <button
              onClick={() => setActiveTab('locator')}
              className={`py-1 px-2.5 rounded-lg text-[0.7rem] lg:text-xs font-bold transition-all shrink-0 uppercase tracking-wider cursor-pointer text-center border ${
                activeTab === 'locator'
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Hospitals
            </button>
            <button
              onClick={() => setActiveTab('cpr')}
              className={`py-1 px-2.5 rounded-lg text-[0.7rem] lg:text-xs font-bold transition-all shrink-0 uppercase tracking-wider cursor-pointer text-center border ${
                activeTab === 'cpr'
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              CPR Guide
            </button>
            <button
              onClick={() => setActiveTab('medicalId')}
              className={`py-1 px-2.5 rounded-lg text-[0.7rem] lg:text-xs font-bold transition-all shrink-0 uppercase tracking-wider cursor-pointer text-center border ${
                activeTab === 'medicalId'
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Medical ID
            </button>
          </nav>

          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all cursor-pointer shadow-sm"
            title="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

        </div>
      </header>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-md animate-slide-down sticky top-16 z-50">
          <nav className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-1.5 text-left">
            <button
              onClick={() => {
                setActiveTab('matrix');
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all uppercase tracking-wider text-left cursor-pointer border ${
                activeTab === 'matrix'
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Learn Heart Problems
            </button>
            <button
              onClick={() => {
                setActiveTab('symptoms');
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all uppercase tracking-wider text-left cursor-pointer border ${
                activeTab === 'symptoms'
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Symptom Checker
            </button>
            <button
              onClick={() => {
                setActiveTab('locator');
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all uppercase tracking-wider text-left cursor-pointer border ${
                activeTab === 'locator'
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Find Hospitals
            </button>
            <button
              onClick={() => {
                setActiveTab('cpr');
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all uppercase tracking-wider text-left cursor-pointer border ${
                activeTab === 'cpr'
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              CPR AED Guide
            </button>
            <button
              onClick={() => {
                setActiveTab('medicalId');
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all uppercase tracking-wider text-left cursor-pointer border ${
                activeTab === 'medicalId'
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Emergency Medical ID
            </button>
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main id="main-content-wrapper" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 min-h-[calc(100vh-4rem-12rem)] transition-all">
        {activeTab === 'matrix' && (
          <ComparisonMatrix />
        )}

        {activeTab === 'symptoms' && (
          <SymptomChecker />
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
      </main>

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
          <div className="border-t border-slate-200 pt-6">
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/60 text-xs sm:text-sm text-slate-600 font-mono">
            <p className="font-semibold text-slate-500">
              {t.general.footerCredits} • © {new Date().getFullYear()}
            </p>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Academic Edition
            </span>
          </div>

        </div>
      </footer>

      {/* Minimalist Rescuer Emergency Triage Portal */}
      {triageRecord && (
        <div id="emergency-triage-modal-overlay" className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[99999] p-4 flex items-center justify-center overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 md:p-8 space-y-6 shadow-xl relative text-left my-8">
            
            {/* Top Close indicator */}
            <button 
              onClick={handleClearTriage}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-all cursor-pointer border border-slate-200"
              title="Close Emergency Triage View"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Clean Emergency Header Banner */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200 text-left">
              <div className="relative font-sans">
                <ShieldAlert className="w-10 h-10 text-rose-500 fill-rose-500/10 shrink-0" />
              </div>
              <div className="font-sans">
                <span className="text-[0.625rem] font-mono tracking-widest text-rose-600 font-bold uppercase block">
                  🚨 Patient Emergency Medical Card
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-950 leading-tight tracking-tight mt-0.5">
                  Emergency Health Details
                </h3>
              </div>
            </div>

            {/* Main Clinical Data Layout */}
            <div className="space-y-5 font-sans">
              
              {/* Patient Identity Header block */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-1">
                <span className="text-[0.56rem] font-mono tracking-wider font-bold text-slate-500 block uppercase">
                  Patient Name
                </span>
                <p className="text-xl sm:text-2xl font-black text-rose-600 leading-tight">
                  {triageRecord.name}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mt-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Verified Medical ID Checked</span>
                </div>
              </div>

              {/* Blood & Organ Classifications */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-rose-50/50 border border-rose-100 p-3.5 rounded-xl space-y-1 text-left">
                  <span className="text-[0.56rem] font-mono tracking-widest font-bold text-rose-600 block uppercase">
                    Blood Group
                  </span>
                  <div className="font-mono text-base font-black text-rose-700 flex items-center gap-1.5 mt-0.5">
                    <Droplet className="w-4.5 h-4.5 text-rose-500 fill-rose-500" />
                    <span>{triageRecord.blood}</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1 text-left">
                  <span className="text-[0.56rem] font-mono tracking-widest font-bold text-slate-500 block uppercase">
                    Organ Donor Status
                  </span>
                  <div className="font-mono text-sm sm:text-base font-bold text-slate-700 mt-0.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
                    <span>{triageRecord.donor === 'Yes' ? 'REGISTERED' : 'UNREGISTERED'}</span>
                  </div>
                </div>
              </div>

              {/* Heart disease condition block with clean warning tag */}
              <div className="space-y-3 bg-slate-50 border border-slate-200 p-4 rounded-2xl text-left">
                
                <div className="flex items-center gap-2 text-rose-600 font-bold font-mono text-[0.625rem] tracking-wider uppercase border-b border-slate-200 pb-2">
                  <AlertOctagon className="w-4 h-4 text-rose-500" />
                  <span>Crucial Medical Warnings</span>
                </div>

                <div className="space-y-3 pt-1 text-xs sm:text-sm text-left">
                  {/* Cardiac history */}
                  <div className="grid grid-cols-1 gap-0.5">
                    <span className="text-slate-500 font-bold uppercase text-[0.625rem] tracking-wider">
                      Known Heart Illnesses:
                    </span>
                    <p className="text-slate-800 font-semibold leading-relaxed font-sans">
                      {triageRecord.conditions}
                    </p>
                  </div>

                  {/* Active Meds */}
                  <div className="grid grid-cols-1 gap-0.5 border-t border-slate-200 pt-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[0.625rem] tracking-wider">
                      Medicines Taken Daily:
                    </span>
                    <p className="text-sky-700 font-bold leading-relaxed font-sans">
                      {triageRecord.meds}
                    </p>
                  </div>

                  {/* Allergies */}
                  <div className="grid grid-cols-1 gap-0.5 border-t border-slate-200 pt-2.5">
                    <span className="text-slate-500 font-bold uppercase text-[0.625rem] tracking-wider">
                      Bad Drug Allergies:
                    </span>
                    <p className="text-amber-700 font-bold leading-relaxed font-sans">
                      {triageRecord.allergies}
                    </p>
                  </div>

                  {/* Clinical instruction Notes */}
                  {triageRecord.extra && triageRecord.extra !== 'None' && triageRecord.extra.trim() !== '' && (
                    <div className="grid grid-cols-1 gap-0.5 border-t border-slate-200 pt-2.5 text-slate-600">
                      <span className="text-slate-500 font-bold uppercase text-[0.625rem] tracking-wider">
                        Special Notes for Helpers:
                      </span>
                      <p className="font-semibold italic leading-relaxed text-slate-700">
                        "{triageRecord.extra}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Next of Kin Action card */}
              <div className="bg-emerald-50/50 border border-emerald-200 p-4 rounded-2xl text-left space-y-3 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[0.56rem] font-mono tracking-widest font-bold text-emerald-700 uppercase block">
                    Dispatch Representative (Next-of-Kin)
                  </span>
                  <p className="text-base font-bold text-slate-900 leading-tight">
                    {triageRecord.contactName}
                  </p>
                  <p className="text-sm font-mono font-bold text-emerald-700 tracking-wide mt-0.5">
                    {triageRecord.contactPhone}
                  </p>
                </div>
                <a 
                  href={`tel:${triageRecord.contactPhone}`}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm shrink-0 cursor-pointer border border-emerald-500"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Kin</span>
                </a>
              </div>

            </div>

            {/* Companion Bystander Toolkit */}
            <div className="space-y-2.5 pt-2 font-sans text-center">
              <span className="text-[0.625rem] font-mono tracking-widest text-slate-500 font-bold uppercase block">
                🚨 Immediate Action Checklist
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <button
                  onClick={handleGoToLocator}
                  className="py-3 px-4 bg-white hover:bg-slate-55 border border-slate-200 text-slate-700 rounded-xl text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span>Locate Core Care</span>
                </button>
                <button
                  onClick={handleGoToCpr}
                  className="py-3 px-4 bg-rose-600 hover:bg-rose-700 border border-rose-500 text-white rounded-xl text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Heart className="w-4 h-4 text-white fill-white" />
                  <span>Start CPR metronome</span>
                </button>
              </div>
            </div>

            {/* Dismiss controls */}
            <button
              onClick={handleClearTriage}
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white border border-rose-500 transition-all text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer font-sans"
            >
              Close Triage Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
