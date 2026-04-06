import { SUBJECTS_DATA, REFERENCE_SUBJECTS } from '../src/data.js';

const checkConsistency = () => {
    let errors = [];
    
    const levels = [
        ...['college_7', 'college_8', 'college_9'],
        ...['lycee_1_standard', 'lycee_1_sport'],
        ...['lycee_2_lettres', 'lycee_2_sciences', 'lycee_2_economie_services', 'lycee_2_info', 'lycee_2_sport'],
        ...['lycee_3_lettres', 'lycee_3_math', 'lycee_3_sciences_exp', 'lycee_3_economie', 'lycee_3_sport', 'lycee_3_technique', 'lycee_3_info'],
        ...['lycee_4_lettres', 'lycee_4_math', 'lycee_4_sciences_exp', 'lycee_4_economie', 'lycee_4_sport', 'lycee_4_technique', 'lycee_4_info']
    ];

    levels.forEach(level => {
        const subjects = SUBJECTS_DATA[level];
        if (!subjects) {
            errors.push(`Missing data for level: ${level}`);
            return;
        }

        let sectionKey;
        if (level.startsWith('college')) {
            sectionKey = level; 
        } else if (level === 'lycee_1_standard') {
            sectionKey = 'standard_1';
        } else if (level === 'lycee_1_sport') {
            sectionKey = 'sport_1';
        } else {
            const match = level.match(/lycee_(\d)_(.+)/);
            if (match) {
                const year = match[1];
                const section = match[2];
                sectionKey = (year === '2') ? `${section}_2` : section;
            }
        }

        const refList = REFERENCE_SUBJECTS[sectionKey];
        if (refList) {
            refList.forEach(refName => {
                const exists = subjects.find(s => s.name === refName);
                if (!exists) {
                    errors.push(`Mismatch in ${level} (sectionKey: ${sectionKey}): Ref subject "${refName}" not found in subjects list.`);
                }
            });
        }
    });

    if (errors.length === 0) {
        console.log("SUCCESS: All reference subjects match subject names!");
    } else {
        console.log("CONSISTENCY ERRORS FOUND:");
        errors.forEach(e => console.log(" - " + e));
    }
};

checkConsistency();
