import { ConditionDetail, SimulationScenario, QuizQuestion } from './types';

export const conditions: ConditionDetail[] = [
  {
    id: 'heart-attack',
    name: 'Heart Attack',
    pronunciation: 'Heart Attack (Blocked pipe)',
    system: 'Blood flow system (Plumbing)',
    analogy: 'Water pipe is blocked',
    shortSummary: 'A blocked blood pipe stops fresh blood from reaching a part of the heart muscle. The heart is still beating, but it hurts.',
    trigger: 'A heart pipe is blocked',
    description: 'A heart attack happens when one of the pipes carrying blood to the heart muscle gets clogged up (usually by fat or clots). Without blood, that part of the heart begins to get hurt. Crucially, the heart is still beating and the person is usually awake.',
    symptoms: [
      { text: 'Tightness, squeezing, or heavy weight in the middle of the chest', critical: true },
      { text: 'Pain radiating to the left arm, shoulders, neck, or jaw', critical: true },
      { text: 'Trouble breathing (feeling winded easily)', critical: false },
      { text: 'Unexplained cold sweating, feeling dizzy, or feeling sick in the stomach', critical: false },
      { text: 'Note for women: Women often feel sick in the stomach, feel tired, or have back/jaw pain instead of normal chest pain', critical: true }
    ],
    firstAidSteps: [
      { step: 1, title: 'Call 112 / 108 Emergency Number', details: 'Call the ambulance immediately. Every minute is very important to save the heart muscle.', isPrimary: true },
      { step: 2, title: 'Chew a Blood-Thinner (Aspirin)', details: 'If they can swallow and are not allergic, let them chew one adult aspirin. This helps blood flow through the block.', isPrimary: true },
      { step: 3, title: 'Sit Down and Calm Down', details: 'Sit down comfortably. Do not let the person walk or work. Staying calm helps the heart rest.', isPrimary: false },
      { step: 4, title: 'Watch Them Closely', details: 'Make sure they are awake and breathing. If they suddenly fall asleep and stop breathing, start pushing on their chest (CPR).', isPrimary: false }
    ],
    causes: [
      'Blocked heart pipes (clogged with fats over time)',
      'High bad cholesterol from eating too much oily/fatty food',
      'Smoking cigarettes, beedi, or other tobacco products',
      'High blood pressure that is not controlled',
      'Lack of daily walking and active body movement'
    ],
    mythVsFact: [
      {
        myth: 'A heart attack always makes you fall down instantly like in films.',
        fact: 'Most heart attacks start slowly with mild pressure or a full feeling. People often mistake it for a bad gas problem or indigestion, which is very dangerous because they delay going to the doctor.'
      },
      {
        myth: 'Men and women have the exact same signs of a heart attack.',
        fact: 'Women often do not feel heavy chest pain. Instead, they might feel very tired, out of breath, have a stomach ache, or jaw/back pain.'
      }
    ]
  },
  {
    id: 'cardiac-arrest',
    name: 'Cardiac Arrest',
    pronunciation: 'Cardiac Arrest (Heart stops beating)',
    system: 'Heart electrical switch (Power system)',
    analogy: 'Home power trip / Sudden blackout',
    shortSummary: 'An electrical spark problem makes the heart suddenly stop beating entirely. The person falls down and stops breathing. This is a maximum emergency.',
    trigger: 'Heart electricity stops working',
    description: 'Cardiac arrest is when the heart suddenly stops beating. It is caused by an electrical problem in the heart. Because the heart stops, no blood goes to the brain or body. The person will collapse instantly, lose consciousness, and stop breathing. They will die in minutes if no one helps.',
    symptoms: [
      { text: 'Sudden collapse: falling down on the ground suddenly', critical: true },
      { text: 'No response: they do not answer if you shake or shout at them', critical: true },
      { text: 'Not breathing, or only layout strange snoring/gasping noises', critical: true },
      { text: 'No pulse or heartbeat can be felt at all', critical: true }
    ],
    firstAidSteps: [
      { step: 1, title: 'Call 112 / 108 Instantly', details: 'Shout loudly for help. Call the emergency ambulance. Ask someone to look for a heart shock machine (AED).', isPrimary: true },
      { step: 2, title: 'Start Pushing Hard and Fast on Chest (CPR)', details: 'Put your hands in the middle of their chest. Push down hard and fast, about 100 to 120 times every minute.', isPrimary: true },
      { step: 3, title: 'Use a Shock Machine (AED) if Available', details: 'Turn on the machine. It will talk and tell you exactly what to do. Stick the pads on their chest and push the shock button only if it tells you to.', isPrimary: true },
      { step: 4, title: 'Do Not Stop pushing', details: 'Keep doing chest presses continuously. Only stop when the emergency ambulance gets there or the person wakes up.', isPrimary: false }
    ],
    causes: [
      'Previous uncorrected heart attacks that left deep scars',
      'Thickened or enlarged heart muscle',
      'Genetic heart issues you are born with',
      'Drowning, severe choking, electrocution, or major body shock'
    ],
    mythVsFact: [
      {
        myth: 'SCA and heart attack are exactly the same thing.',
        fact: 'They are different. A heart attack is a blocked pipe (the person is awake and talks, heart still beats). Cardiac arrest is a power cut (the person falls down, heart stops, and they are not breathing).'
      },
      {
        myth: 'Only old people get sudden cardiac arrest.',
        fact: 'It can happen to anyone of any age, including teenagers and sportsmen, usually because of a hidden heart electricity problem they did not know about.'
      }
    ]
  },
  {
    id: 'heart-failure',
    name: 'Heart Failure',
    pronunciation: 'Heart Failure (Weak heart pump)',
    system: 'Heart physical pump (Muscle strength)',
    analogy: 'Very weak water pump or tired motor',
    shortSummary: 'A long-term condition where the heart muscle is too weak or tired to pump blood well around the body.',
    trigger: 'Heart muscle is too weak',
    description: 'Heart failure does NOT mean the heart has stopped working. It means the heart is too weak to pump blood properly. This causes water and fluid to group up in the lungs, ankles, and legs. It is a long-term problem but can be treated with regular daily medicines.',
    symptoms: [
      { text: 'Feeling out of breath, especially when walking, working, or lying flat on bed', critical: true },
      { text: 'Feeling very tired, weak, and exhausted all the time', critical: false },
      { text: 'Visible fluid swelling in ankles, feet, legs, or belly', critical: true },
      { text: 'A dry, persistent cough, especially at night', critical: false },
      { text: 'Sudden fast weight gain (1 to 2 kg in single day) because of water building up inside', critical: true }
    ],
    firstAidSteps: [
      { step: 1, title: 'Know the Signs of Worsening', details: 'Understand that heart failure is slowly progressive, but sudden breathing trouble means you must go to a hospital immediately.', isPrimary: false },
      { step: 2, title: 'Check Weight and Swelling Daily', details: 'Check if legs are looking more swollen. Sudden weight gain means there is too much water trapped in the body.', isPrimary: false },
      { step: 3, title: 'Sit Up Straight to Breathe', details: 'If you suddenly feel out of breath, sit fully upright in a chair or prop up your back with 3 or 4 pillows. Do not lie down flat.', isPrimary: true },
      { step: 4, title: 'Go to a Doctor or Clinic', details: 'If it is very hard to breathe, or if lips and nails are turning blue, call 112 / 108 or go to the nearest emergency ward immediately.', isPrimary: true }
    ],
    causes: [
      'Long-term high blood pressure that was not treated with medicine',
      'Damaged heart muscle from a previous heart attack',
      'Damaged, narrow, or leaky heart valves',
      'Heavy drinking of alcohol over many years'
    ],
    mythVsFact: [
      {
        myth: 'Heart failure means your heart is about to completely stop beating.',
        fact: 'No. The heart is still working, but it is just weaker than normal. Many people live very active, long, and happy lives by taking their heart pills every day.'
      },
      {
        myth: 'If you have heart failure, you must stay in bed forever.',
        fact: 'No! Light walking and simple exercises are actually very good to keep your body strong. Only rest when you feel active shortness of breath.'
      }
    ]
  }
];

export const simulationScenarios: SimulationScenario[] = [
  {
    id: 'scen-1',
    title: 'The Unresponsive jogger',
    setting: 'Walking Path in a Park',
    description: 'You are walking in a park on a sunny afternoon. Suddenly, a jogger in front of you slows down, stumbles, and falls flat onto the grass. They make no sound. As you run over to help, you notice they are completely motionless and silent.',
    symptomClues: [
      'Sudden fall/collapse while moving',
      'Completely asleep: they do not answer when you shake their shoulders and shout',
      'Not breathing at all, or only making occasional strange snoring or gasping noises'
    ],
    targetedCondition: 'cardiac-arrest',
    choices: [
      {
        id: 'c1-a',
        text: 'Assume they are just tired. Roll them on their side to rest, and wait to see if they wake up on their own.',
        isCorrect: false,
        explanation: 'Incorrect! Falling down suddenly and not responding is a massive danger sign. If a person is gasping or not breathing, waiting even 1 or 2 minutes without helping can cause permanent death. You must act immediately!'
      },
      {
        id: 'c1-b',
        text: 'Heal your voice! Call 112 / 108 immediately, put your phone on speaker so you can talk, and start pushing down hard and fast on the center of their chest.',
        isCorrect: true,
        explanation: 'Correct! This is a Cardiac Arrest. Calling 112 or 108 immediately and starting CPR (pushing hard and fast on the chest) keeps blood flowing and can save their life!'
      },
      {
        id: 'c1-c',
        text: 'Try to force an aspirin pill into their mouth, or search their pockets to see if they have any inhalers to blow into their nose.',
        isCorrect: false,
        explanation: 'Incorrect. Never put any water, food, or pills into the mouth of a person who is passed out. They can easily choke on it. Start chest presses immediately instead!'
      }
    ]
  },
  {
    id: 'scen-2',
    title: 'A Sudden Pain at Dinner',
    setting: 'Family Restaurant',
    description: 'During a family dinner, your elder relative suddenly stops eating. They lean back in their chair, rubbing their chest with their fist. They look very pale and are sweating heavily, even though the room is cool. They whisper that they feel a heavy pressure, like an elephant is sitting on their chest.',
    symptomClues: [
      'Severe pressure, tightness, or pain in the middle of the chest',
      'Pale face and cold, sticky sweat',
      'The person is fully awake and talking, but is in a lot of pain'
    ],
    targetedCondition: 'heart-attack',
    choices: [
      {
        id: 'c2-a',
        text: 'Drive them home in your own car so they can sleep, and give them a gas pill assuming it is just acidity from dinner.',
        isCorrect: false,
        explanation: 'Incorrect! Heavy chest pain, pale skin, and cold sweat are serious warning signs of a Heart Attack. Delaying or driving them yourself is dangerous. If their heart stops while you are driving, you cannot do CPR. Always call an ambulance.'
      },
      {
        id: 'c2-b',
        text: 'Call 112 / 108 immediately. Have them sit down comfortably to rest. Keep them calm, ask if they have an aspirin pill to chew, and stay with them until the ambulance arrives.',
        isCorrect: true,
        explanation: 'Correct! If a person is awake but having a heart attack, call 112 or 108 immediately, make them sit down to rest, and give them an aspirin to chew. This is the safest thing to do.'
      },
      {
        id: 'c2-c',
        text: 'Make them lie down flat on the hard floor, tell everyone to stand back, and start pushing hard on their chest.',
        isCorrect: false,
        explanation: 'Incorrect! If the person is awake, talking, and breathing, they do NOT need chest presses (CPR). Chest presses on an awake person can break their ribs and cause severe pain. Only start CPR if they pass out and stop breathing.'
      }
    ]
  },
  {
    id: 'scen-3',
    title: 'The Swollen Ankles',
    setting: 'Grandfather\'s Living Room',
    description: 'You visit your grandfather. You notice his ankles and feet look very swollen and puffy, pouring over his shoes. He tells you he cannot sleep well because he gets flat out of breath whenever he lies down flat on the bed, forcing him to use 3 or 4 pillows to keep his head high. He also gets tired just walking to the kitchen.',
    symptomClues: [
      'Visible water swelling (edema) in ankles and feet',
      'Trouble breathing when lying down flat, needing to sleep propped up',
      'Feeling very tired and weak during normal walking'
    ],
    targetedCondition: 'heart-failure',
    choices: [
      {
        id: 'c3-a',
        text: 'Recognize this as a weak heart pump (Heart Failure). Help him sit up straight, check if his legs are swollen, and arrange a visit to his heart doctor soon to check his daily pills.',
        isCorrect: true,
        explanation: 'Correct! Swollen legs and breathing trouble when lying flat are classic signs of a weak heart (Heart Failure). Sitting upright helps him breathe better. He needs a doctor to check and adjust his daily water-reducing pills soon.'
      },
      {
        id: 'c3-b',
        text: 'Assume they are having an active cardiac arrest, pull them down to sleep completely flat on the floor, and look for a heart shock machine.',
        isCorrect: false,
        explanation: 'Incorrect! He is awake and talking to you. This is stable, long-term Heart Failure, not a sudden cardiac arrest. Do not make him lie flat on the floor, as flat lying makes it much harder to breathe!'
      },
      {
        id: 'c3-c',
        text: 'Tell him to drink 5 big glasses of water to clean his kidneys, and ask him to walk 2 miles to sweat out the foot swelling.',
        isCorrect: false,
        explanation: 'Incorrect! In heart failure, the heart is too weak, and water is already trapping in the body. Drinking extra water or forcing them to run/walk a long distance will exhaust the weak heart and is highly dangerous.'
      }
    ]
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Which heart condition is a "blocked pipes" problem where blood cannot reach the heart muscle?',
    options: [
      'Heart Attack (Blocked blood pipe)',
      'Cardiac Arrest (Heart suddenly stops)',
      'Heart Failure (Weak pump)',
      'Gas/Acidity problem'
    ],
    correctIndex: 0,
    explanation: 'A Heart Attack is a blood flow problem. A pipe is clogged so blood cannot reach the heart muscle. The heart keeps beating, but the muscle gets injured.'
  },
  {
    id: 2,
    question: 'What is the absolute immediate first thing you should do if someone passes out suddenly, is not responding, and is not breathing?',
    options: [
      'Give them a glass of water',
      'Call 112 or 108 immediately, and start pushing hard and fast on their chest (CPR)',
      'Let them sleep and wait for them to wake up',
      'Rub their feet with oil'
    ],
    correctIndex: 1,
    explanation: 'If a person collapses, does not answer, and is not breathing, their heart has stopped. You must call 112 or 108 instantly and start pushing hard and fast in the center of their chest to save their life!'
  },
  {
    id: 3,
    question: 'How is Heart Failure different from a Heart Attack or Cardiac Arrest?',
    options: [
      'It means the heart has completely stopped beating instantly',
      'It is a long-term condition where the heart still beats, but it is too weak or tired to pump blood well',
      'It is a minor problem that goes away in 5 minutes with water',
      'It is a sudden electricity problem'
    ],
    correctIndex: 1,
    explanation: 'In Heart Failure, the heart has NOT stopped. It is simply too weak or tired to pump blood around the body properly. This is a long-term issue managed with doctor medicines.'
  },
  {
    id: 4,
    question: 'Why do weak heart (Heart Failure) patients sleep using many pillows to keep their head high?',
    options: [
      'Because lying flat on the bed makes water pool in their lungs, making it very hard to breathe',
      'To prevent their neck from hurting',
      'Because it keeps their feet warm',
      'To prevent sudden heart sleep snoring'
    ],
    correctIndex: 0,
    explanation: 'When lying flat on the bed, gravity allows trapped body fluids to move up and settle in the lungs, making it very hard to breathe. Propping up with pillows keeps the fluid down, making breathing much easier.'
  },
  {
    id: 5,
    question: 'If a person falls down, is sleeping, does not answer, but makes deep snoring or irregular "gasping" sounds, what should you do?',
    options: [
      'Ignore it as they are just deep snoring',
      'Assume they are choke snoring and pour water in their mouth',
      'Treat it as Cardiac Arrest (heart has stopped) and start chest presses immediately',
      'Throw cold water on their face'
    ],
    correctIndex: 2,
    explanation: 'Strange, irregular gasping or snoring sounds right after falling down is agonal breathing. This means the brain is dying and the heart has stopped! You must treat it as Cardiac Arrest and start chest presses immediately.'
  }
];
