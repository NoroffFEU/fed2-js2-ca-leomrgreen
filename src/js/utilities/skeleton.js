// Skeleton loader function
export default function skeletonLoader(count, container) {
  container.innerHTML = ""; // Clear any existing content

  // Create skeleton cards based on count
  for (let i = 0; i < count; i++) {
    const skeletonCard = document.createElement("div");
    skeletonCard.classList.add("skeleton-card");

    container.appendChild(skeletonCard);
  }
}
