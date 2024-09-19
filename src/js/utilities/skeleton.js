// Skeleton loader function
export default function skeletonLoader(count, container) {
  container.innerHTML = ""; // Clear any existing content

  // Create skeleton cards based on count
  for (let i = 0; i < count; i++) {
    const skeletonCard = document.createElement("div");
    skeletonCard.classList.add("skeleton-card"); // Add your own skeleton styling class
    skeletonCard.style.aspectRatio = "1 / 1"; // Aspect ratio 1:1
    skeletonCard.style.width = "100%";
    skeletonCard.style.height = "100%";
    skeletonCard.style.backgroundColor = "var(--muted-foreground)"; // Placeholder color
    skeletonCard.style.borderRadius = "var(--radius)"; // Example styling
    container.appendChild(skeletonCard);
  }
}
