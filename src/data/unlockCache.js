const STORAGE_KEY = 'blog_unlock';
const EXPIRY_MS = 1000 * 60 * 3; // 3 minutes

// Stores only a boolean unlock flag + expiry timestamp — never the password or content
const unlockCache = {
  _load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; }
  },
  _save(data) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* localStorage may be unavailable (e.g. private mode) */ }
  },
  has(slug) {
    const entry = this._load()[slug];
    if (!entry) return false;
    if (Date.now() - entry.ts > EXPIRY_MS) {
      this.delete(slug);
      return false;
    }
    return true;
  },
  set(slug) {
    const data = this._load();
    data[slug] = { ts: Date.now() };
    this._save(data);
  },
  delete(slug) {
    const data = this._load();
    delete data[slug];
    this._save(data);
  },
};

export default unlockCache;