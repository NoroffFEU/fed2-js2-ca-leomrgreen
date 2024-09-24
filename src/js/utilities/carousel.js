import { carouselContainer } from "../api/constants";
import { createPostCard } from "./card";
import SocialAPI from "../api/post";
import skeletonLoader from "./skeleton";
const api = new SocialAPI();

export async function carousel() {
  skeletonLoader(9, carouselContainer);

  const res = await api.post.readAll();
  const data = res.data;
  // Sort by most reactions and take the top 9
  const carouselItems = data
    .sort((a, b) => b._count.comments - a._count.comments)
    .slice(0, 9);

  console.log(carouselItems);
  // Create and append carousel items
  carouselContainer.innerHTML = "";
  carouselItems.forEach((item) => {
    const card = createPostCard(item);
    card.className = "carousel-card";
    carouselContainer.appendChild(card);
  });

  // Initialize button logic

  initializeButtons(carouselItems.length);
}

export async function readPosts(page = 1, limit = 12) {
  try {
    const container = document.getElementById("posts-container");

    skeletonLoader(limit, container); // Show skeleton loaders

    const res = await api.post.readAll();
    const posts = res.data;

    posts.sort((a, b) => new Date(b.created) - new Date(a.created));

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    container.innerHTML = "";

    paginatedPosts.forEach((post) => {
      const card = createPostCard(post);
      container.append(card);
    });

    updatePaginationControls(page, posts.length, limit);
    animateOnScroll();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
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
