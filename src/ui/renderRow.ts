import type { Entity } from "../domain/types";

export function renderRow(entity: Entity, onDelete: (id: string) => void, onEdit: (id: string) => void) {
  const row = document.createElement("div");
  row.className = "p-2 border rounded flex items-start justify-between gap-3";

  const left = document.createElement("div");
  left.className = "min-w-0";

  const heading = document.createElement("div");
  heading.className = "font-medium truncate";

  const meta = document.createElement("div");
  meta.className = "text-sm text-gray-600";


  // Narrow the union safely
  switch (entity.entityType) {
    case "project":
      heading.textContent = entity.name;
      meta.textContent = `Due: ${entity.dueDate}`;
      break;
    case "task":
      heading.textContent = entity.title;
      meta.textContent = `Status: ${entity.status} • Project: ${entity.projectId}`;
      break;
    case "member":
      heading.textContent = entity.fullName;
      meta.textContent = `Role: ${entity.role} • ${entity.email}`;
      break;
  }

  left.append(heading, meta);

  const actions = document.createElement("div");
  actions.className = "flex gap-2 flex-shrink-0";

  const editBtn = document.createElement("button");
  editBtn.className = "px-2 py-1 border rounded";
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => onEdit(entity.id));

  const delBtn = document.createElement("button");
  delBtn.className = "px-2 py-1 border rounded bg-red-600 text-white";
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => onDelete(entity.id));

  actions.append(editBtn, delBtn);

  row.append(left, actions);
  return row;
}