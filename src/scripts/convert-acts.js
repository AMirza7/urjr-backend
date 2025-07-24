// Node.js + regex approach (very rough skeleton)
import fs from 'fs';

function parseAct(txtPath, actCode) {
  const text = fs.readFileSync(txtPath, 'utf8');
  // split on lines that look like "Section 1. …" or just numbers at line-start
  const rawSections = text.split(/\n\s*(\d+)\.\s+/).slice(1); 
  const sections = [];
  for (let i = 0; i < rawSections.length; i += 2) {
    const number  = rawSections[i].trim();
    const body    = rawSections[i+1].trim();
    const [title, ...rest] = body.split('\n');
    sections.push({
      act: actCode,
      number,
      title: title.trim(),
      summary: rest.join(' ').slice(0, 200)  // first-200 chars as summary
    });
  }
  return sections;
}

const all = [
  ...parseAct('BNS.txt',  'BNS'),
  ...parseAct('BNSS.txt','BNSS'),
  ...parseAct('BSA.txt',  'BSA'),
];

fs.writeFileSync('src/constants/sections.json', JSON.stringify(all, null, 2));
console.log('Written', all.length, 'sections.');
