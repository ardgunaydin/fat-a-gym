# FATaGYM Sprint 1 Backlog

**Sprint dates:** 16-30 October 2026  
**Current review date:** 30 October 2026

## Status legend

- **Done:** Completed and verified.
- **In Progress:** Work has started but is not complete.
- **To Do:** Not started yet.
- **Needs confirmation:** The current status has not been confirmed with the owner.

## Sprint milestones

| Date | Milestone |
|---|---|
| 23 October | Mid-sprint review; unfinished Week 1 work moves to the top of Week 2 |
| 25 October | Exercise data for all eight muscle groups is planned to be ready |
| 28 October | Feature freeze; only bug fixes and documentation after this date |
| 30 October | Sprint review, backlog comparison, and individual sprint summaries |

## Arda

| Task | Status | Notes |
|---|---|---|
| Implement `applyFilters(exercises, { level, equipment, place })` in `js/filters.js` | Done | Logic and browser filtering tested |
| Build the filter interface in `#filter-panel`, including a clear button | Done | Difficulty, equipment, and place filters tested |
| Add the “Add to Workout” action and workout list | Done | Adding an exercise and rendering the workout list tested |
| Save and load workouts with LocalStorage | Done | Persistence after refreshing the page tested |
| Remove one exercise and delete the whole workout | Done | Remove and Clear Workout actions tested |
| Fill `data/legs.json` and `data/glutes.json` with five exercises each | Done | Both files passed JSON, 14-field schema, and place-value checks |
| Write and update `docs/technical-documentation.md` | Done | Updated to describe the implemented filters, workout UI, and data schema |
| Write and update this team sprint backlog | Done | Arda’s confirmed task statuses updated at sprint review |
| Write `docs/sprint-1/summary-arda.docx` | Done | Individual sprint summary for 16-30 October |

## Tamara

| Task | Status | Notes |
|---|---|---|
| Build the page skeleton in `index.html` | Needs confirmation | Confirm final status with Tamara |
| Complete responsive layout and shared styles | Needs confirmation | Confirm final status with Tamara |
| Build the homepage section | Needs confirmation | Confirm final status with Tamara |
| Fill `data/triceps.json` and `data/abs.json` | Needs confirmation | Confirm final status with Tamara |
| Write the assigned technical documentation section | Needs confirmation | Confirm final status with Tamara |

## Feyza

| Task | Status | Notes |
|---|---|---|
| Complete exercise list, detail panel, and empty state with real data | Done | Merged in PR #1 |
| Ensure `renderExerciseList` works with a filtered list | Done | `getLoadedExercises()` and `renderExerciseList(list)`, PR #4 |
| Fill `data/back.json` if it is not complete | Done | Five exercises |
| Write the exercise data format section of the documentation | Done | 14-field schema documented |

## Ali

| Task | Status | Notes |
|---|---|---|
| Fix front map issues found during integration | Needs confirmation | Confirm final status with Ali |
| Fill `data/shoulders.json` | Needs confirmation | Five exercises |
| Write documentation for the front map and click event | Needs confirmation | Confirm final status with Ali |
| Prepare the muscle heatmap idea with Hassan if Must tasks are complete | Needs confirmation | Could item; only after Must work |

## Hassan

| Task | Status | Notes |
|---|---|---|
| Finish the back view and front/back switching | Needs confirmation | Confirm final status with Hassan |
| Polish the map and test it on a phone | Needs confirmation | Confirm real-device testing |
| Add the hover tooltip if time allows | Needs confirmation | Could item |
| Fill `data/biceps.json` | Needs confirmation | Five exercises |
| Write documentation for the back view and map styling | Needs confirmation | Confirm final status with Hassan |

## Exercise data checklist

| Muscle group | File | Status |
|---|---|---|
| Chest | `data/chest.json` | Done |
| Back | `data/back.json` | Done |
| Shoulders | `data/shoulders.json` | Needs confirmation |
| Biceps | `data/biceps.json` | Needs confirmation |
| Triceps | `data/triceps.json` | Needs confirmation |
| Abs | `data/abs.json` | Needs confirmation |
| Legs | `data/legs.json` | Done |
| Glutes | `data/glutes.json` | Done |

## Team process

- Each person should make at least three separate commits during the week.
- Each muscle group data file should have its own commit.
- Each person should update their own Trello cards.
- Finished work should be moved to Done; unfinished work should return to Backlog.
- On 30 October, compare this backlog with the actual project status and update it.