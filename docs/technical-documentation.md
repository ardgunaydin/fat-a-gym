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

Favorites are stored  the browser with `localStorage`, under the key `fatagym-favorites`. The stored
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

### Rest timer

Every exercise record carries a `rest` value in seconds, so the rest between sets comes from the data and is not a fixed number in the code. `createRestTimer(exercise)` builds the timer inside the detail panel and returns `null` when a record has no rest value, so older records keep working.

| Function | Role |
|---|---|
| `createRestTimer(exercise)` | Builds the Start rest, Pause and Reset buttons and the remaining time |
| `runRestCountdown(display)` | Counts the remaining seconds down once per second |
| `stopRestCountdown()` | Stops the countdown and keeps the remaining time on screen |
| `resetRestCountdown(restSeconds, display)` | Puts the time back to the rest value of the exercise |
| `formatRestTime(totalSeconds)` | Writes seconds as minutes and seconds, so 90 becomes 1:30 |

Only one rest can run at a time, so the interval id `restTimerId` and the remaining time `restRemainingSeconds` are kept in two variables of the file instead of inside the buttons. `runRestCountdown()` starts with `clearInterval(restTimerId)`, so a second click on Start rest cannot create a second interval that counts down twice as fast.

Pause and Reset do two different things. Pause stops the interval and leaves the remaining time on the display, so Start rest continues from 1:12. Reset puts the full rest value of the exercise back. When the countdown reaches zero the display shows `Rest finished`, and the next click on Start rest begins a new full rest.

Opening another exercise calls `resetRestCountdown()` while the panel is built, so a timer left running on the previous exercise stops and the new rest value is shown. The feature stays inside `js/exercises.js` and the detail panel; the shared `index.html` and `js/storage.js` are not touched.


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

### Workout mode (FR-09)

Workout mode lets the user work through the saved workout one exercise at a time. It is built in `js/workout-builder.js` and keeps its state through `js/storage.js`.

Each row in My Workout has a **Mark as done** button next to Remove. A completed row shows a check mark, a struck-through name and an accent border, and its button changes to **Undo**. The button sets `aria-pressed`, so screen readers announce whether the exercise is completed.

The current step is the first exercise in the list that is not completed. Its row gets a **Next** label, an accent bar on the left and `aria-current="step"`. The line above the list shows the progress, for example `Step 2 of 4 · 1 completed`, and changes to `Workout complete: all 4 exercises are done` when every exercise is completed. Exercises can still be marked in any order; the Next label always moves to the first exercise that is still open.

| Function | File | Role |
|---|---|---|
| `isExerciseCompleted(exerciseId)` | `js/workout-builder.js` | Tells whether an exercise is marked as completed |
| `toggleExerciseCompleted(exerciseId)` | `js/workout-builder.js` | Marks or unmarks an exercise and saves the change |
| `countCompletedExercises(workout)` | `js/workout-builder.js` | Counts the completed exercises in the workout |
| `getCurrentStepIndex(workout)` | `js/workout-builder.js` | Returns the index of the first exercise that is not completed, or `-1` when all are done |
| `describeWorkoutProgress(workout)` | `js/workout-builder.js` | Writes the progress line above the list |
| `saveCompletedExercises(exerciseIds)` | `js/storage.js` | Saves the completed ids as JSON |
| `loadCompletedExercises()` | `js/storage.js` | Returns the saved ids, or an empty array when nothing valid is saved |
| `clearCompletedExercises()` | `js/storage.js` | Removes the saved ids |

The completed ids are kept in a `Set` called `completedExerciseIds`. It is filled with `loadCompletedExercises()` when `js/workout-builder.js` loads, so `js/storage.js` must stay before it in `index.html`. The ids are saved under their own key, `fat-a-gym-completed`, so the workout itself under `fat-a-gym-workout` keeps its earlier format. Every change writes the set again, and Clear Workout removes both keys. Removing an exercise also removes its completed state, so an exercise that is added again starts as not completed. Missing or invalid saved data gives an empty list, in the same way as `loadWorkout()`.

The styles for the completed row, the current step and the progress line are added by `addWorkoutModeStyles()` in `js/workout-builder.js`, so the shared `css/style.css` is not edited. They use the page colour variables `--accent`, `--accent-ink` and `--muted`, so they follow the active theme.

Known limits: there is one workout at a time, and the completed state stays until the user selects Undo, removes the exercise or clears the workout. Workout history and progress statistics (FR-10) are planned for Sprint 4.

## Front Muscle Map and Click Event

### Purpose
The front muscle map lets the user pick a muscle by clicking on a body picture. The map does not show any exercises itself. It only tells the rest of the app which muscle was clicked. The exercise list and the filters listen to that message.

### Files
| File | Role |
|---|---|
| `index.html` | Contains the empty `<section id="anatomy-view">` where the map is placed. |
| `js/anatomy.js` | Builds the map inside `#anatomy-view` and handles the click. |
| `css/anatomy.css` | Size of the map and the clickable areas. Colours are in the map styling. |
| `assets/anatomy/body.webp` | The shared body picture (960 × 837 px). Front view on the left half, back view on the right half. |

### How the map is built
`js/anatomy.js` puts one SVG into `#anatomy-view`. The SVG has two layers:

1. The body picture (`<image>`), which is only for looking at.
2. Transparent shapes (`<polygon>`) on top of the picture, one for each clickable muscle area.

The front view uses the left half of the picture (`viewBox="0 0 480 837"`). The coordinates of the shapes were measured on the picture itself, and the right side of the body mirrors the left side. The front and the back view come from the same picture, so they have the same scale.

Every muscle shape has two attributes:

```html
<polygon class="muscle" data-muscle="shoulders" points="..."/>
```

- `class="muscle"` marks the shape as clickable.
- `data-muscle` holds the name of the muscle: `chest`, `shoulders`, `biceps`, `abs` or `legs`.

The shapes have **no HTML id**. The same muscle exists in the front and in the back view, and two equal ids on one page would break the page. Left and right parts of one muscle share the same `data-muscle` value.

### Click handling
There is **one** click listener, on `#anatomy-view`, and not one listener for each shape (event delegation). When the user clicks:

1. `event.target.closest('.muscle')` finds the clicked muscle shape. A click on the empty background does nothing.
2. The class `selected` is removed from the previously selected shape and added to the clicked one. The class only marks the selection. The colour is written in the stylesheet.
3. The `muscleSelected` event is sent.

Because the listener is on the container, the back view needs no new click code. Any new shape with `class="muscle"` and a `data-muscle` value works automatically.

Simplified code:

```js
view.addEventListener('click', (event) => {
    const muscle = event.target.closest('.muscle');
    if (!muscle || !view.contains(muscle)) return;

    view.querySelectorAll('.muscle.selected')
        .forEach((el) => el.classList.remove('selected'));
    muscle.classList.add('selected');

    view.dispatchEvent(new CustomEvent('muscleSelected', {
        bubbles: true,
        detail: { muscle: muscle.dataset.muscle }
    }));
});
```

### The `muscleSelected` event
| Property | Value |
|---|---|
| Event name | `muscleSelected` |
| Sent on | `#anatomy-view`, with `bubbles: true`, so a listener on `document` or `window` also receives it |
| Data | `event.detail.muscle`, a string with the `data-muscle` value |

Example of a listener:

```js
document.addEventListener('muscleSelected', (event) => {
    console.log(event.detail.muscle); // for example "shoulders"
});
```

The exercise list uses the muscle name to load the matching data file (`data/<muscle>.json`, for example `data/shoulders.json`) and shows its exercises. If a data file does not exist or is empty, the list shows the message "No exercises for this muscle yet."

### Muscle names
| `data-muscle` | Area on the front view |
|---|---|
| `chest` | Both chest muscles |
| `shoulders` | Both shoulder muscles |
| `biceps` | Both upper arms |
| `abs` | Stomach and side of the waist |
| `legs` | Thighs and lower legs |

The names must be written exactly like this (lower case, plural where shown), because they are also used as the names of the data files.

### How to add or change a muscle area
1. Open `assets/anatomy/body.webp` and find the corners of the new area. The coordinates are the pixel positions on the 960 × 837 picture.
2. Add a `<polygon class="muscle" data-muscle="name" points="x1,y1 x2,y2 ..."/>` in `js/anatomy.js`. Do not add an id.
3. Add `data/name.json` in the exercise data format.
4. Check in the browser that a click shows the exercises.

### Known limits
- The clickable areas are hand-measured polygons and follow the muscle outlines only roughly. A drawing with a separate SVG path for each muscle would be more exact.
- Forearms, neck and hands are not clickable.
- The source and the licence of the body picture still have to be documented.