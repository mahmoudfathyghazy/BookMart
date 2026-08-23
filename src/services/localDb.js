import dummyProducts from "../data/dummyProducts.json";
import dummyCategories from "../data/dummyCategories.json";
import dummyUsers from "../data/dummyUsers.json";
import dummyOrders from "../data/dummyOrders.json";

/**
 * Local "database" for the frontend-only phase.
 *
 * The app is fully decoupled from any backend: data is seeded once from
 * the bundled dummy JSON files (src/data) into localStorage, then every
 * read/write works against localStorage. When a real backend exists,
 * only src/services/api.js needs to change — no component does.
 */
const PREFIX = "bookmart";

const SEEDS = {
  products: dummyProducts,
  categories: dummyCategories,
  users: dummyUsers,
  orders: dummyOrders,
};

const clone = (value) => JSON.parse(JSON.stringify(value));

function persist(key, value) {
  localStorage.setItem(`${PREFIX}:${key}`, JSON.stringify(value));
}

/**
 * Returns the collection stored in localStorage, seeding it from the
 * bundled dummy data on first access (or after the key is cleared).
 */
export function loadCollection(key) {
  const raw = localStorage.getItem(`${PREFIX}:${key}`);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // corrupted value -> fall through and re-seed
    }
  }
  const seed = clone(SEEDS[key] ?? []);
  persist(key, seed);
  return seed;
}

export function saveCollection(key, value) {
  persist(key, value);
}

/** Generates an id similar to what json-server used to produce. */
export function generateId() {
  return Math.random().toString(36).slice(2, 12);
}
