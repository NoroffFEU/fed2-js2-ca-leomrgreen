import { deletePost } from "../api/post/delete";
import timeSince from "./getDate";
import ProfileAPI from "../api/profile";
import modal from "./modal";
import * as storage from "./storage";

const api = new ProfileAPI();

const user = storage.load("user");

const loggedInUser = user.name;

// function that generates HTML (card) and adds different features based on the URL
export function createPostCard(post) {
  const card = document.createElement("div");
  card.className = "post-card hidden";

  const title = document.createElement("h3");
  title.textContent = post.title;

  const image = document.createElement("img");
  if (post.media && post.media.url) {
    image.src = post.media.url;
    image.alt = post.media.alt || "Image not available";
  } else {
    image.src = "/images/placeholder.jpg";
    image.alt = "Place-holder image";
  }

  const date = document.createElement("span");
  date.textContent = timeSince(post.created);

  // Create and append body and tags if on post page
  if (location.pathname === "/post/") {
    const author = document.createElement("div");
    author.className = "author-container";
    const authorName = document.createElement("span");
    authorName.innerHTML = `@${post.author.name}  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-patch-check-fill" viewBox="0 0 16 16">
    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708"/>
  </svg>
  `;
    const authorAvatar = document.createElement("img");
    authorAvatar.src = post.author.avatar.url;
    authorAvatar.alt = post.author.avatar.alt;

    author.addEventListener("click", () => {
      if (post.author.name === loggedInUser) {
        window.location.href = "/profile/";
      } else {
        window.location.href = `/user/?id=${post.author.name}`;
      }
    });

    author.append(authorAvatar, authorName);

    const body = document.createElement("p");
    body.textContent = post.body;

    const tags = document.createElement("ul");
    tags.className = "tags";

    post.tags.forEach((tag) => {
      const li = document.createElement("li");
      li.textContent = `#${tag}`;
      tags.appendChild(li);
    });

    // Append body and tags after the image
    card.append(author, image, title, body, tags, date);
  } else {
    // Append image, title, and date for other pages
    card.append(image, title, date);
  }

  // Add event listener for homepage and user page
  if (location.pathname === "/") {
    card.addEventListener("click", () => {
      window.location.href = `/post/?id=${post.id}`;
    });
    card.style.cursor = "pointer";
  }

  if (location.pathname === "/user/") {
    card.addEventListener("click", () => {
      window.location.href = `/post/?id=${post.id}`;
    });
    card.style.cursor = "pointer";
  }

  // Add delete and edit buttons if on profile page
  if (location.pathname === "/profile/") {
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `Delete <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
      </svg>`;
    deleteBtn.className = "destructive";
    deleteBtn.addEventListener("click", () => {
      const isConfirmed = confirm("Are you sure you want to delete this post?");
      if (isConfirmed) {
        deletePost(post.id);
      }
    });

    const editBtn = document.createElement("button");
    editBtn.innerHTML = `Edit <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
      <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
      </svg>`;
    editBtn.className = "edit-btn";
    editBtn.addEventListener("click", () => {
      window.location.href = `/post/edit/?id=${post.id}`;
    });

    card.append(deleteBtn, editBtn);
  }

  return card;
}

export function createProfileCard(profile) {
  const container = document.getElementById("profileContainer");
  const avatarContainer = document.createElement("div");
  avatarContainer.className = "avatar-container";
  const numbers = document.createElement("div");
  numbers.className = "info-container";

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

  // Kontrollera om vi är på profil-sidan och append editButton
  if (location.pathname === "/profile/") {
    const editButton = document.createElement("button");
    editButton.className = "outline";
    editButton.id = "editProfile";
    editButton.textContent = "Edit profile";
    editButton.addEventListener("click", () => {
      modal();
    });

    // Append editButton efter numbers
    infoContainer.append(numbers, editButton);
  }

  if (location.pathname === "/user/") {
    const followBtn = document.createElement("button");
    const isFollowing = profile.followers.some(
      (follower) => follower.name === loggedInUser
    );
    if (!isFollowing) {
      followBtn.className = "primary";
      followBtn.textContent = "Follow +";
      followBtn.addEventListener("click", async () => {
        await api.profile.follow(profile.name);
        window.location.reload();
      });
    } else {
      followBtn.className = "following";
      followBtn.textContent = "Following";
      followBtn.addEventListener("click", async () => {
        await api.profile.unfollow(profile.name);
        window.location.reload();
      });
    }

    infoContainer.append(numbers, followBtn);
  }

  container.append(avatarContainer, infoContainer);
}
