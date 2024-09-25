import animateOnScroll from "../../utilities/animateOnScroll";
import { createPostCard } from "../../utilities/card";
import modal from "../../utilities/modal";
import { updatePaginationControls } from "../../utilities/pagination";
import skeletonLoader from "../../utilities/skeleton";
import { nextButton, prevButton } from "../../api/constants";
import SocialAPI from "../../api/post/index";
let currentPage = 1;
let forYou = true;

const api = new SocialAPI();

export async function readPost(id) {
  try {
    const container = document.getElementById("post-container");
    skeletonLoader(1, container);
    const res = await api.post.readSinglePost(id);
    const post = res.data;
    console.log(post);

    container.innerHTML = ""; // Clear existing content

    // Create post card and append it to container
    const card = createPostCard(post);
    container.appendChild(card);

    const commentsBtn = document.getElementById("commentBtn");
    if (commentsBtn) {
      commentsBtn.addEventListener("click", () => {
        modal();
      });
    }

    animateOnScroll();
  } catch (error) {
    console.error(error);
  }
}

export async function readPosts(page = 1, limit = 12) {
  try {
    const container = document.getElementById("posts-container");

    skeletonLoader(limit, container); // Show skeleton loaders

    const res = forYou
      ? await api.post.readAll()
      : await api.post.readFollowPosts();
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

    // hideSkeletonLoader(); // Hide skeleton loaders once posts are loaded

    updatePaginationControls(page, posts.length, limit);
    animateOnScroll();
  } catch (error) {
    console.error("Error fetching posts:", error);
    // hideSkeletonLoader(); // Ensure skeleton loaders are hidden even if there's an error
  }
}

// this functions controls if we want to display each control based on currentPage index and our total of posts.

// Pagination state

function renderPosts() {
  readPosts(currentPage, 12);
}

// previous page (-1 index)
if (prevButton) {
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPosts();
    }
  });
}

// next page (+1 index)
if (nextButton) {
  nextButton.addEventListener("click", () => {
    currentPage++;
    console.log(currentPage);
    renderPosts();
  });
}

// Toggle between "For You" and "Following" feeds
export function toggleFeed() {
  const foryouToggle = document.getElementById("foryou-toggle");
  const followingToggle = document.getElementById("following-toggle");
  if (followingToggle) {
    followingToggle.style.cssText = "color: var(--muted-foreground)";
  }

  if (followingToggle) {
    followingToggle.addEventListener("click", () => {
      forYou = false; // Set forYou to false when "Following" is clicked
      foryouToggle.style.cssText = "color: var(--muted-foreground)";
      followingToggle.style.cssText = "color: var(--foreground)";

      renderPosts(); // Reload posts with the updated feed
    });
  }
  if (foryouToggle) {
    foryouToggle.addEventListener("click", () => {
      forYou = true; // Set forYou to true when "For You" is clicked
      followingToggle.style.cssText = "color: var(--muted-foreground)";
      foryouToggle.style.cssText = "color: var(--foreground)";

      renderPosts(); // Reload posts with the updated feed
    });
  }
}
toggleFeed();
