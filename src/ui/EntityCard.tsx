import type { Entity } from "../domain/entities";

export function EntityCard(entity: Entity): HTMLDivElement {
  const card = document.createElement("div");
  card.className =
    "rounded border border-slate-300 bg-white p-4 shadow-sm flex flex-col gap-2";

  const header = document.createElement("div");
  header.className = "flex items-center justify-between";

  const title = document.createElement("h3");
  title.className = "text-lg font-semibold";
  title.textContent = entity.name;

  const badge = document.createElement("span");
  badge.className =
    "text-xs uppercase tracking-wide rounded bg-slate-100 px-2 py-1 text-slate-700";
  badge.textContent = entity.kind;

  header.append(title, badge);

  const details = document.createElement("div");
  details.className = "text-sm text-slate-700";

  // Narrow based on the discriminator
  switch (entity.kind) {
    case "project":
      details.textContent = `Status: ${entity.status} • Budget: $${entity.budgetUsd}`;
      break;

    case "task":
      details.textContent = `Due: ${entity.dueDateIso} • Completed: ${entity.completed}`;
      break;

    case "member":
      details.textContent = `Role: ${entity.role} • Availability: ${entity.availability}`;
      break;

    default: {
      const _never: never = entity;
      details.textContent = String(_never);
    }
  }

  card.append(header, details);
  return card;
}
