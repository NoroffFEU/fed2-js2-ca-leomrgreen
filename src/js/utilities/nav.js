export function setDropDownListener() {
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

export function toggleSearchBar() {
  const dialog = document.querySelector(".search-dialog");
  const form = document.querySelector(".search-form");

  if (dialog) {
    if (dialog.classList.toggle("open")) {
      // Modal is opened
      document.body.style.overflow = "hidden"; // Disable scrolling
    }

    // Close modal when clicking outside the form
    dialog.addEventListener("click", (event) => {
      if (!form.contains(event.target)) {
        dialog.classList.remove("open");
        document.body.style.overflow = ""; // Re-enable scrolling

        // Fetch and remove search results after dialog is closed
        const searchContainer = document.querySelectorAll(".search-container"); // Fetch again after close
        const searchBar = document.querySelector(".search-value");
        searchContainer.forEach((res) => {
          res.remove();
        });
        searchBar.value = "";
      }
    });
  }
}

export function setSearchBarListener() {
  const searchTrigger = document.getElementById("search-trigger");
  if (searchTrigger) {
    searchTrigger.addEventListener("click", () => {
      toggleSearchBar();
    });
  }
}
