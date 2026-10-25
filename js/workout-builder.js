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

function createAddToWorkoutButton(exercise, workoutContainer) {
  if (!exercise || !workoutContainer) {
    return null;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Add to Workout";

  button.addEventListener("click", function () {
    addExerciseToWorkout(exercise);
    renderWorkoutList(workoutContainer);
  });

  return button;
}

function renderWorkoutList(container) {
  if (!container || typeof container.replaceChildren !== "function") {
    return;
  }

  container.replaceChildren();

  const heading = document.createElement("h2");
  heading.textContent = "My Workout";
  container.appendChild(heading);

  const workout = getCurrentWorkout();

  if (workout.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Your workout is empty.";
    container.appendChild(emptyMessage);
    return;
  }

  const list = document.createElement("ul");

  workout.forEach(function (exercise) {
    const item = document.createElement("li");
    const name = document.createElement("span");
    name.textContent = exercise.name || "Unnamed exercise";

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", function () {
      removeExerciseFromWorkout(exercise.id);
      renderWorkoutList(container);
    });

    item.append(name, removeButton);
    list.appendChild(item);
  });

  container.appendChild(list);

  const clearButton = document.createElement("button");
  clearButton.type = "button";
  clearButton.textContent = "Clear Workout";

  clearButton.addEventListener("click", function () {
    clearCurrentWorkout();
    renderWorkoutList(container);
  });

  container.appendChild(clearButton);
}