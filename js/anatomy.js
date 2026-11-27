(function () {
    const view = document.getElementById('anatomy-view');
    if (!view) return;

    view.innerHTML = `
        <svg viewBox="0 0 480 837" xmlns="http://www.w3.org/2000/svg">
        <style>
    #anatomy-view .muscle[data-intensity] {
        fill: transparent !important;
    }

    #anatomy-view .muscle[data-intensity]:hover,
    #anatomy-view .muscle[data-intensity].selected {
        fill: var(--heatmap-color) !important;
        fill-opacity: 0.65 !important;
    }
</style>
            <image href="assets/anatomy/body.webp" x="0" y="0" width="960" height="837"/>

                        <path class="muscle" data-muscle="shoulders"
                             d="M158,153
                            C130,168 115,194 127,233
                            Q135,222 142,213
                            C148,186 177,173 208,166
                            Q183,151 158,153 Z"/>

                        <path class="muscle" data-muscle="shoulders"
                            d="M325,153
                             C353,168 368,194 356,233
                             Q348,222 341,213
                             C335,186 306,173 275,166
                             Q300,151 325,153 Z"/>

            <polygon class="muscle" data-muscle="chest" points="233,168 200,163 173,173 158,192 158,225 160,245 180,257 203,265 233,264"/>
            <polygon class="muscle" data-muscle="chest" points="250,168 283,163 310,173 325,192 325,225 323,245 303,257 280,265 250,264"/>

            <polygon class="muscle" data-muscle="biceps" points="117,257 105,281 97,297 137,303 141,288 148,268 156,235 152,217 127,262"/>
            <polygon class="muscle" data-muscle="biceps" points="366,257 378,281 386,297 346,303 342,288 335,268 327,235 331,217 356,262"/>

            <polygon class="muscle" data-muscle="abs" points="203,265 180,257 158,250 165,277 172,307 171,322 164,342 166,355 185,372 215,395 241,406 268,395 298,372 317,355 319,342 312,322 311,307 318,277 325,250 303,257 280,265"/>

            <polygon class="muscle" data-muscle="legs" points="163,400 185,392 205,410 237,418 236,470 233,520 229,556 205,560 190,555 175,522 166,480 162,440"/>
            <polygon class="muscle" data-muscle="legs" points="320,400 298,392 278,410 246,418 247,470 250,520 254,556 278,560 293,555 308,522 317,480 321,440"/>

            <polygon class="muscle" data-muscle="legs" points="185,592 222,584 233,606 234,640 230,668 218,690 190,696 181,672 177,644 180,616"/>
            <polygon class="muscle" data-muscle="legs" points="298,592 261,584 250,606 249,640 253,668 265,690 293,696 302,672 306,644 303,616"/>
        </svg>`;

    view.addEventListener('click', (event) => {
        const muscle = event.target.closest('.muscle');
        if (!muscle || !view.contains(muscle)) return;

        view.querySelectorAll('.muscle.selected')
            .forEach((el) => el.classList.remove('selected'));
        muscle.classList.add('selected');

        view.dispatchEvent(new CustomEvent('muscleSelected', {
            bubbles: true,
            detail: { muscle: muscle.dataset.muscle }
        }));
    });
const frontSvg = view.querySelector('svg');

function updateFrontHeatmap() {
    const workout = loadWorkout();
    const muscleCounts = {};

    workout.forEach((exercise) => {
        const muscle = exercise.muscle;

        if (muscle) {
            muscleCounts[muscle] =
                (muscleCounts[muscle] || 0) + 1;
        }
    });

    frontSvg.querySelectorAll('.muscle[data-muscle]')
        .forEach((region) => {
            const muscle = region.dataset.muscle;
            const count = muscleCounts[muscle] || 0;

            region.dataset.intensity = Math.min(count, 3);
            const colors = [
    "transparent",
    "#facc15",
    "#f97316",
    "#ef4444"
];
region.style.setProperty(
    '--heatmap-color',
    colors[Math.min(count, 3)]
);
            region.dataset.count = count;

let tooltip = region.querySelector('title');

if (!tooltip) {
    tooltip = document.createElementNS(
        'http://www.w3.org/2000/svg', 'title'
    );
    region.prepend(tooltip);
}

tooltip.textContent =
    `Muscle: ${muscle}\n` +
    `Exercises: ${count}\n` +
    `Intensity: ${Math.min(count, 3)}/3`;
        });
}

updateFrontHeatmap();
const workoutList = document.getElementById('workout-list');

if (workoutList) {
    const workoutObserver = new MutationObserver(() => {
        updateFrontHeatmap();
    });

    workoutObserver.observe(workoutList, {
        childList: true,
        subtree: true
    });
}

window.addEventListener('storage', updateFrontHeatmap);
})();
