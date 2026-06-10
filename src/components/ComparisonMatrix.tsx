import React, { useState } from 'react';
import { ConditionDetail } from '../types';
import { TRANSLATIONS } from '../translations';
import { ShieldAlert, Plus, Minus, Activity, Sparkles, AlertCircle, Table, CheckCircle2, HeartPulse, Info } from 'lucide-react';

export default function ComparisonMatrix() {
  const t = TRANSLATIONS;
  const [expandedCard, setExpandedCard] = useState<'heart-attack' | 'cardiac-arrest' | 'heart-failure' | null>(null);

  const getSystemBadgeColor = (id: string) => {
    if (id === 'heart-attack') return 'bg-amber-100 border-amber-200 text-amber-800 font-bold';
    if (id === 'cardiac-arrest') return 'bg-rose-100 border-rose-200 text-rose-800 font-bold';
    return 'bg-blue-100 border-blue-200 text-blue-800 font-bold';
  };

  const getHeaderHighlight = (id: string) => {
    if (id === 'heart-attack') return 'bg-amber-500';
    if (id === 'cardiac-arrest') return 'bg-rose-600';
    return 'bg-blue-600';
  };

  const enConditions: ConditionDetail[] = [
    {
      id: 'heart-attack',
      name: 'Heart Attack (Artery Blocked)',
      pronunciation: 'Myocardial Infarction',
      system: 'Circulatory (Plumbing)',
      analogy: 'Plumbing Blockage',
      shortSummary: 'A blocked coronary artery prevents oxygenated blood from reaching part of the heart muscle. The heart continues to pump.',
      trigger: 'Coronary artery thrombosis / spasm',
      description: 'A heart attack occurs when a coronary artery becomes blocked—usually due to a rupture of cholesterol plaque triggering a blood clot—oxygen-starving a portion of the heart muscle. Without speedy medical intervention, this muscle tissue suffers irreversible death. Crucially, the heart is still attempting to pump during a heart attack.',
      symptoms: [
        { text: 'Crushing or squeezing chest pain, heavy tight pressure in the center of the chest', critical: true },
        { text: 'Pain radiating outward to the left arm, shoulders, upper back, neck, or lower jaw', critical: true },
        { text: 'Shortness of breath, dizziness, sudden unexplained cold sweat', critical: false },
        { text: 'Atypical warnings (frequent in women): unexplained extreme fatigue, nausea, back or jaw discomfort', critical: true }
      ],
      firstAidSteps: [
        { step: 1, title: 'Call Emergency', details: 'Dial 112 or 108 immediately. Prompt restoration of blood flow is absolutely paramount.', isPrimary: true },
        { step: 2, title: 'Chew Aspirin', details: 'Have the patient chew 325mg of aspirin to minimize clot progression, if not allergic.', isPrimary: true },
        { step: 3, title: 'Maintain Rest', details: 'Keep the patient sitting upright and calm. Minimize any physical exertion to lower myocardial oxygen demand.', isPrimary: false },
        { step: 4, title: 'Monitor Pulses', details: 'Stand by to begin CPR if they suddenly lose consciousness and stop breathing.', isPrimary: false }
      ],
      causes: [
        'Coronary Artery Disease (CAD)',
        'Hypertension (elevated chronic blood pressure)',
        'Atherosclerosis (plaque buildup)',
        'Active tobacco smoking/vaping',
        'Advanced age or family medical history'
      ],
      mythVsFact: [
        {
          myth: 'Heart attacks are always sudden and dramatic, with the patient clutching their chest and collapsing instantly.',
          fact: 'Most heart attacks start slowly with mild pressure. Many patients confuse them with heartburn or indigestion, delaying vital care.'
        },
        {
          myth: 'Men and women experience identical symptoms during an infarction.',
          fact: 'Women are significantly more likely to present with atypical signs like breathlessness, shoulder blade pain, nausea, or profound exhaustion without typical chest pressure.'
        }
      ]
    },
    {
      id: 'cardiac-arrest',
      name: 'Cardiac Arrest (Electrical Stop)',
      pronunciation: 'Sudden Cardiac Arrest (SCA)',
      system: 'Electrical (Rhythm)',
      analogy: 'Power Blackout',
      shortSummary: 'A critical electrical malfunction causes the heart to suddenly and unexpectedly stop beating altogether. Blood flow to the brain ceases.',
      trigger: 'Severe electrical arrhythmia (V-Fib)',
      description: 'Sudden Cardiac Arrest is an abrupt, unexpected cessation of heart pumping, breathing, and consciousness. It is caused by a rapid, chaotic electrical rhythm (arrhythmia) like Ventricular Fibrillation. Deprived of circulation, the brain suffers neurological damage within minutes. Death is imminent without immediate bystander CPR.',
      symptoms: [
        { text: 'Sudden collapse with absolute and immediate loss of consciousness', critical: true },
        { text: 'No breathing at all, or only abnormal agonal gasping, snorting, or laboring', critical: true },
        { text: 'Complete lack of response to shouting, physical tapping, or shaking', critical: true },
        { text: 'No palpable carotid or wrist pulse detected', critical: true }
      ],
      firstAidSteps: [
        { step: 1, title: 'Call Emergency + Find AED', details: 'Dial 112 or 108 instantly. Immediately send someone to search for an Automated External Defibrillator.', isPrimary: true },
        { step: 2, title: 'Begin Hands-Only CPR', details: 'Push hard and fast in the center of the chest at 100 to 120 compressions/minute, mimicking the beat of "Stayin\' Alive".', isPrimary: true },
        { step: 3, title: 'Deploy the AED', details: 'Switch power on and follow voice instructions. Apply pads, do NOT touch patient during scanning, shock if prompted.', isPrimary: true },
        { step: 4, title: 'Keep Compressing', details: 'Immediately resume CPR compressions after the shock or if no shock is advised to prevent perfusion drop.', isPrimary: false }
      ],
      causes: [
        'Congenital structural anomalies',
        'Undiagnosed cardiac channelopathies (Long QT syndrome)',
        'Ischemic scar tissue from past myocardial infarctions',
        'Severe blunt trauma to the chest (Commotio Cordis)',
        'Acute electrolyte imbalances'
      ],
      mythVsFact: [
        {
          myth: 'SCA and heart attacks are different words for the exact same clinical event.',
          fact: 'They are fundamentally distinct. A heart attack is a plumbing flow issue; Cardiac Arrest is an electrical stoppage issue. A heart attack can trigger arrest, but they are separate.'
        },
        {
          myth: 'Cardiovascular arrest only strikes senior citizens or people with long-established chronic diagnoses.',
          fact: 'Arrhythmic arrest can strike anyone, including elite teenage athletes in peak physical condition, often driven by quiet inherited electrical defects.'
        }
      ]
    },
    {
      id: 'heart-failure',
      name: 'Heart Failure (Pump Fatigue)',
      pronunciation: 'Congestive Heart Failure',
      system: 'Mechanical (Pumping)',
      analogy: 'Engine Power Loss',
      shortSummary: 'A progressive, long-term condition where the heart muscle weakens or stiffens, reducing its capacity to pump blood efficiently.',
      trigger: 'Myocardial remodeling / wear',
      description: 'Congestive Heart Failure is a chronic, degenerative state where the heart chambers are unable to pump blood with sufficient force or fill properly. The heart does not stop completely; rather, it struggles to supply systemic demands, which causes fluid backpressure inside lungs and distal limb tissues.',
      symptoms: [
        { text: 'Dyspnea (shortness of breath) on minor movement or when lying flat in bed', critical: true },
        { text: 'Visible fluid swelling (edema) in ankles, feet, calves, or stomach', critical: true },
        { text: 'Persistent generalized physical fatigue, lethargy, or weakness', critical: false },
        { text: 'Dry hacking couch or pinkish fluid phlegm, worse at night', critical: false },
        { text: 'Sudden, rapid fluid weight gains (e.g., 2-3 pounds in a single day)', critical: true }
      ],
      firstAidSteps: [
        { step: 1, title: 'Identify Decompensation', details: 'Differentiate chronic symptoms from sudden exacerbations indicating critical pulmonary congestion.', isPrimary: false },
        { step: 2, title: 'Monitor Fluid Retaining', details: 'Daily weight tracking is required. Sudden increases demand immediate medication calibration by a physician.', isPrimary: false },
        { step: 3, title: 'Upright Positioning', details: 'If sudden breathlessness occurs, elevate the head with multiple pillows or sit upright on the edge of the bed to drain passive chest fluid.', isPrimary: true },
        { step: 4, title: 'Seek Specialist Care', details: 'If cyanosis (blue lips/nails) or severe chest choking develops, dial 112 instantly for emergency care.', isPrimary: true }
      ],
      causes: [
        'Chronic poorly-managed hypertension',
        'Post-infarction myocardial scar tissue',
        'Cardiomyopathy or viral myocarditis',
        'Heart valve disease (stenosis/regurgitation)',
        'Diabetic cardiomyopathy'
      ],
      mythVsFact: [
        {
          myth: 'Heart failure means the heart is about to completely stop beating within days.',
          fact: 'It is a slow, highly manageable disease. With proper medication (Beta-blockers, ACE inhibitors) and careful fluid log management, patients often live active lives for decades.'
        },
        {
          myth: 'Patients with heart failure must strictly avoid all physical activity and stay in bed.',
          fact: 'Appropriate, light physical rehabilitation is clinically proven to improve circulation, build cardiac reserve, and significantly enhance overall quality of life.'
        }
      ]
    }
  ];

  const currentConditions = enConditions;

  return (
    <div className="space-y-8" id="comparison-section">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left border-b border-slate-200 pb-5">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
            <Activity className="w-6 h-6 text-rose-600 animate-pulse" />
            {t.matrix.title}
          </h3>
          <p className="text-sm font-medium text-slate-600 mt-1">
            {t.matrix.subtitle}
          </p>
        </div>
      </div>

      {/* Redesigned Premium Classic Table Mode */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden text-left">
        
        {/* Table helper guide for mobile viewports */}
        <div className="px-5 py-4 bg-slate-50/80 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
            </span>
            <span>👉 Swipe horizontally to compare the full clinical spectrum</span>
          </div>
          <span className="font-extrabold text-slate-400">Cardiovascular Reference Matrix</span>
        </div>

        <div className="overflow-x-auto scroller-slim">
        <table className="w-full border-collapse min-w-[850px] table-fixed">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/20">
              <th className="p-5 text-xs font-extrabold tracking-wider text-slate-500 uppercase w-[18%] text-left">
                Core Aspect
              </th>
              {currentConditions.map((cond) => {
                const isSelected = expandedCard === cond.id;
                
                return (
                  <th 
                    key={cond.id} 
                    className={`p-5 text-left transition-all relative cursor-pointer select-none group w-[27.33%] ${
                      isSelected ? 'bg-slate-50/60 font-black text-slate-950' : 'hover:bg-slate-50/30'
                    }`}
                    onClick={() => setExpandedCard(isSelected ? null : cond.id)}
                  >
                    <div className="space-y-2 flex flex-col h-full justify-between">
                      <div>
                        <span className={`inline-block px-2.5 py-0.5 text-[9px] font-mono rounded-lg border uppercase font-black tracking-wider ${getSystemBadgeColor(cond.id)}`}>
                          {cond.system}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors">
                          {cond.name}
                        </h4>
                        <p className="text-[10px] font-mono text-slate-400 italic">
                          {cond.pronunciation}
                        </p>
                      </div>
                    </div>
                    
                    {/* Active underline accent bar indicators */}
                    <div className={`absolute bottom-0 left-0 right-0 h-[3px] transition-all duration-300 ${
                      isSelected ? getHeaderHighlight(cond.id) : 'bg-transparent group-hover:bg-slate-200'
                    }`} />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            
            {/* Row 1: Simplified Analogy */}
            <tr className="hover:bg-slate-50/5 transition-colors">
              <td className="p-5 text-xs font-extrabold text-slate-500 uppercase font-mono bg-slate-50/10">
                {t.matrix.analogy}
              </td>
              {currentConditions.map((cond) => (
                <td key={cond.id} className="p-5 text-xs">
                  <span className={`inline-flex px-3 py-1 rounded-full font-mono text-xs font-bold border ${
                    cond.id === 'heart-attack' ? 'bg-amber-50 border-amber-200 text-amber-800' :
                    cond.id === 'cardiac-arrest' ? 'bg-rose-50 border-rose-200 text-rose-800' :
                    'bg-blue-50 border-blue-200 text-blue-800'
                  }`}>
                    {cond.analogy}
                  </span>
                </td>
              ))}
            </tr>

            {/* Row 2: Underlying Condition / Trigger */}
            <tr className="hover:bg-slate-50/5 transition-colors">
              <td className="p-5 text-xs font-extrabold text-slate-500 uppercase font-mono bg-slate-50/10">
                Anatomical Trigger
              </td>
              {currentConditions.map((cond) => (
                <td key={cond.id} className="p-5 text-xs text-slate-800 leading-relaxed font-sans font-medium">
                  {cond.trigger}
                </td>
              ))}
            </tr>

            {/* Row 3: Medical Summary */}
            <tr className="hover:bg-slate-50/5 transition-colors">
              <td className="p-5 text-xs font-extrabold text-slate-500 uppercase font-mono bg-slate-50/10">
                {t.matrix.shortSummary}
              </td>
              {currentConditions.map((cond) => (
                <td key={cond.id} className="p-5 text-xs text-slate-600 leading-relaxed font-sans">
                  {cond.shortSummary}
                </td>
              ))}
            </tr>

            {/* Row 4: Primary Warnings */}
            <tr className="hover:bg-slate-50/5 transition-colors">
              <td className="p-5 text-xs font-extrabold text-slate-500 uppercase font-mono bg-slate-50/10">
                {t.matrix.warningSymptoms}
              </td>
              {currentConditions.map((cond) => (
                <td key={cond.id} className="p-5 text-xs leading-relaxed font-sans">
                  <ul className="space-y-2 text-slate-700">
                    {cond.symptoms.slice(0, 3).map((sym, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className={`inline-block w-2 h-2 rounded-full shrink-0 mt-1.5 ${
                          sym.critical ? 'bg-rose-500 animate-pulse' : 'bg-slate-300'
                        }`} />
                        <span className={sym.critical ? 'font-bold text-slate-900' : 'text-slate-600'}>
                          {sym.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Row 5: Immediate Action */}
            <tr className="bg-rose-50/10 hover:bg-slate-50/5 transition-colors">
              <td className="p-5 text-xs font-extrabold text-rose-600 uppercase font-mono bg-rose-500/[0.03] flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                {t.matrix.firstAidProtocol}
              </td>
              {currentConditions.map((cond) => {
                const isArrest = cond.id === 'cardiac-arrest';
                const isAttack = cond.id === 'heart-attack';
                
                return (
                  <td key={cond.id} className="p-5 text-xs leading-relaxed font-sans bg-rose-500/[0.01]">
                    <div className={`p-4 rounded-2xl border font-bold text-xs shadow-sm ${
                      isAttack ? 'bg-gradient-to-br from-amber-50 to-amber-100/60 border-amber-200 text-amber-950' :
                      isArrest ? 'bg-gradient-to-br from-rose-50 to-rose-100/60 border-rose-200 text-rose-950 animate-pulse' :
                      'bg-gradient-to-br from-blue-50 to-blue-100/60 border-blue-200 text-blue-950'
                    }`}>
                      {cond.id === 'heart-attack' && 'Call 112 or 108 instantly + Chew aspirin.'}
                      {cond.id === 'cardiac-arrest' && 'Call 112 or 108 + Start Hands-Only CPR + Use AED.'}
                      {cond.id === 'heart-failure' && 'Keep upright. Consult Cardiologist / Weight log.'}
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Row 6: Study Action triggers */}
            <tr className="bg-slate-50/30">
              <td className="p-5 text-xs font-extrabold text-slate-500 uppercase font-mono bg-slate-50/10">
                Action
              </td>
              {currentConditions.map((cond) => {
                const isSelected = expandedCard === cond.id;
                return (
                  <td key={cond.id} className="p-5">
                    <button
                      onClick={() => setExpandedCard(isSelected ? null : cond.id)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer border ${
                        isSelected 
                          ? 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800' 
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-950'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Minus className="w-3.5 h-3.5 shrink-0" />
                          {t.matrix.collapseDetails}
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 shrink-0" />
                          {t.matrix.expandDetails}
                        </>
                      )}
                    </button>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>

      {/* Redesigned Premium Active Pathology Deep Explorer Segment */}
      {expandedCard && (() => {
        const cond = currentConditions.find(c => c.id === expandedCard)!;
        
        return (
          <div 
            id={`pathology-deep-explorer-${cond.id}`}
            className="border border-slate-200 bg-white rounded-3xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-200 text-left shadow-sm relative overflow-hidden"
          >
            {/* Visual Header indicating Active Deep-Dive Selection */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider ${getSystemBadgeColor(cond.id)}`}>
                    {cond.system} • {cond.analogy}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-slate-950">
                  {cond.name}
                </h4>
                <p className="text-xs font-mono text-slate-400 italic">
                  {cond.pronunciation}
                </p>
              </div>
              <div>
                <button
                  onClick={() => setExpandedCard(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold font-mono border border-slate-200 transition-colors uppercase tracking-wider shrink-0 cursor-pointer"
                >
                  {t.matrix.collapseDetails}
                </button>
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Mechanism and Etiology */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Pathology Description */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-rose-600 flex items-center gap-1 bg-rose-50 border border-rose-100 rounded-lg px-2.5 py-1 w-fit">
                    <Activity className="w-3.5 h-3.5 text-rose-500" />
                    {t.matrix.expansionMechanism}
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed font-sans">
                    {cond.description}
                  </p>
                </div>

                {/* 2. Etiology and Risk Factors */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-slate-500 block">
                    {t.matrix.primaryCauses}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cond.causes.map((cause, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-sans font-medium hover:border-slate-300 transition-colors"
                      >
                        {cause}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Myth vs Fact Block */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                  <span className="text-xs uppercase font-mono tracking-wider font-extrabold text-slate-500 block">
                    {t.matrix.mythVsFact}
                  </span>
                  <div className="space-y-4">
                    {cond.mythVsFact.map((mf, index) => (
                      <div key={index} className="space-y-2 border-b border-slate-200 last:border-0 pb-3 last:pb-0">
                        <div className="flex items-start gap-2.5 text-xs text-slate-705 font-sans leading-relaxed">
                          <span className="text-rose-600 font-mono font-black text-[11px] bg-rose-100 border border-rose-200 rounded-lg px-2 py-0.5 shrink-0 mt-0.5">
                            {t.matrix.mythLabel}
                          </span> 
                          <span>{mf.myth}</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-xs text-slate-900 font-sans leading-relaxed font-bold">
                          <span className="text-emerald-700 font-mono font-black text-[11px] bg-emerald-100 border border-emerald-200 rounded-lg px-2 py-0.5 shrink-0 mt-0.5">
                            {t.matrix.factLabel}
                          </span> 
                          <span className="font-extrabold text-slate-900">{mf.fact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Symptoms and Emergency Protocol */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* 1. Symptoms check list */}
                <div className="space-y-3">
                  <span className="text-xs uppercase font-mono tracking-wider font-extrabold text-slate-500 block">
                    {t.matrix.fullClinicalSymptoms}
                  </span>
                  <div className="space-y-2">
                    {cond.symptoms.map((sym, idx) => (
                      <div 
                        key={idx} 
                        className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 text-xs flex gap-3 items-start hover:bg-slate-100 transition-all font-sans"
                      >
                        <span className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                          sym.critical ? 'bg-rose-500 animate-pulse' : 'bg-slate-300'
                        }`} />
                        <div>
                          <p className={`leading-relaxed ${sym.critical ? 'font-bold text-slate-900' : 'text-slate-600'}`}>
                            {sym.text}
                          </p>
                          {sym.critical && (
                            <span className="inline-block mt-1.5 text-[10.5px] font-mono font-extrabold rounded-lg bg-red-50 border border-red-200 text-red-600 px-2 py-0.5 uppercase tracking-wide">
                              {t.matrix.criticalBadge}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Step-by-Step Emergency Protocol */}
                <div className="space-y-3">
                  <span className="text-xs uppercase font-mono tracking-wider font-extrabold text-rose-600 block">
                    {t.matrix.completeFirstAid}
                  </span>
                  <div className="space-y-3 animate-in fade-in duration-300">
                    {cond.firstAidSteps.map((step) => (
                      <div 
                        key={step.step} 
                        className={`p-4 rounded-2xl border flex gap-3 text-left items-start transition-all shadow-sm ${
                          step.isPrimary 
                            ? 'bg-slate-900 border-slate-900 text-white' 
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[10px] font-mono font-black shrink-0 ${
                          step.isPrimary 
                            ? 'bg-rose-600 text-white' 
                            : 'bg-slate-200 text-slate-600'
                        }`}>
                          {step.step}
                        </span>
                        <div className="text-xs space-y-1">
                          <h6 className={`font-black tracking-wide uppercase font-mono text-[10.5px] ${step.isPrimary ? 'text-rose-400' : 'text-slate-900'}`}>
                            {step.title}
                          </h6>
                          <p className={step.isPrimary ? 'text-slate-300' : 'text-slate-600'}>
                            {step.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        );
      })()}

    </div>
  );
}
