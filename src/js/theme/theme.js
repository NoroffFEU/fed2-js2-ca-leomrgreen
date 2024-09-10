import toggleTheme from "./theme-provider";
import * as storage from "../utilities/storage";

export default function setThemeListener() {
  const themeBtn = document.getElementById("themeBtn");
  const htmlElement = document.documentElement;

  // Kolla om ett tema redan är satt i localStorage
  let savedTheme = storage.load("theme");

  // Om inget tema finns i storage, sätt "light" som default
  if (!savedTheme) {
    savedTheme = "light";
    storage.save("theme", savedTheme);
  }

  // Applicera det sparade temat (dark eller light)
  if (savedTheme === "dark") {
    htmlElement.classList.add("dark"); // Lägg till "dark" om det sparade temat är mörkt
  } else {
    htmlElement.classList.remove("dark"); // Se till att "dark" inte finns om temat är ljus
  }

  // Lägg till event listener för att lyssna efter klick på themeBtn
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }
}
