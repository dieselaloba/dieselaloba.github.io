const reveals = document.querySelectorAll(".reveal");

function revealSections() {
  const windowHeight = window.innerHeight;

  reveals.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

window.addEventListener("load", revealSections);
window.addEventListener("scroll", revealSections);
window.addEventListener("resize", revealSections);