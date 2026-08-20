// Central place for talking to the json-server API (data/db.json via `npm run server`)
const BASE_URL = "http://localhost:3000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  getProducts: () => request("/products"),
  getProduct: (id) => request(`/products/${id}`),
  getCategories: () => request("/categories"),
  login: (email, password) =>
    request(`/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`),
  register: (user) =>
    request("/users", { method: "POST", body: JSON.stringify(user) }),
};

export default api;
