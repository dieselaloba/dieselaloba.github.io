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
  if (nav) {
    if (window.scrollY > 20) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  if (backToTop) {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
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
    link.classList.toggle("active", link.dataset.section === currentSection);
  });
}

window.addEventListener("load", () => {
  document.body.style.overflow = "";
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

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.dataset.section;
    const target = document.getElementById(targetId);

    if (!target || !nav) return;

    const navHeight = nav.offsetHeight;
    const extraOffset = 16;
    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - navHeight - extraOffset;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth"
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
  if (!lightbox || !lightboxImage || !src) return;

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

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    formStatus.textContent = "Sending...";

    emailjs.sendForm(
      "service_opkzx11",
      "template_gpppw9a",
      contactForm
    )
    .then(() => {
      formStatus.textContent = "Message sent. I’ll get back to you shortly.";
      contactForm.reset();
    })
    .catch((error) => {
      console.error(error);
      formStatus.textContent = "Failed to send. Try again.";
    });
  });
}