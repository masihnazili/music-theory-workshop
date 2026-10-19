// Opens every Piano Studio lesson and every main tab in the given language; reports leftover Persian (en) and page errors.
const { chromium } = require('playwright'); const path = require('path');
const lang = process.argv[2] || 'en'; const url = 'file://' + path.resolve(__dirname, '..', 'index.html');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox'] });
  const p = await b.newPage({ viewport: { width: 430, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.addInitScript(l => { localStorage.setItem('hw-lang', l); localStorage.setItem('hw-phase1', JSON.stringify({ ver: 2, inst: 'guitar', input: 'screen', done: {}, xp: 5, streak: 1, last: '', pdone: {} })); }, lang);
  await p.addInitScript(() => { const ks = []; /* unlock all studio lessons */ window.__unlock = true; });
  await p.goto(url); await p.waitForTimeout(400);
  const bad = lang === 'en' ? /[؀-ۿ]/ : /^$/; const hits = []; let screens = 0;
  const grab = async w => { const t = (await p.evaluate(() => document.body.innerText)).replace(/^\u0641\u0627$/m, ''); screens++; if (bad.test(t)) hits.push(w + ' :: ' + (t.match(/.{0,50}[؀-ۿ]+.{0,40}/) || [''])[0].replace(/\s+/g, ' ')); };
  for (const inst of ['piano', 'guitar']) {
    await p.evaluate(i => { S.inst = i; save(); home(); }, inst);
    for (const t of ['path', 'piano', 'p']) { await p.evaluate(v => { tab = v; home(); }, t); await grab(inst + ' tab ' + t); }
  }
  await p.evaluate(() => { tab = 'piano'; home(); });
  const keys = await p.evaluate(() => { const r = []; PT_UNITS.forEach(u => u.lessons.forEach(l => r.push(u.id + ':' + l.id))); return r; });
  await p.evaluate(() => { try { PT.open(PT_UNITS[0].lessons[0].id); } catch (e) {} document.getElementById('run').hidden = true; document.getElementById('app').hidden = false; });
  await p.evaluate(keys => { localStorage.setItem('piano-trainer.course-progress', JSON.stringify({ completedSteps: [], completedLessons: keys.slice(0, -1).map(k => k), attempts: [] })); }, keys);
  await p.reload(); await p.waitForTimeout(400);
  for (const k of keys) {
    await p.evaluate(k => { PT.open(k); }, k).catch(e => errs.push('open ' + k + ' ' + e.message));
    for (let i = 0; i < 40; i++) {
      await grab('studio ' + k + ' #' + i);
      const nxt = await p.evaluate(() => { const n = document.querySelector('[data-pt="next"]'); if (!n) return false; n.disabled = false; n.click(); return true; });
      if (!nxt) break;
    }
    await p.evaluate(() => { document.getElementById('run').hidden = true; document.getElementById('app').hidden = false; home(); });
  }
  await p.evaluate(() => { onboard(); }); await grab('onboard');
  console.log(JSON.stringify({ lang, keys: keys.length, screens, errs: errs.slice(0, 5), hits: hits.length, sample: hits.slice(0, 15) }, null, 1)); await b.close();
})();
