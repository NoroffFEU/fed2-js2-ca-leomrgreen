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

export async function readProfiles(limit, page) {}
