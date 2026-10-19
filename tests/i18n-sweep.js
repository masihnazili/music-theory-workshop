// Renders every exercise in the chosen language and reports leftover Persian (en) / pageerrors.
const { chromium } = require('playwright');
const path = require('path');
const lang = process.argv[2] || 'en';
const url = 'file://' + path.resolve(__dirname, '..', 'index.html');
(async () => {
  const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox'] });
  const out = {};
  for (const inst of ['piano', 'guitar']) {
    const p = await b.newPage({ viewport: { width: 430, height: 900 } });
    const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.addInitScript(([l, i]) => {
      localStorage.setItem('hw-lang', l);
      localStorage.setItem('hw-phase1', JSON.stringify({ ver: 2, inst: i, input: 'screen', done: {}, xp: 77, streak: 2, last: '', pdone: {} }));
    }, [lang, inst]);
    await p.goto(url); await p.waitForTimeout(400);
    const res = await p.evaluate((lang) => {
      const bad = lang === 'en' ? /[؀-ۿ]/ : /^$/; const hits = [];
      const chk = (where, t) => { if (lang === 'en' ? bad.test(t) : /\b(Correct|Continue|Next)\b/.test(t)) hits.push(where + ' :: ' + t.replace(/\s+/g, ' ').slice(0, 160)); };
      chk('home', document.body.innerText);
      ALL.forEach(L => {
        startRun(L); const n = run.queue.length;
        for (let i = 0; i < n; i++) {
          renderRun(); chk(L.id + '#' + i, document.getElementById('run').innerText);
          for (const st of ['ok', 'bad']) { try { run.state = st; run.sel = 0; renderRun(); chk(L.id + '#' + i + st, document.getElementById('run').innerText); } catch (e) {} run.state = 'ask'; run.sel = null; }
          run.queue.push(run.queue.shift());
        }
      });
      return hits;
    }, lang);
    out[inst] = { errs: errs.slice(0, 5), hits: res.length, sample: res.slice(0, 40) };
    await p.close();
  }
  console.log(JSON.stringify(out, null, 1)); await b.close();
})();
