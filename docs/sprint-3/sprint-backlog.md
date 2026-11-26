# FATaGYM Sprint 3 Backlog

**Sprint dates:** 13–27 November 2026  
**Status reviewed:** 26 November 2026; every row was checked against `main` and the updated Sprint 3 plan of 26 November

## Status legend

- **Done:** Completed and verified.
- **In Progress:** Work has started but is not complete.
- **To Do:** Not started.
- **Needs confirmation:** The owner’s current status has not been confirmed.
- **Deferred:** Not done in this sprint and moved to a later sprint.

## Sprint checkpoints

| Date | Checkpoint |
|---|---|
| 20 November | Mid-sprint check; every open Sprint 2 item is closed and the application opens end to end |
| 27 November | Sprint review; Week 2 work is on `main` and every member has written their own sprint summary |

**Priority rule:** No Could-Have work starts while a Must-Have item is still open. Sprint 2 leftovers come before new features.

## Ali

| Week | Task | Priority | Story points | Status | Notes |
|---|---|---:|---:|---|---|
| Sprint 2 leftover | Close the open Sprint 2 items (see Week 1 tasks and Week 2 documentation) | Must | Included below | In Progress | Shoulders data and documentation are done; the `index.html` repair is not complete (see below) |
| 1 | Create `data/shoulders.json` | Must | 3 | Done | Five exercises with photos and valid `place` values (commit b5fa940) |
| 1 | Repair the page structure in `index.html` | Must | 1 | In Progress | `</header>` is in place, but line 34 still reads `</headerhttps://github.com/ardgunaydin/fat-a-gym.git` and the empty `fat-a-gym` entry is still in the repository root; carried over to Sprint 4 if not fixed by 27 November |
| 2 | Add the front map and click-event sections to the technical documentation and user manual | Must | 2 | Done | “Front Muscle Map and Click Event” and “Opening the app and selecting a muscle” sections (commit b5fa940) |
| 2 | Muscle heatmap, front view, in `js/anatomy.js` (pulled from Sprint 4 on 26 November) | Should | 4 | To Do | Count how often each muscle was trained and write `data-intensity` 0–3 on the front regions; not on `main` yet |

## Hassan

| Week | Task | Priority | Story points | Status | Notes |
|---|---|---:|---:|---|---|
| Sprint 2 leftover | Add `docs/sprint-1/summary-hassan` and `docs/sprint-2/summary-hassan` | Must | Not specified in plan | To Do | Both files are missing from the repository |
| 1 | Real-device test of the front and back map (NFR-02) | Must | 2 | To Do | Screenshot and list of small touch targets in the repository or on the Trello card |
| 1 | Browser compatibility test in Chrome, Firefox and Edge (NFR-04) | Must | 3 | To Do | Fix own files and report the rest to the owners; differences written down |
| 2 | Add the back-view and switching sections to the technical documentation and user manual | Must | 2 | To Do | User manual section “Switching between front and back view” with a screenshot |
| 2 | Muscle heatmap colours and back view in `css/anatomy.css` and `js/anatomy-view.js` (pulled from Sprint 4 on 26 November) | Should | 4 | To Do | Four-step colour scale for `data-intensity` 0–3 and the same values on the back regions; contrast as required by NFR-07 |

## Arda

| Week | Task | Priority | Story points | Status | Notes |
|---|---|---:|---:|---|---|
| Sprint 2 leftover | None | — | — | — | FR-09 Workout Mode was deferred to this sprint on purpose after the feature freeze |
| 1 | Create `docs/sprint-3/sprint-backlog.md` and set up Trello for Sprint 3 | Must | 2 | Done | Every card has a MoSCoW and a story point label and every member is assigned to at least one card |
| 1 | FR-09 Workout Mode, first part, in `js/workout-builder.js` | Could | 4 | Done | Mark an exercise in the workout list as completed and show the completed state; the state stays in memory until the second part |
| 2 | Add the workout mode section to `docs/technical-documentation.md` | Must | 2 | Done | Covers both parts: completed state, step-by-step progress, LocalStorage key and functions |
| 2 | FR-09 Workout Mode, second part, in `js/workout-builder.js` and `js/storage.js` (pulled from Sprint 4 on 26 November) | Could | 4 | Done | Next label and “Step X of Y” progress; completed exercises saved under `fat-a-gym-completed` and still marked after a page refresh |

## Tamara

| Week | Task | Priority | Story points | Status | Notes |
|---|---|---:|---:|---|---|
| Sprint 2 leftover | None | — | — | — | — |
| 1 | Light and dark theme switching in `css/style.css` | Could | 5 | Done | The choice is kept in the browser under `fatagym-theme` (19 November) |
| 2 | Add the theme and colour-variable sections to the technical documentation and user manual | Must | 2 | To Do | User manual section on switching the theme with a screenshot; not on `main` yet |
| 2 | Styles for the new components in `css/style.css` (pulled from Sprint 4 on 26 November) | Could | 3 | To Do | Heatmap legend, rest timer control and workout history list, in both themes |

## Feyza

| Week | Task | Priority | Story points | Status | Notes |
|---|---|---:|---:|---|---|
| Sprint 2 leftover | None | — | — | — | — |
| 1 | Rest timer in `js/exercises.js` | Could | 4 | Done | Countdown, pause, reset and a message when the rest is over (19–20 November) |
| 1 | Data consistency check across all eight `data/*.json` files (NFR-06) | Must | 2 | Done | Marked as done in the 26 November plan; the result was shared with the team, not stored in the repository |
| 2 | Add the rest-timer sections to the technical documentation and user manual | Must | 2 | Done | Rest timer sections and screenshots (26 November) |
| 2 | Workout history in `js/history.js` (FR-10, pulled from Sprint 4 on 26 November) | Could | 4 | To Do | Saved workouts listed with date and muscles, newest first; not on `main` yet |

## Shared responsibilities

| Deliverable | Owner | Priority | Story points | Status | Notes |
|---|---|---:|---:|---|---|
| Write `docs/sprint-3/summary-<name>.docx` | All members | Must | Not specified in plan | In Progress | Teacher’s template, by 27 November; Arda’s summary is added with this update |
| Add each person’s section to `docs/technical-documentation.md` and `docs/user-manual.md` | All members | Must | Included in individual tasks above | In Progress | Ali, Arda and Feyza have added their Sprint 3 sections; Hassan’s and Tamara’s are still open |
| Keep own Trello cards up to date | All members | Must | Not specified in plan | Needs confirmation | Finished cards to Done, unfinished cards back to Backlog |

## Planned for Sprint 4

The muscle heatmap, the second part of Workout Mode, workout history and the styles of the new components were pulled into week 2 of this sprint on 26 November. Sprint 4 keeps:

- The progress statistics part of FR-10
- The items the teacher added from the Won’t Have list
- Every task above that is not finished by the review on 27 November

## Sprint rules

- No Could-Have work starts while a Must-Have item is still open.
- Sprint 2 leftovers come before new features.
- Make at least three separate commits per week; each data file goes in its own commit.
- Nobody edits somebody else’s files.
- Keep Trello cards updated; each owner updates their own cards.