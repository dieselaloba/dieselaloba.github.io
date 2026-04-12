const reveals = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const nav = document.querySelector(".nav");
const backToTop = document.getElementById("backToTop");

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

function updateActiveNav() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

function handleScrollEffects() {
  revealSections();
  updateActiveNav();

  if (window.scrollY > 20) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

window.addEventListener("load", handleScrollEffects);
window.addEventListener("scroll", handleScrollEffects);
window.addEventListener("resize", handleScrollEffects);

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.dataset.section;
    const target = document.getElementById(targetId);

    if (target) {
      const offset = 90;
      const top = target.offsetTop - offset;

      window.scrollTo({
        top: top,
        behavior: "smooth"
      });

      history.replaceState(null, null, window.location.pathname);
    }
  });
});