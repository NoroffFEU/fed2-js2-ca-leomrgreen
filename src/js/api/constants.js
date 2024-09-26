// Use Postman, or JavaScript to get your API key
// In Workflow we will learn how to secure this information
export const API_KEY = "326a7c56-ac8b-45dc-b561-12008a88115c";

export const API_BASE = "https://v2.api.noroff.dev";

export const prevButton = document.getElementById("prev-page");

export const nextButton = document.getElementById("next-page");

export const carouselContainer = document.getElementById("carousel-container");

export const params = new URLSearchParams(window.location.search);

export const postId = params.get("id");

export const userId = params.get("id");
