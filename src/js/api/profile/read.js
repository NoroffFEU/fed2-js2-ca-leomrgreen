import * as storage from "../../utilities/storage";
import ProfileAPI from ".";
import modal from "../../utilities/modal";
import { deletePost } from "../post/delete";

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
    const postCard = document.createElement("div");
    const image = document.createElement("img");

    // check if media object is empty, if so then replace it with a place-holder image
    if (post.media && post.media.url) {
      image.src = post.media.url;
      image.alt = post.media.alt || "Image not available";
    } else {
      image.src = "/images/placeholder.jpg";
      image.alt = "Place-holder image";
    }

    const title = document.createElement("h3");
    title.textContent = post.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `Delete <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
    </svg>`;
    deleteBtn.addEventListener("click", () => {
      // Check if the user confirms the action
      const isConfirmed = confirm("Are you sure you want to delete this post?");
      if (!isConfirmed) {
        return; // Exit if user cancels
      }
      deletePost(post.id);
    });
    deleteBtn.className = "destructive";

    const editBtn = document.createElement("button");
    editBtn.innerHTML = `Edit <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
  </svg>`;

    editBtn.addEventListener("click", () => {
      window.location.href = `/post/edit/?id=${post.id}`;
    });

    postCard.append(image, title, deleteBtn, editBtn);
    container.appendChild(postCard);
  });
}
