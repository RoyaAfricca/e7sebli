// Grade verification script - matches the logic in App.jsx
const t2 = (v) => {
  const s = String(Number(v));
  const m = s.match(/^-?\d+(?:\.\d{0,2})?/);
  return m ? Number(m[0]) : 0;
};

// College formula (independent weights)
const college = (oral, dc1, dc2, ds, hasOral, dcCount, dsWeight, tpWeight) => {
  let pts = 0, w = 0;
  if (hasOral && oral) { pts += oral * (tpWeight || 1); w += (tpWeight || 1); }
  if (dcCount === 2) { pts += dc1 + (dc2 || 0); w += 2; } else { pts += dc1; w += 1; }
  pts += ds * (dsWeight || 2); w += (dsWeight || 2);
  return t2(pts / w);
};

// Special Arabic formula 
const arabic = (oral, dc1, dc2, ds) => t2((oral * 2 + dc1 * 2 + dc2 + ds * 2) / 7);

const subjects = [
  { name: 'العربية',      coef: 4,   calc: arabic(13, 10, 12, 10.25),             expected: 11.21 },
  { name: 'فرنسية',      coef: 4,   calc: college(13.5, 7.5, 15, 12.75, true, 2, 2, 1), expected: 12.75 },
  { name: 'أنجليزية',   coef: 2,   calc: college(15, 15, 0, 15, true, 1, 2, 1),  expected: 15.00 },
  { name: 'تاريخ',       coef: 1,   calc: college(0, 18, 0, 17, false, 1, 2, 1),  expected: 17.75 },
  { name: 'جغرافيا',    coef: 1,   calc: college(0, 13.5, 0, 14.37, false, 1, 2, 1), expected: 14.37 },
  { name: 'ت.إسلامية',  coef: 1,   calc: college(0, 7.5, 0, 10, false, 1, 2, 1), expected: 10.87 },
  { name: 'ت.مدنية',     coef: 1,   calc: college(0, 15, 0, 13.5, false, 1, 2, 1), expected: 14.25 },
  { name: 'رياضيات',    coef: 3,   calc: college(0, 12.75, 11.5, 11.31, false, 2, 2, 1), expected: 11.31 },
  { name: 'ف.فيزيائية', coef: 1.5, calc: college(0, 11.25, 10.75, 10.91, false, 2, 2, 1), expected: 10.91 },
  { name: 'علوم ح+أ',   coef: 1.5, calc: college(14, 16, 0, 11, true, 1, 2, 1),  expected: 13.00 },
  { name: 'تكنولوجيا',  coef: 1,   calc: college(9.75, 13.5, 0, 11.5, true, 1, 2, 1), expected: 11.56 },
  { name: 'ت.تشكيلية',  coef: 1,   calc: college(15, 14, 0, 14.33, true, 1, 2, 1), expected: 14.33 },
  { name: 'إعلامية',    coef: 1,   calc: college(19.5, 13, 0, 16.25, true, 1, 2, 1), expected: 16.25 },
  { name: 'ت.بدنية',    coef: 1,   calc: college(0, 17, 19, 18, false, 2, 2, 1),  expected: 18.00 },
  { name: 'ت.موسيقية',  coef: 1,   calc: college(0, 19, 0, 20, false, 1, 2, 1),   expected: 19.33 },
  { name: 'ت.مسرحية',   coef: 1,   calc: college(0, 18, 0, 11.5, false, 1, 2, 1), expected: 15.83 },
];

let totalPts = 0, totalCoef = 0;
subjects.forEach(s => {
  const ok = s.calc === s.expected;
  console.log(`${ok ? 'OK' : 'XX'} ${s.name}: calc=${s.calc} (expected=${s.expected})`);
  totalPts += s.calc * s.coef;
  totalCoef += s.coef;
});

const termAvg = t2(totalPts / totalCoef);
console.log(`\nTotal points: ${totalPts.toFixed(4)}`);
console.log(`Total coef: ${totalCoef}`);
console.log(`TERM AVERAGE: ${termAvg.toFixed(2)} (official: 13.39)`);
