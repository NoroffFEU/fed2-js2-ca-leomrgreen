export default function modal() {
  const modal = document.querySelector(".modal");
  const closeBtn = document.getElementById("closeBtn");
  if (modal) {
    if (modal.classList.toggle("open")) {
      // Modal is opened
      document.body.style.overflow = "hidden"; // Disable scrolling
    }
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("open");
      document.body.style.overflow = ""; // Re-enable scrolling
    });
  }
}
