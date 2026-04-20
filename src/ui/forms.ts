import type { EntityType, Project, Task, TeamMember } from "../domain/types";
import { makeId, projectStore, taskStore, memberStore } from "../store/appStores";

type FormOptions = {
  selected: EntityType;
  editingId: string | null;
  onDone: () => void;
};
export function renderForm(opts: FormOptions) {
  const wrap = document.createElement("div");

  const heading = document.createElement("h2");
  heading.className = "text-lg font-medium mb-2";
  heading.textContent = opts.editingId ? "Edit" : "Create";

  const form = document.createElement("form");
  form.className = "space-y-3";

  // Helper to create labeled inputs
  function field(label: string, input: HTMLInputElement | HTMLSelectElement) {
    const div = document.createElement("div");
    const l = document.createElement("label");
    l.className = "block text-sm font-medium mb-1";
    l.textContent = label;
    input.className = "w-full border rounded px-2 py-1";
    div.append(l, input);
    return { div, input };
  }

  if (opts.selected === "project") {
    const existing = opts.editingId ? projectStore.getById(opts.editingId) : undefined;

    const name = document.createElement("input");
    name.type = "text";
    name.value = existing?.name ?? "";

    const description = document.createElement("input");
    description.type = "text";
    description.value = existing?.description ?? "";

    const dueDate = document.createElement("input");
    dueDate.type = "date";
    dueDate.value = existing?.dueDate ?? "";

    form.append(
      field("Name", name).div,
      field("Description", description).div,
      field("Due Date", dueDate).div
    );

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (opts.editingId) {
        projectStore.update(opts.editingId, {
          name: name.value.trim(),
          description: description.value.trim(),
          dueDate: dueDate.value,
        });
      } else {
        const p: Project = {
          id: makeId("project"),
          createdAt: Date.now(),
          entityType: "project",
          name: name.value.trim(),
          description: description.value.trim(),
          dueDate: dueDate.value,
        };
        projectStore.add(p);
      }

      opts.onDone();
    });
  }

  if (opts.selected === "task") {
    const existing = opts.editingId ? taskStore.getById(opts.editingId) : undefined;

    const title = document.createElement("input");
    title.type = "text";
    title.value = existing?.title ?? "";

    const status = document.createElement("select");
    status.innerHTML = `
      <option value="todo">todo</option>
      <option value="in_progress">in_progress</option>
      <option value="done">done</option>
    `;
    status.value = existing?.status ?? "todo";

    const projectId = document.createElement("input");
    projectId.type = "text";
    projectId.placeholder = "project_alpha";
    projectId.value = existing?.projectId ?? "project_alpha";

    const assigneeId = document.createElement("input");
    assigneeId.type = "text";
    assigneeId.placeholder = "member_mo";
    assigneeId.value = existing?.assigneeId ?? "";

    form.append(
      field("Title", title).div,
      field("Status", status).div,
      field("Project ID", projectId).div,
      field("Assignee ID (optional)", assigneeId).div
    );

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const normalizedAssignee = assigneeId.value.trim();
      const patch = {
        title: title.value.trim(),
        status: status.value as Task["status"],
        projectId: projectId.value.trim(),
        assigneeId: normalizedAssignee.length ? normalizedAssignee : undefined,
      };

      if (opts.editingId) {
        taskStore.update(opts.editingId, patch);
      } else {
        const t: Task = {
          id: makeId("task"),
          createdAt: Date.now(),
          entityType: "task",
          ...patch,
        };
        taskStore.add(t);
      }

      opts.onDone();
    });
  }

  if (opts.selected === "member") {
    const existing = opts.editingId ? memberStore.getById(opts.editingId) : undefined;

    const fullName = document.createElement("input");
    fullName.type = "text";
    fullName.value = existing?.fullName ?? "";

    const email = document.createElement("input");
    email.type = "email";
    email.value = existing?.email ?? "";

    const role = document.createElement("select");
    role.innerHTML = `
      <option value="pm">pm</option>
      <option value="dev">dev</option>
      <option value="designer">designer</option>
    `;
    role.value = existing?.role ?? "dev";

    form.append(field("Full Name", fullName).div, field("Email", email).div, field("Role", role).div);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (opts.editingId) {
        memberStore.update(opts.editingId, {
          fullName: fullName.value.trim(),
          email: email.value.trim(),
          role: role.value as TeamMember["role"],
        });
      } else {
        const m: TeamMember = {
          id: makeId("member"),
          createdAt: Date.now(),
          entityType: "member",
          fullName: fullName.value.trim(),
          email: email.value.trim(),
          role: role.value as TeamMember["role"],
        };
        memberStore.add(m);
      }

      opts.onDone();
    });
  }

  const controls = document.createElement("div");
  controls.className = "flex gap-2";

  const save = document.createElement("button");
  save.type = "submit";
  save.className = "px-3 py-1 border rounded bg-black text-white";
  save.textContent = "Save";

  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.className = "px-3 py-1 border rounded";
  cancel.textContent = "Cancel";
  cancel.addEventListener("click", () => opts.onDone());

  controls.append(save, cancel);
  form.appendChild(controls);

  wrap.append(heading, form);
  return wrap;
}