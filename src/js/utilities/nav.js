import * as storage from "../utilities/storage";

export default function navMenu() {
  const userName = storage.load("user");
  const profileTag = document.getElementById("profile");

  if (profileTag) {
    profileTag.textContent = userName.name.toUpperCase();
  } else {
    return null;
  }
}
