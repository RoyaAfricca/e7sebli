import re
import sys

def patch_app_jsx():
    with open('src/App.jsx', 'r', encoding='utf-8') as f:
        code = f.read()

    # 1. Modify Step0_Level
    step0_target = """        <span className="flex items-center gap-3" style={{ fontSize: 18, fontWeight: 800 }}>
          <span style={{
            width: 38, height: 38, borderRadius: 12,
            background: 'rgba(56,189,248,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}><GraduationCap size={20} color="#38bdf8" /></span>
          المرحلة الثانوية
        </span>
        <ChevronLeft size={22} style={{ color: '#38bdf8' }} />
      </button>"""
    
    step0_replacement = step0_target + """
      {/* Target Calculator Button */}
      <button onClick={onTargetClick} className="btn-secondary w-full p-4 flex items-center justify-between mt-4" style={{ borderRadius: 16 }}>
        <span className="flex items-center gap-3" style={{ fontSize: 16, fontWeight: 800 }}>
          <span style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calculator size={18} color="white" />
          </span>
          حاسبة التدارك (قداش لازمني؟)
        </span>
        <ChevronLeft size={20} className="grp-translate" />
      </button>"""
      
    code = code.replace("const Step0_Level = ({ onSelect }) => (", "const Step0_Level = ({ onSelect, onTargetClick }) => (")
    code = code.replace(step0_target, step0_replacement)

    # 2. Add StepX_TargetCalculator component right before function App()
    target_calculator_component = """
const StepX_TargetCalculator = ({ level, selectedYear, selectedSection, onBack, onReset }) => {
  const [m1Str, setM1] = useState('');
  const [m2Str, setM2] = useState('');
  
  // Specific Subjects State (for rachat combinations)
  const is3rdYear = selectedYear === '3';
  const showRachatSubjects = is3rdYear;
  
  const [selectedRefSubjects, setSelectedRefSubjects] = useState([]);
  const [refGrades, setRefGrades] = useState({});

  const m1 = parseFloat(m1Str.replace(',', '.')) || 0;
  const m2 = parseFloat(m2Str.replace(',', '.')) || 0;

  // Calculate generic Target Avg for 10 (auto) and 9 (rachat)
  let t3For10 = 0;
  let t3For9 = 0;
  
  if (level === 'lycee' && parseInt(selectedYear) >= 2) {
    // Annual = (m1 + m2*2 + m3*2) / 5
    // m3 = (Annual * 5 - m1 - m2*2) / 2
    t3For10 = (50 - m1 - m2 * 2) / 2;
    t3For9 = (45 - m1 - m2 * 2) / 2;
  } else {
    // Annual = (m1 + m2 + m3) / 3
    // m3 = (Annual * 3 - m1 - m2)
    t3For10 = 30 - m1 - m2;
    t3For9 = 27 - m1 - m2;
  }
  
  const clamp = (val) => val > 20 ? 20 : (val < 0 ? 0 : val);

  // Get Reference Subjects for current Section
  const sectionKey = selectedYear === '1' ? 'standard_1' : (selectedYear === '2' ? `${selectedSection}_2` : selectedSection);
  const refList = REFERENCE_SUBJECTS[sectionKey] || [];
  
  const toggleRefSubject = (sub) => {
    if (selectedRefSubjects.includes(sub)) {
      setSelectedRefSubjects(selectedRefSubjects.filter(s => s !== sub));
      const newG = {...refGrades};
      delete newG[sub];
      setRefGrades(newG);
    } else {
      if (selectedRefSubjects.length < 2) {
        setSelectedRefSubjects([...selectedRefSubjects, sub]);
        setRefGrades({...refGrades, [sub]: { t1: '', t2: '' }});
      }
    }
  };

  const handleRefGradeChange = (sub, term, val) => {
    const cleaned = val.replace(',', '.').replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    const validated = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : cleaned;
    if (validated !== '' && (parseFloat(validated) > 20)) return;
    
    setRefGrades({
      ...refGrades,
      [sub]: {
        ...refGrades[sub],
        [term]: validated
      }
    });
  };

  // Calculate sum of T3 needed for the two selected subjects to reach 18
  let requiredT3Sum = 0;
  let isRachatPossible = false;
  if (selectedRefSubjects.length === 2) {
    const s1 = selectedRefSubjects[0];
    const s2 = selectedRefSubjects[1];
    const g1 = refGrades[s1] || { t1: 0, t2: 0 };
    const g2 = refGrades[s2] || { t1: 0, t2: 0 };
    const s1_t1 = parseFloat(g1.t1) || 0;
    const s1_t2 = parseFloat(g1.t2) || 0;
    const s2_t1 = parseFloat(g2.t1) || 0;
    const s2_t2 = parseFloat(g2.t2) || 0;
    
    // According to the formula for Lycee >= 2: Annual = (T1 + 2*T2 + 2*T3) / 5
    // We want Sub1_Annual + Sub2_Annual >= 18
    // ((s1_t1 + 2*s1_t2 + 2*s1_t3)/5) + ((s2_t1 + 2*s2_t2 + 2*s2_t3)/5) >= 18
    // s1_t1 + 2*s1_t2 + s2_t1 + 2*s2_t2 + 2*(s1_t3 + s2_t3) >= 90
    requiredT3Sum = (90 - (s1_t1 + 2*s1_t2 + s2_t1 + 2*s2_t2)) / 2;
    isRachatPossible = true;
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="glass-card text-right flex flex-col gap-6" dir="rtl">
      <div>
        <h2 className="text-2xl font-black mb-1">قداش لازمني ؟</h2>
        <p className="text-[#38bdf8] text-xs font-bold">حساب المعدل المطلوب في الثلاثي الثالث</p>
      </div>
      
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-[10px] text-white/40 font-black uppercase mb-2 block">معدل الثلاثي الأول</label>
          <input type="text" inputMode="decimal" value={m1Str} onChange={(e) => setM1(e.target.value)} className="w-full bg-black/30 border-0 text-center h-14 rounded-2xl font-black text-xl focus:ring-2 focus:ring-[#39d6c3] transition-all" placeholder="0.00" />
        </div>
        <div className="flex-1">
          <label className="text-[10px] text-white/40 font-black uppercase mb-2 block">معدل الثلاثي الثاني</label>
          <input type="text" inputMode="decimal" value={m2Str} onChange={(e) => setM2(e.target.value)} className="w-full bg-black/30 border-0 text-center h-14 rounded-2xl font-black text-xl focus:ring-2 focus:ring-[#39d6c3] transition-all" placeholder="0.00" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="p-4 rounded-3xl bg-white/5 border border-[#39d6c333] flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-black text-[#39d6c3] uppercase mb-1">النجاح الآلي (10.00)</span>
          <span className="text-3xl font-black" style={{ color: t3For10 > 20 ? '#ff1e65' : '#39d6c3' }}>
            {m1Str && m2Str ? (t3For10 > 20 ? "مستحيل" : (t3For10 <= 0 ? "ناجح" : t3For10.toFixed(2))) : "--"}
          </span>
        </div>
        <div className="p-4 rounded-3xl bg-white/5 border border-[#ffcc0033] flex flex-col items-center justify-center text-center relative overflow-hidden">
          <span className="text-[10px] font-black text-[#ffcc00] uppercase mb-1">الإسعاف (09.00)</span>
          <span className="text-3xl font-black" style={{ color: t3For9 > 20 ? '#ff1e65' : '#ffcc00' }}>
            {m1Str && m2Str ? (t3For9 > 20 ? "مستحيل" : (t3For9 <= 0 ? "ناجح" : t3For9.toFixed(2))) : "--"}
          </span>
        </div>
      </div>

      {showRachatSubjects && (
        <div className="mt-4 p-5 rounded-3xl bg-white/5 border border-white/10">
          <h3 className="font-black text-white/80 mb-3 text-sm">شروط الإسعاف الخاصة بالمواد الأساسية</h3>
          <p className="text-[10px] text-white/40 mb-4 lh-relaxed">
            الرجاء اختيار مادتين مرجعيتين للحساب. للنجاح بالإسعاف، يجب أن يكون مجموع المعدلات السنوية لهاتين المادتين ≥ 18.
          </p>
          
          <div className="flex flex-wrap gap-2 mb-5">
            {refList.map(sub => (
              <button 
                key={sub}
                onClick={() => toggleRefSubject(sub)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all border ${selectedRefSubjects.includes(sub) ? 'bg-[#ffcc0022] border-[#ffcc00] text-[#ffcc00]' : 'bg-black/30 border-white/10 text-white/50'}`}
              >
                {sub}
              </button>
            ))}
          </div>
          
          {selectedRefSubjects.length === 2 && (
            <div className="flex flex-col gap-4">
              {selectedRefSubjects.map((sub, idx) => (
                <div key={sub} className="flex gap-2 items-center bg-black/20 p-2 rounded-2xl">
                  <span className="w-20 text-[11px] font-black">{sub}</span>
                  <input type="text" placeholder="ث1" value={refGrades[sub]?.t1 || ''} onChange={(e) => handleRefGradeChange(sub, 't1', e.target.value)} className="w-12 h-10 text-center bg-black/40 rounded-xl text-sm font-bold border-0" />
                  <input type="text" placeholder="ث2" value={refGrades[sub]?.t2 || ''} onChange={(e) => handleRefGradeChange(sub, 't2', e.target.value)} className="w-12 h-10 text-center bg-black/40 rounded-xl text-sm font-bold border-0" />
                </div>
              ))}
              
              <div className="mt-2 p-4 bg-[#ffcc0011] border border-[#ffcc0033] rounded-2xl text-center">
                <span className="text-[10px] text-[#ffcc00] font-black block mb-2">مجموع أعداد الثلاثي 3 المطلوب لهاتين المادتين</span>
                <span className="text-2xl font-black text-[#ffcc00]">
                  {requiredT3Sum > 40 ? "مستحيل (> 40)" : (requiredT3Sum <= 0 ? "متوفر" : requiredT3Sum.toFixed(2))}
                </span>
                <p className="text-[9px] text-[#ffcc00] opacity-70 mt-2">مثال: إذا كان المطلوب 20، فبإمكانك الحصول على 10 في الأولى و 10 في الثانية.</p>
              </div>
            </div>
          )}
          {selectedRefSubjects.length < 2 && (
            <div className="text-center p-4">
              <span className="text-xs text-white/30 font-bold">يرجى اختيار مادتين.</span>
            </div>
          )}
        </div>
      )}

      {showRachatSubjects && (
        <div className="mt-2 p-3 bg-[#ff1e6511] border border-[#ff1e6533] rounded-xl flex items-start gap-3">
          <div className="mt-0.5 text-[#ff1e65]"><CheckCircle2 size={16} /></div>
          <p className="text-[10px] text-[#ff1e65] font-black leading-relaxed text-right w-full">
            إذا توفرت شروط الإسعاف يبقى القرار النهائي لمجلس القسم بالنجاح أو الرسوب.
          </p>
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <button onClick={onBack} className="btn-secondary h-14 px-6 flex items-center justify-center font-black rounded-2xl">
          <ChevronRight size={20} />
        </button>
        <button onClick={onReset} className="btn-primary flex-1 h-14 font-black flex items-center justify-center gap-2 rounded-2xl">
          <RefreshCcw size={18} /> حساب جديد
        </button>
      </div>
    </motion.div>
  );
};
"""
    code = code.replace("function App() {", target_calculator_component + "\nfunction App() {")

    # 3. Add appMode state
    state_injection = """  const [appMode, setAppMode] = useState('calculator');"""
    code = code.replace("const [step, setStep] = useState(0);", "const [step, setStep] = useState(0);\n" + state_injection)

    # 4. Update reset function
    code = code.replace("setStep(0);", "setStep(0);\n    setAppMode('calculator');")

    # 5. Update routing logic in App return
    routing_target = """{step === 0 && <Step0_Level onSelect={(l) => { setLevel(l); nextStep(); }} />}
          {step === 1 && <Step1_YearSection level={level} onSelect={(y) => { setSelectedYear(y); if (level === 'college') setStep(3); else nextStep(); }} onBack={prevStep} />}
          {step === 2 && <Step2_Section selectedYear={selectedYear} onSelect={(s) => { setSelectedSection(s); nextStep(); }} onBack={prevStep} />}
          {step === 3 && <Step3_Term onSelect={(t) => { setSelectedTerm(t); nextStep(); }} onBack={prevStep} />}"""
          
    routing_replacement = """{step === 0 && <Step0_Level onSelect={(l) => { setLevel(l); setAppMode('calculator'); nextStep(); }} onTargetClick={() => { setAppMode('target'); nextStep(); }} />}
          {step === 1 && <Step1_YearSection level={level} onSelect={(y) => { setSelectedYear(y); if (level === 'college') setStep(3); else nextStep(); }} onBack={prevStep} />}
          {step === 2 && <Step2_Section selectedYear={selectedYear} onSelect={(s) => { setSelectedSection(s); nextStep(); }} onBack={prevStep} />}
          {step === 3 && appMode === 'calculator' && <Step3_Term onSelect={(t) => { setSelectedTerm(t); nextStep(); }} onBack={prevStep} />}
          {step === 3 && appMode === 'target' && <StepX_TargetCalculator level={level} selectedYear={selectedYear} selectedSection={selectedSection} onBack={prevStep} onReset={reset} />}"""
    
    code = code.replace(routing_target, routing_replacement)

    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(code)

if __name__ == '__main__':
    patch_app_jsx()
    print("Done patching App.jsx")
