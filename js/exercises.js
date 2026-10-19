// FATaGYM - exercise data
// This file reads the exercise data files and shows the exercises on the page.

// Loads the exercises of one muscle group, for example "chest".
// Returns an empty list if the data file cannot be read.
async function loadExercises(muscle) {
  const response = await fetch("data/" + muscle + ".json");

  if (!response.ok) {
    return [];
  }

  const exercises = await response.json();
  return exercises;
}

// Shows the exercise names as a clickable list.
function renderExerciseList(exercises) {
  const listElement = document.getElementById("exercise-list");
  const detailElement = document.getElementById("exercise-detail");

  listElement.innerHTML = "";
  detailElement.innerHTML = "";

  for (const exercise of exercises) {
    const button = document.createElement("button");
    button.className = "exercise-item";
    button.textContent = exercise.name;

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

// The body map sends this event when the user clicks a muscle.
document.addEventListener("muscleSelected", async function (event) {
  const exercises = await loadExercises(event.detail.muscle);
  renderExerciseList(exercises);
});
