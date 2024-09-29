import { prevButton, nextButton } from "../api/constants";

export function updatePaginationControls(currentPage, totalPosts, limit) {
  prevButton.style.display = currentPage > 1 ? "flex" : "none";

  const totalPages = Math.ceil(totalPosts / limit);
  nextButton.style.display = currentPage < totalPages ? "flex" : "none";
}
