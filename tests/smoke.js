// Smoke tests: node tests/smoke.js   (needs `npm i` once; set CHROMIUM_PATH to use a system Chromium)
const { chromium } = require('playwright');
const path = require('path');
const url = 'file://' + path.resolve(__dirname, '..', 'index.html');
let failed = 0;
const ok = (c, m) => { console.log((c ? 'PASS ' : 'FAIL ') + m); if (!c) failed++; };

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox'] });
  for (const inst of ['piano', 'guitar']) {
    const page = await browser.newPage({ viewport: { width: 430, height: 900 } });
    const errs = [];
    page.on('pageerror', e => errs.push(e.message));
    await page.addInitScript(i => {
      if (!localStorage.getItem('_seeded')) {
        localStorage.setItem('hw-phase1', JSON.stringify({ ver: 2, inst: i, input: 'screen', done: {}, xp: 77, streak: 2, last: '', pdone: {} }));
        localStorage.setItem('_seeded', '1');
      }
    }, inst);
    await page.goto(url);
    await page.waitForTimeout(500);

    const data = await page.evaluate(() => {
      const r = { lessons: ALL.length, ex: 0, thin: [], badShapes: [], open: [64, 59, 55, 50, 45, 40] };
      ALL.forEach(L => {
        r.ex += L.ex.length;
        const x = PRAC[L.id];
        ['p', 'g'].forEach(k => { const o = x && x[k]; if (!o || !o.steps || o.steps.length < 4 || !o.ok || !o.intro) r.thin.push(L.id + ':' + k); });
      });
      const open = [40, 45, 50, 55, 59, 64];
      Object.keys(SH).forEach(k => {
        const f = SH[k][0].split('').map(c => c === 'x' ? -1 : +c), c = chord(SH[k][1]);
        const have = new Set(); f.forEach((fr, i) => { if (fr >= 0) have.add((open[i] + fr) % 12); });
        const want = new Set(c.pcs);
        const extra = [...have].filter(p => !want.has(p));
        const miss = [...want].filter(p => !have.has(p));
        const fifthOnlyMissing = miss.length === 1 && c.pcs.length >= 4 && miss[0] === c.pcs[2];
        if (extra.length || (miss.length && !(c.q === '5' || fifthOnlyMissing))) r.badShapes.push(k + ' ' + SH[k][0]);
      });
      return r;
    });
    ok(data.lessons === 52, `${inst}: 52 lessons (${data.lessons})`);
    ok(data.ex >= 560, `${inst}: exercises >= 560 (${data.ex})`);
    ok(data.thin.length === 0, `${inst}: every practice card has intro, 4+ steps and a check ${data.thin.join(',')}`);
    ok(data.badShapes.length === 0, `${inst}: all guitar shapes match their chords ${data.badShapes.join(',')}`);

    // microphone / MIDI checklist inside a practice step
    await page.evaluate(() => { S.input = 'play'; LST.state = 'on'; startLesson('l3'); run.queue = run.queue.filter(e => e.t === 'prac'); run.total = 1; renderRun(); });
    await page.waitForTimeout(150);
    const chips = await page.locator('.ptg-c').count();
    ok(chips === 3, `${inst}: C major has 3 target chips (${chips})`);
    await page.evaluate(() => [60, 64, 67].forEach(m => onHeard({ midi: m, cents: 0, src: 'midi' })));
    ok((await page.locator('.ptg.done').count()) === 1, `${inst}: checklist completes after C E G`);

    // backup round-trip
    await page.evaluate(() => { document.getElementById('run').hidden = true; document.getElementById('app').hidden = false; S.input = 'screen'; home(); });
    await page.click('[data-act="bkexp"]');
    const txt = await page.inputValue('#bktxt');
    ok(txt.includes('harmony-workshop'), `${inst}: backup text generated`);
    await page.evaluate(() => localStorage.setItem('hw-phase1', JSON.stringify({ ver: 2, inst: 'piano', input: 'screen', done: {}, xp: 0, streak: 0, last: '', pdone: {} })));
    await page.fill('#bktxt', txt);
    await page.click('[data-act="bkimp"]');
    await page.waitForTimeout(500);
    ok((await page.evaluate(() => S.xp)) === 77, `${inst}: restore brings progress back`);
    ok(errs.length === 0, `${inst}: no page errors ${errs.slice(0, 2).join(' | ')}`);
    await page.close();
  }
  await browser.close();
  process.exit(failed ? 1 : 0);
})();
