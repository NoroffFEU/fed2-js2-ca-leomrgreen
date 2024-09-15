export default function modal() {
  const modal = document.querySelector(".modal");
  const closeBtn = document.getElementById("closeBtn");
  const form = document.querySelector(".update-form");

  if (modal) {
    if (modal.classList.toggle("open")) {
      // Modal is opened
      document.body.style.overflow = "hidden"; // Disable scrolling
    }

    // Close modal when clicking outside the form
    modal.addEventListener("click", (event) => {
      if (!form.contains(event.target)) {
        modal.classList.remove("open");
        document.body.style.overflow = ""; // Re-enable scrolling
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("open");
      document.body.style.overflow = ""; // Re-enable scrolling
    });
  }
}
