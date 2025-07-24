// scripts/fetchSections.js
import axios from 'axios';
import cheerio from 'cheerio';
import fs from 'fs';

async function fetchActSections(actId, outFile) {
  const url = `https://www.indiacode.nic.in/handle/123456789/${actId}?view_type=browse`;
  const { data: html } = await axios.get(url);
  const $ = cheerio.load(html);
  const sections: any[] = [];

  // e.g. each section is in a <div class="sectionRow">…
  $('.sectionRow').each((_, el) => {
    const number = $(el).find('.sectionNumber').text().trim();
    const title  = $(el).find('.sectionTitle').text().trim();
    const summary = $(el).find('.sectionSummary').text().trim();
    sections.push({ number, title, summary });
  });

  fs.writeFileSync(`src/constants/${outFile}`, JSON.stringify(sections, null, 2));
  console.log(`Wrote ${sections.length} sections to ${outFile}`);
}

(async () => {
  await fetchActSections('20099', 'bnss.json'); // BNSS actId
  await fetchActSections('20062', 'bns.json');  // BNS actId
  // For BSA you’ll need its actId similarly
})();
