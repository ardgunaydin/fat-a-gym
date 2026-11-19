# FATaGYM Sprint 3 Backlog

**Sprint dates:** 13–27 November 2026  
**Status reviewed:** 19 November 2026

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
| Sprint 2 leftover | Close the open Sprint 2 items (see Week 1 tasks and Week 2 documentation) | Must | Included below | To Do | `data/shoulders.json` is not on `main`; `index.html` closing tag and repository root need repair |
| 1 | Create `data/shoulders.json` | Must | 3 | To Do | Five exercises with the 14 fields of `data/chest.json`, two photos each and valid `place` values; commit 473cf14 changed only `index.html` and added a `fat-a-gym` entry |
| 1 | Repair the page structure in `index.html` | Must | 1 | To Do | Restore `</header>` on line 17 and remove the empty `fat-a-gym` entry from the repository root |
| 2 | Add the front map and click-event sections to the technical documentation and user manual | Must | 2 | Needs confirmation | User manual section “Opening the app and selecting a muscle” with a screenshot |

## Hassan

| Week | Task | Priority | Story points | Status | Notes |
|---|---|---:|---:|---|---|
| Sprint 2 leftover | Add `docs/sprint-1/summary-hassan` and `docs/sprint-2/summary-hassan` | Must | Not specified in plan | Needs confirmation | Both files are missing from the repository |
| 1 | Real-device test of the front and back map (NFR-02) | Must | 2 | Needs confirmation | Screenshot and list of small touch targets in the repository or on the Trello card |
| 1 | Browser compatibility test in Chrome, Firefox and Edge (NFR-04) | Must | 3 | Needs confirmation | Fix own files and report the rest to the owners; differences written down |
| 2 | Add the back-view and switching sections to the technical documentation and user manual | Must | 2 | Needs confirmation | User manual section “Switching between front and back view” with a screenshot |

## Arda

| Week | Task | Priority | Story points | Status | Notes |
|---|---|---:|---:|---|---|
| Sprint 2 leftover | None | — | — | — | FR-09 Workout Mode was deferred to this sprint on purpose after the feature freeze |
| 1 | Create `docs/sprint-3/sprint-backlog.md` and set up Trello for Sprint 3 | Must | 2 | In Progress | Every card has a MoSCoW and a story point label and every member is assigned to at least one card |
| 1 | FR-09 Workout Mode, first part, in `js/workout-builder.js` | Could | 4 | In Progress | Mark an exercise in the workout list as completed and show the completed state; the state stays in memory until the second part |
| 2 | Add the workout mode section to `docs/technical-documentation.md` | Must | 2 | To Do | Written for the part that exists |

## Tamara

| Week | Task | Priority | Story points | Status | Notes |
|---|---|---:|---:|---|---|
| Sprint 2 leftover | None | — | — | — | — |
| 1 | Light and dark theme switching in `css/style.css` | Could | 5 | Needs confirmation | The choice is kept in the browser; both themes keep the contrast required by NFR-07 |
| 2 | Add the theme and colour-variable sections to the technical documentation and user manual | Must | 2 | Needs confirmation | User manual section on switching the theme with a screenshot |

## Feyza

| Week | Task | Priority | Story points | Status | Notes |
|---|---|---:|---:|---|---|
| Sprint 2 leftover | None | — | — | — | — |
| 1 | Rest timer in `js/exercises.js` | Could | 4 | Needs confirmation | First version is on `main` (commit 1da6659); the timer counts down the rest value and can be stopped |
| 1 | Data consistency check across all eight `data/*.json` files (NFR-06) | Must | 2 | To Do | Starts after `data/shoulders.json` is on `main`; findings are shared with the team |
| 2 | Add the rest-timer sections to the technical documentation and user manual | Must | 2 | Needs confirmation | User manual section “Using the rest timer” with a screenshot |

## Shared responsibilities

| Deliverable | Owner | Priority | Story points | Status | Notes |
|---|---|---:|---:|---|---|
| Write `docs/sprint-3/summary-<name>.docx` | All members | Must | Not specified in plan | To Do | Teacher’s template, by 27 November |
| Add each person’s section to `docs/technical-documentation.md` and `docs/user-manual.md` | All members | Must | Included in individual tasks above | Needs confirmation | Each person documents their own work |
| Keep own Trello cards up to date | All members | Must | Not specified in plan | Needs confirmation | Finished cards to Done, unfinished cards back to Backlog |

## Planned for Sprint 4

- Muscle heatmap (README, Planned)
- FR-09 Workout Mode, second part: step-by-step progress and LocalStorage persistence
- FR-10 Workout history and basic progress statistics
- Styles for the new components

## Sprint rules

- No Could-Have work starts while a Must-Have item is still open.
- Sprint 2 leftovers come before new features.
- Make at least three separate commits per week; each data file goes in its own commit.
- Nobody edits somebody else’s files.
- Keep Trello cards updated; each owner updates their own cards.