import { token } from "../../api/constants";

export function setLogoutListener() {
  const signOutBtn = document.getElementById("signOutBtn");
  signOutBtn.addEventListener("click", () => {
    localStorage.removeItem(token);
  });
}
