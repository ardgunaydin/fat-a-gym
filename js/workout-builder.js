function addExerciseToWorkout(exercise) {
  const currentWorkout = loadWorkout();

  const alreadyAdded = currentWorkout.some(
    (item) => item.id === exercise.id
  );

  if (alreadyAdded) {
    return currentWorkout;
  }

  const updatedWorkout = [...currentWorkout, exercise];
  saveWorkout(updatedWorkout);

  return updatedWorkout;
}

function removeExerciseFromWorkout(exerciseId) {
  const currentWorkout = loadWorkout();

  const updatedWorkout = currentWorkout.filter(
    (item) => item.id !== exerciseId
  );

  saveWorkout(updatedWorkout);

  return updatedWorkout;
}

function getCurrentWorkout() {
  return loadWorkout();
}

function clearCurrentWorkout() {
  clearWorkout();
  return [];
}