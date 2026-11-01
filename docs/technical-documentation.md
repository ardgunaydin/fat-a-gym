# FATaGYM Technical Documentation

## 1. Project Overview

FATaGYM is a web application for browsing exercises by muscle group, filtering exercises, viewing exercise details, and building a personal workout.

The project uses HTML, CSS, JavaScript, JSON exercise data, and browser LocalStorage.

## 2. Project Structure

- `data/` stores exercise data as JSON files.
- `js/` contains the application logic.
- `css/` contains page styles.
- `assets/anatomy/` stores anatomy-related assets.
- `assets/exercises/` stores exercise photos.
- `docs/` contains project documentation.

## 3. Exercise Data

Exercise data is stored in a JSON file for each muscle group. Each file contains an array of exercise records.

Each exercise record uses the same 14 fields:

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique exercise identifier |
| `name` | string | Exercise name shown in the list and detail panel |
| `image` | string | Starting-position photo path, or an empty string |
| `imageCaption` | string | Description of the starting-position photo, or an empty string |
| `imageEnd` | string | Main-step photo path, or an empty string |
| `imageEndCaption` | string | Description of the main-step photo, or an empty string |
| `muscle` | string | Target muscle group |
| `equipment` | string | Required equipment |
| `place` | string | `"home"` or `"gym"`, used by the place filter |
| `difficulty` | string | `"beginner"`, `"intermediate"`, or `"advanced"` |
| `sets` | number | Recommended number of sets |
| `reps` | string | Repetition range, for example `"8-10"` |
| `rest` | number | Rest time between sets, in seconds |
| `steps` | array of strings | Ordered instructions for performing the exercise |

### Images

The `image` and `imageEnd` fields hold the paths to the exercise photos. Their caption fields describe the corresponding photos. If a photo is unavailable, its path and caption remain empty strings; the fields are still included in the record.

The exercise detail panel displays whichever photos are available for an exercise.

### Place values

The `place` field describes where the exercise can be performed:

- `home`: an exercise that can be done at home with bodyweight or portable equipment.
- `gym`: an exercise that requires gym equipment.

### Example record

```json
{
  "id": "bench-press",
  "name": "Barbell Bench Press",
  "image": "assets/exercises/bench-press.jpg",
  "imageCaption": "Starting position",
  "imageEnd": "assets/exercises/bench-press-end.jpg",
  "imageEndCaption": "Lowering the bar to the chest",
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

### Data files

All muscle-group data files use the same 14-field record format, so one piece of code reads all of them. `data/chest.json` is the reference file: a new muscle file is created by copying its structure and replacing the records.

| File | Muscle | Records |
|---|---|---|
| `data/abs.json` | abs | 5 |
| `data/back.json` | back | 5 |
| `data/biceps.json` | biceps | 5 |
| `data/chest.json` | chest | 5 |
| `data/glutes.json` | glutes | 5 |
| `data/legs.json` | legs | 5 |
| `data/triceps.json` | triceps | 5 |

The photo fields are optional values inside a required structure: every record carries all four photo fields, and a field holds an empty string when that photo is not used. The detail panel then shows only the photos that are present, so a record with two, one or no photos is displayed correctly.

The exercise list also handles a muscle that has no data file: instead of an error, it shows the message `No exercises for this muscle yet.` This keeps the body map usable while new data files are being added.

### Fields used by the interface

| Field | Where it is used |
|---|---|
| `id` | Favorite exercises and the saved workout |
| `name` | Exercise list and detail panel heading |
| `muscle` | Keeps the record with its muscle group |
| `equipment` | List line under the name, and the equipment filter |
| `place` | Place filter (`home` or `gym`) |
| `difficulty` | List line under the name, and the difficulty filter |
| `image`, `imageCaption`, `imageEnd`, `imageEndCaption` | Detail panel photos; empty fields are skipped |
| `sets`, `reps`, `rest`, `steps` | Detail panel |

Every record has to keep a non-empty `name`, because the list and the detail panel identify the exercise by its name.
