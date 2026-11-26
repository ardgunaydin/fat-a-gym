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

// Step by step: the current step is the first exercise that is not completed yet.
// Returns -1 when every exercise in the workout is completed.
function getCurrentStepIndex(workout) {
  return workout.findIndex(function (exercise) {
    return !isExerciseCompleted(exercise.id);
  });
}

function describeWorkoutProgress(workout) {
  const completedCount = countCompletedExercises(workout);
  const currentStep = getCurrentStepIndex(workout);

  if (currentStep === -1) {
    return "Workout complete: all " + workout.length + " exercises are done";
  }

  return "Step " + (currentStep + 1) + " of " + workout.length +
    " \u00b7 " + completedCount + " completed";
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
  progress.textContent = describeWorkoutProgress(workout);
  container.appendChild(progress);

  const currentStep = getCurrentStepIndex(workout);
  const list = document.createElement("ul");

  workout.forEach(function (exercise, index) {
    const completed = isExerciseCompleted(exercise.id);
    const isCurrent = index === currentStep;

    const item = document.createElement("li");
    item.className = "workout-item";
    item.classList.toggle("workout-item--completed", completed);
    item.classList.toggle("workout-item--current", isCurrent);

    if (isCurrent) {
      item.setAttribute("aria-current", "step");
    }

    const name = document.createElement("span");
    name.className = "workout-item-name";
    name.textContent = (completed ? "\u2713 " : "") + (exercise.name || "Unnamed exercise");

    if (isCurrent) {
      const stepLabel = document.createElement("span");
      stepLabel.className = "workout-step-label";
      stepLabel.textContent = "Next";
      name.prepend(stepLabel);
    }

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
    #workout-list .workout-item--current {
      border-color: var(--accent, #39ff14);
      box-shadow: inset 4px 0 0 var(--accent, #39ff14);
    }
    #workout-list .workout-step-label {
      display: inline-block;
      margin-right: var(--space-1, 0.5rem);
      padding: 0.1rem 0.5rem;
      border-radius: 999px;
      background: var(--accent, #39ff14);
      color: var(--accent-ink, #08140a);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
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