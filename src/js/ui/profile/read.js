import * as storage from "../../utilities/storage";
import ProfileAPI from "../../api/profile";
import { createPostCard, createProfileCard } from "../../utilities/card";
import animateOnScroll from "../../utilities/animateOnScroll";
import { userId } from "../../api/constants";

const api = new ProfileAPI();
const user = storage.load("user");

const username = location.pathname === "/profile/" ? user.name : userId;

export async function readProfile() {
  const res = await api.profile.read(username);
  const profile = res.data;
  console.log(profile);
  createProfileCard(profile);
}

export async function readProfilePosts() {
  const res = await api.profile.readPosts(username);
  const profilePosts = res.data;
  const container = document.getElementById("profile-post-container");
  const noPostContainer = document.getElementById("noPostContainer");

  // if the profile does not contain any posts, then rely on HTML below
  if (profilePosts.length === 0) {
    const noPostsInfo = document.createElement("div");
    noPostsInfo.className = "no-post";
    noPostsInfo.innerHTML = `<h3>You have no posts</h3> 
       <svg xmlns="http://www.w3.org/2000/svg"width="16" height="16" fill="currentColor"
        class="bi bi-camera-fill"
        viewBox="0 0 16 16">
        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />   
        <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 
        0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 
        2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0"/>
        </svg`;
    noPostContainer.appendChild(noPostsInfo);
  }

  profilePosts.forEach((post) => {
    const card = createPostCard(post);
    container.append(card);
  });
  animateOnScroll(); // checks for cards to animate into view
}
