const projects = {
  ce2025: {
    title: "Chemistry Expo 2025",
    category: "Apparel · Visual Identity · 2025",
    desc: "Merancang desain baju dan elemen ilustrasi utama untuk Chemistry Expo 2025. Desain menggabungkan tema akademis dan fantasi dengan detail visual yang kuat, tetap presisi dan elegan saat dicetak pada media pakaian.",
    images: [
      { src: "assets/images/work-ce2025-1.webp", alt: "Desain kemeja PDH Chemistry Expo 2025" },
      { src: "assets/images/work-ce2025-2.webp", alt: "Detail ilustrasi Chemistry Expo 2025" }
    ]
  },
  ce2026: {
    title: "Chemistry Expo 2026",
    category: "Mascot · Brand Identity · 2026",
    desc: "Pembuatan ilustrasi karakter maskot rubah untuk identitas visual Chemistry Expo 2026. Karakter didesain dengan pakaian tematik yang ceria, warna eye-catching, dan ornamen detail untuk memperkuat branding acara.",
    images: [
      { src: "assets/images/work-ce2026-1.webp", alt: "Maskot rubah Chemistry Expo 2026" },
      { src: "assets/images/work-ce2026-2.webp", alt: "Penerapan maskot Chemistry Expo 2026 pada media" }
    ]
  },
  apparel: {
    title: "Apparel & Merchandise",
    category: "Apparel Design · Merchandise",
    desc: "Proyek desain pakaian dan merchandise untuk mahasiswa Kimia Unila. Berfokus pada tata letak tipografi modern dan penempatan elemen grafis yang proporsional agar hasil produksi konveksi terlihat profesional dan representatif.",
    images: [
      { src: "assets/images/work-apparel.webp", alt: "Desain apparel dan merchandise mahasiswa Kimia Unila" }
    ]
  },
  art: {
    title: "Digital & Manual Art",
    category: "Illustration · Art Exploration",
    desc: "Kompilasi eksplorasi seni visual, mulai dari sketsa manual tinta di atas kertas yang menangkap ekspresi dan suasana, hingga ilustrasi potret digital bergaya semi-realis.",
    images: [
      { src: "assets/images/work-art-1.webp", alt: "Sketsa manual tinta karya Dedek Icha" },
      { src: "assets/images/work-art-2.webp", alt: "Ilustrasi potret digital semi-realis karya Dedek Icha" }
    ]
  },
  behind: {
    title: "Di Balik Karya",
    category: "Studio · Behind the Scenes",
    desc: "Potret keseharian di balik proses kreatif — ruang untuk mengamati, bereksperimen dengan gaya, dan menyempurnakan detail sebelum sebuah ide menjadi karya yang utuh.",
    images: [
      { src: "assets/images/work-behind.webp", alt: "Potret Dedek Icha di balik proses kreatif" }
    ]
  }
};

const body = document.body;
const header = document.getElementById("site-header");
const menuToggle = document.getElementById("menu-toggle");
const primaryNav = document.getElementById("primary-nav");
const toast = document.getElementById("toast");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2800);
}

function onScroll() {
  if (header) {
    header.classList.toggle("is-scrolled", window.scrollY > 18);
  }
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

function setMenu(open, restoreFocus = false) {
  if (!menuToggle) return;
  body.classList.toggle("nav-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");

  if (open) {
    const firstLink = primaryNav ? primaryNav.querySelector("a") : null;
    if (firstLink) {
      window.setTimeout(() => firstLink.focus(), 260);
    }
  } else if (restoreFocus) {
    menuToggle.focus();
  }
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    setMenu(!body.classList.contains("nav-open"));
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (body.classList.contains("nav-open")) {
        link.blur();
        setMenu(false, true);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && body.classList.contains("nav-open")) {
      setMenu(false, true);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960 && body.classList.contains("nav-open")) {
      setMenu(false);
    }
  });
}

const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const navSectionMap = new Map(
  navLinks.map((link) => [link.getAttribute("href").slice(1), link])
);
const observedSections = Array.from(document.querySelectorAll("main section[id]"));

if ("IntersectionObserver" in window && observedSections.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.remove("is-active"));
        const activeLink = navSectionMap.get(entry.target.id);
        if (activeLink) activeLink.classList.add("is-active");
      });
    },
    { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
  );

  observedSections.forEach((section) => navObserver.observe(section));
}

const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));

if ("IntersectionObserver" in window && revealElements.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

const portraitCard = document.getElementById("portrait-card");
const heroVisual = portraitCard ? portraitCard.closest(".hero-visual") : null;
const finePointer = window.matchMedia("(pointer: fine)").matches;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (portraitCard && heroVisual && finePointer && !prefersReducedMotion) {
  const maxTilt = 5;

  heroVisual.addEventListener("pointermove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    portraitCard.style.setProperty("--ry", `${(x * maxTilt * 2).toFixed(2)}deg`);
    portraitCard.style.setProperty("--rx", `${(-y * maxTilt * 2).toFixed(2)}deg`);
  });

  heroVisual.addEventListener("pointerleave", () => {
    portraitCard.style.setProperty("--ry", "0deg");
    portraitCard.style.setProperty("--rx", "0deg");
  });
}

const lightbox = document.getElementById("lightbox");
const lbClose = document.getElementById("lb-close");
const lbPrev = document.getElementById("lb-prev");
const lbNext = document.getElementById("lb-next");
const lbImage = document.getElementById("lb-image");
const lbCat = document.getElementById("lb-cat");
const lbTitle = document.getElementById("lb-title");
const lbDesc = document.getElementById("lb-desc");
const lbCounter = document.getElementById("lb-counter");
const lbThumbs = document.getElementById("lb-thumbs");

let activeProject = null;
let activeIndex = 0;
let lastFocused = null;

function renderLightbox() {
  if (!activeProject || !lbImage) return;

  const images = activeProject.images;
  const current = images[activeIndex];

  lbImage.classList.add("is-loading");
  lbImage.src = current.src;
  lbImage.alt = current.alt;

  const clearLoading = () => lbImage.classList.remove("is-loading");
  lbImage.onload = clearLoading;
  if (lbImage.complete && lbImage.naturalWidth > 0) {
    clearLoading();
  }

  lbCat.textContent = activeProject.category;
  lbTitle.textContent = activeProject.title;
  lbDesc.textContent = activeProject.desc;
  lbCounter.textContent = `${activeIndex + 1} / ${images.length}`;

  const multiple = images.length > 1;
  lbPrev.hidden = !multiple;
  lbNext.hidden = !multiple;
  lbThumbs.hidden = !multiple;
  lbCounter.hidden = !multiple;

  lbThumbs.replaceChildren();
  images.forEach((image, index) => {
    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "lightbox-thumb";
    if (index === activeIndex) thumb.classList.add("is-active");
    thumb.setAttribute("aria-label", `Tampilkan gambar ${index + 1}: ${image.alt}`);

    const thumbImage = document.createElement("img");
    thumbImage.src = image.src;
    thumbImage.alt = "";
    thumbImage.loading = "lazy";

    thumb.appendChild(thumbImage);
    thumb.addEventListener("click", () => {
      activeIndex = index;
      renderLightbox();
    });

    lbThumbs.appendChild(thumb);
  });
}

function openProject(projectId) {
  const project = projects[projectId];
  if (!project || !lightbox) return;

  activeProject = project;
  activeIndex = 0;
  lastFocused = document.activeElement;

  renderLightbox();
  body.classList.add("lb-open");

  if (!lightbox.open) {
    lightbox.showModal();
  }

  if (lbClose) lbClose.focus();
}

function closeLightbox() {
  if (lightbox && lightbox.open) {
    lightbox.close();
  }
}

function stepLightbox(direction) {
  if (!activeProject) return;
  const total = activeProject.images.length;
  activeIndex = (activeIndex + direction + total) % total;
  renderLightbox();
}

document.querySelectorAll(".work-card").forEach((card) => {
  const trigger = card.querySelector(".work-hit");
  if (!trigger) return;
  trigger.addEventListener("click", () => openProject(card.dataset.project));
});

if (lightbox) {
  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lbPrev) lbPrev.addEventListener("click", () => stepLightbox(-1));
  if (lbNext) lbNext.addEventListener("click", () => stepLightbox(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      stepLightbox(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepLightbox(-1);
    }
  });

  lightbox.addEventListener("close", () => {
    body.classList.remove("lb-open");
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  });
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {}
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) throw new Error("Copy failed");
}

const copyEmailButton = document.getElementById("copy-email");

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.email;
    if (!email) return;

    try {
      await copyText(email);
      showToast("Email berhasil disalin!");
    } catch (error) {
      showToast("Salin email secara manual: " + email);
    }
  });
}
