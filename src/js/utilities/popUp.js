import { authGuard } from "./authGuard";
import * as storage from "./storage";

const user = storage.load("user");

authGuard();

const loggedInUser = user.name;

export default function popUp(users) {
  const popUp = document.querySelector(".popUp");
  const dropdown = document.createElement("div");
  dropdown.className = "user-dropdown";

  // Check if there are no users
  if (users.length === 0) {
    const flexBox = document.createElement("div");
    flexBox.className = "flex-box";

    const noUserMessage = document.createElement("span");
    noUserMessage.textContent = ":(";

    flexBox.append(noUserMessage);
    dropdown.append(flexBox);
  } else {
    users.forEach((user) => {
      const flexBox = document.createElement("div");
      const avatar = document.createElement("img");
      avatar.src = user.avatar.url;
      avatar.alt = user.avatar.alt;
      avatar.className = "avatar";
      flexBox.className = "flex-box";

      const username = document.createElement("span");
      username.textContent = `@${user.name}`;
      username.addEventListener("click", () => {
        if (user.name != loggedInUser) {
          window.location.href = `/user/?id=${user.name}`;
        } else {
          window.location.href = "/profile/";
        }
      });
      flexBox.append(avatar, username);
      dropdown.append(flexBox);
    });
  }

  popUp.append(dropdown);

  // Toggle the class and clear elements on close
  popUp.classList.toggle("open");

  if (popUp.classList.contains("open")) {
    document.body.style.overflow = "hidden";
  }

  popUp.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      popUp.classList.remove("open");

      // Remove all children (i.e., the elements created) from dropdown
      dropdown.remove();
      document.body.style.overflow = "";
    }
  });
}
