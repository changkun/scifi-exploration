// Shared handoff between the 3D map, which receives the full record list from app.js,
// and the jump palette, which needs the same records to search and to point the map at one.
const listeners = new Set();
export const atlas = { works: [], current: [], lens: 'scale', locate: null };

export function publish(patch) {
  Object.assign(atlas, patch);
  for (const listener of listeners) listener(atlas);
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// The page's own controls are the contract for changing a site-wide filter from outside app.js:
// set the control and announce the change, exactly as a person using it would.
export function setControl(id, value) {
  const control = document.getElementById(id);
  if (!control) return false;
  if (control.value !== value) {
    control.value = value;
    control.dispatchEvent(new Event(control.tagName === 'INPUT' ? 'input' : 'change', { bubbles: true }));
  }
  return true;
}
