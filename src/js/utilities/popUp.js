import { authGuard } from "./authGuard";
import * as storage from "./storage";
import ProfileAPI from "../api/profile";

const api = new ProfileAPI();
const user = storage.load("user");

authGuard();
const loggedInUser = user.name;

export default async function popUp(users) {
  const myProfile = await api.profile.read(loggedInUser);
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
        if (user.name !== loggedInUser) {
          window.location.href = `/user/?id=${user.name}`;
        } else {
          window.location.href = "/profile/";
        }
      });

      // Create follow/unfollow button
      const followBtn = document.createElement("button");

      // Check if the logged-in user is following the current user
      const isFollowing = myProfile.data.following?.some(
        (follower) => follower.name === user.name // Change this to check against the current user
      );

      console.log("Following users:", myProfile.data.following);
      console.log(`Is ${loggedInUser} following ${user.name}? ${isFollowing}`);

      if (!isFollowing) {
        followBtn.className = "primary";
        followBtn.textContent = "Follow +";
        followBtn.addEventListener("click", async () => {
          await api.profile.follow(user.name);
          window.location.reload();
        });
      } else {
        followBtn.className = "following";
        followBtn.textContent = "Following";
        followBtn.addEventListener("click", async () => {
          await api.profile.unfollow(user.name);
          window.location.reload();
        });
      }
      if (user.name === loggedInUser) {
        flexBox.append(avatar, username);
      } else {
        flexBox.append(avatar, username, followBtn);
      }
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
