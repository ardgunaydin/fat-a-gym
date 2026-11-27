# Summary of the finished sprint

## Aysel Feyza Sivrihisar

1. Table of the finished sprint.

| Start date | End date | Aysel Feyza Sivrihisar | Arda Günaydın | Tamara Marusych | Ali Dikdere | Hassan Maaz |
|---|---|---|---|---|---|---|
| 13.11.2026 | 27.11.2026 | Rest timer in the detail panel with countdown, pause, reset and a message when the rest is over; data consistency check of the eight data files; rest-timer sections of the technical documentation and user manual with screenshots; workout history in js/history.js: a finished workout is saved in the browser and the history is listed newest first (pulled from Sprint 4). | Sprint 3 backlog and Trello set-up; FR-09 Workout Mode: Mark as done control, completed state saved in LocalStorage and step-by-step progress; workout mode section of the technical documentation. | Light and dark theme switching, with the choice kept in the browser. | shoulders.json with five exercises and photos; closing </header> tag restored; front map and muscle-selection sections of the technical documentation and user manual. | Real-device test, browser compatibility test, back-view documentation, Sprint 1 and 2 summaries and heatmap colours are not yet on main. |

2. Summary of my finished sprint.

| Question | Answer |
|---|---|
| Finished tasks | I added the rest timer to the exercise detail panel in js/exercises.js. It shows the rest time as minutes and seconds, it can be started, paused and reset, and it writes “Rest finished” when the time reaches zero. I also checked all eight data/*.json files against the 14-field format: I went through forty records with their image paths and muscle ids, and I shared what I found with the team inside the sprint. I wrote the rest-timer sections of the technical documentation and the user manual and took two screenshots from the running application. In the second week I added the workout history in js/history.js. A finished workout is saved in the browser, the newest one is shown first with its date and exercise names, and the Finish Workout button moves the current workout into the history and empties it. I built the history section and the button in my own file, so index.html only needed the line that loads the script. All of this is on main in eight commits. |
| Unfinished tasks | None. All twelve story points that were assigned to me in this sprint are finished. |
| What went well? | My commits were spread over both weeks: the rest timer on 19 and 20 November, the documentation on 26 November and the workout history on 27 November. That was the improvement I wrote down at the end of Sprint 2, and this time it worked. I had no merge conflicts, because everything I added stayed inside my own files. I tested every step in the browser on a local server before I committed it: the countdown going down to zero, the history keeping its order after a refresh, the empty states of both lists and the page at 375 pixels. |
| What could be improved? | The workout history came from Sprint 4 and was moved into our second week on 26 November, so it reached main on the last day and its documentation section has to wait for Sprint 4. Next time I will plan a feature and its documentation as one task in the same week. The history list also keeps every workout without a limit. That is fine for a demo, but it will need a maximum length or a clear button when I add the statistics part of FR-10. |
