# Real-device test of the body map (NFR-02 Responsive Design)

**Sprint 3, week 1 · Hassan Maaz · map owner of the back view and the Front/Back buttons**

## Status

| Part | Status |
|---|---|
| Touch test of the front and back map at phone sizes, with the real touch size of every region measured | Done (section 1–3). It was run with touch emulation in Chrome, **not on a physical phone**. |
| Findings reported to the owners | Written down in section 5; each owner has to be told (tick the boxes). |
| Confirmation on a real phone, with a real screenshot | **Open.** Fill in section 4 on a phone and add the screenshots. |

## 1. Findings

| # | Finding | Owner | State |
|---|---|---|---|
| 1 | **The body map was squeezed to 93 px on a 375 px phone.** `#anatomy-view` is a row flex container (`css/anatomy.css`), and the Front/Back bar added by `js/anatomy-view.js` sat in the same row as the map. The bar took about 200 px and the map shrank to the rest. 16 of the 18 muscle regions were smaller than 24 px, so they were very hard to hit with a finger. At 768 px (two-column layout) the map was 98 px wide. | Hassan (`js/anatomy-view.js`) | **Fixed.** One rule, `#anatomy-view { flex-direction: column; }`, puts the buttons above the map. The map is now 293 px wide at 375 px. |
| 2 | **Front shoulders are too small to tap reliably.** Largest circle inside the tap area: 20.5 px at 375 px (18 px at 360 px). Front biceps: 24 px at 375 px and 22 px at 360 px. | Ali (front map, `js/anatomy.js`) | Open. Suggested fix: make the two shoulder polygons wider, or give them a transparent stroke as the back map does (`stroke="transparent" stroke-width="10"`). |
| 3 | The back map is above the 24 px minimum everywhere (smallest: triceps, 33 px), but several regions are below the 44 px that is recommended for touch. | Hassan (back map) | No action needed for the minimum; optional improvement. |
| 4 | The hero text ("Your workout, your way") lost its `<section class="hero">` wrapper, so it sits against the left edge of the screen without padding (visible in the screenshots). The cause is the broken closing tag `</headerhttps://github.com/ardgunaydin/fat-a-gym.git` in `index.html`; the browser ignores it and swallows the `<section class="hero">` tag. | Ali (`index.html`) | Open (also on the Sprint 3 plan as Ali's item 2). |
| 5 | The `Front` and `Back` buttons are 96 × 44 px, so they meet the 44 px recommendation on every screen size tested. | Hassan | OK |

## 2. Method

- **Browser:** Google Chrome for Testing 153 and Chromium 157 on Linux, with touch emulation (touch events, 2× pixel ratio, mobile viewport).
- **Screen sizes:** 360 × 800 (small Android), 375 × 812 (iPhone size), 414 × 896 (large phone) and 768 × 1024 (tablet).
- **Tap test:** every region of the front and back map was tapped with a real touch event at the point where it is easiest to hit. The test checked that the `muscleSelected` event named the right muscle.
- **Touch size:** for every region, the diameter of the largest circle that fits inside the area that reacts to a tap, in CSS pixels. The area was measured point by point with `document.elementFromPoint()` every 1.5 px, so regions hidden behind other regions and the transparent stroke are counted correctly. A region that is long but only 8 px wide gets 8 px.
- **Limits used:**
  - below 24 px fails WCAG 2.2 success criterion 2.5.8 (Target Size, Minimum, level AA);
  - 24–43 px is allowed but below the 44 px recommended by WCAG 2.5.5 and by Apple's guidelines;
  - 44 px and more is comfortable.
- **Other checks at every size:** no sideways scrolling, no JavaScript errors.

Emulation is not a finger on glass: it cannot show how well a thumb reaches or how the page behaves with the real browser bars. That is why section 4 is still needed.

## 3. Results

Touch size in CSS pixels at 375 px screen width (smaller of the left and right region where there are two):

| View | Region | Before the fix | After the fix | Result after the fix |
|---|---|---:|---:|---|
| Front | shoulders | 6 | 20.5 | **below 24 px** (Ali) |
| Front | chest | 15 | 48 | OK |
| Front | biceps | 8.5 | 24 | borderline, below 44 px (Ali) |
| Front | abs | 27 | 83.6 | OK |
| Front | legs, thighs | 15 | 45 | OK |
| Front | legs, lower | 12 | 36 | below 44 px |
| Back | back | 27 | 85.2 | OK |
| Back | glutes | 12.7 | 39.2 | below 44 px |
| Back | legs | 14.5 | 40.2 | below 44 px |
| Back | shoulders | 12 | 36.9 | below 44 px |
| Back | triceps | 12 | 33 | below 44 px |

Map width and number of regions below 24 px:

| Screen width | Map width before | Map width after | Regions below 24 px before | after |
|---|---:|---:|---:|---:|
| 360 px | 78 px | 278 px | not counted | 4 of 18 (front shoulders 18 px, front biceps 22 px) |
| 375 px | 93 px | 293 px | 16 of 18 | 2 of 18 (front shoulders) |
| 414 px | 132 px | 300 px | not counted | 2 of 18 (front shoulders) |
| 768 px | 98 px | 298 px | not counted | 2 of 18 (front shoulders) |

All 18 regions reacted to a tap at every size, before and after the fix. There was no sideways scrolling and no JavaScript error at any size.

Screenshots (emulated 375 × 812 touch viewport, not a real device):

| Before the fix | After the fix, front | After the fix, back with the back muscle selected |
|---|---|---|
| ![Map squeezed next to the buttons](images/real-device-test/emulated-375-before-front.png) | ![Map at full width below the buttons](images/real-device-test/emulated-375-after-front.png) | ![Back view with the back muscle selected](images/real-device-test/emulated-375-after-back-selected.png) |

## 4. Confirmation on a real phone (to be completed)

1. Start the app with Live Server and open it on the phone, for example `http://<computer-ip>:5500/index.html` on the same Wi-Fi.
2. Open the map. Tap each region on the **front** view and then on the **back** view with a thumb, once each, without zooming.
3. Fill in the table. "Yes" means the first tap selected the right muscle and the exercise list changed.
4. Take one screenshot of the front view and one of the back view with a muscle selected. Save them as `docs/sprint-3/images/real-device-test/real-phone-front.png` and `real-phone-back.png`.

| Phone and system | Browser | Screen width (CSS px) | Date |
|---|---|---|---|
| (fill in) | (fill in) | (fill in) | (fill in) |

| View | Region | First tap hit it? (yes / no) | Notes |
|---|---|---|---|
| Front | chest |yes| |
| Front | chest |yes| |
| Front | shoulders |yes| |
| Front | biceps |yes| |
| Front | abs |yes| |
| Front | legs, thigh |yes| |
| Front | legs, lower |yes| |
| Back | back |yes| |
| Back | glutes |yes| |
| Back | legs |yes| |
| Back | shoulders |yes| |
| Back | triceps |yes| |

If a "no" appears for a **front** region, add it to finding 2 and tell Ali. If it appears for a **back** region, it is Hassan's to fix in `BACK_SVG` in `js/anatomy-view.js`.

## 5. Owners informed

| Owner | What to tell them | Told? |
|---|---|---|
| Ali | Finding 2 (front shoulders and biceps too small on phones) and finding 4 (the broken closing tag on `index.html`, which also removes the hero wrapper) | [ ] |
| Whole team (group chat) | Finding 1: the map layout change. The Front and Back buttons are now above the body picture instead of beside it, so the screenshot `main-page.png` in the user manual shows the old layout. | [ ] |
