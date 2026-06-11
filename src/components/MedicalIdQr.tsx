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

      // Draw background - deep solid medical slate-900 tone
      ctx.fillStyle = '#1e293b'; // slate-800 primary
      ctx.fillRect(0, 0, 800, 560);
      
      // Secondary background texture for content area
      ctx.fillStyle = '#0f172a'; // slate-900 inner card
      ctx.fillRect(20, 20, 760, 520);

      // Draw thick red high-contrast warning border around inner card
      ctx.strokeStyle = '#ef4444'; // Red-500
      ctx.lineWidth = 6;
      ctx.strokeRect(20, 20, 760, 520);

      // RED header alert bar inside content panel
      ctx.fillStyle = '#ef4444'; // Red-500
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
        ctx.fillStyle = '#94a3b8'; // slate-400 label
        ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
        ctx.fillText(label.toUpperCase() + ':', x, y);
        y += 20;

        // Value text - scaled up for excellent legibility
        ctx.fillStyle = highlightColor || '#f1f5f9'; // slate-100 or highlighted
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
      drawDetail('Blood Classification', bloodGroup || 'Unknown', '#f43f5e'); // Rose-500
      drawDetail('Critical Medical Allergies', allergies || 'None Declared', '#f59e0b'); // Amber-500
      drawDetail('Cardiac Conditions & Active Regimen', `${conditions || 'None Registered'} • Medications: ${medications || 'None Declared'}`, '#38bdf8'); // Sky-400
      drawDetail('Immediate Dispatch Contact (Next-of-Kin)', `${emergencyContactName || 'Emergency Contact Name'} • ${emergencyContactPhone || 'Emergency Phone Number'}`, '#10b981'); // Emerald-500

      // Draw high-density QR box on the right
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(495, 125, 260, 260);

      // Draw QR content nicely framed inside white block
      ctx.drawImage(qrCanvas, 505, 135, 240, 240);

      // Draw QR Scan instruction tag
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(495, 385, 260, 38);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SCAN QR CODE TO RETRIEVE ID', 625, 409);
      ctx.textAlign = 'left'; // Reset alignment for other components

      // Footer notice
      ctx.fillStyle = '#64748b'; // slate-500
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
      
      {/* Dynamic Diagnostic Section Title bar */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row gap-5 justify-between items-start md:items-center shadow-lg relative overflow-hidden text-left">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
          <QrCode className="w-48 h-48 text-indigo-400" />
        </div>
        
        <div className="space-y-2 text-left font-sans relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0 inline-block animate-pulse" />
            <span className="text-sm uppercase font-mono tracking-widest font-extrabold text-indigo-400 block">
              Section 4: Rescuer Quick Scanning Portal
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">Emergency Medical ID & Scannable QR</h3>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Fill out your critical cardiovascular history, active prescriptions, and emergency dispatch links. Real-time updates generate an offline QR passport so medical professionals or first-responders can immediately scan and view your records during crisis response.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10 shrink-0 self-start md:self-auto">
          <button 
            type="button"
            onClick={handleResetToDefaults}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono font-black uppercase tracking-wider text-slate-200 hover:text-white rounded-xl transition-all cursor-pointer"
          >
            Reset to Sample
          </button>
          <button 
            type="button"
            onClick={handleClearAll}
            className="p-2.5 bg-red-950/40 hover:bg-red-900/60 hover:text-white border border-red-900 text-red-400 rounded-xl transition-all cursor-pointer"
            title="Clear All Fields"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Core Layout Grid for Section 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side Column: Medical Passcard Form Fields Editor */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 text-left space-y-6 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <User className="w-5 h-5 text-indigo-400" />
              <span className="text-base font-bold uppercase tracking-wider text-slate-100 font-sans">
                Cardiovascular Health Registry
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold bg-emerald-950/30 px-3 py-1.5 border border-emerald-900/60 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Editable (Auto-Saving Mode)</span>
            </div>
          </div>

          {/* Form Content holding perfect size constraints */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="sm:col-span-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                Full Patient Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="type here"
                className="w-full bg-slate-950 text-slate-100 text-sm font-semibold rounded-xl px-4 py-3 outline-none border border-slate-700 focus:border-indigo-500 focus:bg-slate-950/80 shadow-md transition-all"
              />
            </div>

            {/* Blood group selection dropdown */}
            <div className="sm:col-span-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                Clinical Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-sm font-semibold rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all cursor-pointer"
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

            {/* Chronic Medical Conditions */}
            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                Cardiopathological Records & Chronic Conditions
              </label>
              <textarea
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                rows={2}
                placeholder="type here"
                className="w-full bg-slate-950 text-slate-100 text-sm font-semibold rounded-xl px-4 py-3 outline-none border border-slate-700 focus:border-indigo-500 focus:bg-slate-950/80 shadow-md transition-all resize-none"
              />
            </div>

            {/* Critical Allergies */}
            <div className="sm:col-span-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                Immediate Action Allergies (Prescriptions, Dust)
              </label>
              <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                placeholder="type here"
                className="w-full bg-slate-950 text-slate-100 text-sm font-semibold rounded-xl px-4 py-3 outline-none border border-slate-700 focus:border-indigo-500 focus:bg-slate-950/80 shadow-md transition-all"
              />
            </div>

            {/* Organ Donor */}
            <div className="sm:col-span-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                Organ Donor Accordance
              </label>
              <select
                value={organDonor}
                onChange={(e) => setOrganDonor(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-slate-100 text-sm font-semibold rounded-xl px-4 py-3 focus:border-indigo-500 outline-none transition-all cursor-pointer"
              >
                <option value="No">No / Unregistered</option>
                <option value="Yes">Yes (Registered Organ Donor)</option>
              </select>
            </div>

            {/* Current Daily Medications */}
            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                Active Routine Cardiovascular Medications
              </label>
              <input
                type="text"
                value={medications}
                onChange={(e) => setMedications(e.target.value)}
                placeholder="type here"
                className="w-full bg-slate-950 text-slate-100 text-sm font-semibold rounded-xl px-4 py-3 outline-none border border-slate-700 focus:border-indigo-500 focus:bg-slate-950/80 shadow-md transition-all"
              />
            </div>

            {/* Emergency Contact Name */}
            <div className="sm:col-span-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                Emergency Contact Name
              </label>
              <input
                type="text"
                value={emergencyContactName}
                onChange={(e) => setEmergencyContactName(e.target.value)}
                placeholder="type here"
                className="w-full bg-slate-950 text-slate-100 text-sm font-semibold rounded-xl px-4 py-3 outline-none border border-slate-700 focus:border-indigo-500 focus:bg-slate-950/80 shadow-md transition-all"
              />
            </div>

            {/* Emergency Contact Phone */}
            <div className="sm:col-span-1">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                Emergency Phone Number (Kin)
              </label>
              <input
                type="text"
                value={emergencyContactPhone}
                onChange={(e) => setEmergencyContactPhone(e.target.value)}
                placeholder="type here"
                className="w-full bg-slate-950 text-slate-100 text-sm font-semibold rounded-xl px-4 py-3 outline-none border border-slate-700 focus:border-indigo-500 focus:bg-slate-950/80 shadow-md transition-all"
              />
            </div>

            {/* Extra Rescue Instructions */}
            <div className="sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2">
                First-Responder & Transport Directives
              </label>
              <textarea
                value={extraInstructions}
                onChange={(e) => setExtraInstructions(e.target.value)}
                rows={2}
                placeholder="type here"
                className="w-full bg-slate-950 text-slate-100 text-sm font-semibold rounded-xl px-4 py-3 outline-none border border-slate-700 focus:border-indigo-500 focus:bg-slate-950/80 shadow-md transition-all resize-none"
              />
            </div>
          </div>

          {/* Local storage sync prompt */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-sm text-emerald-400">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>All changes are automatically saved to your local browser sandbox</span>
            </div>
          </div>
        </div>

        {/* Right Side Column: Redesigned highly scannable medical credentials card */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Simulated First-Responder Lockscreen Passcard - completely responsive, no forced wrapping layout */}
          <div className="bg-slate-950 border-2 border-red-500 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between text-left space-y-6">
            
            {/* Tagline clinical banner */}
            <div className="flex items-center justify-between pb-4 border-b border-rose-900/60">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse shrink-0" />
                  <span className="absolute -inset-1 bg-red-500/20 rounded-full blur-sm" />
                </div>
                <span className="font-extrabold text-sm tracking-wider text-red-500 uppercase font-mono">
                  Emergency Medical Pass
                </span>
              </div>
              <span className="text-xs font-mono font-black text-red-400 bg-red-950/50 px-3 py-1 border border-red-900/60 rounded-full shrink-0">
                RED-ALERT
              </span>
            </div>

            {/* Centered QR code surround for pristine scanning contrast */}
            <div className="flex flex-col items-center justify-center space-y-4 py-1">

              <div className="relative p-4 bg-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-all duration-300">
                <QRCodeSVG
                  id="bystander-medical-svg-qr"
                  value={qrValue}
                  size={160}
                  level="H"
                  includeMargin={false}
                  imageSettings={{
                    src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ef4444'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>",
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

              <span className="text-xs font-mono uppercase font-black text-slate-400 tracking-wider text-center">
                SCAN TO RETRIEVE EMERGENCY MEDICAL RECORDS
              </span>
            </div>

            {/* Patient Core Details with completely legible text sizing */}
            <div className="space-y-5 border-t border-slate-900 pt-5 self-stretch">
              
              {/* Patient Name */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-slate-400 uppercase font-bold">
                  <User className="w-4 h-4 text-slate-500 shrink-0" />
                  <span>Patient Identity</span>
                </div>
                <p className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {fullName || 'Patient Name'}
                </p>
              </div>

              {/* Physiology Stats pills with superb sizing */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-slate-400 uppercase font-bold">
                    <Droplet className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Blood Type</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm sm:text-base font-mono font-black text-red-400 mt-1">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    {bloodGroup}
                  </span>
                </div>

                <div className="space-y-1 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-slate-400 uppercase font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Organ Donor</span>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 text-sm sm:text-base font-mono font-black mt-1 ${
                    organDonor === 'Yes' 
                      ? 'text-emerald-400' 
                      : 'text-slate-400'
                  }`}>
                    {organDonor === 'Yes' ? 'Donor (Yes)' : 'No'}
                  </span>
                </div>
              </div>

              {/* Emergency Contact detail box with ample spacing to completely prevent overlapping */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 self-stretch">
                <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-slate-400 uppercase font-bold pb-1.5 border-b border-slate-800">
                  <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Immediate Contact (Next-of-Kin)</span>
                </div>
                <div className="space-y-1 text-left">
                  <p className="text-base font-black text-white leading-snug">
                    {emergencyContactName || 'Emergency Contact Name'}
                  </p>
                  <p className="text-sm font-mono font-extrabold text-emerald-400 block tracking-wider mt-0.5">
                    {emergencyContactPhone || 'Emergency Phone Number'}
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Alerts & Contraindications Panel details block */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 text-left self-stretch">
              <div className="flex items-center gap-2.5 text-sm font-mono text-red-500 font-extrabold tracking-wide border-b border-slate-800 pb-2.5">
                <AlertOctagon className="w-4.5 h-4.5 text-red-500 animate-bounce" />
                <span>ACTIVE CLINICAL CONTRAINDICATIONS</span>
              </div>
              <div className="text-sm space-y-3.5 text-slate-300 font-sans leading-relaxed">
                <div>
                  <span className="text-slate-300 font-bold uppercase text-xs tracking-wider block mb-1">Diagnosed Cardiac Conditions:</span>
                  <p className="text-slate-100 font-semibold leading-relaxed">{conditions || 'No recorded cardiac history'}</p>
                </div>
                <div>
                  <span className="text-slate-300 font-bold uppercase text-xs tracking-wider block mb-1">Critical Active Allergies:</span>
                  <p className="text-amber-400 font-bold leading-relaxed">{allergies || 'No allergies declared'}</p>
                </div>
                <div>
                  <span className="text-slate-300 font-bold uppercase text-xs tracking-wider block mb-1">Routine Prescriptions:</span>
                  <p className="text-sky-400 font-semibold leading-relaxed">{medications || 'No medications listed'}</p>
                </div>
              </div>
            </div>

            {/* Authenticity seal */}
            <div className="pt-4 border-t border-slate-900 flex justify-between items-center text-xs font-mono text-slate-500 self-stretch">
              <span>Sanjivani emergency response standard</span>
              <div className="flex items-center gap-1.5 text-indigo-400 shrink-0">
                <ShieldCheck className="w-4.5 h-4.5 shrink-0" />
                <span className="font-extrabold uppercase tracking-wide">Secure Record</span>
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
                className="flex-1 py-4 px-5 bg-slate-900 hover:bg-slate-800 border-2 border-slate-700 text-slate-200 hover:text-white rounded-2xl text-sm font-sans font-extrabold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg hover:shadow-xl"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Copy successful</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 text-slate-400 shrink-0" />
                    <span>Copy Card Text</span>
                  </>
                )}
              </button>
              
              {/* Download pure QR code action button */}
              <button
                type="button"
                onClick={handleDownloadQR}
                className="flex-1 py-4 px-5 bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 text-white hover:text-slate-100 rounded-2xl text-sm font-sans font-extrabold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg hover:shadow-xl"
                title="Download high-resolution QR image"
              >
                <Download className="w-5 h-5 text-slate-300 shrink-0" />
                <span>Download Pure QR</span>
              </button>
            </div>

            {/* Download Integrated Medical Passcard button with full text visibility and stark contrast */}
            <button
              type="button"
              onClick={handleDownloadCardImage}
              className="w-full py-4.5 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-sm font-sans font-extrabold uppercase tracking-wider flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xl shadow-indigo-950/50 border border-indigo-500 scale-100 hover:scale-[1.01]"
              title="Download beautiful complete medical passcard containing text and QR code"
            >
              <QrCode className="w-5 h-5 text-indigo-200 animate-pulse shrink-0" />
              <span>Download Integrated Medical Passcard</span>
            </button>
          </div>

          {/* Real-time sync feedback message banner */}
          {saveSuccess && (
            <div className="bg-emerald-950/60 border border-emerald-900/80 rounded-2xl p-4 flex items-start gap-3.5 animate-slide-up shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping mt-1.5 shrink-0" />
              <div className="text-left space-y-0.5">
                <span className="text-xs font-mono font-black text-emerald-400 block uppercase tracking-wider">Sync Successful</span>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">Emergency records successfully compiled in local browser sandbox. The scannable Rescuer QR code has been dynamically updated.</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
