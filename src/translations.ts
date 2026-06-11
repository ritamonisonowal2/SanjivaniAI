export interface TranslationScheme {
  general: {
    workstationTitle: string;
    taglineSubtitle: string;
    bannerWarning: string;
    tickerTitle: string;
    tickerText: string;
    tickerMetrics: string;
    hotlineBadge: string;
    selectLanguage: string;
    matrixTab: string;
    decryptorTab: string;
    symptomsTab: string;
    locatorTab: string;
    cprTab: string;
    doctorTab: string;
    footerDisclaimer: string;
    footerCredits: string;
    stickyAha: string;
    stickyNeedDispatch: string;
    stickyCallBtn: string;
    offlineModeWarning: string;
  };
  matrix: {
    title: string;
    subtitle: string;
    plumbing: string;
    electrical: string;
    mechanical: string;
    analogy: string;
    anatomy: string;
    shortSummary: string;
    warningSymptoms: string;
    firstAidProtocol: string;
    expansionMechanism: string;
    fullClinicalSymptoms: string;
    completeFirstAid: string;
    primaryCauses: string;
    mythVsFact: string;
    collapseDetails: string;
    expandDetails: string;
    mythLabel: string;
    factLabel: string;
    criticalBadge: string;
    medicalTerms: {
      "heart-attack": string;
      "cardiac-arrest": string;
      "heart-failure": string;
    };
  };
  analyzer: {
    title: string;
    subtitle: string;
    placeholder: string;
    analyzeBtn: string;
    analyzingState: string;
    sampleHeader: string;
    sampleECG: string;
    sampleReport: string;
    sampleBlood: string;
    micBtnStart: string;
    micBtnStop: string;
    micSimulating: string;
    uploadHeader: string;
    uploadInstructions: string;
    resultsHeader: string;
    chatPlaceholder: string;
    chatSendBtn: string;
    chatTitle: string;
    chatDisclaimer: string;
    sampleBlockages: string;
    loadingText: string;
    voiceTranscriptionResult: string;
  };
  symptoms: {
    title: string;
    subtitle: string;
    chestPainLabel: string;
    chestPainDesc: string;
    sweatingLabel: string;
    sweatingDesc: string;
    swellingLabel: string;
    swellingDesc: string;
    breathlessnessLabel: string;
    breathlessnessDesc: string;
    intensityScale: string;
    resultsTitle: string;
    resultsDesc: string;
    arrestTitle: string;
    arrestDesc: string;
    attackTitle: string;
    attackDesc: string;
    failureTitle: string;
    failureDesc: string;
    strengthRating: string;
    actionTriageEmergency: string;
    actionTriageSpecialist: string;
    actionNormalTitle: string;
    actionNormalDesc: string;
    unconsciousCheck: string;
    unconsciousLabel: string;
  };
  locator: {
    title: string;
    subtitle: string;
    scanBtn: string;
    gpsStatusActive: string;
    milesSuffix: string;
    erActive: string;
    websiteLabel: string;
    getRouteLabel: string;
    callCenterLabel: string;
    noPhoneLabel: string;
    searchRadiusLabel: string;
    milesFilter2: string;
    milesFilter5: string;
    milesFilter10: string;
    milesFilter20: string;
    indianCitiesLabel: string;
    highContrastHotlines: string;
    dispatchesHeader: string;
  };
  cpr: {
    title: string;
    subtitle: string;
    cprHeader: string;
    cprSub: string;
    cprStep1Title: string;
    cprStep1Detail: string;
    cprStep2Title: string;
    cprStep2Detail: string;
    cprStep3Title: string;
    cprStep3Detail: string;
    cprStep4Title: string;
    cprStep4Detail: string;
    aedHeader: string;
    aedSub: string;
    aedStep1Title: string;
    aedStep1Detail: string;
    aedStep2Title: string;
    aedStep2Detail: string;
    aedStep3Title: string;
    aedStep3Detail: string;
    tickerHeader: string;
    tickerSub: string;
    tickerMnemonic: string;
    startTickerBtn: string;
    stopTickerBtn: string;
  };
  doctor: {
    title: string;
    subtitle: string;
    exportCopy: string;
    exportDownload: string;
    exportPrint: string;
    checklistHeader: string;
    checklistSub: string;
    copingSuccess: string;
    categoryAttack: string;
    categoryArrest: string;
    categoryFailure: string;
  };
}

export const TRANSLATIONS: TranslationScheme = {
  general: {
    workstationTitle: "Sanjivani AI Clinical Workstation",
    taglineSubtitle: "Cardiovascular Emergency Navigator & Care Search",
    bannerWarning: "Emergency Protocol: Chest squeezing, radiating throat/jaw discomfort, or sudden loss of consciousness requires an immediate call to medical emergency service.",
    tickerTitle: "Clinical Fact Check",
    tickerText: "Every 40 seconds, a coronary blockage triggers a myocardial infarction. Immediate bystander hands-only CPR can double or triple the survival of sudden cardiac arrest.",
    tickerMetrics: "72 BPM Rested Rate",
    hotlineBadge: "HOTLINE: 112 / 108",
    selectLanguage: "bhasha / Language",
    matrixTab: "1. Pathology Matrix",
    decryptorTab: "2. AI Decryptor & Chat",
    symptomsTab: "3. Symptom Correlation",
    locatorTab: "2. Care Locator & India Hotlines",
    cprTab: "3. CPR & AED Guide",
    doctorTab: "4. Ask Your Doctor",
    footerDisclaimer: "Medical guidelines curated from peer-reviewed cardiac research publications (AHA/ACC Directives). Always consult a certified medical practitioner for professional diagnosis.",
    footerCredits: "Sanjivani AI",
    stickyAha: "Educational Framework Sync Active",
    stickyNeedDispatch: "Need critical dispatch?",
    stickyCallBtn: "Call Emergency hotline (112)",
    offlineModeWarning: "Running in offline clinical demonstration mode (API Key not configured)."
  },
  matrix: {
    title: "Pathological Comparison Table",
    subtitle: "Compare mechanisms, warnings, and first-response steps. Expand any card for high-yield details.",
    plumbing: "Plumbing (Circulatory)",
    electrical: "Electrical (Rhythm)",
    mechanical: "Mechanical (Pumping)",
    analogy: "Critical Analogy",
    anatomy: "System Type",
    shortSummary: "Medical summary",
    warningSymptoms: "Key Warning Symptoms",
    firstAidProtocol: "Critical First Response",
    expansionMechanism: "Pathological Mechanism Explained",
    fullClinicalSymptoms: "Complete Symptoms Checklist",
    completeFirstAid: "Full Bystander First Aid Protocol",
    primaryCauses: "Primary Etiology & Risk Factors",
    mythVsFact: "Clarifying Medical Myths",
    collapseDetails: "Collapse Details",
    expandDetails: "Expand Mechanisms & Symptoms",
    mythLabel: "MYTH",
    factLabel: "FACT",
    criticalBadge: "CRITICAL RED-FLAG",
    medicalTerms: {
      "heart-attack": "Heart Attack (Infarction)",
      "cardiac-arrest": "Cardiac Arrest (Electrical Stop)",
      "heart-failure": "Heart Failure (Pump Fatigue)"
    }
  },
  analyzer: {
    title: "AI Medical Parameter Decryptor",
    subtitle: "Translate dense cardiology reports, clinical metrics (EF, blocks, Ischemia) and ECG parameters into patient-friendly educational summaries.",
    placeholder: "Paste or type clinical metrics, ECG results, or cardiac readings here (e.g., 'Ejection Fraction is 35%, 80% stenosis in LAD, ST depression seen...'). Or use the samples below.",
    analyzeBtn: "Analyze Cardiovascular Parameters",
    analyzingState: "Clinical intelligence computing report...",
    sampleHeader: "Select Sample Cardological Report to Load:",
    sampleECG: "Sample A: ST Elevation ECG",
    sampleReport: "Sample B: Echo Report (Low EF)",
    sampleBlood: "Sample C: Severe Blockage",
    micBtnStart: "Simulate Voice Diagnostics Input",
    micBtnStop: "Stop Simulating Recording",
    micSimulating: "Recording telemetry voice notes... Speak clearly into device.",
    uploadHeader: "Drop Clinical Diagnostic Files Here",
    uploadInstructions: "Simulated clinical file drop. Drag & drop PDF or click to select sample report card.",
    resultsHeader: "Gemini AI Clinical Translation Output",
    chatPlaceholder: "Ask follow-up educational questions about this parsed report...",
    chatSendBtn: "Send Inquiry",
    chatTitle: "Interactive Follow-Up Clinical Chatbot",
    chatDisclaimer: "This system is for peer educational training. Do not treat as definitive diagnostic advice.",
    sampleBlockages: "85% Blockage in LAD Artery",
    loadingText: "Transcribing your simulated heart symptoms...",
    voiceTranscriptionResult: "Patient reports sudden intense breathlessness when resting, along with visible swelling in the feet and a history of chronic cardiac chest discomfort."
  },
  symptoms: {
    title: "Interactive Symptom Correlation Engine",
    subtitle: "Evaluate active cardiac markers to determine their clinical correlation score with the three primary cardiac conditions.",
    chestPainLabel: "Radiating Chest Pain / Pressure",
    chestPainDesc: "Crushing, squeezing center paint spreading to left arm, shoulders, throat or jaw.",
    sweatingLabel: "Unexplained Cold Sweating",
    sweatingDesc: "Sudden onset of freezing sweat, cold extremities, gray paleness or dizziness.",
    swellingLabel: "Lower Extremity Swelling (Edema)",
    swellingDesc: "Visible swelling or water pooling in the ankles, calves or abdominal tissue.",
    breathlessnessLabel: "Sudden Breathlessness (Dyspnea)",
    breathlessnessDesc: "Struggling to draw breath, especially when lying flat or during light movement.",
    intensityScale: "Symptom Severity Metric (0 - 10)",
    resultsTitle: "Clinical Correlation Index Results",
    resultsDesc: "Live assessment mapping symptom intensity across pathophysiological scales:",
    arrestTitle: "Sudden Cardiac Arrest Alignment (Electrical)",
    arrestDesc: "Absolute immediate fatal emergency. Unresponsiveness requires immediate hands-only CPR and AED shocks.",
    attackTitle: "Myocardial Infarction Alignment (Circulatory)",
    attackDesc: "Active arterial plumbing blockage. Immediate emergency dispatch is required. Doctor must administer anti-platelets.",
    failureTitle: "Congestive Heart Failure Alignment (Mechanical)",
    failureDesc: "Structural heart pump exhaustion. Needs expert cardiology medication updates.",
    strengthRating: "Correlation Strength: ",
    actionTriageEmergency: "🔴 EMERGENCY ALERT PROTOCOL: This indicates an acute clinical crisis. Stop using this computer immediately and dial 112 / 108 for an ambulance dispatch!",
    actionTriageSpecialist: "🔵 SPECIALIST OUTPATIENT REFERRAL: This indicates chronic cardiovascular stress. Please consult your primary cardiologist within 24-48 hours to update your medication regimen.",
    actionNormalTitle: "🟢 MINIMAL EXERTION INDEX",
    actionNormalDesc: "Symptoms fall below standard red-flag parameters. Continue routine tracking.",
    unconsciousCheck: "Patient Responsiveness Override Clicker",
    unconsciousLabel: "Check this box if the subject has suddenly COLLAPSED and remains UNRESPONSIVE (Triggers instant Cardiac Arrest Red Emergency Triage)."
  },
  locator: {
    title: "GPS Care Locator & India Hotlines",
    subtitle: "Map the closest cardiac units, hospital wards, and diagnostic clinics. Quickly scan via browser GPS or jump to major metro zones.",
    scanBtn: "Scan My Precise Coordinates",
    gpsStatusActive: "Active Real-Time GIS Feed Synchronized",
    milesSuffix: "miles",
    erActive: "24h Emergency Ward Active",
    websiteLabel: "Clinic Website",
    getRouteLabel: "Open GPS Route Map",
    callCenterLabel: "Call Diagnostic Center",
    noPhoneLabel: "No hotline recorded",
    searchRadiusLabel: "Search Search Range Focused:",
    milesFilter2: "Immediate Radius (2 mi)",
    milesFilter5: "Default Standard Ward (5 mi)",
    milesFilter10: "Extended District Zone (10 mi)",
    milesFilter20: "Regional Health Border (20 mi)",
    indianCitiesLabel: "Jump to Indian Metro Centers:",
    highContrastHotlines: "High-Contrast All-India Clinical Hotlines Dispatch",
    dispatchesHeader: "Direct Bystander Emergency Call Panel:"
  },
  cpr: {
    title: "Bystander CPR & AED Visual Guide",
    subtitle: "Rapid intervention guidelines for bystander response. Every second counts in Sudden Cardiac Arrest.",
    cprHeader: "Step-by-Step Hands-Only CPR Mode",
    cprSub: "Designed to sustain circulation to the brain when the heart has stopped beating electrically.",
    cprStep1Title: "Check and Shake",
    cprStep1Detail: "Check if patient is conscious. Tap shoulders and shout loudly: 'Are you okay?'.",
    cprStep2Title: "Call 112 or 108",
    cprStep2Detail: "If no response, immediately yell for help. Call 112 or 108. Direct someone specific to get an AED.",
    cprStep3Title: "Push Hard and Fast",
    cprStep3Detail: "Place the heel of one hand in the center of the chest. Interlock other hand. Compress firmly at 2 to 2.4 inches deep.",
    cprStep4Title: "Maintain Dynamic Rhythm",
    cprStep4Detail: "Pump at a high rate of 100 to 120 beats per minute. Do not interrupt until emergency responders take over.",
    aedHeader: "Automated External Defibrillator (AED) Playbook",
    aedSub: "A smart computer that analyzes heart rhythm and administers a shock to reboot cardiac current.",
    aedStep1Title: "Power on the AED",
    aedStep1Detail: "Retrieve and immediately switch on the AED. It will immediately begin speaking vocal instructions and prompts.",
    aedStep2Title: "Apply Adhesive Pads",
    aedStep2Detail: "Expose bare chest. Peel skin backing and attach adhesive pads exactly as pictured on instructions.",
    aedStep3Title: "Clear Patient & Shock",
    aedStep3Detail: "Wait for voice prompt: 'Do not touch the patient - analyzing'. If shock is guided, yell 'Standoff/Clear!' and press shock button.",
    tickerHeader: "Rhythmic Training metronome (110 BPM)",
    tickerSub: "Stayin' Alive Rhythm Ticker",
    tickerMnemonic: "Mnemonic Beat Tracker: PUSH on every sound flash to stay perfectly in high-fidelity 110 BPM clinical timing.",
    startTickerBtn: "Activate Training Beat Ticker",
    stopTickerBtn: "Deactivate Training Ticker"
  },
  doctor: {
    title: "Doctor Preparation cards",
    subtitle: "Pre-formulated questions organized by category to help you partner effectively with your physician.",
    exportCopy: "Copy Question list",
    exportDownload: "Download TXT Card",
    exportPrint: "Print Preparation Slip",
    checklistHeader: "Personal Clinical Consultation Builder:",
    checklistSub: "Check or add customized items to print out before clinical consults.",
    copingSuccess: "Questions copied successfully to clipboard!",
    categoryAttack: "Myocardial Infarction Outpatient Questions",
    categoryArrest: "Electrical Arrhythmia/Arrest Questions",
    categoryFailure: "Chronic Pump Maintenance Questions"
  }
};
