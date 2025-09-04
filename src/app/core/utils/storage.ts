export const storage = {
  get<T>(k: string): T | null {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : null;
  },
  set<T>(k: string, v: T) {
    localStorage.setItem(k, JSON.stringify(v));
  },
  remove(k: string) {
    localStorage.removeItem(k);
  },
  clear() { 
    localStorage.clear(); 
  }
};