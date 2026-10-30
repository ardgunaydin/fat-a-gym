# Summary of the finished sprint
# Ali Erdem Dikdere

## 1. Table of the finished sprint.

| Start date | End date | Aysel Feyza Sivrihisar | Arda Günaydın | Tamara Marusych | Ali Erdem Dikdere | Hassan Maaz |
|---|---|---|---|---|---|---|
| 16.10.2026 | 30.10.2026 | Exercise data format and chest.json as the reference file; exercise list, detail panel and empty messages; back.json; exercise photos; exercise data section of the technical documentation; | Repository setup; requirements documentation; applyFilters and the filter interface; Add to Workout and workout list; LocalStorage save and load; legs.json and glutes.json; technical documentation; sprint backlog; | Page skeleton in index.html; design system and shared styles; responsive layout and homepage section; abs.json and triceps.json; own section of the technical documentation; | Front anatomy muscle map (SVG layer on the shared body image); muscle areas with class and data-muscle; single click listener and muscleSelected event; selected class handling; shoulders.json; | Back muscle view; view switching; map styling; |

## 2. Summary of the finished sprint.

### Finished tasks

Front anatomy muscle map. The shared body image (`assets/anatomy/body.webp`) is shown inside `#anatomy-view` with an SVG layer on top. The layer holds the clickable muscle areas for chest, shoulders, biceps, abs and legs. Every area has `class="muscle"` and a `data-muscle` value and no HTML id, so the back view can use the same names without two equal ids on one page.

One click listener on `#anatomy-view` handles all areas. It adds the class `selected` to the clicked area, removes it from the previous one and dispatches the `muscleSelected` event with the muscle name in `detail.muscle`. The colour is left to the map styling. The exercise list listens to this event.

The areas were measured on the image itself and the right side mirrors the left side, so the front and the back view come from the same drawing and have the same scale. `shoulders.json` was written in the agreed exercise data format.

### Unfinished tasks

The source and the licence of the body image still have to be checked and written into the documentation.

### What went well?

The agreed names (muscle identifiers, `#anatomy-view`, `muscleSelected` with `detail.muscle`) made it possible to build the map without waiting for the exercise list. As soon as the map was added to the shared project, a click on a muscle showed its exercises. Because the listener sits on the container and not on each area, the back view needs no new code.

### What (and how) could be improved?

No free body map SVG with a separate shape for every muscle was found, so a body image with an SVG layer was used. The click areas are hand-measured polygons that follow the muscle outlines only roughly; a real SVG with one path per muscle would be more exact and easier to style. The choice of the drawing should have been made together with Hassan at the start of the sprint, and the image source and licence should have been checked before the image was added. It should also have been clear from the board from the start who writes the data file of each muscle, so that nobody works twice or waits.
