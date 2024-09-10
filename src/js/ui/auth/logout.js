import * as storage from "../../utilities/storage";

export default function onLogout() {
  try {
    storage.remove("token");
    storage.remove("user");
    alert("signed out!");
    window.location.href = "/auth/";
  } catch {
    alert("could not sign out");
  }
}
