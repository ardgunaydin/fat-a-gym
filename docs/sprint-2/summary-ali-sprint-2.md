# Summary of the finished sprint – Sprint 2

Ali Erdem Dikdere

## 1. Table of the finished sprint.

| Start date | End date | Aysel Feyza Sivrihisar | Arda Günaydın | Tamara Marusych | Ali Erdem Dikdere | Hassan Maaz |
| --- | --- | --- | --- | --- | --- | --- |
| 30.10.2026 | 13.11.2026 | Exercise favourites; data validation; exercise search; data and user documentation. | Sprint backlog and Trello; requirements; workout and filtering documentation; exercise photos. | Exercise and map styling; responsive layout; accessibility; triceps data; documentation. | Front muscle map; shoulder exercise data; homepage structure repair; front map documentation and user manual (6 SP for remaining tasks). | Back muscle map and view switching; biceps image paths; mobile testing; documentation. |

## 2. Summary of the finished sprint.

### Finished tasks

The front muscle map was already implemented and could be used to select a muscle and display the corresponding exercise list. The shoulders.json file was prepared with five shoulder exercises using the existing exercise data structure. The local application displayed the shoulder exercise list when the Shoulders region was selected. The file was subsequently included in the work pushed on the heatmap branch.

### Unfinished tasks

At the Sprint 2 review, the merge of shoulders.json into main, the correction of the closing header tag and removal of the extra fat-a-gym entry were not confirmed. The front map and click event section in technical-documentation.md and the instructions and screenshot in user-manual.md also still needed confirmation.

### What went well?

The existing muscle identifiers and exercise data format made it possible to connect the shoulder data to the front map without changing the general structure. Keeping the map and exercise data in separate files made the implementation easier to maintain.

### What (and how) could be improved?

The final changes should be checked on the main branch before the sprint review. The homepage structure should be tested after changes to index.html, and all five exercises should be checked with both images. Documentation and screenshots should be prepared during development rather than left until the end of the sprint.
