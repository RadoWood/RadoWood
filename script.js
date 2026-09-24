/* =========================================================
   LASEROWNIA — script.js
   Czysty JavaScript, bez zależności, bez komunikacji z backendem.
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Rok w stopce ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Tryb ciemny / jasny ----------
     Brak localStorage celowo: strona ustawia motyw na podstawie
     preferencji systemowej przy starcie, a przełącznik działa
     w ramach bieżącej wizyty. Jeśli hostujesz stronę poza Claude,
     możesz dodać zapisywanie wyboru w localStorage. */
  var root = document.documentElement;
  var themeToggle = document.getElementById("themeToggle");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");

  function setTheme(mode) {
    root.setAttribute("data-theme", mode);
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(mode === "dark"));
      themeToggle.setAttribute(
        "aria-label",
        mode === "dark" ? "Przełącz na tryb jasny" : "Przełącz na tryb ciemny"
      );
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var isDark = root.getAttribute("data-theme") === "dark";
      setTheme(isDark ? "light" : "dark");
    });
  }

  /* ---------- Menu mobilne ---------- */
  var menuToggle = document.getElementById("menuToggle");
  var navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Zamknij menu" : "Otwórz menu");
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Otwórz menu");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Odsłanianie sekcji przy scrollu ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Filtrowanie portfolio ---------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var portfolioCards = document.querySelectorAll(".portfolio-card");

  function applyFilter(filter) {
    portfolioCards.forEach(function (card) {
      var cats = (card.getAttribute("data-category") || "").split(" ");
      var isFeatured = card.hasAttribute("data-featured");
      var show = filter === "all" ? isFeatured : cats.indexOf(filter) !== -1;
      card.classList.toggle("is-hidden", !show);
    });
  }

  applyFilter("all");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      applyFilter(btn.getAttribute("data-filter"));
    });
  });

  /* ---------- Lightbox portfolio ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxMedia = document.getElementById("lightboxMedia");
  var lightboxTitle = document.getElementById("lightboxTitle");
  var lastFocused = null;

  function openLightbox(card) {
    var media = card.querySelector(".portfolio-media");
    var title = card.querySelector(".portfolio-title");
    if (!media || !title || !lightbox) return;

    lightboxMedia.innerHTML = media.innerHTML;
    lightboxTitle.textContent = title.textContent;
    lastFocused = document.activeElement;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    var closeBtn = lightbox.querySelector(".lightbox-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  portfolioCards.forEach(function (card) {
    card.addEventListener("click", function () { openLightbox(card); });
  });

  if (lightbox) {
    lightbox.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", closeLightbox);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

  /* ---------- Przycisk "Wróć na górę" ---------- */
  var backToTop = document.getElementById("backToTop");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("is-visible", window.scrollY > 640);
    }, { passive: true });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Kropka lasera podążająca po linii w hero ---------- */
  var ridgePath = document.getElementById("ridgePath");
  var laserDot = document.getElementById("laserDot");

  if (ridgePath && laserDot && !reduceMotion && "getPointAtLength" in ridgePath) {
    var length = ridgePath.getTotalLength();
    var duration = 2100;
    var delay = 500;
    var startTime = null;

    laserDot.style.opacity = "0";

    function step(timestamp) {
      if (startTime === null) startTime = timestamp + delay;
      var elapsed = timestamp - startTime;

      if (elapsed < 0) {
        requestAnimationFrame(step);
        return;
      }

      laserDot.style.opacity = "1";
      var t = Math.min(elapsed / duration, 1);
      var point = ridgePath.getPointAtLength(t * length);
      laserDot.setAttribute("cx", point.x);
      laserDot.setAttribute("cy", point.y);

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        laserDot.style.transition = "opacity .3s ease";
        laserDot.style.opacity = "0";
      }
    }
    requestAnimationFrame(step);
  } else if (laserDot) {
    laserDot.style.opacity = "0";
  }
})();
