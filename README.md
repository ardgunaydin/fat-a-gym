# FATaGYM

### Interactive Human Anatomy & Personalized Workout Platform

**FATaGYM** is an interactive fitness web application designed to make workout planning more visual, accessible, and personalized.

Users explore an interactive human anatomy model, select a muscle group, discover targeted exercises, and build their own workout routines.

Developed for the **Team Project** course at the **University of Lodz**.

---

## Project Objectives

- Make workout discovery intuitive through an interactive human body model.
- Help users understand which muscles are targeted by different exercises.
- Provide structured workout information for beginners and experienced users.
- Allow users to create personalized training routines.
- Deliver a responsive and user-friendly fitness experience.

## Key Features

**Interactive muscle map.** Front and back views of the human body with clickable muscle groups: chest, back, shoulders, biceps, triceps, abs, legs and glutes. The selected muscle is highlighted and its exercises are shown.

**Exercise library.** Exercises organized by muscle group, with step-by-step instructions, recommended sets, repetitions and rest periods, required equipment and difficulty level.

**Exercise filters.** Filter by experience level, by available equipment and by home or gym training.

**Custom workout builder.** Pick exercises from different muscle groups, build a routine and save it locally.

**Planned.** A muscle heatmap that colours the muscles targeted by the exercises in a routine, a workout mode with step-by-step progress, set tracking and rest timers, plus workout history, favorite exercises and basic progress statistics.

User accounts and server-side profiles are out of scope for this term: the project has no backend and no database.

## Technology Stack

HTML5, CSS3 and JavaScript for the application itself, SVG for the interactive anatomy, JSON for the exercise data, LocalStorage for saved workouts, Git and GitHub for version control.

There is no backend and no build step.

## UI/UX Design

A modern and sporty interface: black or dark grey background with a neon green accent, clean and readable typography, consistent button, card and panel styles, and smooth transitions and hover feedback. The layout is responsive for desktop and mobile. The main screen shows the anatomical body model next to the exercise information panel.

## Getting Started

1. Clone the repository.
2. Start a local web server, for example the Live Server extension in VS Code.
3. Open `index.html` through that server.

Opening `index.html` directly from the file system does not work: the browser blocks reading the JSON data files over the `file://` protocol.

## Project Structure

    FATaGYM/
    ├── index.html
    ├── css/
    │   ├── style.css
    │   └── responsive.css
    ├── js/
    │   ├── main.js
    │   ├── anatomy.js
    │   ├── exercises.js
    │   ├── filters.js
    │   ├── workout-builder.js
    │   └── storage.js
    ├── data/
    │   └── one JSON file per muscle group
    ├── assets/
    │   └── anatomy/
    └── docs/

Exercise data is split into one file per muscle group instead of a single `exercises.json`, so that two people never edit the same file.

## Team

- **Arda Günaydın** - Scrum Master - filters, workout builder, local storage
- **Tamara Marusych** - Product Owner - interface, design and page setup
- **Aysel Feyza Sivrihisar** - Developer - exercise data model and exercise display
- **Ali Dikdere** - Developer - front muscle map and click events
- **Hassan Maaz** - Developer - back muscle view, view switching and map styling


All five members are developers; Product Owner and Scrum Master are additional responsibilities. The team communicates through a group chat and meets in person once a week.
                                                  
## Project Management

The project follows the Scrum framework in two-week sprints and is managed on Trello:

https://trello.com/b/6ad105e8fa5abf148c173bd8/fatagym-team-project

The board has three lists, Backlog, In Progress and Done. Every card carries two labels: a MoSCoW priority (Must, Should, Could, Won't) and a story point estimate. During a sprint, cards are moved to In Progress and assigned to a member, and every member has at least one task per sprint.

Documentation is kept in this repository under `docs/`: requirements documentation, technical documentation, user manual, one sprint backlog per sprint for the whole team, and one sprint summary per member per sprint.

## Team Contracts

Fixed names that connect the parts written by different members:

- **Muscle identifiers**, used in the SVG, the data file names and the code: `chest`, `back`, `shoulders`, `biceps`, `triceps`, `abs`, `legs`, `glutes`
- **Page section ids**: `#anatomy-view`, `#exercise-list`, `#exercise-detail`, `#empty-state`, `#filter-panel`
- **Muscle selection event**: the map dispatches `muscleSelected` with the muscle id in `detail.muscle`, and the exercise list listens for it
- **Exercise data**: `data/chest.json` is the reference file, every other file copies its structure, field names never change

## Git Workflow

Branch, commit, push, open a pull request, merge into `main` after review. Branch naming follows the pattern `name/area`, for example `name/exercises` or `name/anatomy`. A pull request needs approval from at least one other member. The `main` branch contains stable, reviewed code.

## Development Roadmap

1. **MVP** - homepage, responsive layout, front and back anatomy views, 8 clickable muscle groups, exercise data and dynamic exercise display with detail panels.
2. **Enhanced functionality** - exercise filters, custom workout builder, favorites, muscle heatmap, LocalStorage.
3. **Advanced features** - workout mode, rest timers, workout history, progress statistics.

The full prioritized backlog is maintained on the Trello board.

## Project Status

Sprint 1 is in progress: project setup, interactive muscle map, exercise data model and exercise display.

## Academic Information

Developed for educational purposes as part of the Computer Science Team Project course at the University of Lodz, Poland.

---

**FATaGYM - Explore Muscles. Discover Exercises. Build Your Workout.**
