import * as storage from "../utilities/storage";

export default function toggleTheme() {
  const htmlElement = document.documentElement;
  const currentTheme = storage.load("theme") || "light";

  if (currentTheme === "light") {
    storage.save("theme", "dark");
    htmlElement.classList.add("dark");
  } else {
    storage.save("theme", "light");
    htmlElement.classList.remove("dark");
  }
}
