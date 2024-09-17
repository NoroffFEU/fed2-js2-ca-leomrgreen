export function showLoader() {
  const backdrop = document.createElement("div");
  backdrop.id = "loader";
  backdrop.style.cssText =
    "position: fixed; inset: 0; background-color: var(--navClr); z-index: 1000; display: flex; justify-content: center; align-items: center;";

  const loaderText = document.createElement("span");
  loaderText.textContent = "Loading...";
  loaderText.style.cssText = "color: var(--foreground); font-size: 1.5rem;";
  backdrop.appendChild(loaderText);
  document.body.appendChild(backdrop);
}

export function hideLoader() {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.remove();
  }
}
