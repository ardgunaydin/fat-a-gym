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