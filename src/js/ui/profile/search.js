import ProfileAPI from "../../api/profile";
import * as storage from "../../utilities/storage";

var loggedInUser;

if (localStorage.token) {
  const username = storage.load("user");
  loggedInUser = username.name; // gives the loggedInUser a global scope in order for it to work with logic in search function (line 42)
}

const api = new ProfileAPI();
const form = document.querySelector(".search-form");

export async function onSearch(e) {
  e.preventDefault();

  const query = document.querySelector(".search-value").value;

  if (!query) {
    return;
  }

  const res = await api.profile.search(query);
  const searchContainer = document.getElementById("search-container");

  const rows = document.querySelectorAll(".row");

  if (rows) {
    rows.forEach((row) => {
      row.remove();
    });
  }

  // this ensures we don't get en error if trying to set a classname to a not existing element
  searchContainer ? (searchContainer.className = "search-container") : null;
  const searchHeader = document.createElement("div");
  searchHeader.className = "row";
  searchHeader.textContent = `Users (${res.data.length})`;
  searchContainer.appendChild(searchHeader);
  res.data.forEach((user) => {
    const row = document.createElement("div");
    row.className = "row";
    row.addEventListener("click", () => {
      // check if user clicks on themselves or another user, if the id matches the id (username)
      // in local storage, then go to /profile instead of /user
      if (user.name === loggedInUser) {
        window.location.href = "/profile/";
      } else {
        window.location.href = `/user/?id=${user.name}`;
      }
    });

    const username = document.createElement("div");
    username.textContent = `@${user.name}`;
    username.className = "search-res";

    const avatar = document.createElement("img");
    avatar.src = user.avatar.url;
    avatar.alt = user.avatar.alt;
    avatar.className = "avatar";
    row.append(avatar, username);
    searchContainer.append(row);

    form.append(searchContainer);
  });
}
