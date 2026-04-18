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

function updateNavOnScroll() {
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

  const scrollPosition = window.scrollY + 140;
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      currentSection = section.id;
    }
  });

  const nearBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 20;

  if (nearBottom) {
    currentSection = "contact";
  }

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.dataset.section === currentSection
    );
  });
}

window.addEventListener("load", () => {
  revealSections();
  updateNavOnScroll();

  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname);
  }
});

window.addEventListener("scroll", () => {
  revealSections();
  updateNavOnScroll();
});

window.addEventListener("resize", updateNavOnScroll);

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

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    setTimeout(() => {
      history.replaceState(null, "", window.location.pathname);
      updateNavOnScroll();
    }, 450);
  });
});

const lightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(src, altText = "") {
  if (!lightbox || !lightboxImage) return;

  lightboxImage.src = src;
  lightboxImage.alt = altText;
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  document.body.style.overflow = "";
}

document.querySelectorAll(".project-image, .project-gallery img").forEach((img) => {
  img.addEventListener("click", () => {
    openLightbox(img.src, img.alt);
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeLightbox();
  }
});