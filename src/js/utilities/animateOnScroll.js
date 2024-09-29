// this function uses the in-built IntersectionObserver API in the webbrowser to
// search for elements that are in view. Then the function will apply different css properties based
// on which elements that are visible on the screen

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
