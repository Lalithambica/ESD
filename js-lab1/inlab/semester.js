// IN-LAB TASK (AI closed). Do this in the lab, not at home.
//
// A study plan groups planned course ids by semester:
//
//   const plan = {
//     student: "Asha",
//     semesters: { "2026-odd": [4, 10], "2027-even": [18] },
//   };
//
// Write addToSemester(plan, semester, courseId). It returns a NEW plan where
// that semester's list ends with courseId. Rules:
//   - never change the input (the tests freeze it — mutation throws)
//   - the student and every OTHER semester stay the SAME references
//   - a semester that does not exist yet is created
//   - if the id is already in that semester, return the SAME plan
//
// Stretch: moveCourse(plan, from, to, courseId) — out of one semester, into another.

export function addToSemester(plan, semester, courseId) {
  const currentSemester = plan.semesters[semester] ?? [];

  // Already present → nothing changed, return SAME plan
  if (currentSemester.includes(courseId)) {
    return plan;
  }

  return {
    ...plan,
    semesters: {
      ...plan.semesters,
      [semester]: [...currentSemester, courseId],
    },
  };
}

export function moveCourse(plan, from, to, courseId) {
  const fromCourses = plan.semesters[from];

  // Course doesn't exist in the source semester
  if (!fromCourses || !fromCourses.includes(courseId)) {
    return plan;
  }

  // Already in destination: remove from source only
  const toCourses = plan.semesters[to] ?? [];

  const updatedFrom = fromCourses.filter((id) => id !== courseId);

  // If moving within the same semester, nothing changes
  if (from === to) {
    return plan;
  }

  const updatedTo = toCourses.includes(courseId)
    ? toCourses
    : [...toCourses, courseId];

  return {
    ...plan,
    semesters: {
      ...plan.semesters,
      [from]: updatedFrom,
      [to]: updatedTo,
    },
  };
}
