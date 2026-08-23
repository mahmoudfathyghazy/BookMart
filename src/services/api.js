import {
  loadCollection,
  saveCollection,
  generateId,
} from "./localDb";

/**
 * Shared data layer for the BookMart application.
 *
 * FRONTEND-ONLY PHASE: every method simulates a REST call against the
 * local database (localStorage seeded from src/data dummy JSON) with a
 * small artificial latency. Components keep using the exact same API
 * they used with json-server, so swapping this file for real HTTP
 * later requires zero component changes.
 */

const NETWORK_DELAY_MS = 120;

function simulateRequest(handler) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(handler());
      } catch (error) {
        reject(error);
      }
    }, NETWORK_DELAY_MS);
  });
}

export const api = {
  // ---------- Products ----------
  getProducts: () =>
    simulateRequest(() => loadCollection("products")),

  getProduct: (id) =>
    simulateRequest(() =>
      loadCollection("products").find(
        (product) => String(product.id) === String(id)
      )
    ),

  createProduct: (product) =>
    simulateRequest(() => {
      const products = loadCollection("products");
      const newProduct = { ...product, id: generateId() };
      products.push(newProduct);
      saveCollection("products", products);
      return newProduct;
    }),

  updateProduct: (id, changes) =>
    simulateRequest(() => {
      const products = loadCollection("products");
      const index = products.findIndex(
        (product) => String(product.id) === String(id)
      );
      if (index === -1) throw new Error("Product not found");
      products[index] = { ...products[index], ...changes };
      saveCollection("products", products);
      return products[index];
    }),

  deleteProduct: (id) =>
    simulateRequest(() => {
      const products = loadCollection("products").filter(
        (product) => String(product.id) !== String(id)
      );
      saveCollection("products", products);
      return null;
    }),

  // ---------- Categories ----------
  getCategories: () =>
    simulateRequest(() => loadCollection("categories")),

  // ---------- Users / authentication ----------
  getUsers: () => simulateRequest(() => loadCollection("users")),

  login: (email, password) =>
    simulateRequest(() => {
      const users = loadCollection("users");
      // Case-insensitive email match so "User@Email.com" works too.
      return users.filter(
        (user) =>
          user.email.toLowerCase() === email.toLowerCase() &&
          user.password === password
      );
    }),

  register: (user) =>
    simulateRequest(() => {
      const users = loadCollection("users");
      const newUser = { ...user, id: generateId() };
      users.push(newUser);
      saveCollection("users", users);
      return newUser;
    }),

  // ---------- Orders ----------
  getOrders: () => simulateRequest(() => loadCollection("orders")),

  createOrder: (order) =>
    simulateRequest(() => {
      const orders = loadCollection("orders");
      const newOrder = { ...order, id: generateId() };
      orders.push(newOrder);
      saveCollection("orders", orders);
      return newOrder;
    }),
};

export default api;
