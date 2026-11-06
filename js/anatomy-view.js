/*
 * js/anatomy-view.js  -  Hassan
 *
 * Adds the BACK view of the body next to Ali's FRONT view, and the Front / Back buttons.
 *
 * How it fits with the other files
 *   - js/anatomy.js (Ali) draws the front map inside #anatomy-view and owns the click listener.
 *     This file never edits it. It only has to run AFTER it, which index.html already does
 *     (anatomy.js is listed before anatomy-view.js).
 *   - Both maps use the same picture, assets/anatomy/body.webp (960 x 837 px, front figure on the
 *     left, back figure on the right). The front map shows the left half (viewBox "0 0 480 837"),
 *     this back map shows the right half (viewBox "480 0 480 837"). Same picture, same scale.
 *   - Every clickable back region follows the same contract as the front one:
 *     class="muscle" and data-muscle="<muscle id>". Ali's click listener sits on #anatomy-view,
 *     so it also catches clicks on the back regions: no new click code is needed here.
 *   - The back regions are named back, shoulders, triceps, glutes, legs ("back of the legs" is
 *     "legs", because it is not one of the 8 official muscle names).
 *
 * Why the back map is written in this file and not pasted into index.html:
 *   js/anatomy.js replaces everything inside #anatomy-view when it runs, so anything pasted into
 *   the HTML would be deleted. The same reason is why Ali's front map is also inside his script.
 */
(function () {
  'use strict';

  const root = document.getElementById('anatomy-view');
  if (!root) return;

  // Ali's front map. It must exist already, because anatomy.js runs before this file.
  const frontSvg = root.querySelector('svg');
  if (!frontSvg) {
    console.warn('[anatomy-view] Front map not found. js/anatomy.js must be loaded before js/anatomy-view.js.');
    return;
  }

  /* ---------- the back map ---------- */

  // The polygons were traced on the back figure of body.webp (x = 480..960). Each one follows the
  // outline of the muscle on the drawing. Shoulders and triceps have an invisible stroke, which
  // makes their tap area bigger on a phone without changing how the map looks.
  const BACK_SVG = `
        <svg class="anatomy-back" data-view="back" viewBox="480 0 480 837"
             xmlns="http://www.w3.org/2000/svg" role="group" aria-label="Back view of the body">
            <title>Back view of the body</title>
            <image href="assets/anatomy/body.webp" x="0" y="0" width="960" height="837"/>

            <polygon class="muscle" data-muscle="back" points="768,100 755,103 751,101 748,103 743,101 739,103 735,101 731,103 716,101 710,106 707,150 702,154 669,166 655,175 674,184 692,188 700,195 697,208 669,237 670,264 668,281 670,310 682,336 693,346 698,356 713,363 720,370 726,382 730,398 743,414 756,397 765,371 774,362 786,357 795,343 802,338 813,318 816,307 815,238 817,237 790,210 786,203 786,195 796,187 805,186 831,176 819,167 778,150 776,106"/>
            <polygon class="muscle" data-muscle="glutes" points="683,340 683,350 679,359 680,368 672,381 669,396 672,441 735,441 738,434 743,430 751,441 813,441 813,419 817,406 816,392 812,377 806,368 802,341 796,343 786,358 774,363 766,371 757,397 743,415 729,398 725,382 719,370 713,364 699,358 687,340"/>
            <polygon class="muscle" data-muscle="legs" points="672,442 676,492 691,537 690,558 692,571 683,595 683,628 685,641 693,658 694,678 708,734 711,753 709,770 734,770 729,753 729,722 732,685 731,654 738,630 738,608 728,572 730,568 730,530 738,480 738,447 743,443 748,447 747,472 755,526 755,565 757,571 747,613 748,633 754,653 754,697 757,752 753,760 752,770 777,770 775,750 778,731 790,686 793,657 800,643 802,633 803,598 794,573 795,535 810,489 813,442"/>
            <polygon class="muscle" data-muscle="shoulders" stroke="transparent" stroke-linejoin="round" stroke-width="10" points="699,195 692,189 680,187 653,176 650,177 649,182 638,193 632,207 629,226 631,255 635,256 646,251 671,234 696,208"/>
            <polygon class="muscle" data-muscle="shoulders" stroke="transparent" stroke-linejoin="round" stroke-width="10" points="790,191 787,195 789,207 818,237 848,255 855,255 856,221 853,205 847,192 837,183 835,177 832,176"/>
            <polygon class="muscle" data-muscle="triceps" stroke="transparent" stroke-linejoin="round" stroke-width="14" points="669,238 646,252 631,258 626,282 626,299 629,312 638,324 632,332 633,337 652,337 652,332 661,318 667,291"/>
            <polygon class="muscle" data-muscle="triceps" stroke="transparent" stroke-linejoin="round" stroke-width="14" points="816,238 819,295 824,317 834,333 833,337 852,337 854,332 847,324 855,315 859,303 859,277 855,259"/>
        </svg>`;

  root.insertAdjacentHTML('beforeend', BACK_SVG);
  const backSvg = root.querySelector('svg[data-view="back"]');
  frontSvg.dataset.view = 'front';

  /* ---------- Front / Back buttons ---------- */

  const bar = document.createElement('div');
  bar.className = 'view-switch';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', 'Body view');

  const buttons = ['front', 'back'].map((view) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'view-switch__btn';
    button.dataset.view = view;
    button.textContent = view === 'front' ? 'Front' : 'Back';
    button.addEventListener('click', () => showView(view));
    bar.appendChild(button);
    return button;
  });

  // The bar goes inside #anatomy-view, above the map. It cannot go next to the section:
  // #anatomy-view is one cell of the page grid, an extra element there would break the layout.
  root.insertBefore(bar, frontSvg);

  // The active view is visible, the other one is hidden.
  function showView(view) {
    frontSvg.style.display = view === 'front' ? '' : 'none';
    backSvg.style.display = view === 'back' ? '' : 'none';
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.view === view));
    });
  }

  /* ---------- keep the selected muscle highlighted in both views ---------- */

  // Ali's code gives the clicked region the class "selected". Here the same muscle also gets it
  // in the other view, so a muscle picked on the front is still highlighted after switching to
  // the back (and the other way round). Only one muscle group is highlighted at a time.
  document.addEventListener('muscleSelected', (event) => {
    const selected = event.detail && event.detail.muscle;
    root.querySelectorAll('.muscle').forEach((region) => {
      region.classList.toggle('selected', region.dataset.muscle === selected);
    });
  });

  /* ---------- styles that only this file needs ---------- */

  // The look of the buttons lives here so this part works without editing css/anatomy.css
  // (Tamara's file). The colours come from the design variables in css/style.css; the values after
  // the comma are only used if a variable is missing.
  const style = document.createElement('style');
  style.textContent = `
    .view-switch {
      display: flex;
      justify-content: center;
      gap: var(--space-1, 0.5rem);
      margin-bottom: var(--space-2, 1rem);
    }
    .view-switch__btn {
      min-width: 96px;
      min-height: 44px;
      background: transparent;
      color: var(--text, #f2f4f5);
      border: 1px solid var(--accent, #39ff14);
    }
    .view-switch__btn[aria-pressed="true"] {
      background: var(--accent, #39ff14);
      color: var(--accent-ink, #0b0d0e);
    }
    #anatomy-view svg {
      touch-action: manipulation;
      -webkit-tap-highlight-color: transparent;
    }`;
  document.head.appendChild(style);

  showView('front');   // the back view is hidden at the start
})();
