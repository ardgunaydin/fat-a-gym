# FATaGYM Sprint 1 Backlog

**Sprint dates:** 16-30 October 2026  
**Current review date:** 25 October 2026

## Status legend

- **Done:** Completed and verified on the default branch.
- **Done on branch:** Completed and verified on a feature branch, but not yet merged into `main`.
- **In Progress:** Work has started but is not complete.
- **To Do:** Not started yet.
- **Needs confirmation:** The current status has not been verified.

## Repository status

- Feyza's exercise feature is merged into `main` in PR #1.
- Tamara's page skeleton is present on `tamara/page-layout`, but is not yet in `main`.
- Arda's Week 2 changes are in PR #2, which is still open.
- The team backlog is on the `arda/sprint-backlog` branch.

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
| Implement `applyFilters(exercises, { level, equipment, place })` in `js/filters.js` | In Progress | Function is implemented; level and equipment filters were tested. Home/gym filtering is not end-to-end because the confirmed exercise data schema does not contain a `place` field. |
| Build the filter interface in `#filter-panel`, including a clear button | In Progress | The current page skeleton does not contain `#filter-panel`; confirm the integration point with Tamara. |
| Implement core workout operations in `js/workout-builder.js` | Done on branch | Add, prevent duplicates, remove, get, and clear operations passed the Node.js smoke check. |
| Add the “Add to Workout” button and visible workout list | In Progress | The core operations exist; connection to exercise selection and the page layout remains. |
| Save and load workouts with LocalStorage | Done on branch | Storage functions passed the Node.js smoke check. Browser UI integration remains. |
| Remove one exercise and delete the whole workout | Done on branch | Core functions passed the Node.js smoke check. Browser UI integration remains. |
| Fill `data/legs.json` and `data/glutes.json` with five exercises each | Done on branch | Both files passed JSON and schema checks. |
| Write `docs/technical-documentation.md` for own work | Done on branch | File is included in Arda's open PR #2. |
| Write this team sprint backlog | In Progress | Draft created; update team statuses when verified. |
| Write `docs/sprint-1/summary-arda.md` | To Do | Due at sprint end on 30 October. |

## Tamara

| Task | Status | Notes |
|---|---|---|
| Build the page skeleton in `index.html` | Done on branch | Four main sections are present on `tamara/page-layout`; branch is not yet merged into `main`. |
| Complete responsive layout and shared styles | Needs confirmation | Confirm current progress with Tamara. |
| Build the homepage section | Needs confirmation | Confirm current progress with Tamara. |
| Fill `data/triceps.json` and `data/abs.json` | Needs confirmation | Five exercises per file. |
| Write the assigned technical documentation section | Needs confirmation | Confirm completion with Tamara. |
| Provide or confirm a location for the filter panel and workout list | In Progress | The current page skeleton has no `#filter-panel` or workout-list container. |

## Feyza

| Task | Status | Notes |
|---|---|---|
| Complete the exercise list, detail panel, and empty state with real data | Done | Merged into `main` in PR #1. |
| Ensure `renderExerciseList` works with a filtered list | Done | The function renders the exercise array it receives. |
| Fill `data/chest.json` and `data/back.json` | Done | Both files were included in merged PR #1. |
| Write the exercise data format section of the documentation | Needs confirmation | Confirm completion with Feyza. |
| Confirm the exercise location field and its values for home/gym filtering | Needs confirmation | Current confirmed exercise records do not include a `place` field. |

## Ali

| Task | Status | Notes |
|---|---|---|
| Fix front map issues found during integration | Needs confirmation | Confirm current status with Ali. |
| Fill `data/shoulders.json` | Needs confirmation | Five exercises per file. |
| Write documentation for the front map and click event | Needs confirmation | Confirm completion with Ali. |
| Prepare the muscle heatmap idea with Hassan if Must tasks are complete | Needs confirmation | Could item; only after Must work. |

## Hassan

| Task | Status | Notes |
|---|---|---|
| Finish the back view and front/back switching | Needs confirmation | Confirm current status with Hassan. |
| Polish the map and test it on a phone | Needs confirmation | Confirm real-device testing. |
| Add the hover tooltip if time allows | Needs confirmation | Could item. |
| Fill `data/biceps.json` | Needs confirmation | Five exercises per file. |
| Write documentation for the back view and map styling | Needs confirmation | Confirm completion with Hassan. |

## Exercise data checklist

| Muscle group | File | Status |
|---|---|---|
| Chest | `data/chest.json` | Done |
| Back | `data/back.json` | Done |
| Shoulders | `data/shoulders.json` | Needs confirmation |
| Biceps | `data/biceps.json` | Needs confirmation |
| Triceps | `data/triceps.json` | Needs confirmation |
| Abs | `data/abs.json` | Needs confirmation |
| Legs | `data/legs.json` | Done on branch |
| Glutes | `data/glutes.json` | Done on branch |

## Dependencies and follow-up

- The home/gym filter needs an agreed `place` field and values in the exercise data.
- The filter interface needs a confirmed page location and integration point.
- The workout UI needs an agreed connection to the selected exercise and a workout-list container.
- Verify the remaining team task statuses with their owners before the 30 October sprint review.

## Team process

- Each person should make at least three separate commits during the week.
- Each muscle group data file should have its own commit.
- Each person should update their own Trello cards.
- Finished work should be moved to Done; unfinished work should return to Backlog.
- On 30 October, compare this backlog with the actual project status and update it.

## Commit note

Arda's current feature PR contains two commits. The `legs.json` and `glutes.json` files were included together in one commit, although the sprint plan asks for a separate commit per muscle group. Review this requirement before the sprint is marked complete.