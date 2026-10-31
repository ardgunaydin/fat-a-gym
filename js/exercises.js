// FATaGYM - exercise data
// This file reads the exercise data files and shows the exercises on the page.

// The exercises of the muscle group that is open right now.
// The filter code needs this full list, not the list shown on the screen.
let loadedExercises = [];

// The list that is on the screen right now (all exercises or a filtered list).
// It is needed to draw the list again after a favorite is added or removed.
let shownExercises = [];

// The favorite exercises are kept in the browser under our own key,
// so the saved workout of the workout builder is not touched.
const FAVORITES_KEY = "fatagym-favorites";

// Reads the ids of the favorite exercises from the browser.
function getFavorites() {
  const saved = localStorage.getItem(FAVORITES_KEY);

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch (error) {
    return [];
  }
}

// Tells whether one exercise is marked as favorite.
function isFavorite(exerciseId) {
  return getFavorites().includes(exerciseId);
}

// Adds the exercise to the favorites, or removes it if it is already there.
function toggleFavorite(exerciseId) {
  const favorites = getFavorites();
  const position = favorites.indexOf(exerciseId);

  if (position === -1) {
    favorites.push(exerciseId);
  } else {
    favorites.splice(position, 1);
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

// Loads the exercises of one muscle group, for example "chest".
// Returns an empty list if the data file cannot be read.
async function loadExercises(muscle) {
  const response = await fetch("data/" + muscle + ".json");

  if (!response.ok) {
    return [];
  }

  try {
    const exercises = await response.json();
    return exercises;
  } catch (error) {
    return [];
  }
}

// Shows the exercise list.
function renderExerciseList(exercises) {
  const listElement = document.getElementById("exercise-list");
  const detailElement = document.getElementById("exercise-detail");

  shownExercises = exercises;

  listElement.innerHTML = "";
  detailElement.innerHTML = "";

  // Explain whether the muscle has no data or the filters found no matches.
  if (exercises.length === 0) {
    let message = "No exercises for this muscle yet.";

    if (loadedExercises.length > 0) {
      message = "No exercises match these filters.";
    }

    listElement.innerHTML = "<p class='empty-message'>" + message + "</p>";
    return;
  }

  for (const exercise of exercises) {
    const button = document.createElement("button");
    button.className = "exercise-item";
    const star = isFavorite(exercise.id) ? "★" : "";

    button.innerHTML =
      "<span class='exercise-name'>" + exercise.name + "</span>" +
      "<span class='exercise-meta'>" + exercise.difficulty + " · " +
      exercise.equipment + "</span>" +
      "<span class='exercise-favorite'>" + star + "</span>";

    button.addEventListener("click", function () {
      showExerciseDetails(exercise);
    });

    listElement.appendChild(button);
  }
}

// Shows the details of one exercise.
function showExerciseDetails(exercise) {
  const detailElement = document.getElementById("exercise-detail");

  let stepsHtml = "";
  for (const step of exercise.steps) {
    stepsHtml += "<li>" + step + "</li>";
  }

  // Some exercises have two pictures: the start position and the main step.
  const pictures = [];

  if (exercise.image) {
    pictures.push({
      src: exercise.image,
      caption: exercise.imageCaption
    });
  }

  if (exercise.imageEnd) {
    pictures.push({
      src: exercise.imageEnd,
      caption: exercise.imageEndCaption
    });
  }

  let imageHtml = "";

  for (const picture of pictures) {
    imageHtml +=
      "<img class='exercise-image' src='" + picture.src +
      "' alt='" + exercise.name +
      "' width='850' height='567' loading='lazy' style='max-width: 100%; height: auto;'>";

    if (picture.caption) {
      imageHtml += "<p class='exercise-caption'>" + picture.caption + "</p>";
    }
  }

  let placeHtml = "";

  if (exercise.place) {
    placeHtml = "<p>Place: " + exercise.place + "</p>";
  }

  detailElement.innerHTML =
    "<h3>" + exercise.name + "</h3>" +
    imageHtml +
    "<p>Equipment: " + exercise.equipment + "</p>" +
    placeHtml +
    "<p>Difficulty: " + exercise.difficulty + "</p>" +
    "<p>Sets: " + exercise.sets +
    " | Reps: " + exercise.reps +
    " | Rest: " + exercise.rest + " seconds</p>" +
    "<h4>How to do it</h4>" +
    "<ol>" + stepsHtml + "</ol>";

  // The star button adds the exercise to the favorites or removes it from them.
  const favoriteButton = document.createElement("button");
  favoriteButton.className = "favorite-button";
  favoriteButton.textContent = isFavorite(exercise.id)
    ? "★ Remove from favorites"
    : "☆ Add to favorites";

  favoriteButton.addEventListener("click", function () {
    toggleFavorite(exercise.id);

    // Draw the list again so that the star appears or disappears,
    // then open the same exercise again.
    renderExerciseList(shownExercises);
    showExerciseDetails(exercise);
  });

  detailElement.appendChild(favoriteButton);

  const workoutContainer = document.getElementById("workout-list");
  const addButton = createAddToWorkoutButton(exercise, workoutContainer);

  if (addButton) {
    detailElement.appendChild(addButton);
  }
}

// Gives the full exercise list of the currently selected muscle group.
function getLoadedExercises() {
  return loadedExercises;
}

// Loads exercises when the body map selects a muscle.
document.addEventListener("muscleSelected", async function (event) {
  loadedExercises = await loadExercises(event.detail.muscle);
  renderExerciseList(loadedExercises);

  // Tells the filter panel that a new muscle group is open.
  document.dispatchEvent(new CustomEvent("exercisesLoaded"));
});
