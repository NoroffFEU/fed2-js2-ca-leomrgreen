import * as storage from "../../utilities/storage";
import ProfileAPI from ".";
import modal from "../../utilities/modal";

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

  profilePosts.forEach((post) => {
    const postCard = document.createElement("div");
    const image = document.createElement("img");
    if (post.media && post.media.url) {
      image.src = post.media.url;
      image.alt = post.media.alt || "Image not available";
    } else {
      image.src = "/images/placeholder.jpg";
      image.alt = "Place-holder image";
    }
    const title = document.createElement("h3");
    title.textContent = post.title;

    postCard.append(image, title);
    container.appendChild(postCard);
  });
}
