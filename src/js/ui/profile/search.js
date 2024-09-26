import ProfileAPI from "../../api/profile";
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
  searchContainer ? (searchContainer.className = "search-container") : null;
  console.log(res);
  res.data.forEach((user) => {
    const row = document.createElement("div");
    row.className = "row";
    const username = document.createElement("div");
    username.textContent = user.name;
    username.className = "search-res";

    const avatar = document.createElement("img");
    avatar.src = user.avatar.url;
    avatar.alt = user.avatar.alt;
    avatar.className = "avatar";
    row.append(avatar, username);
    if (res.data) {
      searchContainer.append(row);
    }
    form.append(searchContainer);
  });
}
