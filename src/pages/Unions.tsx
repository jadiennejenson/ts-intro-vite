import type { Entity } from "../domain/entities";
import { EntityCard } from "../ui/EntityCard";

export default function Unions() {
  const entities: Entity[] = [
    { kind: "project", id: "p1", name: "Website Redesign", status: "active", budgetUsd: 12000 },
    // ... rest of your data
  ];

  return (
    <div className="p-6 grid gap-4 md:grid-cols-2">
      {entities.map((e) => (
        <EntityCard key={e.id} entity={e} />
      ))}
    </div>
  );
}