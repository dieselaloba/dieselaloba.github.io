const reveals = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section[id], header[id]");
const navLinks = document.querySelectorAll(".nav-links a");
const nav = document.querySelector(".nav");
const backToTop = document.getElementById("backToTop");

const lightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

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
    nav.classList.toggle("scrolled", window.scrollY > 20);
  }

  if (backToTop) {
    backToTop.classList.toggle("show", window.scrollY > 300);
  }

  const scrollPosition = window.scrollY + (nav ? nav.offsetHeight : 0) + 24;
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      currentSection = section.id;
    }
  });

  const nearBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;

  if (nearBottom) {
    currentSection = "contact";
  }

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.section === currentSection);
  });
}

function scrollToSection(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const navHeight = nav ? nav.offsetHeight : 0;
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
}

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
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const isResume = link.id === "resumeNav";

    if (isResume && window.innerWidth <= 768) {
      const target = document.getElementById("heroText");
      if (!target) return;

      const navHeight = nav ? nav.offsetHeight : 0;
      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - navHeight - 10;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth"
      });

      setTimeout(() => {
        history.replaceState(null, "", window.location.pathname);
        updateNavOnScroll();
      }, 450);

      return;
    }

    scrollToSection(link.dataset.section);
  });
});

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

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    formStatus.textContent = "Sending...";

    emailjs
      .sendForm("service_opkzx11", "template_gpppw9a", contactForm)
      .then(() => {
        formStatus.textContent = "Message sent. I’ll get back to you shortly.";
        contactForm.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        formStatus.textContent = "Failed to send. Try again.";
      });
  });

  
}