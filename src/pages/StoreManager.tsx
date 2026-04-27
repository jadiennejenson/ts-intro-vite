import { useState, useEffect } from 'react';
import { projectStore, taskStore, memberStore } from '../store/appStores';
import { deleteProjectCascade } from '../store/rules';
import type { Project, Task, TeamMember } from '../domain/types';

export default function StoreManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [activeTab, setActiveTab] = useState<'projects' | 'tasks' | 'members'>('projects');
  const [message, setMessage] = useState<string>('');

  // Subscribe to store changes
  useEffect(() => {
    const updateState = () => {
      setProjects(projectStore.getAll());
      setTasks(taskStore.getAll());
      setMembers(memberStore.getAll());
    };

    updateState();
    const unsubProject = projectStore.subscribe(updateState);
    const unsubTask = taskStore.subscribe(updateState);
    const unsubMember = memberStore.subscribe(updateState);

    return () => {
      unsubProject();
      unsubTask();
      unsubMember();
    };
  }, []);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 2000);
  };

  // Project CRUD operations
  const addProject = () => {
    const newProject: Project = {
      id: `project_${Date.now()}`,
      createdAt: Date.now(),
      entityType: 'project',
      name: `New Project ${projects.length + 1}`,
      description: 'Description here',
      dueDate: '2026-12-31',
    };
    projectStore.add(newProject);
    showMessage('Project added!');
  };

  const deleteProject = (id: string) => {
    deleteProjectCascade(id);
    showMessage('Project and related tasks deleted!');
  };

  // Task CRUD operations
  const addTask = () => {
    if (projects.length === 0) {
      showMessage('Add a project first!');
      return;
    }
    const newTask: Task = {
      id: `task_${Date.now()}`,
      createdAt: Date.now(),
      entityType: 'task',
      projectId: projects[0].id,
      title: `New Task ${tasks.length + 1}`,
      status: 'todo',
    };
    taskStore.add(newTask);
    showMessage('Task added!');
  };

  const deleteTask = (id: string) => {
    taskStore.remove(id);
    showMessage('Task deleted!');
  };

  // Member CRUD operations
  const addMember = () => {
    const newMember: TeamMember = {
      id: `member_${Date.now()}`,
      createdAt: Date.now(),
      entityType: 'member',
      fullName: `Team Member ${members.length + 1}`,
      role: 'dev',
      email: 'member@example.com',
    };
    memberStore.add(newMember);
    showMessage('Member added!');
  };

  const deleteMember = (id: string) => {
    memberStore.remove(id);
    showMessage('Member deleted!');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Store Manager</h1>
      
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4">
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 rounded ${activeTab === 'projects' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Projects ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-4 py-2 rounded ${activeTab === 'tasks' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Tasks ({tasks.length})
        </button>
        <button
          onClick={() => setActiveTab('members')}
          className={`px-4 py-2 rounded ${activeTab === 'members' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Members ({members.length})
        </button>
      </div>

      {/* Action Buttons */}
      <div className="mb-4 flex gap-2">
        {activeTab === 'projects' && (
          <button onClick={addProject} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            + Add Project
          </button>
        )}
        {activeTab === 'tasks' && (
          <button onClick={addTask} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            + Add Task
          </button>
        )}
        {activeTab === 'members' && (
          <button onClick={addMember} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            + Add Member
          </button>
        )}
      </div>

      {/* Content */}
      <div className="bg-white border rounded-lg overflow-hidden">
        {activeTab === 'projects' && (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Due Date</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.description}</td>
                  <td className="p-3">{p.dueDate}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteProject(p.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Delete (Cascade)
                    </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr><td colSpan={4} className="p-4 text-center text-gray-500">No projects</td></tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'tasks' && (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Project ID</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(t => (
                <tr key={t.id} className="border-t">
                  <td className="p-3">{t.title}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      t.status === 'done' ? 'bg-green-100 text-green-800' :
                      t.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="p-3 text-sm">{t.projectId}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteTask(t.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {tasks.length === 0 && (
                <tr><td colSpan={4} className="p-4 text-center text-gray-500">No tasks</td></tr>
              )}
            </tbody>
          </table>
        )}

        {activeTab === 'members' && (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.id} className="border-t">
                  <td className="p-3">{m.fullName}</td>
                  <td className="p-3">{m.role}</td>
                  <td className="p-3">{m.email}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteMember(m.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr><td colSpan={4} className="p-4 text-center text-gray-500">No members</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}