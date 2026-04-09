export type Id = string;

export class DataManager<T extends { id: Id }> {
  private items: T[] = [];

  getAll(): T[] {
    // Return a copy so callers can’t mutate our internal array by accident
    // Retunning a new array also allows us to easily add sorting/filtering later if needed without changing the API
    return [...this.items];
  }
//T can be any type we want
add(item: T): void {
    // Simple uniqueness guard to avoid duplicate IDs in-memory
    const exists = this.items.some((x) => x.id === item.id);
    if (exists) throw new Error(`Duplicate id: ${item.id}`);

    this.items.push(item);
  }

  getById(id: string): T | undefined {
    return this.items.find((x) => x.id === id);
  }

  removeById(id: string): boolean {
    const before = this.items.length;
    this.items = this.items.filter((x) => x.id !== id);
    return this.items.length !== before;
  }

  updateById(id: string, patch: Partial<T>): T {
    const item = this.getById(id);
    if (!item) throw new Error(`No item found with id: ${id}`);

    // We keep `id` stable even if patch includes a different id
    const updated = { ...item, ...patch, id: item.id };
    this.items = this.items.map((x) => (x.id === id ? updated : x));
    return updated;
  }

  setAll(items: T[]): void {
    this.items = [...items];
  }

  sortBy<K extends keyof T>(key: K, direction: "asc" | "desc" = "asc"): T[] {
  const factor = direction === "asc" ? 1 : -1;

  const copy = [...this.items];
  copy.sort((a, b) => {
    const av = a[key];
    const bv = b[key];

    // Handle common primitive types
    if (typeof av === "string" && typeof bv === "string") {
      return av.localeCompare(bv) * factor;
    }

    if (typeof av === "number" && typeof bv === "number") {
      return (av - bv) * factor;
    }

    if (typeof av === "boolean" && typeof bv === "boolean") {
      return (Number(av) - Number(bv)) * factor;
    }

    // Fallback: keep original order if values aren’t comparable
    return 0;
  });

  return copy;
}

  clear(): void {
    this.items = [];
  }
}