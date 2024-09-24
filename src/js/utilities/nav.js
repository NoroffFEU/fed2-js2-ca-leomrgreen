export default function setDropDownListener() {
  const profileIcon = document.getElementById("profile");
  const dropdown = document.getElementById("dropdownMenu");

  if (profileIcon) {
    profileIcon.addEventListener("click", () => {
      dropdown.classList.toggle("active");

      // handle outside click function
      if (dropdown.classList.contains("active")) {
        document.body.addEventListener("click", (e) => {
          if (!profileIcon.contains(e.target)) {
            dropdown.classList.remove("active");
          }
        });
      } else {
        return null;
      }
    });
  } else {
    return null;
  }
}
