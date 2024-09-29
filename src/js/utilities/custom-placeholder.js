import * as storage from "./storage";
import ProfileAPI from "../api/profile";
const api = new ProfileAPI();

// purely for UI/UX, lets a user know that they cannot change / update their username
export default async function updatePlaceholder() {
  const nameInput = document.querySelector(".usernameInput");
  const bioInput = document.getElementById("bio");
  const avatarURLInput = document.getElementById("avatar-url");
  const avatarALTInput = document.getElementById("avatar-alt");
  const user = storage.load("user");
  const username = user.name;

  if (username) {
    nameInput.placeholder = `@${username}`; // Set the placeholder to the username
  }

  try {
    const res = await api.profile.read(username);
    const profile = res.data;
    if (profile.bio) {
      bioInput.value = profile.bio;
    }
    if (profile.avatar) {
      avatarURLInput.value = profile.avatar.url;
      avatarALTInput.value = profile.avatar.alt;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
