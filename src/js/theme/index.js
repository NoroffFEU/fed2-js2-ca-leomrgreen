import toggleTheme from "./theme-provider";
import * as storage from "../utilities/storage";

export default function setThemeListener() {
  const themeBtn = document.getElementById("themeBtn");
  const htmlElement = document.documentElement;

  // Check if user already has a theme set in their local storage
  let savedTheme = storage.load("theme");

  // if no theme is found in local storage, then set "light" as default
  if (!savedTheme) {
    savedTheme = "light";
    storage.save("theme", savedTheme);
  }

  // Apply the theme depending on what value is in local storage
  if (savedTheme === "dark") {
    htmlElement.classList.add("dark"); // Apply dark if user switch to dark mode
  } else {
    htmlElement.classList.remove("dark"); // remove dark class if the value dark is not in storage
  }

  // listen for our toggleTheme function
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }
}
