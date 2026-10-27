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