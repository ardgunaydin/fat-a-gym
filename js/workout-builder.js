// Workout Mode (FR-09): ids of the exercises marked as completed.
// The ids are saved in LocalStorage, so completed exercises stay marked after a refresh.
const completedExerciseIds = new Set(loadCompletedExercises());

function saveCompletedState() {
  saveCompletedExercises([...completedExerciseIds]);
}

function isExerciseCompleted(exerciseId) {
  return completedExerciseIds.has(exerciseId);
}

function toggleExerciseCompleted(exerciseId) {
  if (completedExerciseIds.has(exerciseId)) {
    completedExerciseIds.delete(exerciseId);
    saveCompletedState();
    return false;
  }

  completedExerciseIds.add(exerciseId);
  saveCompletedState();
  return true;
}

function countCompletedExercises(workout) {
  return workout.filter(function (exercise) {
    return isExerciseCompleted(exercise.id);
  }).length;
}

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
  completedExerciseIds.delete(exerciseId);
  saveCompletedState();

  return updatedWorkout;
}

function getCurrentWorkout() {
  return loadWorkout();
}

function clearCurrentWorkout() {
  clearWorkout();
  completedExerciseIds.clear();
  clearCompletedExercises();
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

  const progress = document.createElement("p");
  progress.className = "workout-progress";
  progress.textContent =
    countCompletedExercises(workout) + " of " + workout.length + " exercises completed";
  container.appendChild(progress);

  const list = document.createElement("ul");

  workout.forEach(function (exercise) {
    const completed = isExerciseCompleted(exercise.id);

    const item = document.createElement("li");
    item.className = "workout-item";
    item.classList.toggle("workout-item--completed", completed);

    const name = document.createElement("span");
    name.className = "workout-item-name";
    name.textContent = (completed ? "\u2713 " : "") + (exercise.name || "Unnamed exercise");

    const actions = document.createElement("span");
    actions.className = "workout-item-actions";

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.className = "workout-complete-button";
    completeButton.textContent = completed ? "Undo" : "Mark as done";
    completeButton.setAttribute("aria-pressed", String(completed));

    completeButton.addEventListener("click", function () {
      toggleExerciseCompleted(exercise.id);
      renderWorkoutList(container);
    });

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", function () {
      removeExerciseFromWorkout(exercise.id);
      renderWorkoutList(container);
    });

    actions.append(completeButton, removeButton);
    item.append(name, actions);
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

// Styles for the completed state. They live here, in the workout builder's own file,
// so the shared css/style.css is not edited. Colours come from the page variables.
function addWorkoutModeStyles() {
  const style = document.createElement("style");
  style.textContent = `
    #workout-list .workout-progress {
      padding: 0 0 var(--space-1, 0.5rem);
      text-align: left;
      font-size: var(--text-sm, 0.875rem);
    }
    #workout-list .workout-item-actions {
      display: flex;
      gap: var(--space-1, 0.5rem);
      flex-shrink: 0;
    }
    #workout-list .workout-item--completed {
      border-color: var(--accent, #39ff14);
    }
    #workout-list .workout-item--completed .workout-item-name {
      color: var(--muted, #9aa6b5);
      text-decoration: line-through;
    }
    @media (hover: hover) {
      #workout-list .workout-complete-button:hover {
        color: var(--accent, #39ff14);
        border-color: var(--accent, #39ff14);
      }
    }`;
  document.head.appendChild(style);
}

addWorkoutModeStyles();

document.addEventListener("DOMContentLoaded", function () {
  renderWorkoutList(document.getElementById("workout-list"));
});