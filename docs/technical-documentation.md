# FATaGYM Technical Documentation

## 1. Project Overview

FATaGYM is a web application for browsing exercises by muscle group, filtering exercises, and creating a custom workout.

The project uses HTML, CSS, JavaScript, and JSON exercise data.

## 2. Project Structure

- `data/` stores exercise data as JSON files.
- `js/` contains application logic.
- `css/` contains page styles.
- `assets/anatomy/` stores anatomy-related assets.
- `docs/` contains project documentation.

## 3. Exercise Data

Exercise data is stored in JSON files such as `chest.json`, `back.json`, `legs.json`, and `glutes.json`.

Each exercise record uses these fields:

- `id`: unique exercise identifier
- `name`: exercise name
- `image`: image path or an empty string
- `imageCaption`: image description or an empty string
- `muscle`: target muscle group
- `equipment`: required equipment
- `difficulty`: difficulty level
- `sets`: number of sets
- `reps`: repetition range
- `rest`: rest time in seconds
- `steps`: instructions for performing the exercise

## 4. Exercise Filters

The filtering logic is implemented in `js/filters.js`.

`applyFilters(exercises, options)` filters an exercise list using the selected difficulty, equipment, and place options. A filter set to `"all"` does not restrict the results.

The place filter requires exercise records to include a matching place value.

## 5. Workout Storage

The storage logic is implemented in `js/storage.js`.

Workout data is serialized as JSON and saved in the browser's `localStorage`. The storage functions are:

- `saveWorkout(exercises)`: saves the workout exercise list
- `loadWorkout()`: loads the saved list, returning an empty list when no valid saved data exists
- `clearWorkout()`: removes the saved workout

## 6. Workout Builder Logic

The core workout builder logic is implemented in `js/workout-builder.js`.

- `addExerciseToWorkout(exercise)` adds an exercise and prevents duplicate IDs.
- `removeExerciseFromWorkout(exerciseId)` removes an exercise by its ID.
- `getCurrentWorkout()` returns the saved workout.
- `clearCurrentWorkout()` clears the saved workout.

## 7. Verification

The workout builder functions were checked in Node.js with an in-memory `localStorage` substitute. Adding an exercise, preventing duplicates, removing an exercise, and clearing the workout all passed.

The browser interface still needs to load and connect these functions to its page elements.
