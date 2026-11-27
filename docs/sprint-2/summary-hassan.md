# Summary of the finished sprint

## Hassan Maaz

1. Table of the finished sprint.

| Start date | End date | Aysel Feyza Sivrihisar | Arda Günaydın | Tamara Marusych | Ali Dikdere | Hassan Maaz |
|---|---|---|---|---|---|---|
| 30.10.2026 | 13.11.2026 | Persistent favorite exercises with a separate storage key; exercise search in the exercise list; data-format section of the technical documentation; exercise-viewing sections of the user manual. | Sprint 2 backlog; requirements formatting and team size fix; filters, workout builder and LocalStorage sections of the technical documentation and user manual with screenshots; photos for legs.json and glutes.json; Trello update; README and team responsibilities update. | Filter panel layout; styling of the exercise list, detail panel and workout list; muscle highlighting, hover effects and map responsiveness; home place values in triceps.json; removal of the unused empty-state element. | Front anatomy muscle map and muscleSelected event merged at the start of the sprint (30.10); shoulders.json and the front-map documentation are not yet on main. | Back body view and front/back switching; muscle name tooltip on hover; biceps photos and captions; image path fixes in biceps.json. |

2. Summary of the finished sprint.

| Question | Answer |
|---|---|
| Finished tasks | Back view and front/back switching on main: the back map is a second SVG on the shared body picture and the Front and Back buttons switch the view. Muscle name tooltip. A small box with the muscle name follows the mouse pointer on both maps. It is not shown on touch screens, because a phone has no hover. data/biceps.json. All five exercises show both photos with captions, and the image paths are fixed. |
| Unfinished tasks | Four items were not finished and move to Sprint 3: the back-view section of the technical documentation, the "Switching between front and back view" section of the user manual, evidence of the test on a real phone, and my Sprint 1 and Sprint 2 summaries. |
| What went well? | The tooltip is one box that is moved around, and it works on the front and on the back map without code for each muscle, because every region has class="muscle" and data-muscle. Keeping the same names as the front map meant that the back view and the tooltip needed no changes in other people's files. |
| What (and how) could be improved? | I left the documentation, the phone test and the summaries to the end of the sprint and did not finish them. My rows in the Sprint 2 backlog stayed at "Needs confirmation". In the next sprint I will write each documentation section as soon as the feature is merged, tell the Scrum Master when a task changes status, and move my own Trello cards at the same time. |
