import * as storage from "../../utilities/storage";

// logs user out by clearing token and user information in local storage, then redirects user
export default function onLogout() {
  try {
    storage.remove("token");
    storage.remove("user");
    alert("signed out!");
    window.location.href = "/";
  } catch {
    alert("could not sign out");
  }
}
