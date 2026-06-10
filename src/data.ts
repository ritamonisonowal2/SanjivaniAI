import { ConditionDetail, SimulationScenario, QuizQuestion } from './types';

export const conditions: ConditionDetail[] = [
  {
    id: 'heart-attack',
    name: 'Heart Attack',
    pronunciation: 'Myocardial Infarction',
    system: 'Circulatory (Plumbing)',
    analogy: 'Plumbing Blockage',
    shortSummary: 'A blocked artery prevents oxygen-rich blood from reaching a section of the heart muscle. The heart is still beating.',
    trigger: 'Coronary artery blockage',
    description: 'A heart attack occurs when a coronary artery becomes blocked—usually by a buildup of plaque and blood clots—depriving a portion of the heart muscle of oxygen. If blood flow is not restored quickly, the tissue begins to die. Importantly, the heart continues to beat during a heart attack.',
    symptoms: [
      { text: 'Chest pain, tightness, squeezing, or aching in the center of the chest', critical: true },
      { text: 'Pain radiating to the left arm, shoulders, back, neck, or jaw', critical: true },
      { text: 'Shortness of breath (often experienced before or alongside chest pain)', critical: false },
      { text: 'Unexplained cold sweats, dizziness, nausea, or extreme lightheadedness', critical: false },
      { text: 'Atypical symptoms: women often experience nausea, shortness of breath, or back/jaw pain rather than crushing chest pain', critical: true }
    ],
    firstAidSteps: [
      { step: 1, title: 'Call Emergency Services', details: 'Dial 911 or your local emergency number immediately. Every minute counts.', isPrimary: true },
      { step: 2, title: 'Chew an Aspirin', details: 'Chew and swallow a single full adult aspirin (or 4 low-dosage baby aspirins) to help thin blood, unless allergic.', isPrimary: true },
      { step: 3, title: 'Rest Comfortably', details: 'Sit down and remain calm. Keep the patient in a semi-reclined position to reduce the work required of the heart.', isPrimary: false },
      { step: 4, title: 'Monitor Status', details: 'Check if they are fully conscious and breathing. Prepare to perform CPR if they suddenly lose consciousness and stop breathing.', isPrimary: false }
    ],
    causes: [
      'Coronary Artery Disease (CAD)',
      'High arterial plaque accumulation (atherosclerosis)',
      'Tobacco smoking and electronic nicotine use',
      'Unmanaged hypertension (high blood pressure) and elevated LDL cholesterol',
      'Sedentary lifestyle and chronic metabolic conditions'
    ],
    mythVsFact: [
      {
        myth: 'A heart attack always presents as a sudden, dramatic "Hollywood-style" collapse with crushing chest pain.',
        fact: 'Most heart attacks start slowly, with mild discomfort or pressure. Many people mistake them for indigestion, delaying critical treatment.'
      },
      {
        myth: 'Men and women experience the exact same heart attack warning signs.',
        fact: 'Women are much more likely to experience atypical symptoms such as extreme fatigue, shortness of breath, back or jaw pain, and vomiting, either with or without chest pressure.'
      }
    ]
  },
  {
    id: 'cardiac-arrest',
    name: 'Cardiac Arrest',
    pronunciation: 'Sudden Cardiac Arrest (SCA)',
    system: 'Electrical (Rhythm)',
    analogy: 'Power Blackout',
    shortSummary: 'An electrical malfunction causes the heart to suddenly and unexpectedly stop beating. This is an immediate fatal crisis.',
    trigger: 'Severe electrical arrhythmia',
    description: 'Cardiac arrest is an abrupt, unexpected loss of heart function, breathing, and consciousness. It is caused by an electrical glitch in the heart that triggers a chaotic, rapid rhythm (arrhythmia), such as Ventricular Fibrillation (V-Fib). Without pumping action, blood flow to the brain and vital organs stops. Death occurs within minutes without intervention.',
    symptoms: [
      { text: 'Sudden collapse with complete loss of consciousness', critical: true },
      { text: 'No breathing at all, or only gasping, labored, or irregular snores (agonal breathing)', critical: true },
      { text: 'Absolute unresponsiveness to shouting, shaking, or physical touch', critical: true },
      { text: 'No detectable carotid pulse or heartbeat', critical: true }
    ],
    firstAidSteps: [
      { step: 1, title: 'Call 911 Immediately', details: 'Shout for nearby help. Call emergency services instantly. If someone else is there, send them to find a nearby AED.', isPrimary: true },
      { step: 2, title: 'Begin Hands-Only CPR', details: 'Push hard and fast in the center of the chest at a rate of 100 to 120 compressions per minute (to the beat of the song "Stayin\' Alive").', isPrimary: true },
      { step: 3, title: 'Deploy an AED', details: 'Turn on the Automated External Defibrillator. It will give clear voice commands. Apply the sticky pads and only deliver a shock if instructed.', isPrimary: true },
      { step: 4, title: 'Continue Compressions', details: 'Resume high-quality chest compressions immediately after the AED delivers or advises against a shock, minimizing interruptions.', isPrimary: false }
    ],
    causes: [
      'Prior coronary heart conditions (e.g. recent heart attacks)',
      'Cardiomyopathy (pathological enlargement or thickening of the heart tissue)',
      'Congenital or inherited heart rhythm conditions (e.g., Long QT syndrome)',
      'Severe respiratory failure, mechanical trauma, or drug toxicity'
    ],
    mythVsFact: [
      {
        myth: 'Cardiac arrest and a heart attack are identical conditions under different medical terms.',
        fact: 'They are fundamentally different. A heart attack is a circulation failure (clogged blood vessel), while cardiac arrest is an electrical failure (heart stops beating). A heart attack can sometimes trigger cardiac arrest, but they are not the same.'
      },
      {
        myth: 'Only older individuals with severe cardiovascular diagnoses suffer from cardiac arrest.',
        fact: 'Cardiac arrest can strike anyone, at any age—including young, seemingly healthy athletes in peak conditioning, often due to underlying, undiagnosed structural or genetic electrical defects.'
      }
    ]
  },
  {
    id: 'heart-failure',
    name: 'Heart Failure',
    pronunciation: 'Congestive Heart Failure',
    system: 'Mechanical (Pumping)',
    analogy: 'Pump Fatigue / Muscle Weakness',
    shortSummary: 'A chronic, progressive condition where the heart muscle is too weak, stiff, or exhausted to pump blood efficiently.',
    trigger: 'Myocardial structural fatigue',
    description: 'Heart failure is a chronic, progressive cardiovascular condition in which the heart muscle is unable to pump blood with enough strength to fully support the body\'s oxygen demands. It does not mean the heart has stopped working, but rather that the heart is operating at diminished capacity, leading to fluid congestion in tissues and lungs. It is manageable with persistent medical therapies.',
    symptoms: [
      { text: 'Shortness of breath (dyspnea) during exertion or when attempting to lie down flat', critical: true },
      { text: 'Persistent fatigue, weakness, and overall decreased physical endurance', critical: false },
      { text: 'Visible swelling (edema) in the ankles, feet, legs, or abdomen due to fluid buildup', critical: true },
      { text: 'Chronic nocturnal coughing or dry wheezing, sometimes producing pink-tinged sputum', critical: false },
      { text: 'Sudden, rapid weight gain (e.g., 2-3 pounds in 24 hours) from fluid retention', critical: true }
    ],
    firstAidSteps: [
      { step: 1, title: 'Recognize Decompensation', details: 'Understand that heart failure is chronic, but sudden worsening is a medical emergency.', isPrimary: false },
      { step: 2, title: 'Check Weight and Fluid Indicators', details: 'Track daily weight carefully. Sudden rapid swings require immediate notify-of-cardiologist to adjust diuretics.', isPrimary: false },
      { step: 3, title: 'Positioning for Breathing', details: 'If experiencing sudden dyspnea, sit fully upright and elevate the head with multiple pillows to lower intra-pulmonary fluid pressure.', isPrimary: true },
      { step: 4, title: 'Seek Immediate Crisis Care', details: 'If struggling to breathe, having blue lips or fingertips, or experiencing rapid heartbeat with chest pain, call 911 immediately.', isPrimary: true }
    ],
    causes: [
      'Uncontrolled high blood pressure (forcing the heart to work too hard)',
      'Coronary Artery Disease and scarred tissue from previous heart attacks',
      'Valvular heart disease (leaky or narrowed heart valves)',
      'Chronic conditions like diabetes, thyroid dysfunction, or heavy alcohol use'
    ],
    mythVsFact: [
      {
        myth: 'Heart failure means the heart has completely stopped beating or is on the absolute verge of stopping.',
        fact: 'Heart failure simply means the heart is not pumping as efficiently as it should. Many people live active, fulfilling, long lives with heart failure by managing it with prescribed lifestyle steps, medications, and cardiac monitoring.'
      },
      {
        myth: 'There is nothing you can do about heart failure other than complete bed rest.',
        fact: 'Structured physical exercise (cardiac rehab) is actually highly recommended to tone the rest of the circulatory system. Rest is vital during acute flares, but consistent, light cardiovascular movement is beneficial.'
      }
    ]
  }
];

export const simulationScenarios: SimulationScenario[] = [
  {
    id: 'scen-1',
    title: 'The Unresponsive Jogger',
    setting: 'Suburban Park Pathway',
    description: 'You are walking in a park on a sunny afternoon. Suddenly, a jogger ahead of you slows down, stumbles, and collapses onto the grass. They do not make any sound. As you run over to help, you notice they are completely motionless.',
    symptomClues: [
      'Sudden collapse during exercise',
      'Completely unresponsive when you tap their shoulder and shout',
      'Not breathing, or only occasionally making strange, irregular gasping noises and snoring sounds'
    ],
    targetedCondition: 'cardiac-arrest',
    choices: [
      {
        id: 'c1-a',
        text: 'Assume they are just exhausted, roll them on their side to catch their breath, and wait to see if they wake up.',
        isCorrect: false,
        explanation: 'Incorrect. Sudden collapse with unresponsiveness and abnormal gasping indicating agonal breathing is a hallmark of Cardiac Arrest—a massive emergency. Waiting even 1-2 minutes without starting compressions dramatically reduces survival rates.'
      },
      {
        id: 'c1-b',
        text: 'Shout for someone to find an AED. Call 911 immediately, put your phone on speaker, and immediately start firm, rapid chest compressions in the center of the chest.',
        isCorrect: true,
        explanation: 'Correct! This is a textbook case of Cardiac Arrest. Rapid recognition, immediate 911 activation, sending someone for a nearby AED, and instant hands-only CPR (compressing hard and fast at 100-120 BPM) are the absolute keys to survival.'
      },
      {
        id: 'c1-c',
        text: 'Look for an aspirin in your bag, try to place it under their tongue, and check their pockets for an inhaler to help them breathe.',
        isCorrect: false,
        explanation: 'Incorrect. An unconscious, non-breathing patient cannot safely swallow or take oral medications. Putting items or your fingers in an unresponsive person\'s mouth poses a severe choking hazard. You must start CPR immediately.'
      }
    ]
  },
  {
    id: 'scen-2',
    title: 'An Unfinished Dinner',
    setting: 'Family Restaurant',
    description: 'During a family dinner, your 58-year-old relative suddenly stops eating. They lean back, rubbing their chest with their fist. They look pale and are starting to break out in a noticeable cold sweat, despite the air-conditioned room. When you ask if they are okay, they whisper that they feel heavy pressure, like an elephant is sitting on their chest.',
    symptomClues: [
      'Severe pressure/tightness in the center of the chest',
      'Paleness and cold, clammy sweat',
      'The person remains fully conscious and talking, but is in visible distress'
    ],
    targetedCondition: 'heart-attack',
    choices: [
      {
        id: 'c2-a',
        text: 'Drive them home immediately so they can rest in their bed and take an antacid, assuming it is severe indigestion from dinner.',
        isCorrect: false,
        explanation: 'Incorrect. Heavy, pressure-like chest pain paired with pale skin and a cold sweat are classic, hazardous symptoms of a Heart Attack. Delaying treatment or driving them yourself in a personal car is dangerous. If they go into cardiac arrest while you are driving, you cannot administer CPR safely.'
      },
      {
        id: 'c2-b',
        text: 'Call 911 immediately. Have them sit down comfortably in a resting position. Keep them calm, ask if they have an aspirin available to chew, and monitor them closely until paramedics arrive.',
        isCorrect: true,
        explanation: 'Correct! For an active, conscious patient experiencing heart attack symptoms, calling 911 immediately is the primary action. Chewing an aspirin helps inhibit platelets to reduce clot growth. Keeping them calm and seated decreases myocardial oxygen consumption.'
      },
      {
        id: 'c2-c',
        text: 'Immediately lay them flat on the floor, tell everyone to back away, and begin loud chest compressions on their chest.',
        isCorrect: false,
        explanation: 'Incorrect. If the person is fully conscious, conversing, and breathing normally, they do NOT need CPR (chest compressions). Doing compressions on a conscious person causes unnecessary pain and potential fracture. CPR is strictly for unconscious, non-breathing victims.'
      }
    ]
  },
  {
    id: 'scen-3',
    title: 'The Heavy Ankles',
    setting: 'Grandfather\'s Living Room',
    description: 'You visit your grandfather who has a history of high blood pressure. You notice his ankles and feet look extremely swollen, pillowing over his shoes. He mentions he hasn\'t been sleeping well because he gets very short of breath whenever he lies down flat on the bed, requiring him to stack 3 or 4 pillows to sleep at night. He is also easily exhausted just walking to the kitchen.',
    symptomClues: [
      'Observable fluid swelling (edema) in ankles/feet',
      'Difficulty breathing when lying flat, needing to prop up with pillows',
      'Chronic persistent fatigue and very low physical endurance'
    ],
    targetedCondition: 'heart-failure',
    choices: [
      {
        id: 'c3-a',
        text: 'Recognize this as progressive Heart Failure. Help him sit upright or elevated, help him record his daily weight, and coordinate an urgent consultation with his cardiologist to adjust his medications.',
        isCorrect: true,
        explanation: 'Correct! These are progressive indicator signs of Heart Failure (fluid congestion and decreased mechanical pumping power). Sitting upright relieves pulmonary fluid congestion. Urgent medical supervision and medication adjustment (such as adjusting diuretics) are the safe path.'
      },
      {
        id: 'c3-b',
        text: 'Assume they are suffering from an acute cardiac arrest, lay them down on the floor completely flat, and prepare to deliver high-voltage AED shocks.',
        isCorrect: false,
        explanation: 'Incorrect. He is awake, alert, and tracking conversations. This is chronic progressive Heart Failure rather than sudden electrical Cardiac Arrest. Laying him completely flat will actually make his shortness of breath significantly worse, as fluid pools in his lungs.'
      },
      {
        id: 'c3-c',
        text: 'Tell him to drink several large glasses of water to flush out his kidneys, walk 2 miles around the neighborhood to work off the leg swelling, and take some aspirin for the aching ankles.',
        isCorrect: false,
        explanation: 'Incorrect. In heart failure, the body is already overloaded with fluid (visible edema). Drinking excessive water can dangerously overload his failing heart. Forcing heavy physical exercise while he is actively decompensating is dangerous. Fluid restriction and medical help are required.'
      }
    ]
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which condition is fundamentally a "circulation" problem caused by a blocked vessel blocking oxygen flow to the muscle?',
    options: [
      'Heart Attack',
      'Cardiac Arrest',
      'Heart Failure',
      'Cardiomyopathy'
    ],
    correctIndex: 0,
    explanation: 'A Heart Attack is caused by a blocked coronary artery (a plumbing issue) preventing oxygen-rich blood from reaching heart tissue. The heart muscle begins to die, but the heart itself keeps beating.'
  },
  {
    id: 2,
    question: 'What is the absolute immediate primary first-aid action for someone in Cardiac Arrest?',
    options: [
      'Give them a glass of warm water and check their vitals',
      'Have them chew a single baby aspirin',
      'Call 911 instantly, send someone for an AED, and start immediate chest compressions',
      'Apply an ice pack to their forehead and elevate their feet'
    ],
    correctIndex: 2,
    explanation: 'Cardiac Arrest is an electrical blackout where the heart stops completely. Brain damage begins in 4 minutes and death follows soon after. Immediate activation of 911, retrieving an AED, and starting high-quality chest compressions (hands-only CPR) are required immediately.'
  },
  {
    id: 3,
    question: 'How does Heart Failure differ from both Heart Attack and Cardiac Arrest?',
    options: [
      'It means the heart has completely stopped beating and the patient has collapsed',
      'It is a chronic, progressive condition where the heart still beats, but is too weak or stiff to pump blood effectively',
      'It only affects the outer skin and nervous systems of the body, leaving the cardiovascular system intact',
      'It is characterized by sudden electrical chaotic spasms that require instant shock treatment'
    ],
    correctIndex: 1,
    explanation: 'During Heart Failure, the heart has NOT stopped beating, nor is it suffering from a sudden vital stoppage. Instead, the muscle is chronically weakened or stiffened (mechanical insufficiency), meaning it cannot circulate blood efficiently, leading to chronic fatigue and fluid accumulation.'
  },
  {
    id: 4,
    question: 'Why do heart failure patients often sleep propped up with multiple pillows or in a recliner chair?',
    options: [
      'Because sleeping flat causes the heart to undergo severe electrical arrhythmias',
      'To prevent the blood from clotting inside their lower leg arteries',
      'Because lying flat allows fluid to accumulate in their lungs, making it extremely difficult to breathe',
      'Simply because it is more comfortable for neck muscles to maintain posture'
    ],
    correctIndex: 2,
    explanation: 'When lying flat, gravity allows interstitial fluids from the lower body to redistribute and accumulate in the chest and lungs (pulmonary congestion). Propping up with pillows keeps the fluid settled in lower portions, making breathing significantly easier during rest.'
  },
  {
    id: 5,
    question: 'If a person collapses, is completely unresponsive, but is making irregular gasping/snoring sounds (agonal breathing), what is likely happening?',
    options: [
      'They have simply fallen into a deep, healthy sleep and should be left alone',
      'They are having an indigestion reflux event and should chew an antacid',
      'They are undergoing Sudden Cardiac Arrest; the gasping is a reflex and they need immediate CPR',
      'They are having a mild heart attack and only need an aspirin'
    ],
    correctIndex: 2,
    explanation: 'Agonal breathing (gasping, snorting, or labored sighs) is a brainstem reflex that occurs post-collapse in up to 40% of Sudden Cardiac Arrest events. It is NOT breathing. It must be treated as Cardiac Arrest—start chest compressions instantly!'
  }
];
