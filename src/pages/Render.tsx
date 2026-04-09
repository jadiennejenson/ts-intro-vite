import { type JSX } from "react";

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
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 lg:p-12">
      <div className="mx-auto w-full max-w-4xl xl:max-w-6xl">
        <div id="app" className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8 lg:p-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-8">Project Manager</h1>

          {sections.map((section: Section) => (
            <section key={section.id} className="mt-6 sm:mt-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-4">{section.title}</h2>
              <ul id={section.id} className="list-disc pl-6 sm:pl-8 space-y-2"></ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
