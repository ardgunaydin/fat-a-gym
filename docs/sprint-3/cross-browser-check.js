// FATaGYM - cross-browser check (Sprint 3, NFR-04 Compatibility / NFR-02 Responsive Design)
//
// Runs the same checks in one browser and prints PASS / FAIL lines you can copy into
// docs/sprint-3/browser-compatibility-test-hassan.md.
//
// Setup (once, outside the repository, for example in a folder called fatagym-tests):
//   npm init -y
//   npm install playwright
//   npx playwright install firefox chromium        (Edge and Chrome use the browsers already on your PC)
//
// Run (the app must be open in a local server, for example Live Server on port 5500):
//   BASE=http://127.0.0.1:5500/index.html BROWSER=chrome   node cross-browser-check.js
//   BASE=http://127.0.0.1:5500/index.html BROWSER=msedge   node cross-browser-check.js
//   BASE=http://127.0.0.1:5500/index.html BROWSER=firefox  node cross-browser-check.js
// On Windows PowerShell:  $env:BASE="http://127.0.0.1:5500/index.html"; $env:BROWSER="firefox"; node cross-browser-check.js

const playwright = require('playwright');
const BASE = process.env.BASE || 'http://127.0.0.1:5500/index.html';
const NAME = process.env.BROWSER || 'chromium';

const FRONT = ['chest', 'shoulders', 'biceps', 'abs', 'legs'];
const BACK = ['back', 'shoulders', 'triceps', 'glutes', 'legs'];
const results = [];
function record(ok, name, detail) { results.push({ ok, name, detail: detail || '' }); console.log((ok ? 'PASS  ' : 'FAIL  ') + name + (detail ? '  -  ' + detail : '')); }
async function check(name, fn) { try { const r = await fn(); record(r.ok, name, r.detail); } catch (e) { record(false, name, 'error: ' + String(e.message).split('\n')[0]); } }

// Finds a point on screen that really belongs to a muscle region (not hidden behind another shape).
const FIND_POINT = (view, muscle) => {
  const svg = document.querySelector('#anatomy-view svg[data-view="' + view + '"]');
  for (const el of svg.querySelectorAll('.muscle[data-muscle="' + muscle + '"]')) {
    const r = el.getBoundingClientRect();
    for (let y = r.top; y < r.bottom; y += 3) for (let x = r.left; x < r.right; x += 3) {
      const t = document.elementFromPoint(x, y);
      if (t && t.dataset && t.dataset.muscle === muscle && svg.contains(t)) return { x, y };
    }
  }
  return null;
};

// Real touch size of every region: biggest circle that fits inside the area that reacts to a tap.
const MEASURE = (view) => {
  const svg = document.querySelector('#anatomy-view svg[data-view="' + view + '"]');
  const STEP = 1.5, out = [];
  [...svg.querySelectorAll('.muscle')].forEach((el, idx) => {
    const r = el.getBoundingClientRect();
    const x0 = Math.floor(r.left - 12), y0 = Math.floor(r.top - 12);
    const W = Math.ceil((r.width + 24) / STEP), H = Math.ceil((r.height + 24) / STEP);
    const d = new Float32Array(W * H); const INF = 1e9;
    for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) d[j * W + i] = document.elementFromPoint(x0 + i * STEP, y0 + j * STEP) === el ? INF : 0;
    for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) { const k = j * W + i; if (!d[k]) continue; d[k] = (i === 0 || j === 0) ? 1 : Math.min(d[k], d[k - 1] + 1, d[k - W] + 1, d[k - W - 1] + 1.414, i < W - 1 ? d[k - W + 1] + 1.414 : 1); }
    for (let j = H - 1; j >= 0; j--) for (let i = W - 1; i >= 0; i--) { const k = j * W + i; if (!d[k]) continue; d[k] = (i === W - 1 || j === H - 1) ? Math.min(d[k], 1) : Math.min(d[k], d[k + 1] + 1, d[k + W] + 1, d[k + W + 1] + 1.414, i > 0 ? d[k + W - 1] + 1.414 : 1); }
    let best = 0, bx = 0, by = 0;
    for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) if (d[j * W + i] > best) { best = d[j * W + i]; bx = i; by = j; }
    out.push({ muscle: el.dataset.muscle, index: idx, diameter: Math.round(best * 2 * STEP * 10) / 10, x: x0 + bx * STEP, y: y0 + by * STEP });
  });
  return out;
};

(async () => {
  let browserType = playwright.chromium, opts = {};
  if (NAME === 'firefox') browserType = playwright.firefox;
  else if (NAME === 'webkit') browserType = playwright.webkit;
  else if (NAME === 'chrome') opts = { channel: 'chrome' };
  else if (NAME === 'msedge') opts = { channel: 'msedge' };
  else if (process.env.CHROME_PATH) opts = { executablePath: process.env.CHROME_PATH };
  const browser = await browserType.launch(opts);
  console.log('Browser: ' + NAME + ' ' + browser.version() + '   URL: ' + BASE + '\n');

  // ---------- desktop ----------
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: 'dark' });
  const page = await ctx.newPage();
  const errors = [], failed = [];
  await page.addInitScript(() => { window.__events = []; document.addEventListener('muscleSelected', e => window.__events.push(e.detail.muscle)); });
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error' && !/favicon/i.test(m.text()) && !/status of 404/.test(m.text())) errors.push(m.text()); });
  page.on('response', r => { if (r.status() >= 400 && !/favicon/.test(r.url())) failed.push(r.status() + ' ' + r.url()); });
  await page.goto(BASE); await page.waitForSelector('#anatomy-view svg');

  await check('Page loads without JavaScript errors or failed requests', async () => ({ ok: errors.length === 0 && failed.length === 0, detail: [...errors, ...failed].join(' | ') }));
  await check('Hero section keeps its <section class="hero"> wrapper (index.html structure)', async () => {
    const ok = await page.evaluate(() => !!document.querySelector('section.hero'));
    return { ok, detail: ok ? '' : 'section.hero is missing: the broken </header...> tag on index.html swallows it' };
  });

  // (helper is injected as a plain function so it works the same in every browser)
  await page.evaluate((src) => { window.__find = new Function('view', 'muscle', 'return (' + src + ')(view, muscle)'); }, FIND_POINT.toString());

  for (const [view, list] of [['front', FRONT], ['back', BACK]]) {
    await check('Map, ' + view + ' view: every muscle selects and shows its exercises', async () => {
      await page.click('.view-switch__btn[data-view="' + view + '"]');
      const bad = [];
      for (const m of list) {
        const pt = await page.evaluate(([v, mm]) => window.__find(v, mm), [view, m]);
        if (!pt) { bad.push(m + ': no hit point'); continue; }
        const before = await page.evaluate(() => window.__events.length);
        await page.mouse.click(pt.x, pt.y); await page.waitForTimeout(350);
        const info = await page.evaluate((b) => ({ ev: window.__events.slice(b).pop() || null, items: document.querySelectorAll('#exercise-list .exercise-item').length, sel: document.querySelectorAll('#anatomy-view .muscle.selected').length }), before);
        if (info.ev !== m || info.items < 1 || info.sel < 1) bad.push(m + ': event=' + info.ev + ' items=' + info.items + ' selected=' + info.sel);
      }
      return { ok: bad.length === 0, detail: bad.join('; ') || list.join(', ') };
    });
  }

  await check('Front/Back buttons: only one view visible, aria-pressed follows', async () => {
    const out = [];
    for (const v of ['back', 'front']) {
      await page.click('.view-switch__btn[data-view="' + v + '"]');
      out.push(await page.evaluate((v) => {
        const vis = (n) => getComputedStyle(document.querySelector('svg[data-view="' + n + '"]')).display !== 'none';
        const pressed = document.querySelector('.view-switch__btn[aria-pressed="true"]').dataset.view;
        return vis('front') === (v === 'front') && vis('back') === (v === 'back') && pressed === v;
      }, v));
    }
    return { ok: out.every(Boolean) };
  });

  await check('Tooltip shows the muscle name on hover (back view, glutes)', async () => {
    await page.click('.view-switch__btn[data-view="back"]');
    await page.waitForTimeout(400);                       // let any scrolling caused by the click finish: a scroll hides the tooltip on purpose
    await page.mouse.move(5, 5);
    const pt = await page.evaluate(() => window.__find('back', 'glutes'));
    await page.mouse.move(pt.x, pt.y); await page.waitForTimeout(250);
    const t = await page.evaluate(() => { const e = document.querySelector('.muscle-tooltip'); return { hidden: e.hidden, text: e.textContent }; });
    return { ok: !t.hidden && t.text === 'Glutes', detail: JSON.stringify(t) };
  });

  await page.click('.view-switch__btn[data-view="front"]');
  const chest = await page.evaluate(() => window.__find('front', 'chest'));
  await page.mouse.click(chest.x, chest.y); await page.waitForTimeout(400);

  await check('Exercise list and filters (chest: place home / gym / clear)', async () => {
    const n = async () => page.locator('#exercise-list .exercise-item').count();
    const all = await n(); await page.selectOption('#filter-place', 'home'); await page.waitForTimeout(150);
    const home = await n(); await page.selectOption('#filter-place', 'gym'); await page.waitForTimeout(150);
    const gym = await n(); await page.click('#filter-panel button:has-text("Clear filters")'); await page.waitForTimeout(150);
    const cleared = await n();
    return { ok: all === 5 && home + gym === 5 && cleared === 5, detail: 'all ' + all + ', home ' + home + ', gym ' + gym + ', cleared ' + cleared };
  });

  await check('Exercise search narrows the list and clearing restores it', async () => {
    await page.fill('#exercise-search-input', 'press'); await page.waitForTimeout(150);
    const some = await page.locator('#exercise-list .exercise-item').count();
    await page.fill('#exercise-search-input', ''); await page.waitForTimeout(150);
    const all = await page.locator('#exercise-list .exercise-item').count();
    return { ok: some >= 1 && some < all && all === 5, detail: 'press ' + some + ', cleared ' + all };
  });

  await check('Exercise detail: both photos load, rest timer counts down', async () => {
    await page.locator('#exercise-list .exercise-item').first().click(); await page.waitForTimeout(600);
    const imgs = await page.evaluate(() => [...document.querySelectorAll('#exercise-detail img')].map(i => i.complete && i.naturalWidth > 0));
    const t0 = await page.locator('.rest-timer-time').textContent();
    await page.click('.rest-timer-button:has-text("Start rest")'); await page.waitForTimeout(2200);
    await page.click('.rest-timer-button:has-text("Pause")');
    const t1 = await page.locator('.rest-timer-time').textContent();
    return { ok: imgs.length === 2 && imgs.every(Boolean) && t0 !== t1, detail: 'images ' + imgs.length + ', timer ' + t0 + ' -> ' + t1 };
  });

  await check('Workout list: add, mark as done, still there after reload', async () => {
    await page.click('button:has-text("Add to Workout")'); await page.click('.workout-complete-button');
    await page.reload(); await page.waitForSelector('#anatomy-view svg'); await page.waitForTimeout(300);
    const s = await page.evaluate(() => ({ items: document.querySelectorAll('#workout-list .workout-item').length, btn: (document.querySelector('.workout-complete-button') || {}).textContent }));
    return { ok: s.items === 1 && s.btn === 'Undo', detail: JSON.stringify(s) };
  });

  await check('Theme switch keeps its choice after reload', async () => {
    const before = await page.evaluate(() => document.documentElement.dataset.theme);
    await page.click('#theme-toggle');
    const after = await page.evaluate(() => document.documentElement.dataset.theme);
    await page.reload(); await page.waitForSelector('#anatomy-view svg');
    const reloaded = await page.evaluate(() => document.documentElement.dataset.theme);
    return { ok: before !== after && after === reloaded, detail: before + ' -> ' + after + ' -> reload ' + reloaded };
  });
  await ctx.close();

  // ---------- phone-size touch test ----------
  const phoneOpts = { viewport: { width: 375, height: 812 }, hasTouch: true, deviceScaleFactor: 2, colorScheme: 'dark' };
  if (NAME !== 'firefox') phoneOpts.isMobile = true;     // Firefox does not support isMobile in Playwright
  let pctx, ppage;
  try {
    pctx = await browser.newContext(phoneOpts); ppage = await pctx.newPage();
    await ppage.addInitScript(() => { window.__events = []; document.addEventListener('muscleSelected', e => window.__events.push(e.detail.muscle)); });
    await ppage.goto(BASE); await ppage.waitForSelector('#anatomy-view svg');
  } catch (e) { record(false, 'Phone-size touch test could not start', e.message.split('\n')[0]); }
  if (ppage) {
    await check('Phone 375 px: page has no sideways scroll, map is at least 250 px wide', async () => {
      const m = await ppage.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth, map: Math.round(document.querySelector('#anatomy-view svg[data-view="front"]').getBoundingClientRect().width) }));
      return { ok: m.sw <= m.iw && m.map >= 250, detail: 'page ' + m.sw + '/' + m.iw + ' px, map ' + m.map + ' px wide' };
    });
    for (const view of ['front', 'back']) {
      await check('Phone 375 px, ' + view + ' view: every region reacts to a real tap', async () => {
        await ppage.tap('.view-switch__btn[data-view="' + view + '"]');
        await ppage.evaluate(() => document.getElementById('anatomy-view').scrollIntoView({ block: 'center' })); await ppage.waitForTimeout(150);
        const regions = await ppage.evaluate(MEASURE, view);
        const bad = [], small = [];
        for (const g of regions) {
          const before = await ppage.evaluate(() => window.__events.length);
          await ppage.touchscreen.tap(g.x, g.y); await ppage.waitForTimeout(120);
          const ev = await ppage.evaluate((b) => window.__events.slice(b).pop() || null, before);
          if (ev !== g.muscle) bad.push(g.muscle + '#' + g.index);
          if (g.diameter < 24) small.push(g.muscle + '#' + g.index + ' ' + g.diameter + 'px');
        }
        console.log('        touch sizes (px): ' + regions.map(g => g.muscle + '#' + g.index + '=' + g.diameter).join('  '));
        if (small.length) console.log('        BELOW 24 px (WCAG 2.2 AA target size): ' + small.join(', '));
        return { ok: bad.length === 0, detail: bad.length ? 'no reaction: ' + bad.join(', ') : regions.length + ' regions tapped' };
      });
    }
    await pctx.close();
  }

  const failedCount = results.filter(r => !r.ok).length;
  console.log('\n' + (results.length - failedCount) + ' passed, ' + failedCount + ' failed in ' + NAME + ' ' + browser.version());
  await browser.close();
  process.exit(failedCount ? 1 : 0);
})().catch(e => { console.error('SCRIPT ERROR', e); process.exit(2); });
