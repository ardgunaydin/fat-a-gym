const WORKOUT_STORAGE_KEY = "fat-a-gym-workout";

function saveWorkout(exercises) {
  localStorage.setItem(WORKOUT_STORAGE_KEY, JSON.stringify(exercises));
}

function loadWorkout() {
  const savedWorkout = localStorage.getItem(WORKOUT_STORAGE_KEY);

  if (!savedWorkout) {
    return [];
  }

  try {
    const exercises = JSON.parse(savedWorkout);
    return Array.isArray(exercises) ? exercises : [];
  } catch (error) {
    console.error("Could not read the saved workout:", error);
    return [];
  }
}

function clearWorkout() {
  localStorage.removeItem(WORKOUT_STORAGE_KEY);
}

// Workout Mode (FR-09, second part): ids of the exercises marked as completed.
const COMPLETED_STORAGE_KEY = "fat-a-gym-completed";

function saveCompletedExercises(exerciseIds) {
  localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(exerciseIds));
}

function loadCompletedExercises() {
  const savedIds = localStorage.getItem(COMPLETED_STORAGE_KEY);

  if (!savedIds) {
    return [];
  }

  try {
    const exerciseIds = JSON.parse(savedIds);
    return Array.isArray(exerciseIds) ? exerciseIds : [];
  } catch (error) {
    console.error("Could not read the completed exercises:", error);
    return [];
  }
}

function clearCompletedExercises() {
  localStorage.removeItem(COMPLETED_STORAGE_KEY);
}