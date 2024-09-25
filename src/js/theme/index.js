import toggleTheme from "./theme-provider";
import * as storage from "../utilities/storage";

export default function setThemeListener() {
  const themeBtn = document.getElementById("themeBtn");
  const htmlElement = document.documentElement;

  // Check if user already has a theme set in their local storage
  let savedTheme = storage.load("theme");

  // If no theme is found in local storage, use system preference
  if (!savedTheme) {
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    savedTheme = systemPrefersDark ? "dark" : "light"; // Set based on system preference
    storage.save("theme", savedTheme);
  }

  // Apply the theme depending on what value is in local storage
  if (savedTheme === "dark") {
    htmlElement.classList.add("dark"); // Apply dark if user prefers dark mode
  } else {
    htmlElement.classList.remove("dark"); // Remove dark class if it's not dark
  }

  // Listen for our toggleTheme function
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }
}
