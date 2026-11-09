
/* ==================== SERVICES PAGE ANIMATIONS ==================== */

document.addEventListener("DOMContentLoaded", function () {

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver((entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }

      });

    }, {
      threshold: 0.05
    });

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach((element) => {
      element.classList.add("active");
    });

  }

});

const themeToggle = document.getElementById("themeToggle");
const directionToggle = document.getElementById("directionToggle");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

// ==================== THEME TOGGLE ====================

const savedTheme = localStorage.getItem("lavera-theme") || "light";

document.documentElement.setAttribute("data-theme", savedTheme);

if (themeToggle) {

  themeToggle.innerHTML =
    savedTheme === "dark"
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';

  themeToggle.addEventListener("click", () => {

    const html = document.documentElement;

    const newTheme =
      html.getAttribute("data-theme") === "light"
        ? "dark"
        : "light";

    html.setAttribute("data-theme", newTheme);

    themeToggle.innerHTML =
      newTheme === "dark"
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';

    localStorage.setItem("lavera-theme", newTheme);

  });
}


// ==================== RTL / LTR TOGGLE ====================

if (directionToggle) {

  // Initial Direction: LTR
  document.documentElement.setAttribute("dir", "ltr");

  directionToggle.innerHTML =
    '<span class="direction-label">RTL</span>';

  directionToggle.addEventListener("click", () => {

    const html = document.documentElement;

    const newDirection =
      html.getAttribute("dir") === "ltr" ? "rtl" : "ltr";

    html.setAttribute("dir", newDirection);

    directionToggle.innerHTML =
      `<span class="direction-label">${newDirection === "rtl" ? "LTR" : "RTL"}</span>`;

  });
}


// ==================== MOBILE MENU ====================

if (menuToggle && mainNav) {

  menuToggle.addEventListener("click", () => {

    mainNav.classList.toggle("active");

    menuToggle.innerHTML =
      mainNav.classList.contains("active")
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

  });

}

// ==================== CURRENT YEAR ====================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// ==================== NEWSLETTER ====================

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {

  newsletterForm.addEventListener("submit", function (event) {

    event.preventDefault();

    alert("Thank you for subscribing to LAVÉRA!");

    newsletterForm.reset();

  });

}


// ==================== BOOKING POPUP ====================

document.addEventListener("DOMContentLoaded", function () {

  const bookingModal = document.getElementById("bookingModal");
  const bookingClose = document.getElementById("bookingClose");

  if (!bookingModal || !bookingClose) return;

  // OPEN POPUP
  document.querySelectorAll(".open-booking-popup").forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      bookingModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // CLOSE BUTTON
  bookingClose.addEventListener("click", function () {
    bookingModal.classList.remove("active");
    document.body.style.overflow = "";
  });

  // CLOSE WHEN CLICKING OUTSIDE
  bookingModal.addEventListener("click", function (e) {
    if (e.target === bookingModal) {
      bookingModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // CLOSE WITH ESCAPE KEY
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      bookingModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

});