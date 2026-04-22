import { useState, type JSX } from "react";

interface Section {
  title: string;
  id: string;
}

// Interface for the items we will create
interface Entry {
  id: number;
  sectionId: string;
  text: string;
}

export const Render = (): JSX.Element => {
  // 1. State to store our list of entries
  const [entries, setEntries] = useState<Entry[]>([]);
  // 2. State to track what the user is currently typing
  const [inputValue, setInputValue] = useState("");
  const [activeSection, setActiveSection] = useState("projects");

  const sections: Section[] = [
    { title: "Projects", id: "projects" },
    { title: "Tasks", id: "tasks" },
    { title: "Team Members", id: "members" },
  ];

  // Function to add a new item
  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newEntry: Entry = {
      id: Date.now(), // Unique ID
      sectionId: activeSection,
      text: inputValue,
    };

    setEntries([...entries, newEntry]);
    setInputValue(""); // Clear input
  };

  // Function to delete an item
  const deleteItem = (id: number) => {
    setEntries(entries.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 lg:p-12">
      <div className="mx-auto w-full max-w-4xl xl:max-w-6xl">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Project Manager</h1>

          {/* ADD FORM */}
          <form onSubmit={addItem} className="mb-12 flex flex-wrap gap-4 p-6 bg-slate-100 rounded-lg">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-600">Category</label>
              <select 
                value={activeSection} 
                onChange={(e) => setActiveSection(e.target.value)}
                className="p-2 rounded border border-slate-300"
              >
                {sections.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
              </select>
            </div>
            
            <div className="flex flex-col gap-2 flex-grow">
              <label className="text-sm font-bold text-slate-600">Name/Description</label>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter text..."
                className="p-2 rounded border border-slate-300 w-full"
              />
            </div>

            <button type="submit" className="mt-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold transition-all">
              Add Item
            </button>
          </form>

          {/* DISPLAY SECTIONS */}
          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.id} className="border-b border-slate-100 pb-6">
                <h2 className="text-xl font-semibold text-slate-800 mb-4">{section.title}</h2>
                <ul className="space-y-2">
                  {entries
                    .filter((item) => item.sectionId === section.id)
                    .map((item) => (
                      <li key={item.id} className="flex justify-between items-center bg-slate-50 p-3 rounded group">
                        <span className="text-slate-700">{item.text}</span>
                        <button 
                          onClick={() => deleteItem(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};