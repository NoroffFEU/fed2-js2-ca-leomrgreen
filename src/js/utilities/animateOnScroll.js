export default function animateOnScroll() {
  const observer = new IntersectionObserver((entires) => {
    entires.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((element) => observer.observe(element));
}
