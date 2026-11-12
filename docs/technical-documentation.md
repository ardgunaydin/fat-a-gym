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

## 3. Exercise Data — Feyza

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

### Exercise search

The exercise list has its own search box. `initializeExerciseSearch()` creates the box and places it
inside the `#exercise-list` section as its first child, so the shared `index.html` file is not changed
by this feature.

| Function | Role |
|---|---|
| `initializeExerciseSearch()` | Builds the search box and listens for typing |
| `matchesSearchTerm(exercise)` | Returns `true` when the exercise name contains the searched text |
| `clearExerciseSearch()` | Empties the box and the searched text |

The search compares lower-case text, so `BENCH` and `bench` give the same result. An empty box lets
every exercise pass. `renderExerciseList()` keeps the full list it was given and draws only the records
that pass `matchesSearchTerm()`, which means the search never deletes data: clearing the box brings the
whole list back.

The two empty messages stay separate. `No exercises for this muscle yet.` is shown when the muscle group
has no data, and `No exercises match these filters.` is shown when records exist but the search or the
filters leave nothing on screen.

A new muscle group starts with an empty box: the `muscleSelected` handler calls `clearExerciseSearch()`
before drawing the new list, in the same way as the filter panel starts again.

### Favorite exercises

Favorites are stored in the browser with `localStorage`, under the key `fatagym-favorites`. The stored
value is a JSON array of exercise `id` values, which is why every record needs a unique `id`.

| Function | Role |
|---|---|
| `getFavorites()` | Reads the saved array, and returns an empty array when nothing is saved |
| `isFavorite(exerciseId)` | Tells whether one exercise is in the array |
| `toggleFavorite(exerciseId)` | Adds the id when it is missing, removes it when it is there, then saves |

The detail panel shows a button that reads `☆ Add to favorites` or `★ Remove from favorites`, depending
on the current state. After a click the list is drawn again, so the star in the list line appears or
disappears immediately, and the same exercise is opened again so the user does not lose the panel.

Only the `id` is saved, not the whole record. The exercise data stays in the JSON files, so a corrected
name or a new photo is picked up automatically, and no exercise is duplicated in the browser storage.
Favorites survive a page reload because `localStorage` belongs to the browser, and the project has no
backend.


## 4. HTML Structure — `index.html`

The `index.html` file defines the main structure of the FATaGYM application.

### Document Setup

The document includes:
- HTML5 declaration, English language setting, and UTF-8 encoding.
- A viewport meta tag for responsive behaviour.
- The FATaGYM page title.
- Links to `fonts.css`, `style.css`, `anatomy.css`, and `responsive.css`.

### Page Structure

The page consists of a header, a hero section, and the main application layout.

- **Header:** displays the FATaGYM title.
- **Hero section:** introduces the application and provides a Start Training button linking to the anatomy map.
- **Main layout:** contains five sections:

| Section | Purpose |
|---|---|
| `#anatomy-view` | Displays the interactive anatomy map. |
| `#filter-panel` | Contains exercise filters. |
| `#exercise-list` | Displays available exercises. |
| `#exercise-detail` | Shows selected exercise details. |
| `#workout-list` | Displays the user's workout. |

The sections use `aria-label` attributes to provide accessible descriptions for assistive technologies.

### JavaScript Integration

JavaScript modules are loaded with the `defer` attribute. This allows the browser to parse the HTML before executing the scripts.

The scripts are included in the following order:

- `js/storage.js`
- `js/exercises.js`
- `js/filters.js`
- `js/anatomy.js`
- `js/anatomy-view.js`
- `js/workout-builder.js`
- `js/main.js`

This separation keeps the HTML structure, visual styling, and application logic in separate files.

##   5. CSS Styling

The application's styles are divided into separate files for global styling, anatomy map presentation, and responsive layout.

### 5.1 Main Styles — `css/style.css`

The main stylesheet defines the application's visual design system and interface components.

#### CSS Custom Properties

The `:root` selector defines CSS custom properties that are reused throughout the stylesheet. This makes it easier to maintain consistent colours, typography, spacing, and transitions.

**Colour palette**

| **Variable** | **Value** | **Purpose** |
|---|---|---|
| `--bg` | `#0f1318` | Main page background. |
| `--surface` | `#171d25` | Background of content panels. |
| `--surface-2` | `#212934` | Background of interactive and raised elements. |
| `--line` | `#2e3846` | Borders and separators. |
| `--text` | `#eef0f3` | Main text colour. |
| `--muted` | `#9aa6b5` | Secondary text colour. |
| `--accent` | `#39ff14` | Neon green accent for highlights and buttons. |
| `--accent-ink` | `#08140a` | Text colour on accent backgrounds. |

**Typography and spacing**

Additional custom properties define:
- Display and body font families.
- A consistent typography scale.
- Spacing values used throughout the interface.
- Border radius and transition timing.

#### Global Layout and Components

- Applies `box-sizing: border-box` globally and defines the page's default typography and colours.
- Styles the header, hero section, and shared card-like layout sections.
- Defines primary and secondary buttons, including hover, active, and keyboard focus states.
- Styles filter controls and the exercise search field.

#### Exercise List and Details

- Uses CSS Grid to arrange exercise names, metadata, and favourite controls.
- Styles exercise items, search input, and empty-state messages.
- Defines the appearance of exercise details, including images, captions, instructions, and action buttons.
- Uses `object-fit: cover` to maintain consistent image presentation.

#### Favourite and Workout Controls

- Styles favourite buttons with a secondary outlined appearance.
- Uses Flexbox to align workout items and their controls.
- Defines remove-button hover states and empty workout messages.

#### Interaction and Accessibility

Hover effects are applied inside `@media (hover: hover)` to avoid relying on hover interactions on touch-only devices. The `prefers-reduced-motion: reduce` media query disables transitions and animations for users who prefer reduced motion.

### 5.2 Anatomy Map — `css/anatomy.css`

The anatomy stylesheet controls the SVG map layout and muscle interaction states.

**Layout and sizing**

- Uses Flexbox to centre the map inside `#anatomy-view`.
- Makes the SVG responsive with `width: 100%` and `height: auto`.
- Limits its maximum width to `480px` on larger screens and `300px` below `768px`.

**Interactive muscle regions**

The `.muscle` class keeps muscle regions transparent by default, enables pointer interaction, displays a pointer cursor, and adds smooth transitions for fill changes.

**Interaction states**

- On devices supporting hover, a muscle region is highlighted in the accent colour with `0.3` opacity.
- The `.muscle.selected` class applies a stronger highlight with `0.5` opacity to indicate the selected muscle.

### 5.3 Responsive Layout — `css/responsive.css`

The responsive stylesheet adapts the application layout to different screen sizes.

**Mobile layout**

By default, `.layout` uses a single-column CSS Grid with consistent spacing and padding. Its maximum width is `1200px`. The `min-width: 0` rule prevents section content from causing horizontal overflow.

**Tablet and desktop layout**

At viewport widths of `768px` and above, the layout switches to two columns:

- The anatomy map occupies the left column.
- The filter panel, exercise list, exercise details, and workout list are stacked in the right column.

The anatomy map uses `position: sticky` to remain visible while scrolling. Header and hero padding are also adjusted for wider screens.

## Arda — Exercise Filters and Workout Builder

### Exercise filters

The filter logic is implemented in `js/filters.js`. The `applyFilters(exercises, options)` function filters exercises by difficulty, equipment, and place. It normalizes values so that comparisons are case-insensitive. If the input is not an array, it returns an empty list.

The filter panel is created by `initializeFilterPanel()`. It provides Difficulty, Equipment, and Place selectors, plus a Clear filters button. Equipment options are populated from the currently loaded exercises. When a filter changes, the panel passes the filtered list to `renderExerciseList()`. The Clear filters button resets all selectors and displays the full list again.

### Workout builder

`js/workout-builder.js` provides the workout list and its controls. `createAddToWorkoutButton()` connects the exercise detail panel to the workout list. An exercise is added only if its `id` is not already present. Each workout row has a Remove button, and Clear Workout removes all saved exercises.

### LocalStorage

`js/storage.js` saves the workout as JSON in LocalStorage under the key `fat-a-gym-workout`. `loadWorkout()` returns the saved exercise array or an empty array when there is no valid saved workout. `clearWorkout()` removes the saved item. The workout list is rendered when the page loads, so saved exercises remain visible after a refresh.
