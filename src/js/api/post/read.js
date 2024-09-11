import timeSince from "../../utilities/getDate";
import { nextButton, prevButton } from "../constants";
import socialAPI from "./index";

const api = new socialAPI();

export async function readPost(id) {
  try {
    const res = await api.post.readSinglePost(id);
    const post = res.data;
    console.log(post);
    const container = document.getElementById("post-container");
    container.innerHTML = "";

    const image = document.createElement("img");
    if (post.media && post.media.url) {
      image.src = post.media.url;
      image.alt = post.media.alt || "Image not available";
    } else {
      image.src = "/images/noroff-logo.png";
      image.alt = "Place-holder image";
    }

    const desc = document.createElement("div");
    desc.className = "description";

    const title = document.createElement("h1");
    title.textContent = post.title;

    const body = document.createElement("p");
    body.textContent = post.body;

    const tags = document.createElement("ul");
    tags.className = "tags";

    post.tags.forEach((tag) => {
      const li = document.createElement("li");
      li.textContent = `#${tag}`;
      tags.appendChild(li);
    });

    const date = document.createElement("span");
    date.textContent = timeSince(post.created);

    desc.append(title, body, tags);
    container.append(image, desc, date);
  } catch (error) {
    console.error(error);
  }
}

export async function readPosts(page = 1, limit = 12) {
  try {
    const res = await api.post.readAll();
    const posts = res.data;

    // sort the array of posts based on it's creation date
    posts.sort((a, b) => new Date(b.created) - new Date(a.created));

    // Calculate the start and end index for each page
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    const container = document.getElementById("posts-container");
    container.innerHTML = "";

    // generate html for each social post
    paginatedPosts.forEach((post) => {
      const card = document.createElement("div");
      card.className = "post-card";
      const title = document.createElement("h5");
      title.textContent = post.title;
      const image = document.createElement("img");
      if (post.media && post.media.url) {
        image.src = post.media.url;
        image.alt = post.media.alt || "Image not available";
      } else {
        image.src = "/images/noroff-logo.png";
        image.alt = "Place-holder image";
      }
      card.addEventListener("click", () => {
        window.location.href = `/post/?id=${post.id}`;
      });
      card.append(title, image);
      container.append(card);
    });

    // calls the update function for the controls with help of parameters
    updatePaginationControls(page, posts.length, limit);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

// this functions controls if we want to display each control based on currentPage index and our total of posts.
function updatePaginationControls(currentPage, totalPosts, limit) {
  prevButton.style.display = currentPage > 1 ? "flex" : "none";

  const totalPages = Math.ceil(totalPosts / limit);
  nextButton.style.display = currentPage < totalPages ? "flex" : "none";
}

// Pagination state
let currentPage = 1;

function updatePosts() {
  readPosts(currentPage, 12);
}

// previous page (-1 index)
if (prevButton) {
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updatePosts();
    }
  });
}

// next page (+1 index)
if (nextButton) {
  nextButton.addEventListener("click", () => {
    currentPage++;
    console.log(currentPage);
    updatePosts();
  });
}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {}
