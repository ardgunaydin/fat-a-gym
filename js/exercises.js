// FATaGYM - exercise data
// This file reads the exercise data files and shows the exercises on the page.

// The exercises of the muscle group that is open right now.
// The filter code needs this full list, not the list shown on the screen.
let loadedExercises = [];

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

// Shows the exercises as a clickable list with difficulty and equipment.
function renderExerciseList(exercises) {
  const listElement = document.getElementById("exercise-list");
  const detailElement = document.getElementById("exercise-detail");

  listElement.innerHTML = "";
  detailElement.innerHTML = "";

  // No exercise for this muscle yet: tell the user instead of leaving the panel blank.
  if (exercises.length === 0) {
    listElement.innerHTML =
      "<p class='empty-message'>No exercises for this muscle yet.</p>";
    return;
  }

  for (const exercise of exercises) {
    const button = document.createElement("button");
    button.className = "exercise-item";
    button.innerHTML =
      "<span class='exercise-name'>" + exercise.name + "</span>" +
      "<span class='exercise-meta'>" + exercise.difficulty + " · " +
      exercise.equipment + "</span>";
    
    button.addEventListener("click", function () {
      showExerciseDetails(exercise);
    });

    listElement.appendChild(button);
  }
}

// Shows the details of one exercise in the detail panel.
function showExerciseDetails(exercise) {
  const detailElement = document.getElementById("exercise-detail");

  let stepsHtml = "";
  for (const step of exercise.steps) {
    stepsHtml += "<li>" + step + "</li>";
  }

  detailElement.innerHTML =
    "<h3>" + exercise.name + "</h3>" +
    "<p>Equipment: " + exercise.equipment + "</p>" +
    "<p>Difficulty: " + exercise.difficulty + "</p>" +
    "<p>Sets: " + exercise.sets +
    " | Reps: " + exercise.reps +
    " | Rest: " + exercise.rest + " seconds</p>" +
    "<h4>How to do it</h4>" +
    "<ol>" + stepsHtml + "</ol>";
}

// Gives the full exercise list of the muscle group that is open right now.
function getLoadedExercises() {
  return loadedExercises;
}

// The body map sends this event when the user clicks a muscle.
document.addEventListener("muscleSelected", async function (event) {
  loadedExercises = await loadExercises(event.detail.muscle);
  renderExerciseList(loadedExercises);

  // Tells the filter panel that a new muscle group is open.
  document.dispatchEvent(new CustomEvent("exercisesLoaded"));
});
