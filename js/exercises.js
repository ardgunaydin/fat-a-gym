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

// Shows the exercise names in the exercise list.
function renderExerciseList(exercises) {
  const listElement = document.getElementById("exercise-list");

  listElement.innerHTML = "";

  for (const exercise of exercises) {
    const button = document.createElement("button");
    button.className = "exercise-item";
    button.textContent = exercise.name;

    listElement.appendChild(button);
  }
}

// The body map sends this event when the user clicks a muscle.
document.addEventListener("muscleSelected", async function (event) {
  const exercises = await loadExercises(event.detail.muscle);
  renderExerciseList(exercises);
});
