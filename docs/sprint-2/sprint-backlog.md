# FATaGYM Sprint 2 Backlog

**Sprint dates:** 30 October–13 November 2026  
**Status reviewed:** 1 November 2026

## Status legend

- **Done:** Completed and verified.
- **In Progress:** Work has started but is not complete.
- **To Do:** Not started.
- **Needs confirmation:** The owner’s current status has not been confirmed.

## Sprint milestones

| Date | Milestone |
|---|---|
| 6 November | Mid-sprint check; Week 1 Must-Have work is complete and the app opens end to end |
| 9 November | Add screenshots to the user manual |
| 11 November | Feature freeze; only bug fixes and documentation afterwards |
| 13 November | Sprint review and individual Sprint 2 summaries |

## Arda

| Week | Task | Priority | Story points | Status | Notes |
|---|---|---:|---:|---|---|
| 1 | Create `docs/sprint-2/sprint-backlog.md` | Must | 2 | Done | Includes every member’s tasks, status, and story points |
| 1 | Set up Trello for Sprint 2 | Must | 2 | To Do | Add cards, MoSCoW priority, story points, and assign everyone; add the missing story point label to the shared card |
| 1 | Fix `docs/requirements.md` | Should | 1 | Done | Markdown formatting corrected and team size changed from four to five |
| 2 | Add “Filtering exercises” and “Building and saving your workout” to `docs/user-manual.md` | Must | 3 | In Progress | Text added; screenshots are to be added after 9 November |
| 2 | Add Arda’s section to `docs/technical-documentation.md` | Must | Not specified in plan | Done | Documents filters, workout builder, and LocalStorage |
| 2 | Implement FR-09 Workout Mode in `js/workout-builder.js` | Could | 5 | To Do | Only if time permits and Must-Have work is complete; completion state must persist in LocalStorage |
| End of sprint | Write `docs/sprint-2/summary-arda.docx` | Must | Not specified in plan | To Do | Use the teacher’s template |

## Ali

| Week | Task | Priority | Story points | Status | Notes |
|---|---|---:|---:|---|---|
| 1 | Build the clickable front body map in `assets/anatomy/front.svg` and `js/anatomy.js` | Must | 8 | Needs confirmation | Selecting a muscle should fill the exercise list |
| 1 | Create `data/shoulders.json` | Must | 3 | Needs confirmation | Five exercises with two photos each and valid `place` values |
| 2 | Add the map and click-event sections to the technical documentation and user manual | Must | 2 | Needs confirmation | Include the user-manual screenshot after 9 November |

## Hassan

| Week | Task | Priority | Story points | Status | Notes |
|---|---|---:|---:|---|---|
| 1 | Add the back view and front/back switching in `assets/anatomy/back.svg` and `js/anatomy-view.js` | Must | 5 | Needs confirmation | Back muscles should use the agreed `data-muscle` contract |
| 1 | Fix image paths in `data/biceps.json` | Must | 1 | Needs confirmation | All five exercises should show both photos |
| 1 | Test the front and back map on a real phone | Must | 2 | Needs confirmation | Record a screenshot and any small touch targets |
| 2 | Add the back-view and switching sections to the technical documentation and user manual | Must | 2 | Needs confirmation | Include the user-manual screenshot after 9 November |

## Tamara

| Week | Task | Priority | Story points | Status | Notes |
|---|---|---:|---:|---|---|
| 1 | Style the exercise list, detail panel, empty state, and workout rows in `css/style.css` | Must | 3 | Needs confirmation | Exercise names and metadata should be readable on separate lines |
| 1 | Add responsive map styles in `css/anatomy.css` | Must | 3 | Needs confirmation | Include selected, hover, sizing, and mobile styles |
| 1 | Correct `place` values in `data/triceps.json` | Should | 1 | Needs confirmation | At least one dumbbell exercise should be available for home |
| 2 | Complete the accessibility pass in `css/style.css` | Should | 3 | Needs confirmation | Visible focus, sufficient contrast, and image alt text |
| 2 | Add the interface and styling sections to the technical documentation and user manual | Must | 2 | Needs confirmation | Include a phone screenshot after 9 November |

## Feyza

| Week | Task | Priority | Story points | Status | Notes |
|---|---|---:|---:|---|---|
| 1 | Add persistent favorite exercises in `js/exercises.js` | Should | 3 | Needs confirmation | Use a separate storage key; do not edit `js/storage.js` |
| 1 | Check data consistency across all eight `data/*.json` files | Must | 2 | Needs confirmation | Report schema, `place`, and missing-image problems to each file’s owner |
| 2 | Add exercise search in `js/exercises.js` | Could | 3 | Needs confirmation | Clearing the search should restore the full list |
| 2 | Update the data-format technical documentation and add exercise-viewing instructions to the user manual | Must | 3 | Needs confirmation | Include screenshots after 9 November |
| If assigned | Create `data/shoulders.json` as backup | Must | 3 | Not assigned | Only if Ali’s file is still missing at the 6 November check and the team agrees |

## Shared documentation responsibilities

| Deliverable | Owner | Priority | Story points | Status | Notes |
|---|---|---:|---:|---|---|
| Add each person’s section to `docs/technical-documentation.md` | All members | Must | Not specified in plan | Needs confirmation | Each person documents their own implementation |
| Add each person’s section to `docs/user-manual.md` | All members | Must | Included in individual tasks above | Needs confirmation | Add screenshots after 9 November |
| Write `docs/sprint-2/summary-<name>.docx` | All members | Must | Not specified in plan | To Do | Use the teacher’s template by 13 November |

## Sprint rules

- Finish Must-Have work before starting Could-Have work.
- Sprint 1 leftovers come before new features.
- Make at least three separate commits per week.
- Keep Trello cards updated; each owner updates their own cards.