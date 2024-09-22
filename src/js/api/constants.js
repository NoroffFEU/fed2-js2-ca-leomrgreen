// Use Postman, or JavaScript to get your API key
// In Workflow we will learn how to secure this information
export const API_KEY = "326a7c56-ac8b-45dc-b561-12008a88115c";

export const API_BASE = "https://v2.api.noroff.dev";

export const API_AUTH = `${API_BASE}/auth`;

export const API_AUTH_LOGIN = `${API_AUTH}/login`;

export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

export const API_SOCIAL = `${API_BASE}/social`;

export const API_SOCIAL_POSTS = `${API_SOCIAL}/posts`;

export const API_SOCIAL_PROFILES = `${API_SOCIAL}/profiles`;

export const token = localStorage.accessToken;

export const user = localStorage.user;

export const prevButton = document.getElementById("prev-page");

export const nextButton = document.getElementById("next-page");

export const carouselContainer = document.getElementById("carousel-container");

export const params = new URLSearchParams(window.location.search);

export const postId = params.get("id");

export const userId = params.get("id");
