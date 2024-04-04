export default function renderLocation(location, isAvailableLocation = true) {
  let attributes;
  if(isAvailableLocation) {
    attributes = `
      hx-post="/places" 
      hx-vals='{"locationId": "${location.id}"}' 
      hx-swap="beforeend show:#interesting-locations-section:top" 
      hx-target="#interesting-locations"
    `;
  } else {
    attributes = `
      hx-delete="/places/${location.id}" 
      hx-swap="outerHTML" 
      hx-target="closest li"
      hx-confirm="Are you sure you want to remove this location?"
    `;
  }
  return `
    <li class="location-item">
      <button ${attributes}>
        <img src="${`/images/${location.image.src}`}" alt="${location.image.alt}" />
        <h3>${location.title}</h3>
      </button>
    </li>
  `;
}
