/**
 * Helpers for switching between English and Arabic content
 * that comes from db.json (products, categories, etc.).
 */

/**
 * Returns the localized name of an item.
 * Items in db.json should expose `name` and optionally `name_ar`.
 */
export function getLocalizedName(item, lang) {
  if (lang === "ar" && item.name_ar) return item.name_ar;
  return item.name;
}

/**
 * Returns the localized category display name.
 * Categories expose `name` and `name_ar`.
 */
export function getLocalizedCategory(category, lang) {
  if (lang === "ar" && category?.name_ar) return category.name_ar;
  return category?.name ?? category;
}
