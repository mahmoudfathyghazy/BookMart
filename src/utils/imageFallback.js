/**
 * Inline SVG placeholder used when a product image fails to load,
 * so cards never show broken-image icons.
 */
export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240">
       <rect width="100%" height="100%" fill="#ede3d0"/>
       <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
             font-family="Segoe UI, sans-serif" font-size="16" fill="#6f6b5e">
         No Image
       </text>
     </svg>`
  );

/** React onError handler that swaps a broken image for the placeholder. */
export function handleImageError(event) {
  if (event.currentTarget.src !== PLACEHOLDER_IMAGE) {
    event.currentTarget.src = PLACEHOLDER_IMAGE;
  }
}
