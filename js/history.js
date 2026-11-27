// Workout history (FR-10, first part): finished workouts are kept in LocalStorage.
const HISTORY_STORAGE_KEY = "fat-a-gym-history";

function getWorkoutHistory() {
  const savedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);

  if (!savedHistory) {
    return [];
  }

  try {
    const history = JSON.parse(savedHistory);
    return Array.isArray(history) ? history : [];
  } catch (error) {
    console.error("Could not read the workout history:", error);
    return [];
  }
}

// Adds one finished workout to the top of the history, so the newest one comes first.
function addWorkoutToHistory(workout) {
  if (!Array.isArray(workout) || workout.length === 0) {
    return getWorkoutHistory();
  }

  const entry = {
    finishedAt: new Date().toISOString(),
    exercises: workout.map(function (exercise) {
      return exercise.name || "Unnamed exercise";
    })
  };

  const history = getWorkoutHistory();
  history.unshift(entry);
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));

  return history;
}

// Written as "27 Nov 2026, 09:16", because the stored date is an unreadable ISO line.
function formatHistoryDate(isoDate) {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) +
    ", " + date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

// The completed marks are cleared too, so the next workout does not start with old ticks.
function finishCurrentWorkout() {
  const workout = getCurrentWorkout();

  if (workout.length === 0) {
    return false;
  }

  addWorkoutToHistory(workout);
  clearCurrentWorkout();
  clearCompletedExercises();

  return true;
}

// The button lives in this file, so js/workout-builder.js is not edited.
function createFinishWorkoutButton(container) {
  const finishButton = document.createElement("button");
  finishButton.type = "button";
  finishButton.textContent = "Finish Workout";

  finishButton.addEventListener("click", function () {
    if (!finishCurrentWorkout()) {
      return;
    }

    renderWorkoutList(document.getElementById("workout-list"));
    renderWorkoutHistory(container);
  });

  return finishButton;
}

function renderWorkoutHistory(container) {
  if (!container) {
    return;
  }

  container.replaceChildren();

  const heading = document.createElement("h2");
  heading.textContent = "Workout History";
  container.append(heading, createFinishWorkoutButton(container));

  const history = getWorkoutHistory();

  if (history.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No finished workouts yet.";
    container.appendChild(emptyMessage);
    return;
  }

  const list = document.createElement("ul");

  history.forEach(function (entry) {
    const item = document.createElement("li");

    const date = document.createElement("strong");
    date.textContent = formatHistoryDate(entry.finishedAt);

    const exercises = document.createElement("span");
    exercises.textContent = " - " + entry.exercises.join(", ");

    item.append(date, exercises);
    list.appendChild(item);
  });

  container.appendChild(list);
}

// The section is created here, so the shared index.html only gets the script line.
function createHistorySection() {
  const layout = document.querySelector(".layout");

  if (!layout) {
    return null;
  }

  const section = document.createElement("section");
  section.id = "workout-history";
  section.setAttribute("aria-label", "Workout history");
  layout.appendChild(section);

  return section;
}

document.addEventListener("DOMContentLoaded", function () {
  renderWorkoutHistory(createHistorySection());
});
