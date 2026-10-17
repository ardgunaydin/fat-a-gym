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
