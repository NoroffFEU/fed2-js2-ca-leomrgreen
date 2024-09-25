import ProfileAPI from "../../api/profile";
const api = new ProfileAPI();

export async function onSearch(e) {
  e.preventDefault();

  const query = document.querySelector(".search-value").value;

  if (!query) {
    return;
  }

  await api.profile.search(query);
}

export function displaySearchResult(result) {}
