// A simple in-memory CRUD store with subscription support.
// This is a utility to create stores for different entity types (projects, tasks, members).
export type CrudStore<T extends { id: string }> = {
  getAll(): T[];
  getById(id: string): T | undefined;
  add(item: T): void;
  update(id: string, patch: Partial<Omit<T, "id">>): void;
  remove(id: string): void;
  subscribe(listener: () => void): () => void;
};
// Factory function to create a CRUD store for a specific entity type.
// Example usage: const projectStore = createCrudStore<Project>();
// The store maintains an internal array of items and a set of listeners for changes.
export function createCrudStore<T extends { id: string }>(initial: T[] = []): CrudStore<T> {
  let items = [...initial];
  const listeners = new Set<() => void>();

  function notify() {
    for (const l of listeners) l();
  }

// The returned object implements the CrudStore interface, providing methods to manipulate the items and manage subscriptions.
// - getAll: returns a copy of the items array.
// - getById: finds an item by its ID.
// - add: adds a new item and notifies listeners.
// - update: updates an existing item by ID with a patch object and notifies listeners.
// - remove: removes an item by ID and notifies listeners.
// - subscribe: allows components to listen for changes and returns an unsubscribe function.
  return {
    getAll() {
      return [...items];
    },
    getById(id) {
      return items.find((x) => x.id === id);
    },
    add(item) {
      items = [item, ...items];
      notify();
    },
    update(id, patch) {
      items = items.map((x) => {
        if (x.id !== id) return x;
        return { ...x, ...patch } as T;
      });
      notify();
    },
    remove(id) {
      items = items.filter((x) => x.id !== id);
      notify();
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}