import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator,
  ChevronRight,
  ChevronLeft,
  RefreshCcw,
  GraduationCap,
  School,
  CheckCircle2,
  Award,
  LayoutList,
  AlignJustify,
  ExternalLink,
  Loader2,
  Download
} from 'lucide-react';

const CURRENT_VERSION = '1.0.0';
import { COLEGE_LEVELS, LYCEE_YEARS, SECTIONS, SECTIONS_1, SECTIONS_2, SUBJECTS_DATA, REFERENCE_SUBJECTS, GET_ELECTIVES_FOR_SECTION } from './data';

// --- AD BANNER COMPONENT ---
const AdBanner = () => {
  return (
    <div style={{ width: '100%', maxWidth: 900, margin: '24px auto' }}>
      <div style={{
        width: '100%',
        paddingTop: '42.22%', // 380 / 900 aspect ratio safely implemented
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        background: '#0f172a'
      }}>
        <iframe
          src={`${import.meta.env.BASE_URL}banner_anim.html`}
          style={{ width: '100%', height: '100%', border: 'none', position: 'absolute', top: 0, left: 0 }}
          scrolling="no"
          title="Lyceena Premium Ad"
        />
      </div>
    </div>
  );
};

// --- ANIMATION CONFIG ---
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

// --- SUB-COMPONENTS ---

const ProgressBar = ({ step }) => {
  const totalSteps = 6;
  const progress = (step / (totalSteps - 1)) * 100;
  return (
    <div className="w-full bg-white/10 h-1 rounded-full mb-8 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className="h-full bg-gradient-to-r from-[#38bdf8] to-[#39d6c3] shadow-[0_0_10px_rgba(57,214,195,0.3)]"
      />
    </div>
  );
};

// --- DYNAMIC LOGO COMPONENT ---
const DynamicLogo = () => {
  return (
    <motion.div
      className="relative"
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        width: 154, height: 154,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '50%',
        boxShadow: '0 0 25px rgba(255,30,101,0.5), 0 0 45px rgba(57,214,195,0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* 1. Spinning Luminous Background layer */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          top: '-50%', left: '-50%',
          width: '200%', height: '200%',
          background: 'conic-gradient(from 0deg, #ff1e65, #39d6c3, #38bdf8, #8b5cf6, #ff1e65)',
          zIndex: 0
        }}
      />

      {/* 2. Static Inner Container (prevents logo from spinning) */}
      <div style={{
        position: 'relative',
        width: 'calc(100% - 8px)', height: 'calc(100% - 8px)',
        borderRadius: '50%',
        background: '#0f172a',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1
      }}>
        <img
          src={`${import.meta.env.BASE_URL}logo_3d.png`}
          alt="e7sebli Logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          onError={(e) => {
            e.target.src = `${import.meta.env.BASE_URL}logo.png`;
          }}
        />
      </div>
    </motion.div>
  );
};

const Step0_Level = ({ onSelect, onTargetSelect }) => {
  const [targetMode, setTargetMode] = useState(false);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="glass-card flex flex-col gap-8 items-center text-center">

      <DynamicLogo />

      <motion.div variants={itemVariants}>
        <h1 style={{
          fontSize: 52, fontWeight: 900, letterSpacing: '-1px',
          background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          marginBottom: 8
        }}>e7sebli</h1>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(57,214,195,0.1)', border: '1px solid rgba(57,214,195,0.25)',
          borderRadius: 99, padding: '5px 14px'
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#39d6c3', boxShadow: '0 0 8px #39d6c3' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#39d6c3', letterSpacing: '0.15em', textTransform: 'uppercase' }}>تونس • 2025-2026</span>
        </div>
      </motion.div>

      {!targetMode ? (
        <motion.div variants={itemVariants} className="flex flex-col gap-4 w-full">
          {/* الإعدادية */}
          <button onClick={() => onSelect('college')} className="btn-primary w-full p-6 flex items-center justify-between group overflow-hidden relative" style={{ borderRadius: 20 }}>
            <span className="relative z-10 flex items-center gap-3" style={{ fontSize: 18, fontWeight: 800 }}>
              <span style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <School size={20} color="white" />
              </span>
              المرحلة الإعدادية
            </span>
            <ChevronLeft size={22} className="relative z-10 grp-translate" />
          </button>
          {/* الثانوية */}
          <button onClick={() => onSelect('lycee')} style={{
            width: '100%', padding: '24px', borderRadius: 20,
            border: '1.5px solid rgba(56,189,248,0.3)',
            background: 'linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(56,189,248,0.05) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            color: 'white', cursor: 'pointer', transition: 'all 0.25s ease'
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(56,189,248,0.55)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(56,189,248,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <span className="flex items-center gap-3" style={{ fontSize: 18, fontWeight: 800 }}>
              <span style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(56,189,248,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={20} color="#38bdf8" />
              </span>
              المرحلة الثانوية
            </span>
            <ChevronLeft size={22} style={{ color: '#38bdf8' }} />
          </button>

          {/* Target Calculator Button */}
          <button onClick={() => setTargetMode(true)} style={{
            width: '100%', padding: '16px 20px', borderRadius: 16, marginTop: 8,
            border: '1.5px solid rgba(255, 204, 0, 0.3)',
            background: 'linear-gradient(135deg, rgba(255,204,0,0.08) 0%, rgba(255,204,0,0.03) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            color: 'white', cursor: 'pointer', transition: 'all 0.25s ease'
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,204,0,0.6)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,204,0,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <span className="flex items-center gap-3" style={{ fontSize: 16, fontWeight: 800 }}>
              <span style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(255,204,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calculator size={18} color="#ffcc00" />
              </span>
              <span style={{ color: '#ffcc00' }}>قداش لازمني ؟</span>
            </span>
            <ChevronLeft size={20} style={{ color: '#ffcc00' }} />
          </button>

          {/* Download APK Button */}
          <a
            href="https://github.com/RoyaAfricca/e7sebli/releases/download/v1.0.0/E7sebli-v1.0.0.apk"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              width: '100%', padding: '14px 20px', borderRadius: 16, marginTop: 16,
              border: '1.5px solid rgba(57, 214, 195, 0.2)',
              background: 'rgba(57, 214, 195, 0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#39d6c3', cursor: 'pointer', transition: 'all 0.25s ease',
              textDecoration: 'none', gap: 10
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(57,214,195,0.5)'; e.currentTarget.style.background = 'rgba(57,214,195,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(57,214,195,0.2)'; e.currentTarget.style.background = 'rgba(57,214,195,0.05)'; }}>
            <Download size={18} />
            <span style={{ fontSize: 14, fontWeight: 900 }}>تنزيل تطبيق الأندرويد (APK)</span>
          </a>
        </motion.div>
      ) : (
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="flex flex-col gap-4 w-full">
          {/* Header for target mode */}
          <div style={{ padding: '12px 16px', borderRadius: 14, background: 'rgba(255,204,0,0.08)', border: '1px solid rgba(255,204,0,0.25)', textAlign: 'right' }} dir="rtl">
            <p style={{ fontSize: 13, fontWeight: 900, color: '#ffcc00', marginBottom: 2 }}>قداش لازمني ؟</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>أولاً اختر مرحلتك الدراسية</p>
          </div>

          {/* الإعدادية */}
          <button onClick={() => onTargetSelect('college')} className="btn-primary w-full p-6 flex items-center justify-between group overflow-hidden relative" style={{ borderRadius: 20 }}>
            <span className="relative z-10 flex items-center gap-3" style={{ fontSize: 18, fontWeight: 800 }}>
              <span style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <School size={20} color="white" />
              </span>
              المرحلة الإعدادية
            </span>
            <ChevronLeft size={22} className="relative z-10 grp-translate" />
          </button>

          {/* الثانوية */}
          <button onClick={() => onTargetSelect('lycee')} style={{
            width: '100%', padding: '24px', borderRadius: 20,
            border: '1.5px solid rgba(56,189,248,0.3)',
            background: 'linear-gradient(135deg, rgba(56,189,248,0.1) 0%, rgba(56,189,248,0.05) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            color: 'white', cursor: 'pointer', transition: 'all 0.25s ease'
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(56,189,248,0.55)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(56,189,248,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <span className="flex items-center gap-3" style={{ fontSize: 18, fontWeight: 800 }}>
              <span style={{ width: 38, height: 38, borderRadius: 12, background: 'rgba(56,189,248,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <GraduationCap size={20} color="#38bdf8" />
              </span>
              المرحلة الثانوية
            </span>
            <ChevronLeft size={22} style={{ color: '#38bdf8' }} />
          </button>

          <button onClick={() => setTargetMode(false)} className="mt-2 flex items-center gap-2" style={{ background: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 700, padding: 0, borderRadius: 0 }}>
            <ChevronRight size={18} /> رجوع
          </button>
        </motion.div>
      )}

      {!targetMode && <AdBanner />}
    </motion.div>
  );
};

const Step1_YearSection = ({ level, onSelect, onBack }) => {
  const years = level === 'college' ? COLEGE_LEVELS : LYCEE_YEARS;
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="glass-card text-right" dir="rtl">
      <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
        <div style={{
          padding: 10, borderRadius: 14,
          background: 'linear-gradient(135deg, rgba(57,214,195,0.2), rgba(57,214,195,0.08))',
          border: '1px solid rgba(57,214,195,0.2)',
          color: '#39d6c3'
        }}><GraduationCap size={22} /></div>
        السنة الدراسية
      </h2>
      <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
        {years.map((y, i) => (
          <motion.button
            variants={itemVariants}
            key={y.id}
            onClick={() => onSelect(y.id)}
            style={{
              padding: '18px 20px', borderRadius: 18,
              border: '1.5px solid rgba(255,255,255,0.08)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
              textAlign: 'right', cursor: 'pointer', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              transition: 'all 0.2s ease'
            }}
            whileHover={{ scale: 1.02, borderColor: 'rgba(57,214,195,0.4)', backgroundColor: 'rgba(57,214,195,0.05)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span style={{ fontWeight: 800, fontSize: 17 }}>{y.name}</span>
            <ChevronLeft size={18} style={{ color: '#39d6c3', opacity: 0.6 }} />
          </motion.button>
        ))}
      </div>
      <button onClick={onBack} className="mt-8 flex items-center gap-2" style={{ background: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 700, padding: 0, borderRadius: 0 }}>
        <ChevronRight size={18} /> رجوع
      </button>
    </motion.div>
  );
};

const Step2_Section = ({ selectedYear, onSelect, onBack }) => {
  const sectionsList = selectedYear === '1' ? SECTIONS_1 : (selectedYear === '2' ? SECTIONS_2 : SECTIONS);
  const title = selectedYear === '2' || selectedYear === '1' ? 'المسار' : 'الشعبة';

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="glass-card text-right" dir="rtl">
      <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
        <div style={{
          padding: 10, borderRadius: 14,
          background: 'linear-gradient(135deg, rgba(56,189,248,0.2), rgba(56,189,248,0.08))',
          border: '1px solid rgba(56,189,248,0.2)',
          color: '#38bdf8'
        }}><Award size={22} /></div>
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
        {sectionsList.map(s => (
          <motion.button
            variants={itemVariants}
            key={s.id}
            onClick={() => onSelect(s.id)}
            style={{
              padding: '18px 20px', borderRadius: 18,
              border: '1.5px solid rgba(255,255,255,0.08)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
              textAlign: 'right', cursor: 'pointer', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              transition: 'all 0.2s ease'
            }}
            whileHover={{ scale: 1.02, borderColor: 'rgba(56,189,248,0.35)', backgroundColor: 'rgba(56,189,248,0.05)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span style={{ fontWeight: 800, fontSize: 17 }}>{s.name}</span>
            <ChevronLeft size={18} style={{ color: '#38bdf8', opacity: 0.6 }} />
          </motion.button>
        ))}
      </div>
      <button onClick={onBack} className="mt-8 flex items-center gap-2" style={{ background: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 700, padding: 0, borderRadius: 0 }}>
        <ChevronRight size={18} /> رجوع
      </button>
    </motion.div>
  );
};

const Step3_Term = ({ onSelect, onBack }) => (
  <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="glass-card text-right" dir="rtl">
    <h2 className="text-2xl font-black mb-8">الفترة الدراسية</h2>
    <div className="grid grid-cols-1 gap-4">
      {[1, 2, 3].map(t => (
        <motion.button
          variants={itemVariants}
          key={t}
          onClick={() => onSelect(t)}
          style={{
            padding: '22px 24px', borderRadius: 22,
            border: '1.5px solid rgba(255,255,255,0.08)',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
            textAlign: 'right', cursor: 'pointer', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            position: 'relative', overflow: 'hidden'
          }}
          whileHover={{
            scale: 1.02,
            borderColor: 'rgba(57,214,195,0.4)',
            background: 'linear-gradient(135deg, rgba(57,214,195,0.08), rgba(57,214,195,0.03))'
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div style={{
            position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
            fontSize: 48, fontWeight: 900, color: 'rgba(255,255,255,0.04)', lineHeight: 1
          }}>{t}</div>
          <span style={{ fontWeight: 900, fontSize: 20 }}>
            الثلاثي {t === 1 ? 'الأول' : t === 2 ? 'الثاني' : 'الثالث'}
          </span>
          <span style={{
            width: 36, height: 36, borderRadius: 12,
            background: t === 1 ? 'rgba(56,189,248,0.15)' : t === 2 ? 'rgba(57,214,195,0.15)' : 'rgba(124,92,252,0.15)',
            border: `1px solid ${t === 1 ? 'rgba(56,189,248,0.3)' : t === 2 ? 'rgba(57,214,195,0.3)' : 'rgba(124,92,252,0.3)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: t === 1 ? '#38bdf8' : t === 2 ? '#39d6c3' : '#7c5cfc',
            fontSize: 16, fontWeight: 900
          }}>{t}</span>
        </motion.button>
      ))}
    </div>
    <button onClick={onBack} className="mt-8 flex items-center gap-2" style={{ background: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 700, padding: 0, borderRadius: 0 }}>
      <ChevronRight size={18} /> رجوع
    </button>
  </motion.div>
);

const Step3_Elective = ({ section, year, onSelect, onBack }) => {
  const options = GET_ELECTIVES_FOR_SECTION(section, year);
  
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="glass-card text-right" dir="rtl">
      <h2 className="text-2xl font-black mb-8 flex items-center gap-3">
        <div style={{
          padding: 10, borderRadius: 14,
          background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.08))',
          border: '1px solid rgba(124,58,237,0.2)',
          color: '#8b5cf6'
        }}><Award size={22} /></div>
        المادة الاختيارية
      </h2>
      <div className="grid grid-cols-1 gap-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
        {options.map(opt => (
          <motion.button
            variants={itemVariants}
            key={opt.id}
            onClick={() => onSelect(opt)}
            style={{
              padding: '18px 20px', borderRadius: 18,
              border: '1.5px solid rgba(255,255,255,0.08)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
              textAlign: 'right', cursor: 'pointer', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              transition: 'all 0.2s ease'
            }}
            whileHover={{ scale: 1.02, borderColor: 'rgba(124,58,237,0.35)', backgroundColor: 'rgba(124,58,237,0.05)' }}
            whileTap={{ scale: 0.98 }}
          >
            <span style={{ fontWeight: 800, fontSize: 17 }}>{opt.name}</span>
            <ChevronLeft size={18} style={{ color: '#8b5cf6', opacity: 0.6 }} />
          </motion.button>
        ))}
      </div>
      <button onClick={onBack} className="mt-8 flex items-center gap-2" style={{ background: 'none', color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 700, padding: 0, borderRadius: 0 }}>
        <ChevronRight size={18} /> رجوع
      </button>
    </motion.div>
  );
};

const Step4_Grades = ({
  subjects,
  currentSubIdx,
  grades,
  setGrades,
  isListView,
  setIsListView,
  nextSub,
  prevSub,
  nextStep,
  prevStep,
  term,
  prevAverages,
  setPrevAverages,
  isAutoAdvancing,
  setIsAutoAdvancing,
  calculateSubjectAverage,
  exemptions,
  setExemptions
}) => {
  const sub = subjects[currentSubIdx];
  const isFirst = currentSubIdx === 0;
  const isLast = currentSubIdx === subjects.length - 1;

  const toggleExempt = (subName) => {
    setExemptions(prev => ({ ...prev, [subName]: !prev[subName] }));
  };

  const isExempt = exemptions[sub.name];

  const handleGradeChange = (subInstance, field, value) => {
    const cleaned = value.replace(/,/g, '.').replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    const validated = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join('')}` : cleaned;
    if (validated !== '' && (parseFloat(validated) > 20)) return;

    const newGrades = {
      ...grades,
      [subInstance.name]: { ...(grades[subInstance.name] || {}), [field]: validated }
    };
    setGrades(newGrades);

    // Auto-advance logic removed per user request. The user must explicitly click "التالي" (Next) to proceed.
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="glass-card flex flex-col min-h-[520px] text-right" dir="rtl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black">إدخال الأعداد</h2>
          <p className="text-[10px] text-[#39d6c3] font-bold uppercase tracking-widest mt-1">
            {isListView ? "عرض الكل" : `المادة ${currentSubIdx + 1} / ${subjects.length}`}
          </p>
        </div>
        <div className="flex gap-2">
          {!isListView && (
            <button
              onClick={() => toggleExempt(sub.name)}
              className={`px-4 h-12 rounded-2xl font-black text-xs transition-all border ${isExempt ? 'bg-[#38bdf822] border-[#38bdf8] text-[#38bdf8]' : 'bg-white/5 border-white/10 text-white/40'}`}
            >
              {isExempt ? "معفى ✓" : "معفى؟"}
            </button>
          )}
          <button onClick={() => setIsListView(!isListView)} className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl text-[#39d6c3] flex items-center justify-center hover:bg-white/10 transition-all">
            {isListView ? <AlignJustify size={20} /> : <LayoutList size={20} />}
          </button>
        </div>
      </div>

      {term === 3 && (isListView || currentSubIdx === 0) && (
        <div className="mb-8 p-5 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div className="flex gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[9px] text-white/30 font-black uppercase">ثلاثي 1</label>
              <input type="text" inputMode="decimal" value={prevAverages.m1} onChange={(e) => setPrevAverages({ ...prevAverages, m1: e.target.value.replace(/,/g, '.').replace(/[^0-9.]/g, '') })} className="bg-black/30 border-0 w-16 text-center h-10 rounded-xl font-black text-sm" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[9px] text-white/30 font-black uppercase">ثلاثي 2</label>
              <input type="text" inputMode="decimal" value={prevAverages.m2} onChange={(e) => setPrevAverages({ ...prevAverages, m2: e.target.value.replace(/,/g, '.').replace(/[^0-9.]/g, '') })} className="bg-black/30 border-0 w-16 text-center h-10 rounded-xl font-black text-sm" />
            </div>
          </div>
          <span className="text-[10px] font-black text-[#38bdf8] uppercase border border-[#38bdf833] px-3 py-1 rounded-full">قاعدة 1-2-2</span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-1 custom-scrollbar">
        {isListView ? (
          <div className="flex flex-col gap-4 pb-4">
            {subjects.map(s => (
              <div key={s.name} className={`p-5 rounded-3xl border transition-all ${exemptions[s.name] ? 'bg-white/5 border-white/5 opacity-50' : 'bg-white/5 border-white/5'}`}>
                <div className="flex justify-between mb-4">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-lg">{s.name}</h4>
                      <button onClick={() => toggleExempt(s.name)} className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${exemptions[s.name] ? 'bg-[#38bdf822] border-[#38bdf8] text-[#38bdf8]' : 'bg-white/5 border-white/10 text-white/20'}`}>
                        {exemptions[s.name] ? "معفى" : "إعفاء"}
                      </button>
                    </div>
                    <span className="text-sm font-black" style={{ color: '#ffcc00', textShadow: '0 0 10px rgba(255,204,0,0.8), 0 0 20px rgba(255,102,0,0.8)' }}>
                      {exemptions[s.name] ? "---" : `المعدل: ${calculateSubjectAverage(s.name).toFixed(2)}`}
                    </span>
                  </div>
                  <span className="text-[10px] opacity-30 font-bold uppercase tracking-widest">ض {s.coef}</span>
                </div>
                <div className={`grid grid-cols-4 gap-2 ${exemptions[s.name] ? 'pointer-events-none' : ''}`}>
                  {(s.hasOral || s.hasTP) && <input type="text" value={grades[s.name]?.extra || ''} placeholder="ش/ت" onChange={(e) => handleGradeChange(s, 'extra', e.target.value)} className="bg-black/30 h-12 rounded-xl text-center font-bold" />}
                  <input type="text" value={grades[s.name]?.dc1 || ''} placeholder="م1" onChange={(e) => handleGradeChange(s, 'dc1', e.target.value)} className="bg-black/30 h-12 rounded-xl text-center font-bold" />
                  {s.dcCount === 2 && (
                    <div className="flex flex-col items-center gap-1">
                      <input type="text" value={grades[s.name]?.dc2 || ''} placeholder="م2" onChange={(e) => handleGradeChange(s, 'dc2', e.target.value)} className="bg-black/30 h-12 rounded-xl text-center font-bold w-full" />
                    </div>
                  )}
                  {s.dsCount === 2 ? (
                    <>
                      <input type="text" value={grades[s.name]?.ds1 || ''} placeholder="ت1" onChange={(e) => handleGradeChange(s, 'ds1', e.target.value)} className="bg-[#38bdf811] h-12 rounded-xl text-center text-[#38bdf8] font-bold" />
                      <input type="text" value={grades[s.name]?.ds2 || ''} placeholder="ت2" onChange={(e) => handleGradeChange(s, 'ds2', e.target.value)} className="bg-[#38bdf811] h-12 rounded-xl text-center text-[#38bdf8] font-bold" />
                    </>
                  ) : (
                    <input type="text" value={grades[s.name]?.ds || ''} placeholder="ت" onChange={(e) => handleGradeChange(s, 'ds', e.target.value)} className="bg-[#38bdf811] h-12 rounded-xl text-center text-[#38bdf8] font-bold" />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={sub.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={`flex flex-col items-center justify-center min-h-[320px] gap-8 ${isExempt ? 'opacity-40 grayscale' : ''}`}>
              <div className="text-center relative">
                <AnimatePresence>
                  {isAutoAdvancing && !isExempt && (
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: -40, opacity: 1 }} exit={{ opacity: 0 }} className="absolute left-1/2 -translate-x-1/2 text-xs font-black text-[#39d6c3] flex items-center gap-1 border border-[#39d6c333] px-3 py-1 rounded-full bg-[#39d6c305]">
                      <CheckCircle2 size={14} /> تم الحفظ
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="text-xs bg-[#39d6c311] text-[#39d6c3] px-5 py-1 rounded-full font-black border border-[#39d6c322] uppercase tracking-[0.2em]">ضارب {sub.coef}</span>
                <h3 className="text-5xl font-black text-white mt-5 glow-text">{sub.name}</h3>
                <div className="mt-4 flex flex-col items-center">
                  <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">المعدل الحالي</span>
                  <motion.span
                    key={isExempt ? 'exempt' : calculateSubjectAverage(sub.name).toFixed(2)}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl font-black mt-2"
                    style={{ color: isExempt ? 'rgba(255,255,255,0.1)' : '#ffcc00', textShadow: isExempt ? 'none' : '0 0 15px rgba(255,204,0,0.8), 0 0 30px rgba(255,102,0,0.8), 0 0 45px rgba(255,102,0,0.6)', letterSpacing: '0.02em' }}
                  >
                    {isExempt ? "إعفاء" : calculateSubjectAverage(sub.name).toFixed(2)}
                  </motion.span>
                </div>
              </div>
              <div className={`grid grid-cols-2 gap-4 w-full max-w-[340px] ${isExempt ? 'pointer-events-none' : ''}`}>
                {sub.isArabicSplit ? (
                  <div className="flex flex-col gap-6 w-full max-w-[400px] col-span-2">
                    {/* Oral Part */}
                    <div className="flex flex-col gap-2 p-4 rounded-3xl bg-white/5 border border-white/10">
                      <label className="text-[10px] font-black text-white/30 text-center uppercase">الشفاهي</label>
                      <input type="text" value={grades[sub.name]?.extra || ''} placeholder="0.0" onChange={(e) => handleGradeChange(sub, 'extra', e.target.value)} onKeyDown={(e) => e.key === 'Enter' && document.getElementById(`dc1-${sub.name}`)?.focus()} className="h-16 text-center bg-white/5 border-2 border-white/10 rounded-2xl text-2xl font-black focus:border-[#39d6c3] focus:bg-white/10 outline-none transition-all" />
                    </div>
                    
                    {/* Megal Part */}
                    <div className="flex flex-col gap-2 p-4 rounded-3xl bg-[#38bdf808] border border-[#38bdf822]">
                      <label className="text-xs font-black text-[#38bdf8] text-center mb-1">مقال / تحليل نص</label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-black text-white/20 text-center uppercase">مراقبة</label>
                          <input id={`dc1-${sub.name}`} type="text" value={grades[sub.name]?.dc1 || ''} placeholder="0.0" onChange={(e) => handleGradeChange(sub, 'dc1', e.target.value)} onKeyDown={(e) => e.key === 'Enter' && document.getElementById(`ds1-${sub.name}`)?.focus()} className="h-14 text-center bg-black/20 border border-white/10 rounded-xl text-xl font-bold" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-black text-[#38bdf8aa] text-center uppercase">تأليفي</label>
                          <input id={`ds1-${sub.name}`} type="text" value={grades[sub.name]?.ds1 || ''} placeholder="0.0" onChange={(e) => handleGradeChange(sub, 'ds1', e.target.value)} onKeyDown={(e) => e.key === 'Enter' && document.getElementById(`dc2-${sub.name}`)?.focus()} className="h-14 text-center bg-[#38bdf811] border border-[#38bdf844] rounded-xl text-xl font-bold text-[#38bdf8]" />
                        </div>
                      </div>
                    </div>

                    {/* Language Part */}
                    <div className="flex flex-col gap-2 p-4 rounded-3xl bg-[#39d6c308] border border-[#39d6c322]">
                      <label className="text-xs font-black text-[#39d6c3] text-center mb-1">لغة / تعريب</label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-black text-white/20 text-center uppercase">مراقبة</label>
                          <input id={`dc2-${sub.name}`} type="text" value={grades[sub.name]?.dc2 || ''} placeholder="0.0" onChange={(e) => handleGradeChange(sub, 'dc2', e.target.value)} onKeyDown={(e) => e.key === 'Enter' && document.getElementById(`ds2-${sub.name}`)?.focus()} className="h-14 text-center bg-black/20 border border-white/10 rounded-xl text-xl font-bold" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-black text-[#39d6c3aa] text-center uppercase">تأليفي</label>
                          <input id={`ds2-${sub.name}`} type="text" value={grades[sub.name]?.ds2 || ''} placeholder="0.0" onChange={(e) => handleGradeChange(sub, 'ds2', e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (isLast ? nextStep() : nextSub())} className="h-14 text-center bg-[#39d6c311] border border-[#39d6c344] rounded-xl text-xl font-bold text-[#39d6c3]" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {(sub.hasOral || sub.hasTP) && (
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-white/30 text-center uppercase">{sub.hasOral ? "شفاهي" : sub.isArtPlastic ? "تطبيقي" : sub.isArt ? "تطبيقي ×2" : "تطبيقي"}</label>
                        <input type="text" value={grades[sub.name]?.extra || ''} placeholder="0.0" autoFocus onChange={(e) => handleGradeChange(sub, 'extra', e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (sub.hasNoDC ? (sub.hasNoDS ? (isLast ? nextStep() : nextSub()) : document.getElementById(`ds-${sub.name}`)?.focus()) : document.getElementById(`dc1-${sub.name}`)?.focus())} className="h-18 text-center bg-white/5 border-2 border-white/10 rounded-2xl text-2xl font-black focus:border-[#39d6c3] focus:bg-white/10 outline-none transition-all" />
                      </div>
                    )}
                    {!sub.hasNoDC && (
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-white/30 text-center uppercase">
                          {sub.isPE ? "تطبيقي 1" : (sub.dcCount === 2 ? "مراقبة 1" : "مراقبة")}
                        </label>
                        <input id={`dc1-${sub.name}`} type="text" value={grades[sub.name]?.dc1 || ''} placeholder="0.0" autoFocus={!sub.hasOral && !sub.hasTP} onChange={(e) => handleGradeChange(sub, 'dc1', e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (sub.dcCount === 2 ? document.getElementById(`dc2-${sub.name}`)?.focus() : (sub.hasNoDS ? (isLast ? nextStep() : nextSub()) : document.getElementById(`ds-${sub.name}`)?.focus()))} className="h-18 text-center bg-white/5 border-2 border-white/10 rounded-2xl text-2xl font-black focus:border-[#39d6c3] focus:bg-white/10 outline-none transition-all" />
                      </div>
                    )}
                    {!sub.hasNoDC && sub.dcCount === 2 && (
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-white/30 text-center uppercase">
                          {sub.isPE ? "تطبيقي 2" : "مراقبة 2"}
                        </label>
                        <input id={`dc2-${sub.name}`} type="text" value={grades[sub.name]?.dc2 || ''} placeholder="0.0" onChange={(e) => handleGradeChange(sub, 'dc2', e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (sub.hasNoDS ? (isLast ? nextStep() : nextSub()) : document.getElementById(`ds-${sub.name}`)?.focus())} className="h-18 text-center bg-white/5 border-2 border-white/10 rounded-2xl text-2xl font-black focus:border-[#39d6c3] focus:bg-white/10 outline-none transition-all" />
                      </div>
                    )}
                    {!sub.hasNoDS && (() => {
                      if (sub.dsCount === 2) {
                        return (
                          <>
                            <div className="flex flex-col gap-2">
                              <label className="text-[10px] font-black text-[#38bdf8] text-center uppercase">تأليفي 1</label>
                              <input id={`ds1-${sub.name}`} type="text" value={grades[sub.name]?.ds1 || ''} placeholder="0.0" onChange={(e) => handleGradeChange(sub, 'ds1', e.target.value)} onKeyDown={(e) => e.key === 'Enter' && document.getElementById(`ds2-${sub.name}`)?.focus()} className="h-18 text-center bg-[#38bdf805] border-2 border-[#38bdf822] rounded-2xl text-2xl font-black text-[#38bdf8] focus:border-[#38bdf8] focus:bg-[#38bdf811] outline-none transition-all" />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-[10px] font-black text-[#38bdf8] text-center uppercase">تأليفي 2</label>
                              <input id={`ds2-${sub.name}`} type="text" value={grades[sub.name]?.ds2 || ''} placeholder="0.0" onChange={(e) => handleGradeChange(sub, 'ds2', e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (isLast ? nextStep() : nextSub())} className="h-18 text-center bg-[#38bdf805] border-2 border-[#38bdf822] rounded-2xl text-2xl font-black text-[#38bdf8] focus:border-[#38bdf8] focus:bg-[#38bdf811] outline-none transition-all" />
                            </div>
                          </>
                        );
                      }
                      const fieldsCount = (sub.hasOral || sub.hasTP ? 1 : 0) + (!sub.hasNoDC ? (sub.dcCount || 1) : 0) + 1;
                      const isCentered = fieldsCount === 3;
                      return (
                        <div className={`flex flex-col gap-2 ${isCentered ? 'col-span-2 items-center' : ''}`}>
                          <label className="text-[10px] font-black text-[#38bdf8] text-center uppercase">{sub.isArtPlastic ? "فرض ×2" : sub.isArt ? "فرض" : "تأليفي"}</label>
                          <input id={`ds-${sub.name}`} type="text" value={grades[sub.name]?.ds || ''} placeholder="0.0" onChange={(e) => handleGradeChange(sub, 'ds', e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (isLast ? nextStep() : nextSub())} className={`h-18 text-center bg-[#38bdf805] border-2 border-[#38bdf822] rounded-2xl text-2xl font-black text-[#38bdf8] focus:border-[#38bdf8] focus:bg-[#38bdf811] outline-none transition-all ${isCentered ? 'w-[calc(50%-8px)]' : ''}`} />
                        </div>
                      );
                    })()}
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        <button onClick={prevSub} className="btn-secondary h-18 px-6 flex items-center justify-center font-black rounded-3xl"><ChevronRight size={24} /></button>
        <button onClick={isListView || isLast ? nextStep : nextSub} className="btn-primary flex-1 h-18 font-black text-lg flex items-center justify-center gap-2 rounded-3xl">
          {isListView || isLast ? "احسب الآن" : "التالي"} <ChevronLeft size={24} />
        </button>
      </div>
    </motion.div>
  );
};

const getMotiLabel = (avg) => {
  if (avg >= 18) return { text: '🌟 ممتاز', color: '#ffcc00' };
  if (avg >= 16) return { text: '✨ جيد جداً', color: '#39d6c3' };
  if (avg >= 14) return { text: '👍 جيد', color: '#39d6c3' };
  if (avg >= 12) return { text: '✅ حسن', color: '#38bdf8' };
  if (avg >= 10) return { text: '🙂 مرضي', color: '#38bdf8' };
  return { text: '📚 دون المطلوب', color: '#a78bfa' };
};

const Step5_Result = ({ tAvg, term, annualAvg, getAward, getDecision, sumBest2Ref, onReset }) => {
  const isSuccess = tAvg >= 10;
  const award = getAward(tAvg);
  const decision = annualAvg !== null ? getDecision(annualAvg, sumBest2Ref) : null;
  const moti = getMotiLabel(tAvg);
  const color = tAvg >= 10 ? '#39d6c3' : '#38bdf8';
  const glow = tAvg >= 10 ? 'rgba(57,214,195,0.4)' : 'rgba(56,189,248,0.4)';

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="glass-card text-center relative overflow-hidden" dir="rtl">
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: -80, left: -80,
        width: 280, height: 280,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
        filter: 'blur(40px)',
        opacity: 0.5
      }} />

      <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24, position: 'relative' }}>النتيجة النهائية</h2>

      <div className="flex flex-col items-center gap-6">
        {/* Main score ring */}
        <motion.div
          variants={itemVariants}
          style={{
            width: 180, height: 180, borderRadius: '50%',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            background: `radial-gradient(circle at center, ${isSuccess ? 'rgba(57,214,195,0.08)' : 'rgba(56,189,248,0.08)'} 0%, transparent 70%)`,
            border: `3px solid ${color}`,
            boxShadow: `0 0 0 8px ${isSuccess ? 'rgba(57,214,195,0.08)' : 'rgba(56,189,248,0.08)'}, 0 0 40px ${glow}`,
            position: 'relative'
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.2em' }}>ثلاثي {term}</span>
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
            style={{ fontSize: 54, fontWeight: 900, lineHeight: 1, color }}
          >
            {tAvg.toFixed(2)}
          </motion.span>
          <span style={{
            fontSize: 10, fontWeight: 800, color: moti.color,
            background: 'rgba(255,255,255,0.06)',
            border: `1px solid ${moti.color}44`,
            borderRadius: 99, padding: '3px 12px', marginTop: 4, letterSpacing: '0.05em'
          }}>{moti.text}</span>
        </motion.div>

        {/* Certificate Display */}
        {award && (
          <motion.div variants={itemVariants} className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#ffcc0022] flex items-center justify-center border border-[#ffcc0044]">
              <Award size={20} color="#ffcc00" />
            </div>
            <div className="text-right">
              <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">{award.sub}</p>
              <h4 className="text-lg font-black text-[#ffcc00]">{award.label}</h4>
            </div>
          </motion.div>
        )}

        {/* Annual Decision Display */}
        {decision && (
          <motion.div variants={itemVariants} className="w-full p-6 rounded-3xl bg-white/5 border-2 flex flex-col items-center gap-2" style={{ borderColor: `${decision.color}44` }}>
            <p className="text-[10px] opacity-40 font-bold uppercase tracking-widest">المعدل السنوي: {annualAvg.toFixed(2)}</p>
            <h3 className="text-3xl font-black" style={{ color: decision.color }}>{decision.label}</h3>
            {decision.sub && <p className="text-sm font-bold opacity-60">{decision.sub}</p>}
          </motion.div>
        )}
      </div>

      <button onClick={onReset} className="btn-primary w-full h-16 flex items-center justify-center gap-3 font-black mt-8" style={{ fontSize: 16, borderRadius: 20 }}>
        <RefreshCcw size={18} /> احتساب جديد
      </button>

      <AdBanner />
    </motion.div>
  );
};


const StepX_TargetCalculator = ({ level, selectedYear, selectedSection, onBack, onReset }) => {
  const [m1Str, setM1] = useState('');
  const [m2Str, setM2] = useState('');
  
  const is1stYear = selectedYear === '1';
  const is3rdYear = selectedYear === '3';
  const is4thYear = selectedYear === '4';
  const isRachatCalcYear = selectedYear === '1' || selectedYear === '2' || selectedYear === '3';

  const [selectedRefSubjects, setSelectedRefSubjects] = useState([]);
  const [refGrades, setRefGrades] = useState({});

  const m1 = parseFloat(m1Str.replace(',', '.')) || 0;
  const m2 = parseFloat(m2Str.replace(',', '.')) || 0;

  // Unified formula for all levels: Annual = (m1 + 2*(m2+m3)) / 5
  // => m3 = (5*target - m1 - 2*m2) / 2
  const t3For10 = (50 - m1 - m2 * 2) / 2;
  const t3For9  = (45 - m1 - m2 * 2) / 2;

  
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
    // allow typing floats natively
    setRefGrades({
      ...refGrades,
      [sub]: {
        ...refGrades[sub],
        [term]: val
      }
    });
  };

  let requiredT3Sum = 0;
  if (selectedRefSubjects.length === 2) {
    const s1 = selectedRefSubjects[0];
    const s2 = selectedRefSubjects[1];
    const g1 = refGrades[s1] || { t1: 0, t2: 0 };
    const g2 = refGrades[s2] || { t1: 0, t2: 0 };
    const s1_t1 = parseFloat(g1.t1.replace(',', '.')) || 0;
    const s1_t2 = parseFloat(g1.t2.replace(',', '.')) || 0;
    const s2_t1 = parseFloat(g2.t1.replace(',', '.')) || 0;
    const s2_t2 = parseFloat(g2.t2.replace(',', '.')) || 0;
    
    const targetSum = isRachatCalcYear ? 95 : 90; // 19*5 for 1st-3rd year, 18*5 for 4th year
    requiredT3Sum = (targetSum - (s1_t1 + 2*s1_t2 + s2_t1 + 2*s2_t2)) / 2;
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" exit="exit" className="glass-card text-right flex flex-col gap-6" dir="rtl">
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-2xl font-black mb-2">قداش لازمني ؟</h2>
        <div className="relative w-full rounded-3xl p-5 overflow-hidden border border-white/5 bg-gradient-to-br from-white/5 to-black/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#39d6c3]/20 via-[#38bdf8]/20 to-[#39d6c3]/20 blur-xl opacity-30" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <span className="text-[10px] text-[#39d6c3] font-black uppercase tracking-widest bg-[#39d6c311] px-4 py-1.5 rounded-full border border-[#39d6c333]" dir="rtl">
              قاعدة احتساب المعدل السنوي
            </span>
            <div className="flex items-center justify-center w-full" dir="ltr">
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 pb-2 border-b-2 border-[#39d6c3]/30 px-2 mb-1">
                  <span className="text-white font-bold text-sm bg-black/30 px-3 py-1.5 rounded-xl border border-white/5">ث1</span>
                  <span className="text-[#39d6c3] text-lg font-black">+</span>
                  <span className="text-white text-xl font-black rounded-lg">2</span>
                  <span className="text-[#39d6c3] text-sm font-black">×</span>
                  <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-xl border border-white/5">
                    <span className="text-[#38bdf8] font-black opacity-70">(</span>
                    <span className="text-white/90 text-sm font-bold">ث2 + ث3</span>
                    <span className="text-[#38bdf8] font-black opacity-70">)</span>
                  </div>
                </div>
                <span className="text-white text-2xl font-black pt-1">5</span>
              </div>
            </div>
          </div>
        </div>
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

      <div className={`grid ${is4thYear ? 'grid-cols-1' : 'grid-cols-2'} gap-4 mt-2`}>
        <div className="p-4 rounded-3xl bg-white/5 border border-[#39d6c333] flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-black text-[#39d6c3] uppercase mb-1" dir="rtl">
            {is4thYear ? 'للحصول على معدل سنوي ≥ 10' : 'النجاح الآلي (10.00)'}
          </span>
          <span className="text-3xl font-black" style={{ color: t3For10 > 20 ? '#ff1e65' : '#39d6c3' }}>
            {m1Str && m2Str ? (t3For10 > 20 ? "مستحيل" : (t3For10 <= 0 ? "✓" : t3For10.toFixed(2))) : "--"}
          </span>
        </div>
        {!is4thYear && (
          <div className="p-4 rounded-3xl bg-white/5 border border-[#ffcc0033] flex flex-col items-center justify-center text-center relative overflow-hidden">
            <span className="text-[10px] font-black text-[#ffcc00] uppercase mb-1">الإسعاف (09.00)</span>
            <span className="text-3xl font-black" style={{ color: t3For9 > 20 ? '#ff1e65' : '#ffcc00' }}>
              {m1Str && m2Str ? (t3For9 > 20 ? "مستحيل" : (t3For9 <= 0 ? "✓" : t3For9.toFixed(2))) : "--"}
            </span>
          </div>
        )}
      </div>

      {is4thYear && (
        <div className="mt-4 rounded-3xl overflow-hidden" dir="rtl" style={{
          background: 'linear-gradient(135deg, rgba(255,204,0,0.07) 0%, rgba(255,204,0,0.03) 100%)',
          border: '1px solid rgba(255,204,0,0.2)'
        }}>
          {/* Header */}
          <div style={{ padding: '14px 18px 10px', borderBottom: '1px solid rgba(255,204,0,0.1)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 15 }}>⚠️</span>
            <div>
              <p style={{ fontSize: 11, fontWeight: 900, color: '#ffcc00', lineHeight: 1.3 }}>شروط الإسعاف في الباكالوريا</p>
              <p style={{ fontSize: 9, color: 'rgba(255,204,0,0.55)', fontWeight: 700 }}>يجب توفّر جميعها في آنٍ واحد</p>
            </div>
          </div>
          {/* Conditions */}
          <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { n: '①', text: 'المعدل السنوي العام في القسم النهائي لا يقل عن 10/20', highlight: true },
              { n: '②', text: 'المعدل الحسابي لعددي المادتين المميزتين في الامتحان لا يقل عن 9/20' },
              { n: '③', text: 'عدم الحصول على العدد 0 من 20 في إحدى المواد الإجبارية' },
              { n: '④', text: 'حسن السيرة والمواظبة — يحدده مجلس القسم' },
            ].map(({ n, text, highlight }) => (
              <div key={n} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '8px 10px', borderRadius: 12,
                background: highlight ? 'rgba(57,214,195,0.07)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${highlight ? 'rgba(57,214,195,0.2)' : 'rgba(255,255,255,0.06)'}`,
              }}>
                <span style={{
                  minWidth: 24, height: 24, borderRadius: 8,
                  background: highlight ? 'rgba(57,214,195,0.15)' : 'rgba(255,204,0,0.12)',
                  color: highlight ? '#39d6c3' : '#ffcc00',
                  fontSize: 12, fontWeight: 900,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 1
                }}>{n}</span>
                <p style={{ fontSize: 10, color: highlight ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)', fontWeight: 700, lineHeight: 1.6, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      )}


      {isRachatCalcYear && (
        <div className="mt-4 p-5 rounded-3xl bg-white/5 border border-white/10">
          <h3 className="font-black text-white/80 mb-3 text-sm">شروط الإسعاف — مجموع مادتين مرجع ≥ 19</h3>
          <p className="text-[10px] text-white/40 mb-2 tracking-wide leading-relaxed">
            اختر مادتين مرجعيتين من شعبتك. يجب أن يكون مجموع معدلاتهما السنوية ≥ 19 (معدل 9.5 لكل مادة).
          </p>
          {is1stYear && (
            <div className="mb-4 p-3 bg-[#39d6c311] border border-[#39d6c333] rounded-xl text-right">
              <span className="text-[10px] text-[#39d6c3] font-black block leading-relaxed">
                التنبيه الخاص بالسنة الأولى: إحدى المادتين على الأقل يجب أن تنتمي للمجموعة الأولى (عربية، فرنسية، أنقليزية، رياضيات، علوم فيزيائية).
              </span>
            </div>
          )}
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
              {selectedRefSubjects.map((sub) => (
                <div key={sub} className="flex gap-2 items-center bg-black/20 p-2 rounded-2xl">
                  <span className="w-20 text-[11px] font-black">{sub}</span>
                  <input type="text" placeholder="ث1" inputMode="decimal" value={refGrades[sub]?.t1 || ''} onChange={(e) => handleRefGradeChange(sub, 't1', e.target.value)} className="w-12 h-10 text-center bg-black/40 rounded-xl text-sm font-bold border-0" />
                  <input type="text" placeholder="ث2" inputMode="decimal" value={refGrades[sub]?.t2 || ''} onChange={(e) => handleRefGradeChange(sub, 't2', e.target.value)} className="w-12 h-10 text-center bg-black/40 rounded-xl text-sm font-bold border-0" />
                </div>
              ))}
              <div className="mt-2 p-4 bg-[#ffcc0011] border border-[#ffcc0033] rounded-2xl text-center">
                <span className="text-[10px] text-[#ffcc00] font-black block mb-2">مجموع أعداد ث3 المطلوب لهاتين المادتين معاً</span>
                <span className="text-2xl font-black text-[#ffcc00]">
                  {requiredT3Sum > 40 ? "مستحيل (> 40)" : (requiredT3Sum <= 0 ? "✓ متوفر" : requiredT3Sum.toFixed(2))}
                </span>
                <p className="text-[9px] text-[#ffcc00] opacity-70 mt-2">مثال: إذا كان المجموع 20، يكفي الحصول على 10 في كل مادة.</p>
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

      {isRachatCalcYear && (
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
function App() {
  const [step, setStep] = useState(0);
  const [appMode, setAppMode] = useState('calculator');
  const [level, setLevel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(1);
  const [grades, setGrades] = useState({});
  const [exemptions, setExemptions] = useState({});
  const [prevAverages, setPrevAverages] = useState({ m1: '', m2: '' });
  const [selectedElective, setSelectedElective] = useState(null);
  const [currentSubIdx, setCurrentSubIdx] = useState(0);
  const [isListView, setIsListView] = useState(false);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newVersion, setNewVersion] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    const checkUpdate = async () => {
      try {
        const response = await fetch(`https://raw.githubusercontent.com/RoyaAfricca/E7sebli/main/package.json?t=${Date.now()}`);
        const data = await response.json();
        if (data.version && data.version !== CURRENT_VERSION) {
          setNewVersion(data.version);
          setShowUpdateModal(true);
        }
      } catch (err) {
        console.error("Update check failed:", err);
      }
    };
    checkUpdate();
  }, []);

  // Helper function to strictly truncate to 2 decimals without rounding up
  const truncate2 = (val) => {
    if (!val && val !== 0) return 0;
    const str = Number(val).toString();
    const match = str.match(/^-?\d+(?:\.\d{0,2})?/);
    return match ? Number(match[0]) : 0;
  };

  const formatAvg = (val) => {
    if (val === 0 || !val) return '0.00';
    return truncate2(val).toFixed(2);
  };

  const getSubjects = useCallback((termOverride = null) => {
    const currentTerm = termOverride || selectedTerm;
    if (level === 'college') {
      const base = SUBJECTS_DATA[`college_${selectedYear}`] || SUBJECTS_DATA['college_7'];
      // EXCEPTION 2025/2026: Term 3 Math has 1 DC only
      if (currentTerm === 3) {
        return base.map(s => s.name === 'الرياضيات' ? { ...s, dcCount: 1 } : s);
      }
      return base;
    }

    let key = `lycee_${selectedYear}`;
    if (selectedYear === '1') {
      key = `lycee_1_${selectedSection || 'standard'}`;
    } else if (selectedYear > 1 && selectedSection) {
      key += `_${selectedSection}`;
    }

    const base = SUBJECTS_DATA[key] || SUBJECTS_DATA['lycee_1_standard'];
    
    return base.map(s => {
      let finalSub = { ...s };
      
      // Inject selected elective
      if (s.isOptional && selectedElective) {
        finalSub.name = selectedElective.name;
        // Rules for electives: usually have Oral/Practical and 1 DC
        finalSub.hasOral = true;
        finalSub.dcCount = 1;
      }
      
      // EXCEPTION 2025/2026: Term 3 Math has 1 DC only
      if (selectedTerm === 3 && finalSub.name === 'الرياضيات') {
        finalSub.dcCount = 1;
      }
      
      return finalSub;
    });
  }, [level, selectedYear, selectedSection, selectedTerm, selectedElective]);

  const calculateSubjectAverage = useCallback((subName, currentGrades = grades) => {
    if (exemptions[subName]) return 0;
    const data = currentGrades[subName] || {};
    const dc1 = parseFloat(data.dc1) || 0;
    const dc2 = parseFloat(data.dc2) || 0;
    const ds = parseFloat(data.ds) || 0;
    const extra = parseFloat(data.extra) || 0;
    const subjects = getSubjects();
    const sub = subjects.find(s => s.name === subName);
    if (!sub) return 0;

    const hasExtra = sub.hasOral || sub.hasTP;
    const extraVal = data.extra !== undefined && data.extra !== '' ? parseFloat(data.extra) : null;
    const dc1Val = data.dc1 !== undefined && data.dc1 !== '' ? parseFloat(data.dc1) : null;
    const dc2Val = data.dc2 !== undefined && data.dc2 !== '' ? parseFloat(data.dc2) : null;
    const dsVal = data.ds !== undefined && data.ds !== '' ? parseFloat(data.ds) : null;

    if (dc1Val === null && dc2Val === null && dsVal === null && extraVal === null) return 0;

    let avg = 0;
    let totalPts = 0;
    let totalWeights = 0;

    const isCollegeOr1ere = level === 'college' || selectedYear === '1';

    if (isCollegeOr1ere) {
      if (subName === 'العربية' && level === 'college') {
        if (hasExtra && extraVal !== null) {
          totalPts += extra * 2;
          totalWeights += 2;
        }
        if (!sub.hasNoDC) {
          totalPts += dc1 * 2;
          totalWeights += 2;
          if (sub.dcCount === 2) {
            totalPts += dc2 * 1;
            totalWeights += 1;
          }
        }
        if (!sub.hasNoDS) {
          totalPts += ds * 2;
          totalWeights += 2;
        }
      } else if (subName === 'العربية' && selectedYear === '1') {
        let wPts = 0;
        let wWghts = 0;
        if (!sub.hasNoDC) {
          if (sub.dcCount === 2) {
            wPts += dc1 + dc2;
            wWghts += 2;
          } else {
            wPts += dc1;
            wWghts += 1;
          }
        }
        if (!sub.hasNoDS) {
          wPts += ds * 2;
          wWghts += 2;
        }
        const wAvg = wWghts > 0 ? wPts / wWghts : 0;
        
        if (hasExtra && extraVal !== null) {
          totalPts += wAvg * 3 + extra;
          totalWeights += 4;
        } else {
          totalPts += wAvg;
          totalWeights += 1;
        }
      } else {
        if (hasExtra && extraVal !== null) {
          const ew = sub.tpWeight || 1;
          totalPts += extra * ew;
          totalWeights += ew;
        }
        if (!sub.hasNoDC) {
          if (sub.dcCount === 2) {
            totalPts += dc1 + dc2;
            totalWeights += 2;
          } else {
            totalPts += dc1;
            totalWeights += 1;
          }
        }
        if (!sub.hasNoDS) {
          const dw = sub.dsWeight || 2;
          if (sub.dsCount === 2) {
            const ds1 = parseFloat(data.ds1) || 0;
            const ds2 = parseFloat(data.ds2) || 0;
            totalPts += ((ds1 + ds2) / 2) * dw;
          } else {
            totalPts += ds * dw;
          }
          totalWeights += dw;
        }
      }
    } else {
      if (hasExtra && extraVal !== null) {
        const ew = sub.tpWeight || 1;
        totalPts += extra * ew;
        totalWeights += ew;
      }
      if (!sub.hasNoDC) {
        const dcAvg = sub.dcCount === 2 ? (dc1 + dc2) / 2 : dc1;
        totalPts += dcAvg;
        totalWeights += 1;
      }
      if (!sub.hasNoDS) {
        const dw = sub.dsWeight || 2;
        if (sub.dsCount === 2) {
          const ds1 = parseFloat(data.ds1) || 0;
          const ds2 = parseFloat(data.ds2) || 0;
          totalPts += ((ds1 + ds2) / 2) * dw;
        } else {
          totalPts += ds * dw;
        }
        totalWeights += dw;
      }
    }

    avg = totalWeights > 0 ? totalPts / totalWeights : 0;
    return truncate2(avg);
  }, [getSubjects, grades, exemptions, level, selectedYear]);

  const calculateAnnualAverage = useCallback((currentTermAvg) => {
    const m1 = parseFloat(prevAverages.m1) || 0;
    const m2 = parseFloat(prevAverages.m2) || 0;

    let annualAvg = 0;
    if (selectedTerm === 1) {
      annualAvg = currentTermAvg;
    } else if (selectedTerm === 2) {
      if (level === 'lycee' && parseInt(selectedYear) >= 2) {
        annualAvg = (m1 + currentTermAvg * 2) / 3;
      } else {
        annualAvg = (m1 + currentTermAvg) / 2;
      }
    } else if (selectedTerm === 3) {
      if (level === 'lycee' && parseInt(selectedYear) >= 2) {
        annualAvg = (m1 + m2 * 2 + currentTermAvg * 2) / 5;
      } else {
        annualAvg = (m1 + m2 + currentTermAvg) / 3;
      }
    }
    return truncate2(annualAvg);
  }, [prevAverages, selectedTerm, level, selectedYear]);

  const getAward = (avg) => {
    if (avg >= 16) return { label: 'لوحة امتياز', sub: 'المعدل ≥ 16' };
    if (avg >= 15) return { label: 'شهادة تشجيع', sub: 'المعدل ≥ 15' };
    if (avg >= 13) return { label: 'شهادة شرف', sub: 'المعدل 13-14.99' };
    if (avg >= 12) return { label: 'رسالة تشجيع', sub: 'المعدل 12-12.99' };
    if (avg < 9) return { label: 'توبيخ', sub: 'المعدل < 9' };
    if (avg < 10) return { label: 'إنذار', sub: 'المعدل < 10' };
    return null;
  };

  const getDecision = (annualAvg, sumBest2Ref) => {
    if (annualAvg >= 10) return { label: '🎓 أحسنت! تنتقل للمستوى القادم', color: '#39d6c3', sub: 'المعدل السنوي ≥ 10' };
    
    if (level === 'college') {
      if (annualAvg >= 9) return { label: '⭐ تنتقل بالإسعاف', color: '#ffcc00', sub: 'المعدل السنوي ≥ 9' };
    } else {
      let requiredRefSum = 19;
      if (selectedYear === '4') requiredRefSum = 18;
      
      if (annualAvg >= 9 && sumBest2Ref >= requiredRefSum) {
         return { label: '⭐ تنتقل بالإسعاف', color: '#ffcc00', sub: `مجموع مادتين مرجع ≥ ${requiredRefSum}` };
      }
    }
    return { label: '💪 أنت قادر على أكثر من هذا!', color: '#a78bfa', sub: 'واصل الجهد للموسم القادم' };
  };

  const calculateDisplayAverage = useCallback(() => {
    const subjects = getSubjects();
    let totalPoints = 0, totalCoef = 0;
    let refValues = [];

    const sectionKey = selectedYear === '1' ? 'standard_1' : (selectedYear === '2' ? `${selectedSection}_2` : selectedSection);
    const refList = REFERENCE_SUBJECTS[sectionKey] || [];

    subjects.forEach(sub => {
      if (exemptions[sub.name]) return;
      const avg = calculateSubjectAverage(sub.name);

      if (sub.isOptional) {
        if (avg > 10) totalPoints += (avg - 10);
      } else {
        totalPoints += avg * sub.coef;
        totalCoef += sub.coef;

        if (refList.includes(sub.name)) {
          refValues.push(avg);
        }
      }
    });

    refValues.sort((a, b) => b - a);
    const sumBest2Ref = refValues.slice(0, 2).reduce((a, b) => a + b, 0);

    const termAvg = totalCoef > 0 ? truncate2(totalPoints / totalCoef) : 0;
    return { termAvg, sumBest2Ref };
  }, [getSubjects, calculateSubjectAverage, exemptions, selectedYear, selectedSection]);

  const reset = () => {
    setStep(0);
    setGrades({});
    setExemptions({});
    setPrevAverages({ m1: '', m2: '' });
    setCurrentSubIdx(0);
    setAppMode('calculator');
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => Math.max(0, s - 1));
  const nextSub = () => {
    const subjects = getSubjects();
    if (currentSubIdx < subjects.length - 1) setCurrentSubIdx(s => s + 1);
    else nextStep();
  };
  const prevSub = () => {
    if (currentSubIdx === 0) prevStep();
    else setCurrentSubIdx(s => s - 1);
  };

  return (
    <div className="app-container">
      {step > 0 && step < 5 && <ProgressBar step={step} />}
      <AnimatePresence mode="wait">
        <motion.div key={step} className="flex-1 flex flex-col justify-center">
          {step === 0 && <Step0_Level
            onSelect={(l) => { setLevel(l); setAppMode('calculator'); nextStep(); }}
            onTargetSelect={(l) => { setLevel(l); setAppMode('target'); nextStep(); }}
          />}
          {step === 1 && <Step1_YearSection level={level} onSelect={(y) => { setSelectedYear(y); if (level === 'college') setStep(3); else nextStep(); }} onBack={prevStep} />}
          {step === 2 && <Step2_Section selectedYear={selectedYear} onSelect={(s) => { setSelectedSection(s); nextStep(); }} onBack={prevStep} />}
          {step === 3 && appMode === 'calculator' && (
            <Step3_Term 
              onSelect={(t) => { 
                setSelectedTerm(t); 
                const subjects = getSubjects(t);
                const hasOptional = subjects.some(s => s.isOptional);
                if (hasOptional) setStep(3.5);
                else setStep(4);
              }} 
              onBack={prevStep} 
            />
          )}
          {step === 3.5 && (
            <Step3_Elective 
              section={selectedSection} 
              year={selectedYear}
              onSelect={(opt) => { setSelectedElective(opt); setStep(4); }} 
              onBack={() => setStep(3)} 
            />
          )}
          {step === 3 && appMode === 'target' && <StepX_TargetCalculator level={level} selectedYear={selectedYear} selectedSection={selectedSection} onBack={prevStep} onReset={reset} />}
          {step === 4 && (
            <Step4_Grades
              subjects={getSubjects()}
              currentSubIdx={currentSubIdx}
              grades={grades}
              setGrades={setGrades}
              isListView={isListView}
              setIsListView={setIsListView}
              nextSub={nextSub}
              prevSub={prevSub}
              nextStep={nextStep}
              prevStep={prevStep}
              term={selectedTerm}
              prevAverages={prevAverages}
              setPrevAverages={setPrevAverages}
              isAutoAdvancing={isAutoAdvancing}
              setIsAutoAdvancing={setIsAutoAdvancing}
              calculateSubjectAverage={calculateSubjectAverage}
              exemptions={exemptions}
              setExemptions={setExemptions}
            />
          )}
          {step === 5 && (() => {
            const { termAvg, sumBest2Ref } = calculateDisplayAverage();
            const annualAvg = selectedTerm === 3 ? calculateAnnualAverage(termAvg) : null;
            return (
              <Step5_Result
                tAvg={termAvg}
                term={selectedTerm}
                annualAvg={annualAvg}
                sumBest2Ref={sumBest2Ref}
                getDecision={getDecision}
                getAward={getAward}
                onReset={reset}
              />
            );
          })()}
        </motion.div>
      </AnimatePresence>

      <footer style={{ marginTop: 40, opacity: 0.8, textAlign: 'center' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8
        }}>
          <div style={{ height: 1, width: 32, background: 'rgba(255,255,255,0.06)' }} />
          <span style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>e7sebli • tunisia 2025-2026</span>
          <div style={{ height: 1, width: 32, background: 'rgba(255,255,255,0.06)' }} />
        </div>
      </footer>

      <AnimatePresence>
        {showUpdateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
            dir="rtl"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="glass-card max-w-sm w-full border-[#39d6c333] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center gap-5 p-8"
            >
              <div className="w-20 h-20 rounded-3xl bg-[#39d6c311] border border-[#39d6c3aa] flex items-center justify-center text-[#39d6c3] shadow-[0_0_30px_rgba(57,214,195,0.2)]">
                <RefreshCcw size={40} className="animate-spin-slow" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-white mb-2">تحديث جديد متوفر! 🚀</h2>
                <p className="text-white/60 text-sm font-bold leading-relaxed">
                  نسخة جديدة من تطبيق <span className="text-[#39d6c3]">إحسبلي ({newVersion})</span> متوفرة الآن. ننصحك بالتحديث للحصول على آخر التعديلات الرسمية.
                </p>
              </div>

              <div className="flex flex-col w-full gap-3">
                <a
                  href="https://github.com/RoyaAfricca/e7sebli/releases/download/v1.0.0/E7sebli-v1.0.0.apk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full h-14 flex items-center justify-center gap-2 font-black rounded-2xl shadow-[0_10px_20px_rgba(57,214,195,0.2)]"
                >
                  <ExternalLink size={20} /> تنزيل التحديث
                </a>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="w-full h-12 text-white/40 hover:text-white/80 font-bold transition-colors"
                >
                  تجاهل حالياً
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
