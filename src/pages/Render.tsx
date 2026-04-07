import React, { type JSX } from "react";
import {} from "../utils/generics";
import { findById, identity } from "../utils/generics";

interface Section {
  title: string;
  id: string;
  items: string[];
}

export const Render = (): JSX.Element => {
  // TypeScript demonstration with typed data
  const sections: Section[] = [
    {
      title: "Projects",
      id: "projects",
      items: [],
    },
    {
      title: "Tasks",
      id: "tasks",
      items: [],
    },
    {
      title: "Team Members",
      id: "members",
      items: [],
    },
  ];

  return (
    <div id="app">
      <h1 className="text-2xl font-bold">Project Manager</h1>

      {sections.map((section: Section) => (
        <section key={section.id} className="mt-6">
          <h2 className="text-xl font-semibold">{section.title}</h2>
          <ul id={section.id} className="list-disc pl-6"></ul>
        </section>
      ))}
    </div>
  );
};
