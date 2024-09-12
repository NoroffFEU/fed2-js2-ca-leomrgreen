export default function setDropDownListener() {
  const profileIcon = document.getElementById("profile");
  const dropdown = document.getElementById("dropdownMenu");

  if (profileIcon) {
    profileIcon.addEventListener("click", () => {
      dropdown.classList.toggle("active");
    });
  } else {
    return null;
  }
}
