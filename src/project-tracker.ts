export type ProjectStatus = 'Active' | 'Blocked' | 'Planned' | 'Done';

// 2. Use that type inside your Project interface
export interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus; // Use the type here for strict checking
}

