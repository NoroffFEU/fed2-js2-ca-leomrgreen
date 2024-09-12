import { carouselContainer } from "../api/constants";
import SocialAPI from "../api/post";
const api = new SocialAPI();

export async function carousel() {
  const res = await api.post.readAll();
  const data = res.data;

  // Sort by most reactions and take the top 9
  const carouselItems = data
    .sort((a, b) => b._count.reactions - a._count.reactions)
    .slice(0, 9);

  // Create and append carousel items
  carouselItems.forEach((item) => {
    const carouselCard = document.createElement("div");
    carouselCard.className = "carousel-card";

    const carouselImage = document.createElement("img");
    carouselImage.src = item.media?.url || "/images/placeholder.jpg";
    carouselImage.alt = item.media?.alt || "Placeholder image";

    const carouselTitle = document.createElement("h3");
    carouselTitle.textContent = item.title;

    carouselCard.addEventListener("click", () => {
      window.location.href = `/post/?id=${item.id}`;
    });

    const commentCount = document.createElement("span");
    commentCount.className = "comment-count";
    if (item._count.comments) {
      commentCount.innerHTML = `${item._count.comments} <i class="fa-regular fa-comment"></i> `;
    } else {
      commentCount.innerHTML = `0 <i class="fa-regular fa-comment"></i>`;
    }
    carouselCard.append(carouselImage, carouselTitle, commentCount);
    carouselContainer.appendChild(carouselCard);
  });

  // Initialize button logic

  initializeButtons(carouselItems.length);
}

function initializeButtons(itemCount) {
  const carouselContainer = document.getElementById("carousel-container");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  let cardWidth = document.querySelector(".carousel-card")?.clientWidth || 0;
  let currentIndex = 0;

  function updateButtonStates() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= itemCount - 1;
  }

  function scrollToIndex(index) {
    const maxScrollLeft =
      carouselContainer.scrollWidth - carouselContainer.clientWidth;
    const targetScrollLeft = index * cardWidth;
    carouselContainer.scrollTo({
      left: Math.min(maxScrollLeft, targetScrollLeft),
      behavior: "smooth",
    });
    currentIndex = index;
    updateButtonStates();
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < itemCount - 1) {
      scrollToIndex(currentIndex + 1);
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  });

  updateButtonStates();
}
