# FATaGYM Technical Documentation

## 1. Project Overview

FATaGYM is a web application for browsing exercises by muscle group, filtering exercises, and creating a custom workout.

The project uses HTML, CSS, JavaScript, and JSON exercise data.

## 2. Project Structure

- `data/` stores exercise data as JSON files.
- `js/` contains application logic.
- `css/` contains page styles.
- `assets/anatomy/` stores anatomy-related assets.
- `assets/exercises/` stores the exercise photos.
- `docs/` contains project documentation.

## 3. Exercise Data

Exercise data is stored in one JSON file per muscle group, such as `chest.json`,
`back.json`, `abs.json`, and `triceps.json`. Every file holds a flat array of
exercise records and uses the same schema, so the loader can read any muscle
group with the same code.

Each exercise record uses these 14 fields:

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique exercise identifier, also used as the image file name |
| `name` | string | Exercise name shown in the list and detail panel |
| `image` | string | Starting-position photo path, or an empty string |
| `imageCaption` | string | Description of the starting-position photo, or an empty string |
| `imageEnd` | string | Main-step photo path, or an empty string |
| `imageEndCaption` | string | Description of the main-step photo, or an empty string |
| `muscle` | string | Target muscle group, matching the `data-muscle` value on the map |
| `equipment` | string | Required equipment, used by the equipment filter |
| `place` | string | `"home"` or `"gym"`, used by the place filter (FR-06) |
| `difficulty` | string | `"beginner"`, `"intermediate"`, or `"advanced"` |
| `sets` | number | Recommended number of sets |
| `reps` | string | Repetition range, for example `"8-10"` |
| `rest` | number | Rest time between sets, in seconds |
| `steps` | array of strings | Ordered instructions for performing the exercise |

### Images

Each exercise has two photos: the starting position (`image`) and the main step
of the movement (`imageEnd`). The caption of the second photo names the step it
shows, for example `"Step 3: the bar is lowered to the chest"`. Image files live
in `assets/exercises/` and are named `<id>.jpg` and `<id>-end.jpg`.

The detail panel collects the available photos into a list and renders them in a
loop, so a record works with two, one, or zero photos. A missing photo leaves an
empty string, never a missing field.

### Place values

`place` describes where the exercise can be performed:

- `home`: bodyweight exercises and exercises that need only portable equipment
  (dumbbells, resistance bands, a bench).
- `gym`: exercises that need fixed equipment (barbell with a rack, cable
  machines, parallel bars, a pull-up bar).

### Example record

```json
{
  "id": "bench-press",
  "name": "Barbell Bench Press",
  "image": "assets/exercises/bench-press.jpg",
  "imageCaption": "Barbell bench press, starting position (Free Exercise DB)",
  "imageEnd": "assets/exercises/bench-press-end.jpg",
  "imageEndCaption": "Step 3: the bar is lowered to the chest (Free Exercise DB)",
  "muscle": "chest",
  "equipment": "barbell",
  "place": "gym",
  "difficulty": "intermediate",
  "sets": 3,
  "reps": "8-10",
  "rest": 90,
  "steps": [
    "Lie on the bench with your feet flat on the floor.",
    "Hold the bar a little wider than your shoulders."
  ]
}
```

### Current coverage

On 29 October the repository holds six data files with five exercises each.
`chest.json`, `back.json`, `abs.json`, and `triceps.json` use all 14 fields and
have two photos per exercise. `legs.json` and `glutes.json` still use the earlier
11-field version without `place`, `imageEnd`, and `imageEndCaption`, so the place
filter cannot match their records until those files are updated. `shoulders.json`
and `biceps.json` are not in the repository yet, so those two muscle groups show
the empty-data message.

### Loading the data

`js/exercises.js` loads the file of the selected muscle group and keeps the full
list in memory. `getLoadedExercises()` returns that complete list, and
`renderExerciseList(list)` renders whatever list it is given. The filter layer
calls `renderExerciseList(applyFilters(getLoadedExercises(), options))`, so
filtering never changes the stored data. The list area has two separate empty
messages: one when the muscle group has no data yet, and one when the filters
remove every exercise.

## 4. Exercise Filters

The filtering logic is implemented in `js/filters.js`.

`applyFilters(exercises, options)` filters an exercise list using the selected difficulty, equipment, and place options. A filter set to `"all"` does not restrict the results.

The place filter requires exercise records to include a matching place value.

Records written with the earlier 11-field schema have no `place` value, so the
place filter returns an empty list for them.

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
