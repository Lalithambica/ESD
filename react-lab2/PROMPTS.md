# Prompt log — React Lab 2

Part of what you submit. It shows *how* you used AI: did you hand it the contract and the
rules, or type "make it work"? Fill it in **as you go**, not from memory at the end.

- Name and roll number:
- AI tool and plan (e.g. ChatGPT free, Gemini, Claude free, Copilot):

**Log every prompt you send, in order — including the ones that didn't help.** Paste each
prompt in full. One exception: if you pasted CONTRACT.md's prompt 1 unchanged, write
"CONTRACT.md prompt 1, unchanged". Summarise each reply; don't paste whole files.

---

## Prompt 1 — generate

**Sent:**

```text
-Name and roll number:Chepuri Lalithambica, MT2026019
- AI tool and plan: ChatGPT
```

**What came back:** (which files; which hooks it used; anything from the "not yet" list;
anything it did that the contract didn't ask for)



useCourses.js — used useState and useEffect for fetching courses, storing state and adding courses.

CoursesView.jsx — rendered the course list and the add-course form.

CoursesPage.jsx — called useCourses() and passed its values to CoursesView.

The code used only useState and useEffect. Forbidden hooks (useMemo, useCallback, useReducer, useRef) were not used used.

The implementation had architectural problems:

1. No separate AddCourseForm.jsx.

2. Form state was incorrectly stored inside useCourses.

3. CoursesView has both the course list and form.

4. The hook returned separate loading and error fields instead of the required status interface.

5. addCourse accepted a submit event instead of a CourseRequest.

6. Field errors lacked aria-invalid and aria-describedby.

**Did it run?** (`npm run dev`: list loads? add works? 409 shown? fieldErrors shown?
`npm test`: __ passed / __ failed)

The generated code was placed into src/courses/, and I ran npm test.

Test results:

Test Files  2 failed | 7 passed (9)
Tests       18 failed | 44 passed (62)


**What I did with it:**


I retained the original AI-generated code as the first implementation and compared it with the lab contract.

I identified the architectural mismatches and decided to move the form into a separate component, simplify the hook interface, correct state ownership and improve field-error accessibility.

These findings will guide the next AI prompt during the fix stage.


---

## Prompt 2 —


**Why I sent it:** (for a fix prompt: which decision in AUDIT.md it carries out)
The first AI-generated implementation passed 44/62 tests but failed to follow the required component structure. My audit identified incorrect state ownership, a missing AddCourseForm component, the wrong hook interface and missing field-error accessibility attributes.

**Sent:**

```text
I audited the React Lab 2 Courses implementation. The initial version passed 44/62 tests (7/9 test files).

Please correct the implementation strictly according to the requirements below and CONTRACT.md §4.


Required file structure

The final solution must contain exactly these four files in src/courses/:

src/courses/useCourses.js

src/courses/CoursesView.jsx

src/courses/AddCourseForm.jsx

src/courses/CoursesPage.jsx

Use the following named exports exactly:

export function useCourses()
export function CoursesView({ courses, status, error })
export function AddCourseForm({ onAdd })
export function CoursesPage()

Do not create additional components, hooks, files, or derived state unless explicitly required below.

1. src/courses/useCourses.js

The hook must: export function useCourses()

Return exactly:  { courses, status, error, addCourse }

State contract status must be exactly one of: "loading", "ready", "error"

error must be: the error message as a string when status === "error" null otherwise. Do not use separate loading or loadError state fields.
Initial loading

When the page appears: Perform exactly one GET /api/courses. Include an ignore flag. The cleanup must set the ignore flag so stale responses do not update state

addCourse must: Accept a CourseRequest object, not a submit event. Receive the created course from the 201 response. Add it to the existing courses state. Create a new array. Keep the array sorted by code. Do not reload the entire course list. Return the created course. If apiFetch throws an ApiError, addCourse must allow that same error to propagate. Do not catch and replace it. The hook must contain no form fields, submission state, or form error state.

2. src/courses/CoursesView.jsx

export function CoursesView({ courses, status, error }). This component is render-only.

It must contain: no hooks, no state, no apiFetch, no fetch, no form logic, Rendering rules

If: status === "loading", render exactly: Loading courses…
If: status === "error", render exactly: Couldn't load courses: <error>
If: status is ready and there are no courses, render exactly: No courses yet.
Otherwise, render a <ul> containing one <li> per course.
Each item must use: <li key={course.id}>. Keep the courses in the exact order provided through the courses prop.
Each course must display exactly two lines: CS101 · Programming Fundamentals, 4 credits · Computer Science · 34 seats left

3. src/courses/AddCourseForm.jsx

export function AddCourseForm({ onAdd }). This component owns all form-related state.

Required controlled fields
Create exactly these six controlled fields: Code, Title, Department, Credits, Capacity, Description

Requirements:

Each field has one <label>. Credits is a number input, Capacity is a number input, Description is a <textarea>, Description may be empty

Also maintain: whether the form is currently submitting, the latest submission error, Submit behavior
On submit: Call preventDefault(), Disable the "Add course" button while waiting

Do not perform browser-side validation. Send what the user typed and let the server decide.

If onAdd succeeds: Clear all six form fields, Clear the submission error
If onAdd fails: Preserve all typed values, Display error.message above the submit button The submission error message must have: role="alert Field errors For 400 validation errors, error.fieldErrors may contain field-specific messages.

For every field that has an entry in fieldErrors: Display the error message directly under its corresponding input. Do not place the error message inside the <label>
The input must have: aria-invalid="true". The input must have aria-describedby pointing to the id of its error message AddCourseForm must never call apiFetch or fetch directly. It only calls onAdd.

4. src/courses/CoursesPage.jsx

export function CoursesPage()

This component must:

Call useCourses()

Render:

<h1>Courses</h1>

Render:

<CoursesView
  courses={courses}
  status={status}
  error={error}
/>

Render:

<AddCourseForm onAdd={addCourse} />

Do not add other logic or UI.

General restrictions : Use only useState and useEffect, No useMemo, No useCallback, No useReducer, No useRef, No Context, No TypeScript, No new packages or libraries, No Axios, React Query, SWR, form libraries, or UI libraries

Use only the provided apiFetch from: ../api/client.js, Never call fetch directly
Do not modify: client.js, App.jsx, main.jsx, CSS, mock API, tests

Output format

Return all four corrected files in full.Give its exact path and then provide the complete file contents. Do not omit any code
```

**What came back:**
The corrected implementation contains four files:

useCourses.js — maintains courses, status and loading error; fetches on mount; adds courses through POST.

CoursesView.jsx — renders the loading, error, empty and course-list states using props only.

AddCourseForm.jsx — owns six controlled inputs, submission state, and server validation errors.

CoursesPage.jsx — connects the hook, View and form using the required interfaces.

The fix separates form logic from course-data logic and maintains the immutable sorted insertion without re-fetching.

**What I kept, and what I rejected:**
I kept the API client, initial effect cleanup, server-side validation, code sorting and stable course IDs.

I rejected the original combined View/form, unnecessary form state in the hook, separate loading interface and event-based addCourse function.

No forbidden hooks or additional libraries were introduced.

Test Files  9 passed (9)
      Tests  62 passed (62)

---

<!-- Copy the "Prompt 2" block for each further prompt. -->

## Afterwards

- How many prompts did the whole feature take?
Two main prompts: one to generate the initial Courses implementation and one to correct the architecture according to the audit.
- Which of your prompts would you write differently now, and how?
I would specify the exact component interfaces, expected prop names and state ownership in the initial prompt. This would help avoid placing form state inside the data-fetching hook and combining the form with the course list.
- One thing the rules in prompt 1 prevented (or failed to prevent):
The rules prevented the use of unnecessary hooks such as useMemo, useCallback and useRef. However, they did not prevent incorrect component separation, which required an audit and a second prompt to fix.
