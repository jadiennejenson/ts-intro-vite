import { projectStore, taskStore } from "./appStores";

export function deleteProjectCascade(projectId: string) {
  // Remove the project
  projectStore.remove(projectId);

  // Remove tasks that belong to that project
  const tasks = taskStore.getAll();
  for (const t of tasks) {
    if (t.projectId === projectId) {
      taskStore.remove(t.id);
    }
  }
}