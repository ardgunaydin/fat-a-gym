# Summary of the finished sprint

## Aysel Feyza Sivrihisar

1. Table of the finished sprint.

| Start date | End date | Aysel Feyza Sivrihisar | Arda Günaydın | Tamara Marusych | Ali Dikdere | Hassan Maaz |
|---|---|---|---|---|---|---|
| 16.10.2026 | 30.10.2026 | Exercise data format and chest.json as the reference file; exercise list, detail panel and empty messages; back.json; exercise photos; exercise data section of the technical documentation; | Repository setup; requirements documentation; applyFilters and the filter interface; Add to Workout and workout list; LocalStorage save and load; legs.json and glutes.json; technical documentation; sprint backlog; | Page skeleton in index.html; design system and shared styles; responsive layout and homepage section; abs.json and triceps.json; own section of the technical documentation; | Front body map; muscle click event and the selected-muscle highlight; shoulders.json; documentation of the front map; | Back body map and front/back switching; map styling and phone testing; biceps.json; documentation of the back view; |

2. Summary of the finished sprint.

| Question | Answer |
|---|---|
| Finished tasks | The exercise data format, used by the whole team: chest.json is the reference file (PR #1). The exercise list, the detail panel and the two empty messages, one when a muscle group has no data file and one when the filters remove every exercise (PR #1). chest.json and back.json with five exercises each, every record checked field by field (PR #1, PR #4). The format extended from 11 to 14 fields with place, imageEnd and imageEndCaption, so the home and gym filter (FR-06) can work (PR #4). Two photos per exercise, 20 image files from the Free Exercise DB, which is public domain (PR #4). getLoadedExercises() and renderExerciseList(list), the two functions the filter layer builds on (PR #4). A local test page that sends the same muscleSelected event as the body map, used to test the list, the details and the filters while the map was not ready. The exercise data section of the technical documentation. |
| Unfinished tasks | None. |
| What went well? | The agreed interface worked without any change: the filter layer calls renderExerciseList(applyFilters(getLoadedExercises(), options)), so filtering never changes the stored data. The same code also shows the data files written by other team members, because they follow the 14-field format of chest.json. Every data file was opened in a browser before the pull request, and the step sentences were compared with the photo they describe, so no broken photo and no missing field reached main. |
| What (and how) could be improved? | The data format was agreed too late: two data files had already been written with the first 11-field version, so they had to be updated afterwards and the place filter (FR-06) could not match them until that was done. The format should be written down before any data file is created, and every new file should be checked against it before the merge. Integration was also left to the end of the sprint. The data, the rendering and the filtering were built separately and each of them works, but connecting them to index.html was nobody's task during the sprint, so the whole flow could only be tested with a local test page. Integration should be a task of its own at the beginning of the next sprint. |
