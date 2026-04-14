export type CrudStore<T extends { id: string }> = {
  getAll(): T[];
  getById(id: string): T | undefined;
  add(item: T): void;
  update(id: string, patch: Partial<Omit<T, "id">>): void;
  remove(id: string): void;
  subscribe(listener: () => void): () => void;
};

export function createCrudStore<T extends { id: string }>(initial: T[] = []): CrudStore<T> {
  let items = [...initial];
  const listeners = new Set<() => void>();

  function notify() {
    for (const l of listeners) l();
  }

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