export const STORAGE_KEYS = {
  TASKS: 'taskflow_tasks',
  THEME: 'taskflow_theme',
  FILTERS: 'taskflow_filters',
  SORT: 'taskflow_sort',
};

export const loadFromStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage might be full or unavailable; fail silently
  }
};
