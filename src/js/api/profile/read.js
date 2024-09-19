import * as storage from "../../utilities/storage";
import ProfileAPI from ".";
import modal from "../../utilities/modal";
import { createPostCard } from "../../utilities/card";
import animateOnScroll from "../../utilities/animateOnScroll";

const api = new ProfileAPI();

const user = storage.load("user");

const username = user.name;

export async function readProfile() {
  const res = await api.profile.read(username);
  const profile = res.data;
  console.log(profile);
  const container = document.getElementById("profileContainer");
  const avatarContainer = document.createElement("div");
  avatarContainer.className = "avatar-container";
  const numbers = document.createElement("div");
  numbers.className = "info-container";

  const editButton = document.createElement("button");
  editButton.className = "outline";
  editButton.id = "editProfile";
  editButton.textContent = "Edit profile";
  editButton.addEventListener("click", () => {
    modal();
  });

  const infoContainer = document.createElement("div");
  infoContainer.className = "extras";

  const profileImage = document.createElement("img");
  profileImage.src = profile.avatar.url;
  profileImage.alt = profile.avatar.alt;

  const profileName = document.createElement("span");
  profileName.textContent = `@${profile.name}`;

  const totalPosts = document.createElement("span");
  totalPosts.textContent = `${profile._count.posts} posts`;

  const followers = document.createElement("span");
  followers.textContent = `${profile._count.followers} followers`;

  const following = document.createElement("span");
  following.textContent = `${profile._count.following} following`;

  avatarContainer.append(profileImage, profileName);
  numbers.append(totalPosts, followers, following);
  infoContainer.append(numbers, editButton);
  container.append(avatarContainer, infoContainer);
}

export async function readProfilePosts() {
  const res = await api.profile.readPosts(username);
  const profilePosts = res.data;
  const container = document.getElementById("profile-post-container");
  const noPostContainer = document.getElementById("noPostContainer");
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
