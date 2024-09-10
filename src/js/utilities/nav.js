import * as storage from "../utilities/storage";

export default function navMenu() {
  const userName = storage.load("user");
  const profileTag = document.getElementById("profile");

  if (profileTag) {
    const profilePicture = document.createElement("img");
    profilePicture.src = userName.avatar.url;
    profilePicture.alt = userName.avatar.alt;
    profileTag.appendChild(profilePicture);
  } else {
    return null;
  }
}
