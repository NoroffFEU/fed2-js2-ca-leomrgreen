// store what ever key + value we storage.save
export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// removes what ever key we storage.remove
export function remove(key) {
  localStorage.removeItem(key);
}

// JSON.parse what ever key we storage.load
export function load(key) {
  try {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  } catch {
    return null;
  }
}
