# Sprint 1 Summary — Arda Günaydın

**Sprint:** 16-30 October 2026
**Project:** FATaGYM

## Completed work

- Implemented exercise filtering by difficulty, equipment, and place.
- Added the filter interface and Clear Filters action.
- Connected the filters to the loaded exercise list.
- Connected the exercise detail panel to the Add to Workout action.
- Built the workout list with Remove and Clear Workout actions.
- Used LocalStorage to save and restore the workout.
- Added five exercise records to `data/legs.json` and five to `data/glutes.json`.
- Updated both files to use the shared 14-field exercise schema, including the `place` field.
- Updated `docs/technical-documentation.md`.
- Updated the team sprint backlog with my confirmed task statuses.

## Verification

- Checked that both exercise data files contain five records.
- Checked that all records contain the required 14 fields.
- Checked that all `place` values are valid.
- Tested exercise loading and filtering in the browser.
- Tested Home and Gym filtering for legs and glutes.
- Tested adding an exercise, removing it, and clearing the workout.
- Confirmed that a saved workout remains after refreshing the page.

## Integration note

During the browser check, requests for `css/anatomy.css` and `js/anatomy-view.js` returned 404 errors. This prevented verification of the anatomy map in that local run. The exercise list, filters, and workout features were tested separately. The map issue needs confirmation with the teammate responsible for anatomy-map integration.

## Sprint result

My assigned filter, workout, and legs/glutes data tasks were completed and tested. The technical documentation and individual sprint summary were prepared for sprint closeout.