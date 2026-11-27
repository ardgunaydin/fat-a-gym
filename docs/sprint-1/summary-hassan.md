# Summary of the finished sprint

## Hassan Maaz

1. Table of the finished sprint.

| Start date | End date | Aysel Feyza Sivrihisar | Arda Günaydın | Tamara Marusych | Ali Dikdere | Hassan Maaz |
|---|---|---|---|---|---|---|
| 16.10.2026 | 30.10.2026 | Exercise data format and chest.json as the reference file; exercise list, detail panel and empty messages; back.json; exercise photos; exercise data section of the technical documentation. | Repository setup; requirements documentation; applyFilters and the filter interface; Add to Workout and workout list; LocalStorage save and load; legs.json and glutes.json; technical documentation; sprint backlog. | Page skeleton in index.html; design system and shared styles; responsive layout and homepage section; abs.json and triceps.json; own section of the technical documentation. | Front anatomy muscle map (SVG layer on the shared body image); muscle areas with class and data-muscle; single click listener and muscleSelected event; selected class handling. | Back body view as a second SVG layer on the shared body image, with the muscles back, glutes, legs, shoulders and triceps; Front and Back buttons that switch the view; map styling; data/biceps.json. |

2. Summary of the finished sprint.

| Question | Answer |
|---|---|
| Finished tasks | Back view of the body map. In js/anatomy-view.js I added a second SVG that uses the shared body picture, cropped to the back half, with transparent polygons for back, glutes, legs, shoulders and triceps. Every polygon has class="muscle", a data-muscle value from the agreed list and no HTML id, so the click listener of the front map and the muscleSelected event work for the back view without new click code. Front/back switching. I added Front and Back buttons that show one view and hide the other, with aria-pressed on the active button. Map styling. The buttons are at least 44 px high, the map has touch-action: manipulation, and the narrow shoulder and triceps areas have a transparent stroke so they are easier to hit. I also filled data/biceps.json. |
| Unfinished tasks | The documentation of the back view and the map styling, and the test on a real phone, were not finished. Both move to Sprint 2. |
| What went well? | The agreed names made the back view quick to add: the new polygons only needed class="muscle" and data-muscle, and the click listener of the front map handled them. The front and the back view use the same picture at the same scale, so they look like one drawing. |
| What (and how) could be improved? | I left the documentation and the phone test to the end of the sprint and did not finish them. In the next sprint I will book the phone test in the first week and write each documentation section as soon as the feature is merged. |
