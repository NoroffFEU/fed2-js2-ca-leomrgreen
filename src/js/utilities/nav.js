export default function setDropDownListener() {
  const profileIcon = document.getElementById("profile");
  const dropdown = document.getElementById("dropdownMenu");

  profileIcon.addEventListener("click", () => {
    dropdown.classList.toggle("active");
  });
}
