// Lab day (AI required). This file ends up as the form described in CONTRACT.md §4.

import { useState } from "react";

const emptyForm = {
  code: "",
  title: "",
  department: "",
  credits: "",
  capacity: "",
  description: "",
};

export function AddCourseForm({ onAdd }) {
  const [form, setForm] = useState({ ...emptyForm });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fieldErrors = error?.fieldErrors ?? {};

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setSubmitting(true);
    setError(null);

    try {
      await onAdd({
        code: form.code,
        title: form.title,
        department: form.department,
        credits: Number(form.credits),
        capacity: Number(form.capacity),
        description: form.description === "" ? null : form.description,
      });

      setForm({ ...emptyForm });
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setSubmitting(false);
    }
  }

  const fields = [
    { name: "code", label: "Code", type: "text" },
    { name: "title", label: "Title", type: "text" },
    { name: "department", label: "Department", type: "text" },
    { name: "credits", label: "Credits", type: "number" },
    { name: "capacity", label: "Capacity", type: "number" },
  ];

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Add a course</h2>

      {fields.map(({ name, label, type }) => (
        <div key={name}>
          <label htmlFor={name}>{label}</label>
          <input
            id={name}
            name={name}
            type={type}
            value={form[name]}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors[name])}
            aria-describedby={
              fieldErrors[name] ? `${name}-error` : undefined
            }
          />
          {fieldErrors[name] && (
            <p id={`${name}-error`}>{fieldErrors[name]}</p>
          )}
        </div>
      ))}

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          aria-invalid={Boolean(fieldErrors.description)}
          aria-describedby={
            fieldErrors.description ? "description-error" : undefined
          }
        />
        {fieldErrors.description && (
          <p id="description-error">{fieldErrors.description}</p>
        )}
      </div>

      {error && <p role="alert">{error.message}</p>}

      <button type="submit" disabled={submitting}>
        Add course
      </button>
    </form>
  );
}


