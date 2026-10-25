# FATaGYM Sprint 1 Backlog

**Sprint dates:** 16-30 October 2026  
**Current review date:** 25 October 2026

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
| Implement `applyFilters(exercises, { level, equipment, place })` in `js/filters.js` | Done | Logic tested with exercise data |
| Build the filter interface in `#filter-panel`, including a clear button | In Progress | Need to confirm the page container and integration point |
| Add the “Add to Workout” action and workout list | In Progress | Core workout functions are implemented; UI connection remains |
| Save and load workouts with LocalStorage | In Progress | Storage logic tested; browser interface connection remains |
| Remove one exercise and delete the whole workout | In Progress | Core functions are implemented and tested; UI connection remains |
| Fill `data/legs.json` and `data/glutes.json` with five exercises each | Done | Both files passed JSON and schema checks |
| Write `docs/technical-documentation.md` for own work | Done | File created and pushed |
| Write this team sprint backlog | In Progress | Update team statuses when confirmed |
| Write `docs/sprint-1/summary-arda.md` | To Do | Due at sprint end on 30 October |

## Tamara

| Task | Status | Notes |
|---|---|---|
| Build the page skeleton in `index.html` | Needs confirmation | Sprint plan lists the four main page sections |
| Complete responsive layout and shared styles | Needs confirmation | Confirm current branch and progress with Tamara |
| Build the homepage section | Needs confirmation | Confirm current progress with Tamara |
| Fill `data/triceps.json` and `data/abs.json` | Needs confirmation | Five exercises per file |
| Write the assigned technical documentation section | Needs confirmation | Confirm completion with Tamara |

## Feyza

| Task | Status | Notes |
|---|---|---|
| Complete exercise list, detail panel, and empty state with real data | Needs confirmation | Confirm current implementation |
| Ensure `renderExerciseList` works with a filtered list | Needs confirmation | Required for Arda’s filters to connect |
| Fill `data/back.json` if it is not complete | Needs confirmation | Five exercises |
| Write the exercise data format section of the documentation | Needs confirmation | Confirm completion with Feyza |

## Ali

| Task | Status | Notes |
|---|---|---|
| Fix front map issues found during integration | Needs confirmation | Confirm current status with Ali |
| Fill `data/shoulders.json` | Needs confirmation | Five exercises |
| Write documentation for the front map and click event | Needs confirmation | Confirm completion with Ali |
| Prepare the muscle heatmap idea with Hassan if Must tasks are complete | Needs confirmation | Could item; only after Must work |

## Hassan

| Task | Status | Notes |
|---|---|---|
| Finish the back view and front/back switching | Needs confirmation | Confirm current status with Hassan |
| Polish the map and test it on a phone | Needs confirmation | Confirm real-device testing |
| Add the hover tooltip if time allows | Needs confirmation | Could item |
| Fill `data/biceps.json` | Needs confirmation | Five exercises |
| Write documentation for the back view and map styling | Needs confirmation | Confirm completion with Hassan |

## Exercise data checklist

| Muscle group | File | Status |
|---|---|---|
| Chest | `data/chest.json` | Needs confirmation |
| Back | `data/back.json` | Needs confirmation |
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
