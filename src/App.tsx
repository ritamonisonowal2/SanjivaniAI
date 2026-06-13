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
  Menu,
  Home as HomeIcon,
  BookOpen,
  HeartPulse,
  MapPin,
  Activity,
  QrCode,
  ArrowRight,
  Clock,
  Shield,
  Award,
  Zap
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'matrix' | 'symptoms' | 'locator' | 'cpr' | 'medicalId'>('home');
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

  useEffect(() => {
    // Scroll window back to top immediately when activeTab changes
    window.scrollTo({ top: 0, behavior: 'auto' });

    // Set page title dynamically for SEO search indexing
    const titleMap: Record<string, string> = {
      home: "Sanjivani AI - Home Dashboard",
      matrix: "Sanjivani AI - Cardiac Condition Matrix & Core Analogies",
      symptoms: "Sanjivani AI - Check Cardiac Symptoms & Emergency Levels",
      locator: "Sanjivani AI - Find Emergency Cardiac Care Nearby",
      cpr: "Sanjivani AI - Hands-Only CPR & AED Live Metronome Guide",
      medicalId: "Sanjivani AI - Offline Emergency Medical ID QR Generator"
    };
    document.title = titleMap[activeTab] || "Sanjivani AI - Emergency Cardiac Guide";
  }, [activeTab]);

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
      <header id="app-premium-navbar" className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Brand block (Home click handler) */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none shrink-0 group animate-in fade-in slide-in-from-left-4 duration-300"
          >
            <div className="w-9 h-9 rounded-full bg-rose-50 flex items-center justify-center border border-rose-100 group-hover:scale-105 transition-transform duration-200 shadow-sm relative">
              <div className="absolute inset-0 bg-rose-400/10 rounded-full scale-110 blur-xs group-hover:animate-ping-once opacity-50" />
              <Heart className="w-5 h-5 text-rose-500 animate-heartbeat" />
            </div>
            <div className="text-left leading-tight">
              <h1 className="text-base font-black tracking-tight text-slate-950">Sanjivani AI</h1>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1.5 py-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`py-1.5 px-3 rounded-xl text-xs font-extrabold transition-all shrink-0 uppercase tracking-wider cursor-pointer flex items-center gap-1.5 border ${
                activeTab === 'home'
                  ? 'bg-rose-50 border-rose-100 text-rose-600 shadow-xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HomeIcon className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <button
              onClick={() => setActiveTab('matrix')}
              className={`py-1.5 px-3 rounded-xl text-xs font-extrabold transition-all shrink-0 uppercase tracking-wider cursor-pointer flex items-center gap-1.5 border ${
                activeTab === 'matrix'
                  ? 'bg-rose-50 border-rose-100 text-rose-600 shadow-xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Learn</span>
            </button>
            <button
              onClick={() => setActiveTab('symptoms')}
              className={`py-1.5 px-3 rounded-xl text-xs font-extrabold transition-all shrink-0 uppercase tracking-wider cursor-pointer flex items-center gap-1.5 border ${
                activeTab === 'symptoms'
                  ? 'bg-rose-50 border-rose-100 text-rose-600 shadow-xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Symptoms</span>
            </button>
            <button
              onClick={() => setActiveTab('locator')}
              className={`py-1.5 px-3 rounded-xl text-xs font-extrabold transition-all shrink-0 uppercase tracking-wider cursor-pointer flex items-center gap-1.5 border ${
                activeTab === 'locator'
                  ? 'bg-rose-50 border-rose-100 text-rose-600 shadow-xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Hospitals</span>
            </button>
            <button
              onClick={() => setActiveTab('cpr')}
              className={`py-1.5 px-3 rounded-xl text-xs font-extrabold transition-all shrink-0 uppercase tracking-wider cursor-pointer flex items-center gap-1.5 border ${
                activeTab === 'cpr'
                  ? 'bg-rose-50 border-rose-100 text-rose-600 shadow-xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>CPR Guide</span>
            </button>
            <button
              onClick={() => setActiveTab('medicalId')}
              className={`py-1.5 px-3 rounded-xl text-xs font-extrabold transition-all shrink-0 uppercase tracking-wider cursor-pointer flex items-center gap-1.5 border ${
                activeTab === 'medicalId'
                  ? 'bg-rose-50 border-rose-100 text-rose-600 shadow-xs'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Medical ID</span>
            </button>
          </nav>

          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all cursor-pointer shadow-xs"
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
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-md animate-slide-down sticky top-16 z-50 shadow-md">
          <nav className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-1.5 text-left">
            <button
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all uppercase tracking-wider text-left cursor-pointer flex items-center gap-2.5 border ${
                activeTab === 'home'
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HomeIcon className="w-4 h-4" />
              <span>Home Dashboard</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('matrix');
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all uppercase tracking-wider text-left cursor-pointer flex items-center gap-2.5 border ${
                activeTab === 'matrix'
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Learn Heart Problems</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('symptoms');
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all uppercase tracking-wider text-left cursor-pointer flex items-center gap-2.5 border ${
                activeTab === 'symptoms'
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HeartPulse className="w-4 h-4" />
              <span>Symptom Checker</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('locator');
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all uppercase tracking-wider text-left cursor-pointer flex items-center gap-2.5 border ${
                activeTab === 'locator'
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Find Hospitals</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('cpr');
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all uppercase tracking-wider text-left cursor-pointer flex items-center gap-2.5 border ${
                activeTab === 'cpr'
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>CPR AED Guide</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('medicalId');
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-extrabold transition-all uppercase tracking-wider text-left cursor-pointer flex items-center gap-2.5 border ${
                activeTab === 'medicalId'
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>Emergency Medical ID</span>
            </button>
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <main id="main-content-wrapper" className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 min-h-[calc(100vh-4rem-12rem)] transition-all">
        
        {activeTab === 'home' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Redesigned Premium Landing Hero Banner */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-700/40 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Background ambient light decorations */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-rose-950/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex-1 space-y-6 text-left relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                  Your Life-Saving Companion
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  {t.home.heroTitle}
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                  {t.home.heroSubtitle}
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => setActiveTab('cpr')}
                    className="px-6 py-3.5 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-rose-600/20 flex items-center gap-2 cursor-pointer border border-rose-500"
                  >
                    <Zap className="w-4 h-4 fill-white animate-pulse" />
                    <span>{t.home.ctaEmergency}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('matrix')}
                    className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-700 active:bg-slate-900 text-slate-100 font-bold text-sm uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer border border-slate-700"
                  >
                    <span>{t.home.ctaLearn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Decorative Heartbeat pulse wave SVG */}
              <div className="w-full md:w-2/5 flex justify-center relative z-10 shrink-0">
                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-rose-500/10 rounded-full scale-125 blur-xl animate-pulse-ring" />
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-rose-950/60 flex items-center justify-center border border-rose-500/30 shadow-inner group">
                    <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-rose-500 fill-rose-500 animate-heartbeat" />
                  </div>
                  {/* Decorative ECG line layout */}
                  <svg className="absolute w-48 h-24 overflow-visible pointer-events-none text-rose-500/20" viewBox="0 0 200 100">
                    <path
                      d="M 10,50 L 50,50 L 60,20 L 70,80 L 80,45 L 90,55 L 100,50 L 140,50 L 150,15 L 160,85 L 170,45 L 180,55 L 190,50 L 210,50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      className="animate-ecg-normal"
                      d="M 10,50 L 50,50 L 60,20 L 70,80 L 80,45 L 90,55 L 100,50 L 140,50 L 150,15 L 160,85 L 170,45 L 180,55 L 190,50 L 210,50"
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Care Modules Listing */}
            <div className="space-y-6 text-left">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                  <HeartPulse className="w-6 h-6 text-rose-500" />
                  <span>{t.home.featuresTitle}</span>
                </h3>
                <p className="text-sm text-slate-500 mt-1 max-w-2xl font-sans font-medium">
                  {t.home.featuresSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 1. Condition Matrix */}
                <div 
                  onClick={() => setActiveTab('matrix')}
                  className="bg-white border border-slate-200 hover:border-rose-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-100 group-hover:scale-105 transition-transform">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                        {t.home.featureMatrixTitle}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        {t.home.featureMatrixDesc}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider pt-5 mt-auto">
                    <span>Learn Modules</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 2. Symptom Checker */}
                <div 
                  onClick={() => setActiveTab('symptoms')}
                  className="bg-white border border-slate-200 hover:border-rose-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-100 group-hover:scale-105 transition-transform">
                      <HeartPulse className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                        {t.home.featureSymptomTitle}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        {t.home.featureSymptomDesc}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider pt-5 mt-auto">
                    <span>Run Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 3. Hospital Locator */}
                <div 
                  onClick={() => setActiveTab('locator')}
                  className="bg-white border border-slate-200 hover:border-rose-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-100 group-hover:scale-105 transition-transform">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                        {t.home.featureLocatorTitle}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        {t.home.featureLocatorDesc}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider pt-5 mt-auto">
                    <span>Scan Facilities</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 4. CPR AED metronome */}
                <div 
                  onClick={() => setActiveTab('cpr')}
                  className="bg-white border border-slate-200 hover:border-rose-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-100 group-hover:scale-105 transition-transform">
                      <Activity className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                        {t.home.featureCprTitle}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        {t.home.featureCprDesc}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider pt-5 mt-auto">
                    <span>Open Metronome</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 5. Medical ID */}
                <div 
                  onClick={() => setActiveTab('medicalId')}
                  className="bg-white border border-slate-200 hover:border-rose-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-100 group-hover:scale-105 transition-transform">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                        {t.home.featureIdTitle}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        {t.home.featureIdDesc}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider pt-5 mt-auto">
                    <span>Compile ID QR</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Did you know stats section */}
            <div className="bg-slate-100 border border-slate-200 rounded-3xl p-6 md:p-8 text-left space-y-6">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-rose-500 animate-pulse" />
                <span>{t.home.didYouKnowTitle}</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t.home.didYouKnowText1}
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
                    <Heart className="w-4.5 h-4.5" />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t.home.didYouKnowText2}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs space-y-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
                    <Award className="w-4.5 h-4.5" />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {t.home.didYouKnowText3}
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Action Banner */}
            <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left shadow-xs">
              <div className="space-y-1.5">
                <h4 className="text-base font-black text-rose-800 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-600" />
                  <span>{t.home.emergencyCardTitle}</span>
                </h4>
                <p className="text-xs text-slate-605 leading-relaxed max-w-2xl font-sans">
                  {t.home.emergencyCardDesc}
                </p>
              </div>
              <a 
                href="tel:112"
                className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm shrink-0 border border-rose-500 cursor-pointer text-center"
              >
                <Phone className="w-4 h-4 text-rose-200 animate-bounce" />
                <span>{t.home.emergencyCardBtn}</span>
              </a>
            </div>

          </div>
        )}

        {activeTab === 'matrix' && (
          <ComparisonMatrix />
        )}

        {activeTab === 'symptoms' && (
          <SymptomChecker onSwitchTab={setActiveTab} />
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
                  className="py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
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
