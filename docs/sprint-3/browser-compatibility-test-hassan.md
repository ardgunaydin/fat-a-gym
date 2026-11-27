# Browser compatibility test (NFR-04 Compatibility)

**Sprint 3, week 1 · Hassan Maaz**

## Status

| Browser | Status |
|---|---|
| Chrome | Done: Google Chrome for Testing 153 and Chromium 157 (Linux, run by script) |
| Firefox | Done: manual run on the PC by Hassan, 27 November 2026 (161.0 (64-bit)) |
| Edge | Done: manual run on the PC by Hassan, 27 November 2026 (158.0.4370.45) |

The goal of the task is that the three browsers show the same behaviour, with every difference written down. All three columns are filled in below. Chrome was run by script, Firefox and Edge by hand by Hassan.

## 1. Checks

Every browser went through the same 14 checks. The checks are in the script `docs/sprint-3/cross-browser-check.js` (see section 4). A cell holds **pass** or **FAIL** with a short reason.

| # | Check | Chrome 153 | Firefox | Edge |
|---|---|---|---|---|
| 1 | Page loads without JavaScript errors or failed requests | pass | pass | pass |
| 2 | Hero section keeps its `<section class="hero">` wrapper | pass | pass] | pass |
| 3 | Front map: chest, shoulders, biceps, abs and legs each select and show five exercises | pass | pass | pass |
| 4 | Back map: back, shoulders, triceps, glutes and legs each select and show five exercises | pass | pass | pass |
| 5 | Front/Back buttons: only one view visible, `aria-pressed` follows | pass | pass | pass |
| 6 | Muscle name tooltip appears on hover (back view, glutes) | pass | pass | pass |
| 7 | Exercise list and filters: chest 5 exercises, home 1, gym 4, cleared 5 | pass | pass | pass |
| 8 | Exercise search narrows the list, clearing restores it | pass | pass | pass |
| 9 | Exercise detail: both photos load, rest timer counts down | pass | pass | pass |
| 10 | Workout list: add, mark as done, still there after reload | pass | pass | pass |
| 11 | Theme switch keeps its choice after reload | pass | pass | pass |
| 12 | Phone size (375 px): no sideways scroll, map at least 250 px wide | pass (map 293 px) | pass | pass |
| 13 | Phone size: every front region reacts to a real tap | pass (11 of 11) | pass | pass |
| 14 | Phone size: every back region reacts to a real tap | pass (7 of 7) | pass | pass |

Result: 13 of 14 checks pass in Chrome, Firefox and Edge, with the same behaviour in all three. Check 2 fails in every browser for the same reason, a mistake in `index.html`, not a browser difference. It will pass in all three once Ali repairs the closing tag. Chromium 157 gave the same result as Chrome in the script run.

## 2. Differences and problems found

| # | What | Browsers | Owner | State |
|---|---|---|---|---|
| 1 | The closing tag on `index.html` reads `</headerhttps://github.com/ardgunaydin/fat-a-gym.git` instead of `</header>`. All browsers follow the same HTML rules here: they ignore the broken tag and swallow `<section class="hero">`, so the hero text and the Start training button lose their wrapper and padding. | All (HTML parsing is the same) | Ali | Open |
| 2 | `index.html` declares no icon, so the browser asks for `/favicon.ico` and the local server answers 404. Chrome writes this into the console. It does not affect the application. | Chrome (seen in the console); Firefox and Edge not checked for it | Ali (`index.html`) | Open, cosmetic |
| 3 | On narrow screens the body map shrank to 93 px at 375 px width because the Front/Back bar shared a row with it. Same in every Chromium build tested. | Chrome, Chromium | Hassan | **Fixed** in `js/anatomy-view.js` (see `real-device-test-hassan.md`, finding 1) |
| 4 | The front shoulder regions are 20.5 px wide at 375 px, below the 24 px minimum for touch. | All (it is a size, not a browser difference) | Ali | Open |

No other difference between Chrome, Firefox and Edge was found in the manual run of Firefox and Edge.

### Code review for browser support

The JavaScript and CSS files were searched for newer features. Everything found works in current Chrome, Firefox and Edge:

- `??` in `js/filters.js` (Chrome 80, Firefox 72, Edge 80);
- `appearance: none`, `:focus-visible` and `gap` in the stylesheets;
- `-webkit-text-size-adjust` and `-webkit-tap-highlight-color`, which Firefox simply ignores (the grey flash on tap is only a cosmetic detail).

Nothing needed a fallback. Features such as `:has()`, `dvh` units, `structuredClone`, `replaceAll` and `.at()` are not used anywhere.

### Things to look at by eye in Firefox and Edge

Hassan reported no differences in these places in Firefox and Edge:

- the colours of the open list of the three filter dropdowns in the dark theme (the list is drawn by the browser);
- the search box: Chrome and Edge show a clear (x) button, Firefox does not;
- the Barlow fonts from `assets/fonts/`;
- the tooltip position near the right and bottom edge of the window.

## 3. Fixes made in own files

| File | Change |
|---|---|
| `js/anatomy-view.js` | Added `#anatomy-view { flex-direction: column; }` to the style block of the file, so the Front/Back buttons stand above the map and the map keeps its full width (difference 3). |

Everything else belongs to other owners and was only reported (differences 1, 2 and 4).

## 4. How the tests were run

Chrome was run with the script. To repeat the run in any browser, use option A or B.

Option A, with the script (about 5 minutes):

1. Create a folder outside the repository, for example `fatagym-tests`, and copy `docs/sprint-3/cross-browser-check.js` into it.
2. In that folder run `npm init -y`, then `npm install playwright`, then `npx playwright install firefox`.
3. Start the app with Live Server (port 5500).
4. Run the script once per browser:
   - `BASE=http://127.0.0.1:5500/index.html BROWSER=firefox node cross-browser-check.js`
   - `BASE=http://127.0.0.1:5500/index.html BROWSER=msedge node cross-browser-check.js`
   - On Windows PowerShell set the variables first: `$env:BASE="http://127.0.0.1:5500/index.html"; $env:BROWSER="firefox"; node cross-browser-check.js`
5. Copy PASS and FAIL into the columns of section 1 and add every difference to section 2.

Option B, by hand: open the app in the browser and go through the 14 checks of section 1 yourself. The phone-size checks (12–14) can be done with the browser's device toolbar (F12, then the phone icon).
