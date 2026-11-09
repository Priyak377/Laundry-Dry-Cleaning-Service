
const html = document.documentElement;

const themeToggle = document.getElementById("themeToggle");
const directionToggle = document.getElementById("directionToggle");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const mainHeader = document.getElementById("mainHeader");

// ================= THEME TOGGLE =================

const savedTheme = localStorage.getItem("lavera-theme") || "light";

html.setAttribute("data-theme", savedTheme);

function updateThemeIcon(theme) {
  if (!themeToggle) return;

  themeToggle.innerHTML =
    theme === "dark"
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
}

updateThemeIcon(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const newTheme =
      html.getAttribute("data-theme") === "light"
        ? "dark"
        : "light";

    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("lavera-theme", newTheme);

    updateThemeIcon(newTheme);
  });
}

// ================= RTL / LTR TOGGLE =================

if (directionToggle) {
  html.setAttribute("dir", "ltr");

  directionToggle.innerHTML =
    '<span class="direction-label">RTL</span>';

  directionToggle.addEventListener("click", () => {
    const newDirection =
      html.getAttribute("dir") === "ltr" ? "rtl" : "ltr";

    html.setAttribute("dir", newDirection);

    directionToggle.innerHTML =
      `<span class="direction-label">${newDirection === "rtl" ? "LTR" : "RTL"}</span>`;
  });
}

// ================= MOBILE MENU =================

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("active");

    menuToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';

    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ================= STICKY HEADER =================

function updateHeader() {
  if (!mainHeader) return;

  mainHeader.classList.toggle("scrolled", window.scrollY > 20);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// ================= ACTIVE NAVIGATION =================

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    {
      rootMargin: "-30% 0px -60% 0px"
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

// ================= SCROLL REVEAL ANIMATION =================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// ================= HERO IMAGE PARALLAX =================

const heroVisual = document.querySelector(".hero-visual");

if (heroVisual && window.matchMedia("(min-width: 769px)").matches) {
  const floatingOne = document.querySelector(".floating-one");
  const floatingTwo = document.querySelector(".floating-two");

  heroVisual.addEventListener("mousemove", (event) => {
    const rect = heroVisual.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    if (floatingOne) {
      floatingOne.style.translate =
        `${x * 12}px ${y * 12}px`;
    }

    if (floatingTwo) {
      floatingTwo.style.translate =
        `${x * -10}px ${y * -10}px`;
    }
  });

  heroVisual.addEventListener("mouseleave", () => {
    if (floatingOne) floatingOne.style.translate = "0 0";
    if (floatingTwo) floatingTwo.style.translate = "0 0";
  });
}


// ================= BOOK PICKUP POPUP =================

document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById("bookingModal");
  const closeBtn = document.getElementById("bookingClose");
  const form = document.getElementById("pickupForm");
  const message = document.getElementById("bookingMessage");
  const dateInput = document.getElementById("pickupDate");

  if (!modal) {
    console.error("Booking popup HTML is missing!");
    return;
  }

  // OPEN POPUP
  document.querySelectorAll(".open-booking-popup").forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      modal.classList.add("active");
      document.body.style.overflow = "hidden";

      if (message) message.textContent = "";
    });
  });

  // CLOSE POPUP
  function closePopup() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closePopup);
  }

  modal.addEventListener("click", function (e) {
    if (e.target === modal) closePopup();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePopup();
  });

  // MINIMUM DATE
  if (dateInput) {
    const today = new Date();
    const localToday = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    dateInput.min = localToday;
  }

  // SAVE BOOKING
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const booking = {
        id: "LV" + Date.now(),
        customer: document.getElementById("customerName").value.trim(),
        phone: document.getElementById("customerPhone").value.trim(),
        email: document.getElementById("customerEmail").value.trim(),
        service: document.getElementById("service").value,
        date: dateInput.value,
        time: document.getElementById("pickupTime").value,
        address: document.getElementById("pickupAddress").value.trim(),
        status: "Pending",
        createdAt: new Date().toISOString()
      };

      try {
        const bookings = JSON.parse(
          localStorage.getItem("laveraBookings") || "[]"
        );

        bookings.push(booking);

        localStorage.setItem(
          "laveraBookings",
          JSON.stringify(bookings)
        );

        message.textContent =
          "Pickup booked successfully! Booking ID: " + booking.id;

        form.reset();

      } catch (error) {
        message.textContent = "Unable to save booking. Please try again.";
      }
    });
  }

});




document.addEventListener("DOMContentLoaded", () => {

  // Current page filename
  const currentPage = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

  // All navigation links
  const navLinks = document.querySelectorAll(
    ".nav-link, .dropdown-menu a"
  );

  navLinks.forEach(link => {

    // Link filename
    const linkPage = link.getAttribute("href")
      ?.split("/")
      .pop()
      .toLowerCase();

    // Remove existing active class
    link.classList.remove("active");

    // Match current page
    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    }

  });

});