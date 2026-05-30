/**
 * xlsx.js — Resume Data Utility for Mohammed Adam Portfolio
 *
 * This is a lightweight utility that:
 * 1. Holds structured resume data (JSON) mirroring the resume
 * 2. Can export resume data as a CSV/JSON download
 * 3. Can be extended to parse/display Excel resume data
 *
 * For full Excel parsing (reading .xlsx files in-browser),
 * include SheetJS from CDN: https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js
 */

'use strict';

/* ================================================================
   RESUME DATA — Mohammed Adam
   ================================================================ */
const RESUME_DATA = {
  personal: {
    name: 'Mohammed Adam',
    title: 'AI Engineer & Full-Stack Developer',
    location: 'Warangal, Telangana, India',
    email: 'mohammedadam9373@gmail.com',
    phone: '+91 9700957003',
    linkedin: 'https://linkedin.com/in/mohammedadam',
    github: 'https://github.com/mohammedadam',
    summary: 'Enthusiastic Computer Science undergraduate with strong foundations in Java, Data Structures, AI, and full-stack development. Winner of MENTIS 2025 National Hackathon.'
  },

  education: [
    {
      degree: 'B.Tech in Computer Science Engineering',
      institution: 'Vaagdevi College of Engineering (JNTUH)',
      location: 'Warangal, Telangana',
      period: '2023 – 2027',
      grade: null
    },
    {
      degree: 'Diploma in Engineering',
      institution: 'VMR Polytechnic',
      location: 'Telangana',
      period: '2021 – 2024',
      grade: 'CGPA: 8.78'
    },
    {
      degree: 'SSC',
      institution: 'TMRIES High School',
      location: 'Telangana',
      period: null,
      grade: 'GPA: 10'
    }
  ],

  skills: {
    programming: ['Java', 'Kotlin', 'Python', 'JavaScript', 'SQL', 'HTML5', 'CSS3'],
    coreCS: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Problem Solving'],
    aiML: ['NLP', 'Deep Learning', 'RNN', 'LSTM', 'Generative AI', 'Agentic AI Systems', 'Hugging Face'],
    tools: ['Git', 'GitHub', 'Google Cloud', 'Firebase', 'Google ADK', 'VS Code', 'Eclipse', 'AWS']
  },

  projects: [
    {
      name: 'AI Music Generation Model',
      description: 'Deep learning model using Python and RNN/LSTM to generate original music sequences.',
      tech: ['Python', 'RNN', 'LSTM', 'Deep Learning'],
      github: '#',
      live: null,
      featured: true
    },
    {
      name: 'AI Chatbot',
      description: 'NLP-based chatbot capable of real-time interaction using modern AI frameworks.',
      tech: ['Python', 'NLP', 'Hugging Face'],
      github: '#',
      live: null,
      featured: false
    },
    {
      name: 'AI Language Translator Tool',
      description: 'Web-based translator using HTML, CSS, JavaScript with API integration for multilingual translation.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'REST API'],
      github: '#',
      live: '#',
      featured: false
    },
    {
      name: 'File Media Agent (AGENTATHON 2025)',
      description: 'Intelligent file management system using Python, Google ADK, Firebase, and Gemini AI.',
      tech: ['Python', 'Google ADK', 'Firebase', 'Gemini AI'],
      github: '#',
      live: null,
      featured: true,
      hackathon: 'AGENTATHON 2025 (Guinness World Record Hackathon)'
    }
  ],

  experience: [
    {
      role: 'Artificial Intelligence Intern',
      company: 'CodeAlpha',
      period: 'Aug 2025',
      description: 'Worked on AI-based applications, enhancing practical knowledge in machine learning and model development.',
      skills: ['Machine Learning', 'Model Development', 'Python']
    },
    {
      role: 'Web Developer Intern',
      company: 'Manac Infotech Pvt. Ltd.',
      period: 'Previous',
      description: 'Developed responsive web applications and improved UI/UX design skills.',
      skills: ['HTML/CSS', 'JavaScript', 'UI/UX', 'Responsive Design']
    },
    {
      role: 'Cyber Security & AI Intern',
      company: 'AIMER Society',
      period: 'Previous',
      description: 'Gained exposure to cybersecurity concepts integrated with AI-driven solutions.',
      skills: ['Cybersecurity', 'AI Integration', 'Threat Detection']
    }
  ],

  certifications: [
    { name: 'AWS Certification', issuer: 'AICTE Supported', badge: 'AWS' },
    { name: 'Gemini Certified Student', issuer: 'Google AI', badge: 'G' },
    { name: 'Hashgraph Developer Course', issuer: 'Hedera', badge: 'H' },
    { name: 'Industrial Training – Embedded Systems & Power Systems', issuer: 'Industrial', grade: 'A+' },
    { name: 'Digital Entrepreneurship Using AI', issuer: 'Vaagdevi College of Engineering', badge: 'AI' }
  ],

  achievements: [
    { title: 'Winner – MENTIS 2025 National-Level Hackathon', level: 'National', emoji: '🥇' },
    { title: 'Participated in AGENTATHON 2025', note: 'Guinness World Record Hackathon', emoji: '🌍' },
    { title: 'Digital Guardian Project – MoE & AICTE Innovation Contest Stage 2', emoji: '🏛' },
    { title: 'Innovation Panchayat – Warangal Edition (Telangana Innovation Cell)', emoji: '💡' }
  ],

  languages: ['English', 'Hindi', 'Telugu', 'Urdu']
};

/* ================================================================
   EXPORT UTILITIES
   ================================================================ */

/**
 * Download resume data as JSON file
 */
function downloadResumeJSON() {
  const dataStr = JSON.stringify(RESUME_DATA, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mohammed-adam-resume-data.json';
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Convert resume data to CSV format
 * @param {string} section - 'skills', 'projects', 'experience', 'education'
 */
function downloadSectionCSV(section) {
  let rows = [];
  let filename = `mohammed-adam-${section}.csv`;

  switch (section) {
    case 'skills':
      rows = [['Category', 'Skills']];
      Object.entries(RESUME_DATA.skills).forEach(([cat, skills]) => {
        rows.push([cat, skills.join(', ')]);
      });
      break;

    case 'projects':
      rows = [['Project', 'Description', 'Tech Stack', 'GitHub']];
      RESUME_DATA.projects.forEach(p => {
        rows.push([p.name, p.description, p.tech.join(', '), p.github]);
      });
      break;

    case 'experience':
      rows = [['Role', 'Company', 'Period', 'Description']];
      RESUME_DATA.experience.forEach(e => {
        rows.push([e.role, e.company, e.period, e.description]);
      });
      break;

    case 'education':
      rows = [['Degree', 'Institution', 'Period', 'Grade']];
      RESUME_DATA.education.forEach(e => {
        rows.push([e.degree, e.institution, e.period || '', e.grade || '']);
      });
      break;

    default:
      console.warn('Unknown section:', section);
      return;
  }

  const csv = rows.map(row =>
    row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
  ).join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Read and parse an uploaded .xlsx file using SheetJS
 * Requires SheetJS to be loaded: <script src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js"></script>
 *
 * @param {File} file - File object from <input type="file">
 * @returns {Promise<Object>} - Parsed workbook data
 */
async function parseXLSXFile(file) {
  return new Promise((resolve, reject) => {
    if (typeof XLSX === 'undefined') {
      reject(new Error('SheetJS (XLSX) library not loaded. Add it via CDN first.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const result = {};

        workbook.SheetNames.forEach(sheetName => {
          const sheet = workbook.Sheets[sheetName];
          result[sheetName] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        });

        resolve(result);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

/* ================================================================
   EXPOSE GLOBALS
   ================================================================ */
window.MohammedAdamData = RESUME_DATA;
window.downloadResumeJSON = downloadResumeJSON;
window.downloadSectionCSV = downloadSectionCSV;
window.parseXLSXFile = parseXLSXFile;

// Usage examples (call from browser console):
// window.downloadResumeJSON()
// window.downloadSectionCSV('projects')
// window.downloadSectionCSV('experience')
