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
    workstationTitle: "Sanjivani AI: Easy Heart Guide",
    taglineSubtitle: "Your simple guide to check hearts, learn CPR, and find nearby doctors",
    bannerWarning: "🚨 EMERGENCY ALERT: If you feel sudden chest pain, pain in your arm or neck, or if someone passes out, call 112 or 108 immediately!",
    tickerTitle: "Did You Know?",
    tickerText: "A heart attack can happen to anyone. Doing CPR quickly with your hands can save a life!",
    tickerMetrics: "Normal heart beat is 60 to 100 times per minute.",
    hotlineBadge: "EMERGENCY PHONE: CALL 112 / 108",
    selectLanguage: "Bhasha / Language",
    matrixTab: "1. Learn Heart Problems",
    decryptorTab: "2. Read Reports with AI",
    symptomsTab: "3. Simple Symptom Checker",
    locatorTab: "4. Find Nearby Hospitals",
    cprTab: "5. How to do CPR (Save Lives)",
    doctorTab: "6. Questions for your Doctor",
    footerDisclaimer: "This website is only for learning. It is not a real doctor. Always go to a doctor if you feel sick.",
    footerCredits: "Sanjivani AI",
    stickyAha: "Simple Educational Guide",
    stickyNeedDispatch: "Need an ambulance?",
    stickyCallBtn: "Call Ambulance Immediately (112)",
    offlineModeWarning: "Running in offline mode (reports translated locally)."
  },
  matrix: {
    title: "Let's Understand Heart Problems",
    subtitle: "Learn about Heart Attacks, Cardiac Arrests, and Heart Failure. Click any card to see details in easy words.",
    plumbing: "Blocked Pipe (Blood flow problem)",
    electrical: "Power Cut (Heart rhythm/electric problem)",
    mechanical: "Weak Pump (Heart muscle is tired)",
    analogy: "Simple Example",
    anatomy: "What part has the issue?",
    shortSummary: "What is this?",
    warningSymptoms: "Warning Signs",
    firstAidProtocol: "What you must do first",
    expansionMechanism: "How to stop or fix it",
    fullClinicalSymptoms: "All Possible Symptoms",
    completeFirstAid: "Full First Aid Steps to save a life",
    primaryCauses: "Why does it happen?",
    mythVsFact: "True vs False Beliefs",
    collapseDetails: "Close Details",
    expandDetails: "See Details & Symptoms",
    mythLabel: "FALSE BELIEF (MYTH)",
    factLabel: "TRUE FACT",
    criticalBadge: "🚨 DANGEROUS SIGN",
    medicalTerms: {
      "heart-attack": "Heart Attack (Blocked Blood Flow)",
      "cardiac-arrest": "Cardiac Arrest (Heart Suddenly Stops)",
      "heart-failure": "Heart Failure (Heart is Too Weak to Pump)"
    }
  },
  analyzer: {
    title: "AI Medical Report Explainer",
    subtitle: "Enter medical words from your reports (like Ejection Fraction, EF, LAD Block, ECG) and the AI will explain them in very simple language.",
    placeholder: "Paste or type medical reports here (for example: 'EF is 35%', '80% LAD block', or dynamic ECG words). Or click one of the simple buttons below to fill text automatically.",
    analyzeBtn: "Click to Explain with AI",
    analyzingState: "AI is reading and translating to easy words...",
    sampleHeader: "Or click a sample report below to see how it works:",
    sampleECG: "Sample A: Fast/Irregular ECG",
    sampleReport: "Sample B: Weak Heart Pump (Low EF)",
    sampleBlood: "Sample C: Hard Blockage in Arteries",
    micBtnStart: "Tap to Speak/Simulate Patient Voice",
    micBtnStop: "Stop Speaking",
    micSimulating: "Listening... Please describe your symptoms in clear words.",
    uploadHeader: "Drop Medical Reports Here",
    uploadInstructions: "Put your PDF files here, or click to use a sample.",
    resultsHeader: "Simple Explanation from AI",
    chatPlaceholder: "Type a question here in normal language (like: 'what should I eat?')...",
    chatSendBtn: "Ask Doctor AI",
    chatTitle: "Ask Helpful Heart Questions",
    chatDisclaimer: "Note: This is a learning tool. Always talk to a registered doctor.",
    sampleBlockages: "85% blockage in main heart pipe",
    loadingText: "Writing down your voice message...",
    voiceTranscriptionResult: "Patient says: 'I feel sudden hard breathlessness when resting, visible swelling in my feet, and chest discomfort.'"
  },
  symptoms: {
    title: "Quick Symptom Checker",
    subtitle: "Choose how you are feeling right now. Our checker will tell you in simple percentages which heart condition you might have.",
    chestPainLabel: "Chest Pain or Heavy Pressure",
    chestPainDesc: "Feels like a heavy rock on the chest. Pain might spread to your left arm, shoulder, neck, or jaw.",
    sweatingLabel: "Sudden Cold Sweat",
    sweatingDesc: "Suddenly sweating a lot, even if the room is cool, feeling dizzy, and pale face.",
    swellingLabel: "Swollen Feet or Legs",
    swellingDesc: "Your feet, ankles, or legs look swollen and puffy because of water build-up.",
    breathlessnessLabel: "Trouble Breathing",
    breathlessnessDesc: "Hard to breathe, feeling out of breath when sitting or when walking.",
    intensityScale: "How bad is it? (Slide to choose, 0 to 10)",
    resultsTitle: "Symptom Check Results",
    resultsDesc: "Based on your sliders, here is what your symptoms mean:",
    arrestTitle: "Sudden Cardiac Arrest (Danger: Heart Stops)",
    arrestDesc: "Extremely serious danger! If a person collapses and stops breathing, you must start CPR instantly.",
    attackTitle: "Heart Attack (Blocked Blood Flow)",
    attackDesc: "Extremely serious! A pipe/artery is blocked. Call 112 or 108 immediately. Do not delay.",
    failureTitle: "Heart Failure (Weak Heart Pump)",
    failureDesc: "Your heart pump is working too slowly. This is a long-term issue that needs standard heart medicines.",
    strengthRating: "Matching Level: ",
    actionTriageEmergency: "🚨 DANGER! CALL AMBULANCE IMMEDIATELY! Stop using this computer and call 112 or 108 right away!",
    actionTriageSpecialist: "⚠️ PLEASE SEE A DOCTOR SOON. This looks like a long-term heart problem. Please visit a heart specialist (cardiologist) in the next day or two to check your medicines.",
    actionNormalTitle: "🟢 NO URGENT HEART DANGER SEEN",
    actionNormalDesc: "Your scores are very low. It does not seem like an urgent heart issue. Check again if you feel worse.",
    unconsciousCheck: "Has the person collapsed?",
    unconsciousLabel: "Check this box if the person suddenly collapsed, fell down, and is not responding (This will instantly trigger maximum urgent danger flags)."
  },
  locator: {
    title: "Find Nearest Hospitals",
    subtitle: "Find nearby heart doctors, clinics, and emergency wards. Enter your city or click below to search.",
    scanBtn: "Use My Live Location",
    gpsStatusActive: "Your Live Location Loaded",
    milesSuffix: "km",
    erActive: "🚨 24-Hour Emergency Bed Available",
    websiteLabel: "Website",
    getRouteLabel: "🗺️ Get Directions on Google Maps",
    callCenterLabel: "📞 Call Hospital",
    noPhoneLabel: "No phone number listed",
    searchRadiusLabel: "Search Area Size:",
    milesFilter2: "Very Close (5 km)",
    milesFilter5: "Normal Area (10 km)",
    milesFilter10: "Wider Area (20 km)",
    milesFilter20: "Large Area (50 km)",
    indianCitiesLabel: "Quick Select Indian Cities:",
    highContrastHotlines: "📞 Direct Emergency Phone Numbers (Click to Call)",
    dispatchesHeader: "Emergency Command Panel:"
  },
  cpr: {
    title: "Learn CPR & Save Lives",
    subtitle: "Simple instructions to save someone whose heart has suddenly stopped beating. Do not panic, follow these steps.",
    cprHeader: "Saving Someone's Life with Your Hands (CPR)",
    cprSub: "This keeps blood moving to the brain so the person stays alive until the ambulance arrives.",
    cprStep1Title: "Step 1: Check and Shout",
    cprStep1Detail: "Tap the person's shoulders hard and shout loudly: 'Are you OK? Can you hear me?'.",
    cprStep2Title: "Step 2: Call 112 or 108",
    cprStep2Detail: "If they do not answer, shout for help! Call 112 or 108 immediately. Ask someone nearby to find a heart shock machine (AED).",
    cprStep3Title: "Step 3: Push Hard and Fast",
    cprStep3Detail: "Place your hand in the center of their chest. Put your other hand on top. Press straight down hard and fast (2 inches deep).",
    cprStep4Title: "Step 4: Keep Pushing",
    cprStep4Detail: "Push down 100 to 120 times every minute. Keep going without stopping until the ambulance arrives!",
    aedHeader: "How to use a Shock Machine (AED)",
    aedSub: "An AED is an automatic electrical box. It speaks out loud to tell you what to do to reboot the heart.",
    aedStep1Title: "Step 1: Turn It On",
    aedStep1Detail: "Press the power button. The machine will start talking to you and tell you exactly what to do next.",
    aedStep2Title: "Step 2: Stick the Pads",
    aedStep2Detail: "Uncover the person's chest. Remove the backing sticker and stick the two pads on their bare skin, exactly as shown in the picture.",
    aedStep3Title: "Step 3: Clear and Shock",
    aedStep3Detail: "Do not touch the person while the machine reads their heartbeat. If it says 'Deliver Shock', yell 'STAY CLEAR!' and push the orange flashing button.",
    tickerHeader: "Live Push Rhythm Ticker (110 beats each minute)",
    tickerSub: "Life Saving Rhythm Guide",
    tickerMnemonic: "Follow the sound and light: Press down on the chest every time you hear the sound beep or see the light flash.",
    startTickerBtn: "Start Sound Beep (Rhythm Helper)",
    stopTickerBtn: "Stop Sound Beep"
  },
  doctor: {
    title: "Get Ready for your Doctor Visit",
    subtitle: "Here are easy questions you can ask your doctor about your heart. You can choose, add, or print them.",
    exportCopy: "Copy All Questions",
    exportDownload: "Save as Text File",
    exportPrint: "Print Questions for Doctor",
    checklistHeader: "Choose Questions for Your Next Visit:",
    checklistSub: "Put a checkmark next to the questions you want to ask. Add your own if you want.",
    copingSuccess: "Questions copied! You can paste them in WhatsApp or Notes now.",
    categoryAttack: "Questions about My Heart Attack recovery:",
    categoryArrest: "Questions about My Arrhythmia/Heart Stop:",
    categoryFailure: "Questions about My Heart Failure (Weak Heart) management:"
  }
};
