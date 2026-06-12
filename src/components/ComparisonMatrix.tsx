import React, { useState } from 'react';
import { ConditionDetail } from '../types';
import { TRANSLATIONS } from '../translations';
import { ShieldAlert, Plus, Minus, Activity } from 'lucide-react';

export default function ComparisonMatrix() {
  const t = TRANSLATIONS;
  const [expandedCard, setExpandedCard] = useState<'heart-attack' | 'cardiac-arrest' | 'heart-failure' | null>(null);
  const [activeMobileTab, setActiveMobileTab] = useState<'heart-attack' | 'cardiac-arrest' | 'heart-failure'>('heart-attack');

  const getSystemBadgeColor = (_id: string) => {
    return 'bg-slate-100 border-slate-200 text-slate-700 font-semibold';
  };

  const getHeaderHighlight = (_id: string) => {
    return 'bg-slate-800';
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
    <div className="space-y-6" id="comparison-section">
      
      {/* Header section */}
      <div className="text-left">
        <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{t.matrix.title}</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          {t.matrix.subtitle}
        </p>
      </div>      {/* Redesigned Premium Classic Table Mode */}
      <div className="hidden md:block bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden text-left">
        
        {/* Table helper guide for mobile viewports */}
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 font-sans font-medium">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            <span>Swipe horizontally to compare the full clinical spectrum</span>
          </div>
          <span className="font-semibold text-slate-400 font-sans">Cardiovascular Reference Matrix</span>
        </div>

        <div className="overflow-x-auto scroller-slim">
        <table className="w-full border-collapse min-w-[850px] table-fixed">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/20">
              <th className="p-5 text-xs font-bold tracking-wider text-slate-500 uppercase w-[18%] text-left">
                Core Aspect
              </th>
              {currentConditions.map((cond) => {
                const isSelected = expandedCard === cond.id;
                
                return (
                  <th 
                    key={cond.id} 
                    className={`p-5 text-left transition-all relative cursor-pointer select-none group w-[27.33%] ${
                      isSelected ? 'bg-slate-50/60 font-extrabold text-slate-950' : 'hover:bg-slate-50/30'
                    }`}
                    onClick={() => setExpandedCard(isSelected ? null : cond.id)}
                  >
                    <div className="space-y-2 flex flex-col h-full justify-between">
                      <div>
                        <span className={`inline-block px-2.5 py-0.5 text-xs font-sans font-semibold rounded-full border uppercase tracking-wider ${getSystemBadgeColor(cond.id)}`}>
                          {cond.system}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm md:text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                          {cond.name}
                        </h4>
                        <p className="text-xs text-slate-500 italic font-medium mt-0.5">
                          {cond.pronunciation}
                        </p>
                      </div>
                    </div>
                    
                    {/* Active underline accent bar indicators */}
                    <div className={`absolute bottom-0 left-0 right-0 h-[2.5px] transition-all duration-300 ${
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
              <td className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider font-sans bg-slate-50/10">
                {t.matrix.analogy}
              </td>
              {currentConditions.map((cond) => (
                <td key={cond.id} className="p-5 text-sm">
                  <span className="inline-flex px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700 font-sans text-sm font-medium">
                    {cond.analogy}
                  </span>
                </td>
              ))}
            </tr>

            {/* Row 2: Underlying Condition / Trigger */}
            <tr className="hover:bg-slate-50/5 transition-colors">
              <td className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider font-sans bg-slate-50/10">
                Anatomical Trigger
              </td>
              {currentConditions.map((cond) => (
                <td key={cond.id} className="p-5 text-sm text-slate-700 leading-relaxed font-sans">
                  {cond.trigger}
                </td>
              ))}
            </tr>

            {/* Row 3: Medical Summary */}
            <tr className="hover:bg-slate-50/5 transition-colors">
              <td className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider font-sans bg-slate-50/10">
                {t.matrix.shortSummary}
              </td>
              {currentConditions.map((cond) => (
                <td key={cond.id} className="p-5 text-sm text-slate-600 leading-relaxed font-sans">
                  {cond.shortSummary}
                </td>
              ))}
            </tr>

            {/* Row 4: Primary Warnings */}
            <tr className="hover:bg-slate-50/5 transition-colors">
              <td className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider font-sans bg-slate-50/10">
                {t.matrix.warningSymptoms}
              </td>
              {currentConditions.map((cond) => (
                <td key={cond.id} className="p-5 text-sm leading-relaxed font-sans">
                  <ul className="space-y-2 text-slate-700">
                    {cond.symptoms.slice(0, 3).map((sym, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 mt-2 ${
                          sym.critical ? 'bg-rose-500' : 'bg-slate-350'
                        }`} />
                        <span className={sym.critical ? 'font-semibold text-slate-900' : 'text-slate-605'}>
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
              <td className="p-5 bg-rose-500/[0.02]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider font-sans">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-rose-500" />
                  {t.matrix.firstAidProtocol}
                </div>
              </td>
              {currentConditions.map((cond) => {
                const isArrest = cond.id === 'cardiac-arrest';
                const isAttack = cond.id === 'heart-attack';
                
                return (
                  <td key={cond.id} className="p-5 text-sm leading-relaxed font-sans bg-rose-500/[0.01]">
                    <div className={`p-3 rounded-xl border font-semibold text-sm shadow-sm ${
                      isAttack ? 'bg-amber-50/60 border-amber-200 text-slate-800' :
                      isArrest ? 'bg-rose-50/60 border-rose-200 text-slate-800' :
                      'bg-blue-50/60 border-blue-200 text-slate-800'
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
              <td className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider font-sans bg-slate-50/10">
                Action
              </td>
              {currentConditions.map((cond) => {
                const isSelected = expandedCard === cond.id;
                return (
                  <td key={cond.id} className="p-5">
                    <button
                      onClick={() => setExpandedCard(isSelected ? null : cond.id)}
                      className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer border ${
                        isSelected 
                          ? 'bg-rose-600 border-rose-600 text-white hover:bg-rose-700' 
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

      {/* Mobile Card-based comparison mode (visible only on small screens) */}
      <div className="block md:hidden space-y-4">
        {/* Selector pills for conditions */}
        <div className="flex gap-2 p-1 bg-slate-100 border border-slate-200 rounded-2xl">
          {currentConditions.map((cond) => {
            const isActive = activeMobileTab === cond.id;
            return (
              <button
                key={cond.id}
                onClick={() => setActiveMobileTab(cond.id as any)}
                className={`flex-1 py-2 px-1 text-2xs font-extrabold rounded-xl transition-all uppercase tracking-wider text-center cursor-pointer border ${
                  isActive
                    ? 'bg-white text-rose-600 border-slate-200 shadow-sm font-black'
                    : 'border-transparent text-slate-500 hover:text-slate-950'
                }`}
                style={{ fontSize: '0.625rem' }}
              >
                {cond.name.split(' (')[0]}
              </button>
            );
          })}
        </div>

        {/* Selected condition card */}
        {(() => {
          const cond = currentConditions.find(c => c.id === activeMobileTab)!;
          const isAttack = cond.id === 'heart-attack';
          const isArrest = cond.id === 'cardiac-arrest';
          
          return (
            <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className={`px-2.5 py-0.5 rounded-full border uppercase tracking-wider font-semibold bg-slate-100 border-slate-200 text-slate-700`} style={{ fontSize: '0.625rem' }}>
                  {cond.system}
                </span>
                <span className="text-xs text-slate-500 font-medium italic">
                  {cond.pronunciation}
                </span>
              </div>

              {/* Analogy */}
              <div className="space-y-1">
                <span className="font-mono font-bold uppercase tracking-wider text-slate-400 block" style={{ fontSize: '0.625rem' }}>
                  {t.matrix.analogy}
                </span>
                <div>
                  <span className="inline-flex px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-700 font-sans text-xs font-medium">
                    {cond.analogy}
                  </span>
                </div>
              </div>

              {/* Anatomical Trigger */}
              <div className="space-y-1">
                <span className="font-mono font-bold uppercase tracking-wider text-slate-400 block" style={{ fontSize: '0.625rem' }}>
                  Anatomical Trigger
                </span>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  {cond.trigger}
                </p>
              </div>

              {/* Medical Summary */}
              <div className="space-y-1">
                <span className="font-mono font-bold uppercase tracking-wider text-slate-400 block" style={{ fontSize: '0.625rem' }}>
                  {t.matrix.shortSummary}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {cond.shortSummary}
                </p>
              </div>

              {/* Primary Warnings */}
              <div className="space-y-2">
                <span className="font-mono font-bold uppercase tracking-wider text-slate-400 block" style={{ fontSize: '0.625rem' }}>
                  {t.matrix.warningSymptoms}
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {cond.symptoms.slice(0, 3).map((sym, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${
                        sym.critical ? 'bg-rose-500' : 'bg-slate-350'
                      }`} />
                      <span className={sym.critical ? 'font-semibold text-slate-900' : 'text-slate-600'}>
                        {sym.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Immediate Action */}
              <div className="space-y-1">
                <span className="font-mono font-bold uppercase tracking-wider text-slate-400 block" style={{ fontSize: '0.625rem' }}>
                  {t.matrix.firstAidProtocol}
                </span>
                <div className={`p-3 rounded-xl border font-semibold text-xs leading-normal ${
                  isAttack ? 'bg-amber-50/60 border-amber-200 text-slate-800' :
                  isArrest ? 'bg-rose-50/60 border-rose-200 text-slate-800' :
                  'bg-blue-50/60 border-blue-200 text-slate-800'
                }`}>
                  {cond.id === 'heart-attack' && 'Call 112 or 108 instantly + Chew aspirin.'}
                  {cond.id === 'cardiac-arrest' && 'Call 112 or 108 + Start Hands-Only CPR + Use AED.'}
                  {cond.id === 'heart-failure' && 'Keep upright. Consult Cardiologist / Weight log.'}
                </div>
              </div>

              {/* View Deep Details trigger */}
              <button
                onClick={() => setExpandedCard(expandedCard === cond.id ? null : cond.id)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer border mt-2 ${
                  expandedCard === cond.id
                    ? 'bg-rose-600 border-rose-600 text-white hover:bg-rose-700'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-950'
                }`}
              >
                {expandedCard === cond.id ? (
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
            </div>
          );
        })()}
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
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-sans font-semibold uppercase tracking-wider ${getSystemBadgeColor(cond.id)}`}>
                    {cond.system} • {cond.analogy}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-slate-905">
                  {cond.name}
                </h4>
                <p className="text-xs font-sans text-slate-500 italic font-medium mt-0.5">
                  {cond.pronunciation}
                </p>
              </div>
              <div>
                <button
                  onClick={() => setExpandedCard(null)}
                  className="bg-slate-50 hover:bg-slate-100 text-slate-600 px-4 py-2 rounded-xl text-xs font-bold font-sans border border-slate-200 transition-colors uppercase tracking-wider shrink-0 cursor-pointer"
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
                  <span className="text-xs uppercase font-sans tracking-wider font-bold text-slate-700 flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 w-fit">
                    <Activity className="w-3.5 h-3.5 text-slate-500" />
                    {t.matrix.expansionMechanism}
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed font-sans">
                    {cond.description}
                  </p>
                </div>

                {/* 2. Etiology and Risk Factors */}
                <div className="space-y-3">
                  <span className="text-xs uppercase font-sans tracking-wider font-bold text-slate-500 block">
                    {t.matrix.primaryCauses}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cond.causes.map((cause, idx) => (
                      <span 
                        key={idx} 
                        className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-600 font-sans font-medium hover:border-slate-300 transition-colors"
                      >
                        {cause}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Myth vs Fact Block */}
                <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-5 space-y-4">
                  <span className="text-xs uppercase font-sans tracking-wider font-bold text-slate-500 block">
                    {t.matrix.mythVsFact}
                  </span>
                  <div className="space-y-4">
                    {cond.mythVsFact.map((mf, index) => (
                      <div key={index} className="space-y-2.5 border-b border-slate-200 last:border-0 pb-3.5 last:pb-0">
                        <div className="flex items-start gap-2.5 text-xs text-slate-700 font-sans leading-relaxed">
                          <span className="text-rose-700 font-sans font-bold text-xs bg-rose-50 border border-rose-200 rounded-lg px-2 py-0.5 shrink-0 mt-0.5">
                            {t.matrix.mythLabel}
                          </span> 
                          <span>{mf.myth}</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-xs text-slate-800 font-sans leading-relaxed font-semibold">
                          <span className="text-emerald-700 font-sans font-bold text-xs bg-emerald-50 border border-emerald-200 rounded-lg px-2 py-0.5 shrink-0 mt-0.5">
                            {t.matrix.factLabel}
                          </span> 
                          <span className="text-slate-800">{mf.fact}</span>
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
                  <span className="text-xs uppercase font-sans tracking-wider font-bold text-slate-500 block">
                    {t.matrix.fullClinicalSymptoms}
                  </span>
                  <div className="space-y-2">
                    {cond.symptoms.map((sym, idx) => (
                      <div 
                        key={idx} 
                        className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/30 text-xs flex gap-3 items-start hover:bg-slate-50 transition-all font-sans"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                          sym.critical ? 'bg-rose-500' : 'bg-slate-300'
                        }`} />
                        <div>
                          <p className={`leading-relaxed ${sym.critical ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>
                            {sym.text}
                          </p>
                          {sym.critical && (
                            <span className="inline-block mt-1.5 text-xs font-sans font-semibold rounded-full bg-rose-50 border border-rose-200 text-rose-700 px-2.5 py-0.5 uppercase tracking-wide">
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
                  <span className="text-xs uppercase font-sans tracking-wider font-bold text-rose-700 block">
                    {t.matrix.completeFirstAid}
                  </span>
                  <div className="space-y-3 animate-in fade-in duration-300">
                    {cond.firstAidSteps.map((step) => (
                      <div 
                        key={step.step} 
                        className={`p-4 rounded-2xl border flex gap-3 text-left items-start transition-all shadow-sm ${
                          step.isPrimary 
                            ? 'bg-white border-rose-300 text-slate-800 ring-1 ring-rose-50/50' 
                            : 'bg-slate-50 border-slate-200 text-slate-655'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-sans font-bold shrink-0 ${
                          step.isPrimary 
                            ? 'bg-rose-50 border border-rose-300 text-rose-700' 
                            : 'bg-slate-100 border border-slate-200 text-slate-600'
                        }`}>
                          {step.step}
                        </span>
                        <div className="text-xs space-y-1">
                          <h6 className={`font-bold tracking-wide uppercase font-sans text-xs ${step.isPrimary ? 'text-rose-800' : 'text-slate-800'}`}>
                            {step.title}
                          </h6>
                          <p className={step.isPrimary ? 'text-slate-600' : 'text-slate-600'}>
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
