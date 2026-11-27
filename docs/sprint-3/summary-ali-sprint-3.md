# Summary of the finished sprint – Sprint 3

Ali Erdem Dikdere

## 1. Table of the finished sprint.

| Start date | End date | Aysel Feyza Sivrihisar | Arda Günaydın | Tamara Marusych | Ali Erdem Dikdere | Hassan Maaz |
| --- | --- | --- | --- | --- | --- | --- |
| 13.11.2026 | 27.11.2026 | Rest timer; exercise data consistency check; timer documentation; workout history. | Sprint backlog and Trello; Workout Mode and progress tracking; LocalStorage persistence; technical documentation. | Light and dark themes; theme documentation; styles for new components. | Shoulder exercise data; front map documentation; homepage repair; front muscle heatmap. | Device and browser testing; back-view documentation; heatmap colours and back map. |

## 2. Summary of the finished sprint.

### Finished tasks

The shoulders.json file was added with five exercises, two photos per exercise and valid place values. The front muscle map and click event were documented in technical-documentation.md, and the instructions for opening the app and selecting a muscle were added to user-manual.md. An initial front heatmap was also implemented and pushed to the ali/heatmap branch, including intensity values from 0 to 3, exercise counts and hover or selection colours.

### Unfinished tasks

The homepage repair is still open: line 34 contains an invalid closing header tag, and the extra fat-a-gym entry remains in the repository root. The front heatmap has not been confirmed on main. The current implementation counts exercises in the saved workout list; it still needs to count completed workouts from the workout history and use the shared colour scale. These two remaining tasks account for 5 SP.

### What went well?

The existing muscle identifiers and exercise data structure allowed the front map to be connected to the shoulder exercise list. The data-intensity attribute keeps intensity information separate from the visual styling, and the existing workout storage made it possible to build an initial heatmap without changing the storage files.

### What (and how) could be improved?

The homepage structure should be checked on main and the invalid header tag and extra repository entry removed. The heatmap should be tested after several completed workouts, including a page refresh, to confirm that the intensity comes from workout history and never exceeds 3. The front and back maps should use the same colour scale, and changes should be merged and tested before the sprint review.
