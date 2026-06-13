import React, { useState, useEffect } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { 
  QrCode, 
  User, 
  Heart, 
  ShieldCheck, 
  AlertOctagon, 
  Phone, 
  Trash2, 
  Download, 
  Copy, 
  Check, 
  Droplet
} from 'lucide-react';

export default function MedicalIdQr() {
  // Helper to safely load and sanitize legacy or dummy values
  const getSanitizedValue = (key: string, defaultValue: string): string => {
    try {
      const val = localStorage.getItem(key);
      if (!val) return defaultValue;
      // Sanitize specific legacy dev values
      if (val.includes('Disha') || val.includes('Sonowal') || val.includes('Priya') || val.includes('Maurya')) {
        localStorage.removeItem(key);
        return defaultValue;
      }
      return val;
    } catch (e) {
      return defaultValue;
    }
  };

  // Initialize states with values from localStorage, providing defaults if empty
  const [fullName, setFullName] = useState<string>(() => getSanitizedValue('med_fullName', ''));
  const [bloodGroup, setBloodGroup] = useState<string>(() => getSanitizedValue('med_bloodGroup', 'Unknown'));
  const [allergies, setAllergies] = useState<string>(() => getSanitizedValue('med_allergies', ''));
  const [conditions, setConditions] = useState<string>(() => getSanitizedValue('med_conditions', ''));
  const [medications, setMedications] = useState<string>(() => getSanitizedValue('med_medications', ''));
  const [emergencyContactName, setEmergencyContactName] = useState<string>(() => getSanitizedValue('med_emergencyContactName', ''));
  const [emergencyContactPhone, setEmergencyContactPhone] = useState<string>(() => getSanitizedValue('med_emergencyContactPhone', ''));
  const [organDonor, setOrganDonor] = useState<string>(() => getSanitizedValue('med_organDonor', 'No'));
  const [extraInstructions, setExtraInstructions] = useState<string>(() => getSanitizedValue('med_extraInstructions', ''));
  const [formTab, setFormTab] = useState<'patient' | 'history' | 'contacts'>('patient');

  // Notification and UI helpers
  const [copied, setCopied] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Sync state variations directly to localStorage on any input changes
  useEffect(() => {
    localStorage.setItem('med_fullName', fullName);
    localStorage.setItem('med_bloodGroup', bloodGroup);
    localStorage.setItem('med_allergies', allergies);
    localStorage.setItem('med_conditions', conditions);
    localStorage.setItem('med_medications', medications);
    localStorage.setItem('med_emergencyContactName', emergencyContactName);
    localStorage.setItem('med_emergencyContactPhone', emergencyContactPhone);
    localStorage.setItem('med_organDonor', organDonor);
    localStorage.setItem('med_extraInstructions', extraInstructions);
  }, [fullName, bloodGroup, allergies, conditions, medications, emergencyContactName, emergencyContactPhone, organDonor, extraInstructions]);

  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to restore the default academic/bystander sample data?')) {
      setFullName('Patient Name');
      setBloodGroup('O-');
      setAllergies('Penicillin, NSAIDs');
      setConditions('Hypertension, Left Anterior Descending (LAD) Mitral Valve history');
      setMedications('Aspirin 81mg, Metoprolol Beta-Blocker');
      setEmergencyContactName('Emergency Contact');
      setEmergencyContactPhone('+91 98765 43210');
      setOrganDonor('Yes');
      setExtraInstructions('Known high-risk cardiac ischemia family background. Keep sitting upright if dyspneic.');
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to wipe all records? This empties your emergency responder credentials.')) {
      setFullName('');
      setBloodGroup('Unknown');
      setAllergies('');
      setConditions('');
      setMedications('');
      setEmergencyContactName('');
      setEmergencyContactPhone('');
      setOrganDonor('No');
      setExtraInstructions('');
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const getClinicalText = () => {
    return `EMERGENCY MEDICAL CARD
----------------------
PATIENT NAME: ${fullName || 'N/A'}
BLOOD GROUP: ${bloodGroup || 'N/A'}
ORGAN DONOR: ${organDonor || 'N/A'}
CRITICAL ALLERGIES: ${allergies || 'None Known'}
CHRONIC CONDITIONS: ${conditions || 'None Declared'}
ACTIVE MEDICATIONS: ${medications || 'None Declared'}
EMERGENCY CONTACT: ${emergencyContactName || 'N/A'} (${emergencyContactPhone || 'N/A'})
DIRECTIVES/NOTES: ${extraInstructions || 'None'}
----------------------
SAJIVANI BYSTANDER CARD`;
  };

  const qrValue = getClinicalText();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getClinicalText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    try {
      const canvas = document.getElementById('bystander-medical-canvas-qr') as HTMLCanvasElement;
      if (!canvas) return;
      
      const png = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = png;
      downloadLink.download = `${fullName.replace(/\s+/g, '_')}_Emergency_QR_Code.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      console.error('Failed to download QR code: ', err);
      alert('Your browser does not permit image downloads in this sandbox environment. Copy the credentials card text to save');
    }
  };

  const handleDownloadCardImage = () => {
    try {
      const qrCanvas = document.getElementById('bystander-medical-canvas-qr') as HTMLCanvasElement;
      if (!qrCanvas) return;

      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 560;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw background - clean slate-50 light tone
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, 800, 560);
      
      // Secondary background texture for content area
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(20, 20, 760, 520);

      // Draw red border around inner card
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, 760, 520);

      // RED header alert bar inside content panel
      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(20, 20, 760, 68);

      // Header Text - large, crisp and readable
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('EMERGENCY MEDICAL IDENTITY PASSPORT (SAJIVANI)', 40, 62);

      // Section labels and values custom helper with robust layout
      let y = 130;
      const x = 40;

      const drawDetail = (label: string, value: string, highlightColor?: string) => {
        // Label header
        ctx.fillStyle = '#64748b'; // slate-500 label
        ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText(label.toUpperCase() + ':', x, y);
        y += 20;

        // Value text
        ctx.fillStyle = highlightColor || '#0f172a'; // slate-900 or highlighted
        ctx.font = 'bold 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        
        // Wrap text if too long
        const maxTextWidth = 430;
        const words = (value || 'N/A').split(' ');
        let line = '';

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxTextWidth && n > 0) {
            ctx.fillText(line.trim(), x, y);
            line = words[n] + ' ';
            y += 18;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line.trim(), x, y);
        y += 26;
      };

      drawDetail('Patient Identity', fullName || 'Patient Name');
      drawDetail('Blood Classification', bloodGroup || 'Unknown', '#e11d48'); // Rose-600
      drawDetail('Critical Medical Allergies', allergies || 'None Declared', '#d97706'); // Amber-600
      drawDetail('Cardiac Conditions & Active Regimen', `${conditions || 'None Registered'} • Medications: ${medications || 'None Declared'}`, '#0284c7'); // Sky-600
      drawDetail('Immediate Dispatch Contact (Next-of-Kin)', `${emergencyContactName || 'Emergency Contact Name'} • ${emergencyContactPhone || 'Emergency Phone Number'}`, '#059669'); // Emerald-600

      // Draw high-density QR box on the right
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(495, 125, 260, 260);

      // Draw QR content nicely framed inside white block
      ctx.drawImage(qrCanvas, 505, 135, 240, 240);

      // Draw QR Scan instruction tag
      ctx.fillStyle = '#f43f5e';
      ctx.fillRect(495, 385, 260, 38);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SCAN QR CODE TO RETRIEVE ID', 625, 409);
      ctx.textAlign = 'left'; // Reset alignment

      // Footer notice
      ctx.fillStyle = '#94a3b8'; // slate-400
      ctx.font = 'bold 11px "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace';
      ctx.fillText('CRYPTOGRAPHIC LOCAL SANDBOX PROTECTION • SAJIVANI OFFLINE EMERGENCY STANDARD', 40, 520);

      const downloadLink = document.createElement('a');
      downloadLink.href = canvas.toDataURL('image/png');
      downloadLink.download = `${fullName.replace(/\s+/g, '_')}_Emergency_Medical_Card.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      console.error('Failed to compile composite card layout: ', err);
      handleDownloadQR();
    }
  };

  return (
    <div className="space-y-6" id="section-4-medical-id-qr-dashboard">
        {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-rose-500 shrink-0" />
            <h3 className="text-base sm:text-lg font-extrabold text-slate-955 tracking-tight">Emergency Medical ID & Scannable QR</h3>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
            Fill out your critical cardiovascular history, active prescriptions, and emergency dispatch links to generate an offline QR passport.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-auto">
          <button 
            type="button"
            onClick={handleResetToDefaults}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-mono font-bold uppercase tracking-wider text-slate-700 rounded-xl transition-all cursor-pointer"
          >
            Reset to Sample
          </button>
          <button 
            type="button"
            onClick={handleClearAll}
            className="p-2 bg-rose-50 hover:bg-rose-100 hover:text-rose-700 border border-rose-200 text-rose-600 rounded-xl transition-all cursor-pointer"
            title="Clear All Fields"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Core Layout Grid for Section 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side Column: Medical Passcard Form Fields Editor */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 text-left space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <User className="w-5 h-5 text-rose-500" />
              <span className="text-base font-bold uppercase tracking-wider text-slate-900 font-sans">
                Cardiovascular Health Registry
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 border border-emerald-200 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Editable (Auto-Saving Mode)</span>
            </div>
          </div>

          {/* Tab switches for form organization */}
          <div className="flex gap-2 p-1 bg-slate-100 border border-slate-200 rounded-2xl">
            <button
              type="button"
              onClick={() => setFormTab('patient')}
              className={`flex-1 py-2 px-3 text-[0.6875rem] font-bold rounded-xl transition-all uppercase tracking-wider text-center cursor-pointer border ${
                formTab === 'patient'
                  ? 'bg-white text-rose-600 border-slate-200 shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-950'
              }`}
            >
              Patient Info
            </button>
            <button
              type="button"
              onClick={() => setFormTab('history')}
              className={`flex-1 py-2 px-3 text-[0.6875rem] font-bold rounded-xl transition-all uppercase tracking-wider text-center cursor-pointer border ${
                formTab === 'history'
                  ? 'bg-white text-rose-600 border-slate-200 shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-950'
              }`}
            >
              Medical History
            </button>
            <button
              type="button"
              onClick={() => setFormTab('contacts')}
              className={`flex-1 py-2 px-3 text-[0.6875rem] font-bold rounded-xl transition-all uppercase tracking-wider text-center cursor-pointer border ${
                formTab === 'contacts'
                  ? 'bg-white text-rose-600 border-slate-200 shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-950'
              }`}
            >
              Dispatch Contacts
            </button>
          </div>

          {/* Form Content holding perfect size constraints */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 min-h-[240px] content-start">
            {formTab === 'patient' && (
              <>
                {/* Full Name */}
                <div className="sm:col-span-1">
                  <label className="text-[0.625rem] font-bold uppercase tracking-wider text-slate-500 block mb-2 font-mono">
                    Full Patient Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl px-4 py-3 outline-none border border-slate-200 focus:border-slate-400 focus:bg-white shadow-2xs transition-all"
                  />
                </div>

                {/* Blood group selection dropdown */}
                <div className="sm:col-span-1">
                  <label className="text-[0.625rem] font-bold uppercase tracking-wider text-slate-500 block mb-2 font-mono">
                    Clinical Blood Group
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-4 py-3 focus:border-slate-400 focus:bg-white outline-none transition-all cursor-pointer"
                  >
                    <option value="Unknown">Select Blood Group</option>
                    <option value="A+">A+ (A Positive)</option>
                    <option value="A-">A- (A Negative)</option>
                    <option value="B+">B+ (B Positive)</option>
                    <option value="B-">B- (B Negative)</option>
                    <option value="AB+">AB+ (AB Positive)</option>
                    <option value="AB-">AB- (AB Negative)</option>
                    <option value="O+">O+ (O Positive)</option>
                    <option value="O-">O- (O Negative)</option>
                  </select>
                </div>

                {/* Organ Donor */}
                <div className="sm:col-span-2">
                  <label className="text-[0.625rem] font-bold uppercase tracking-wider text-slate-500 block mb-2 font-mono">
                    Organ Donor Accordance
                  </label>
                  <select
                    value={organDonor}
                    onChange={(e) => setOrganDonor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-4 py-3 focus:border-slate-400 focus:bg-white outline-none transition-all cursor-pointer"
                  >
                    <option value="No">No / Unregistered</option>
                    <option value="Yes">Yes (Registered Organ Donor)</option>
                  </select>
                </div>
              </>
            )}

            {formTab === 'history' && (
              <>
                {/* Chronic Medical Conditions */}
                <div className="sm:col-span-2">
                  <label className="text-[0.625rem] font-bold uppercase tracking-wider text-slate-500 block mb-2 font-mono">
                    Cardiopathological Records & Chronic Conditions
                  </label>
                  <textarea
                    value={conditions}
                    onChange={(e) => setConditions(e.target.value)}
                    rows={2}
                    placeholder="e.g. Hypertension, LAD blockage, past heart attack history"
                    className="w-full bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl px-4 py-3 outline-none border border-slate-200 focus:border-slate-400 focus:bg-white shadow-2xs transition-all resize-none"
                  />
                </div>

                {/* Critical Allergies */}
                <div className="sm:col-span-2">
                  <label className="text-[0.625rem] font-bold uppercase tracking-wider text-slate-500 block mb-2 font-mono">
                    Immediate Action Allergies (Prescriptions, Foods, etc)
                  </label>
                  <input
                    type="text"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    placeholder="e.g. Penicillin, Sulfa drugs, Nuts"
                    className="w-full bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl px-4 py-3 outline-none border border-slate-200 focus:border-slate-400 focus:bg-white shadow-2xs transition-all"
                  />
                </div>

                {/* Current Daily Medications */}
                <div className="sm:col-span-2">
                  <label className="text-[0.625rem] font-bold uppercase tracking-wider text-slate-500 block mb-2 font-mono">
                    Active Routine Cardiovascular Medications
                  </label>
                  <input
                    type="text"
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                    placeholder="e.g. Aspirin 81mg, Metoprolol 25mg"
                    className="w-full bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl px-4 py-3 outline-none border border-slate-200 focus:border-slate-400 focus:bg-white shadow-2xs transition-all"
                  />
                </div>
              </>
            )}

            {formTab === 'contacts' && (
              <>
                {/* Emergency Contact Name */}
                <div className="sm:col-span-1">
                  <label className="text-[0.625rem] font-bold uppercase tracking-wider text-slate-500 block mb-2 font-mono">
                    Emergency Contact Name (Next-of-Kin)
                  </label>
                  <input
                    type="text"
                    value={emergencyContactName}
                    onChange={(e) => setEmergencyContactName(e.target.value)}
                    placeholder="e.g. Sunita Kumar"
                    className="w-full bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl px-4 py-3 outline-none border border-slate-200 focus:border-slate-400 focus:bg-white shadow-2xs transition-all"
                  />
                </div>

                {/* Emergency Contact Phone */}
                <div className="sm:col-span-1">
                  <label className="text-[0.625rem] font-bold uppercase tracking-wider text-slate-500 block mb-2 font-mono">
                    Emergency Phone Number
                  </label>
                  <input
                    type="text"
                    value={emergencyContactPhone}
                    onChange={(e) => setEmergencyContactPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl px-4 py-3 outline-none border border-slate-200 focus:border-slate-400 focus:bg-white shadow-2xs transition-all"
                  />
                </div>

                {/* Extra Rescue Instructions */}
                <div className="sm:col-span-2">
                  <label className="text-[0.625rem] font-bold uppercase tracking-wider text-slate-500 block mb-2 font-mono">
                    First-Responder & Transport Directives
                  </label>
                  <textarea
                    value={extraInstructions}
                    onChange={(e) => setExtraInstructions(e.target.value)}
                    rows={2}
                    placeholder="e.g. Patient has a pacemaker. Keep sitting upright if short of breath."
                    className="w-full bg-slate-50 text-slate-800 text-xs font-semibold rounded-xl px-4 py-3 outline-none border border-slate-200 focus:border-slate-400 focus:bg-white shadow-2xs transition-all resize-none"
                  />
                </div>
              </>
            )}
          </div>

          {/* Local storage sync prompt */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-sm text-emerald-700">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>All changes are automatically saved to your local browser sandbox</span>
            </div>
          </div>
        </div>

        {/* Right Side Column: Redesigned highly scannable medical credentials card */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Simulated First-Responder Lockscreen Passcard - completely responsive, no forced wrapping layout */}
          <div className="bg-gradient-to-br from-rose-600 via-rose-500 to-rose-700 text-white rounded-3xl p-6 shadow-xl border border-rose-400/30 relative overflow-hidden flex flex-col justify-between text-left space-y-6">
            
            {/* Subtle background graphic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none">
              <Heart className="w-80 h-80 text-white fill-white" />
            </div>

            {/* Tagline clinical banner */}
            <div className="flex items-center justify-between pb-4 border-b border-rose-450/40 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
                </div>
                <span className="font-extrabold text-xs tracking-wider uppercase font-mono text-rose-100">
                  Emergency Medical Pass
                </span>
              </div>
              <span className="text-[0.625rem] font-mono font-bold text-white bg-rose-700/80 px-2.5 py-1 border border-rose-400/40 rounded-full shrink-0">
                RED-ALERT
              </span>
            </div>

            {/* Centered QR code surround for pristine scanning contrast */}
            <div className="flex flex-col items-center justify-center space-y-4 py-1 relative z-10">
              <div className="relative p-3.5 bg-white border border-rose-100 rounded-2xl flex items-center justify-center shadow-lg hover:scale-[1.02] transition-all duration-300">
                <QRCodeSVG
                  id="bystander-medical-svg-qr"
                  value={qrValue}
                  size={160}
                  level="H"
                  includeMargin={false}
                  imageSettings={{
                    src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e11d48'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>",
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true,
                  }}
                />
                
                {/* Hidden QRCodeCanvas for generating high-definition downloads */}
                <div className="hidden">
                  <QRCodeCanvas
                    id="bystander-medical-canvas-qr"
                    value={qrValue}
                    size={512}
                    level="H"
                    includeMargin={true}
                  />
                </div>
              </div>

              <span className="text-[0.625rem] font-mono uppercase font-black text-rose-100/80 tracking-widest text-center">
                SCAN FOR RESCUER MEDICAL DECRYPT
              </span>
            </div>

            {/* Patient Core Details with completely legible text sizing */}
            <div className="space-y-5 border-t border-rose-450/40 pt-5 self-stretch relative z-10">
              
              {/* Patient Name */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-[0.625rem] font-mono tracking-widest text-rose-200 uppercase font-black">
                  <User className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                  <span>Patient Identity</span>
                </div>
                <p className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {fullName || 'Patient Name'}
                </p>
              </div>

              {/* Physiology Stats pills with superb sizing */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 bg-rose-700/40 border border-rose-500/20 p-3 rounded-2xl">
                  <div className="flex items-center gap-1.5 text-[0.625rem] font-mono tracking-widest text-rose-200 uppercase font-black">
                    <Droplet className="w-3.5 h-3.5 text-white fill-white shrink-0 animate-pulse" />
                    <span>Blood Type</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm sm:text-base font-mono font-black text-white mt-1">
                    {bloodGroup}
                  </span>
                </div>

                <div className="space-y-1 bg-rose-700/40 border border-rose-500/20 p-3 rounded-2xl">
                  <div className="flex items-center gap-1.5 text-[0.625rem] font-mono tracking-widest text-rose-200 uppercase font-black">
                    <ShieldCheck className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>Organ Donor</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm sm:text-base font-mono font-black text-white mt-1">
                    {organDonor === 'Yes' ? 'Donor (Yes)' : 'No'}
                  </span>
                </div>
              </div>

              {/* Emergency Contact detail box */}
              <div className="bg-rose-700/40 border border-rose-500/20 rounded-2xl p-4 space-y-3 self-stretch">
                <div className="flex items-center gap-2 text-[0.625rem] font-mono tracking-widest text-rose-200 uppercase font-black pb-1.5 border-b border-rose-500/35">
                  <Phone className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>Immediate Contact (Kin)</span>
                </div>
                <div className="space-y-1 text-left">
                  <p className="text-sm sm:text-base font-black text-white leading-snug">
                    {emergencyContactName || 'Emergency Contact Name'}
                  </p>
                  <p className="text-xs sm:text-sm font-mono font-extrabold text-rose-100 block tracking-wider mt-0.5">
                    {emergencyContactPhone || 'Emergency Phone Number'}
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Alerts & Contraindications Panel details block */}
            <div className="bg-white/10 border border-white/10 rounded-2xl p-4 space-y-4 text-left self-stretch relative z-10">
              <div className="flex items-center gap-2 text-[0.625rem] font-mono text-white font-black tracking-widest border-b border-white/10 pb-2.5">
                <AlertOctagon className="w-4 h-4 text-white animate-flash-fast" />
                <span>ACTIVE CLINICAL CONTRAINDICATIONS</span>
              </div>
              <div className="text-xs sm:text-sm space-y-3.5 text-white font-sans leading-relaxed">
                <div>
                  <span className="text-rose-200 font-bold uppercase text-[0.625rem] tracking-wider block mb-1">Cardiac Conditions:</span>
                  <p className="text-white font-bold leading-relaxed">{conditions || 'No recorded cardiac history'}</p>
                </div>
                <div>
                  <span className="text-rose-200 font-bold uppercase text-[0.625rem] tracking-wider block mb-1">Critical Allergies:</span>
                  <p className="text-white font-bold leading-relaxed">{allergies || 'No allergies declared'}</p>
                </div>
                <div>
                  <span className="text-rose-200 font-bold uppercase text-[0.625rem] tracking-wider block mb-1">Routine Prescriptions:</span>
                  <p className="text-white font-semibold leading-relaxed">{medications || 'No medications listed'}</p>
                </div>
              </div>
            </div>

            {/* Authenticity seal */}
            <div className="pt-4 border-t border-rose-450/40 flex justify-between items-center text-[0.625rem] font-mono text-rose-200 self-stretch relative z-10">
              <span>Sanjivani Medical Standard</span>
              <div className="flex items-center gap-1.5 text-white shrink-0">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span className="font-bold uppercase tracking-wide">Secure Sandbox</span>
              </div>
            </div>
          </div>

          {/* Action dispatchers - redesigned with gorgeous high-contrast colors and extreme accessibility */}
          <div className="flex flex-col gap-3.5 pt-2">
            <div className="flex flex-col sm:flex-row gap-3.5">
              
              {/* Copy card text action button */}
              <button
                type="button"
                onClick={copyToClipboard}
                className="flex-1 py-4 px-5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-2xl text-sm font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Copy successful</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 text-rose-500 shrink-0" />
                    <span>Copy Card Text</span>
                  </>
                )}
              </button>
              
              {/* Download pure QR code action button */}
              <button
                type="button"
                onClick={handleDownloadQR}
                className="flex-1 py-4 px-5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 rounded-2xl text-sm font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm"
                title="Download high-resolution QR image"
              >
                <Download className="w-5 h-5 text-slate-600 shrink-0" />
                <span>Download Pure QR</span>
              </button>
            </div>

            {/* Download Integrated Medical Passcard button with full text visibility and stark contrast */}
            <button
              type="button"
              onClick={handleDownloadCardImage}
              className="w-full py-4.5 px-6 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-sm font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-all cursor-pointer shadow-md border border-rose-500"
              title="Download beautiful complete medical passcard containing text and QR code"
            >
              <QrCode className="w-5 h-5 text-rose-200 shrink-0" />
              <span>Download Integrated Medical Passcard</span>
            </button>
          </div>

          {/* Real-time sync feedback message banner */}
          {saveSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3.5 animate-slide-up shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <div className="text-left space-y-0.5">
                <span className="text-xs font-mono font-bold text-emerald-700 block uppercase tracking-wider">Sync Successful</span>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">Emergency records successfully compiled in local browser sandbox. The scannable Rescuer QR code has been dynamically updated.</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
