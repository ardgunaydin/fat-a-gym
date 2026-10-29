function applyFilters(
  exercises,
  { level = "all", equipment = "all", place = "all" } = {}
) {
  if (!Array.isArray(exercises)) {
    return [];
  }

  const normalize = (value) => String(value ?? "").trim().toLowerCase();

  const selectedLevel = normalize(level);
  const selectedEquipment = normalize(equipment);
  const selectedPlace = normalize(place);

  return exercises.filter((exercise) => {
    const matchesLevel =
      selectedLevel === "all" ||
      normalize(exercise.difficulty) === selectedLevel;

    const matchesEquipment =
      selectedEquipment === "all" ||
      normalize(exercise.equipment) === selectedEquipment;

    const matchesPlace =
      selectedPlace === "all" ||
      normalize(exercise.place) === selectedPlace;

    return matchesLevel && matchesEquipment && matchesPlace;
  });
}

let selectedExerciseFilters = {
  level: "all",
  equipment: "all",
  place: "all"
};

function createFilterSelect(id, labelText, options) {
  const wrapper = document.createElement("div");
  const label = document.createElement("label");
  const select = document.createElement("select");

  label.htmlFor = id;
  label.textContent = labelText;

  select.id = id;

  options.forEach(function (option) {
    const element = document.createElement("option");
    element.value = option.value;
    element.textContent = option.label;
    select.appendChild(element);
  });

  wrapper.append(label, select);
  return { wrapper, select };
}

function updateEquipmentOptions(select, exercises) {
  const equipmentValues = [
    ...new Set(
      exercises
        .map(function (exercise) {
          return exercise.equipment;
        })
        .filter(Boolean)
    )
  ].sort();

  select.replaceChildren();

  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All equipment";
  select.appendChild(allOption);

  equipmentValues.forEach(function (equipment) {
    const option = document.createElement("option");
    option.value = equipment;
    option.textContent = equipment;
    select.appendChild(option);
  });
}

function initializeFilterPanel() {
  const panel = document.getElementById("filter-panel");

  if (!panel) {
    return;
  }

  const heading = document.createElement("h2");
  heading.textContent = "Filters";
  panel.appendChild(heading);

  const levelFilter = createFilterSelect("filter-level", "Difficulty", [
    { value: "all", label: "All levels" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" }
  ]);

  const equipmentFilter = createFilterSelect(
    "filter-equipment",
    "Equipment",
    [{ value: "all", label: "All equipment" }]
  );

  const placeFilter = createFilterSelect("filter-place", "Place", [
    { value: "all", label: "All places" },
    { value: "home", label: "Home" },
    { value: "gym", label: "Gym" }
  ]);

  panel.append(
    levelFilter.wrapper,
    equipmentFilter.wrapper,
    placeFilter.wrapper
  );

  const clearButton = document.createElement("button");
  clearButton.type = "button";
  clearButton.textContent = "Clear filters";
  panel.appendChild(clearButton);

  function applySelectedFilters() {
    renderExerciseList(
      applyFilters(getLoadedExercises(), selectedExerciseFilters)
    );
  }

  levelFilter.select.addEventListener("change", function () {
    selectedExerciseFilters.level = levelFilter.select.value;
    applySelectedFilters();
  });

  equipmentFilter.select.addEventListener("change", function () {
    selectedExerciseFilters.equipment = equipmentFilter.select.value;
    applySelectedFilters();
  });

  placeFilter.select.addEventListener("change", function () {
    selectedExerciseFilters.place = placeFilter.select.value;
    applySelectedFilters();
  });

  clearButton.addEventListener("click", function () {
    selectedExerciseFilters = {
      level: "all",
      equipment: "all",
      place: "all"
    };

    levelFilter.select.value = "all";
    equipmentFilter.select.value = "all";
    placeFilter.select.value = "all";

    applySelectedFilters();
  });

  document.addEventListener("exercisesLoaded", function () {
    selectedExerciseFilters = {
      level: "all",
      equipment: "all",
      place: "all"
    };

    levelFilter.select.value = "all";
    placeFilter.select.value = "all";
    updateEquipmentOptions(equipmentFilter.select, getLoadedExercises());

    renderExerciseList(getLoadedExercises());
  });
}

initializeFilterPanel();