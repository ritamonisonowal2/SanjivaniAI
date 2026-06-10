export interface ConditionDetail {
  id: 'heart-attack' | 'cardiac-arrest' | 'heart-failure';
  name: string;
  pronunciation?: string;
  system: string; // "Circulation", "Electrical", "Mechanical"
  analogy: string; // "Plumbing Blockage", "Power Blackout", "Engine Wear"
  shortSummary: string;
  trigger: string;
  description: string;
  symptoms: {
    text: string;
    critical: boolean;
  }[];
  firstAidSteps: {
    step: number;
    title: string;
    details: string;
    isPrimary: boolean;
  }[];
  causes: string[];
  mythVsFact: {
    myth: string;
    fact: string;
  }[];
}

export interface ScenarioChoice {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface SimulationScenario {
  id: string;
  title: string;
  setting: string;
  description: string;
  choices: ScenarioChoice[];
  symptomClues: string[];
  targetedCondition: 'heart-attack' | 'cardiac-arrest' | 'heart-failure';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
