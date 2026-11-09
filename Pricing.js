
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



document.addEventListener("DOMContentLoaded", () => {

  // Enable reveal animations
  document.documentElement.classList.add("js-enabled");

  const revealElements = document.querySelectorAll(".pricing-page .reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("active");
    });
  }

  // Smooth scrolling for pricing links
  document.querySelectorAll('.pricing-page a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

});



/* ================= BOOKING POPUP ================= */

document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById("bookingModal");
  const closeBtn = document.getElementById("bookingClose");
  const form = document.getElementById("pickupForm");
  const message = document.getElementById("bookingMessage");
  const dateInput = document.getElementById("pickupDate");

  if (!modal || !form) return;

  // OPEN POPUP
  document.querySelectorAll(".open-booking-popup").forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      modal.classList.add("active");
      document.body.classList.add("booking-open");

      if (message) message.textContent = "";
    });
  });

  // CLOSE POPUP
  function closePopup() {
    modal.classList.remove("active");
    document.body.classList.remove("booking-open");
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closePopup);
  }

  // OUTSIDE CLICK
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closePopup();
    }
  });

  // ESCAPE KEY
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closePopup();
    }
  });

  // PREVENT PAST DATES
  if (dateInput) {
    const today = new Date();

    const localToday = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    dateInput.min = localToday;
  }

  // SAVE BOOKING
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const booking = {
      id: "LV" + Date.now().toString().slice(-6),
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

      if (!Array.isArray(bookings)) {
        throw new Error("Invalid booking data");
      }

      bookings.push(booking);

      localStorage.setItem(
        "laveraBookings",
        JSON.stringify(bookings)
      );

      message.textContent =
        "Pickup request submitted! Booking ID: " + booking.id;

      message.style.color = "green";

      form.reset();

      if (dateInput) {
        const today = new Date();
        dateInput.min = new Date(
          today.getTime() - today.getTimezoneOffset() * 60000
        ).toISOString().split("T")[0];
      }

    } catch (error) {
      message.textContent = "Unable to save booking. Please try again.";
      message.style.color = "red";
    }
  });

});
