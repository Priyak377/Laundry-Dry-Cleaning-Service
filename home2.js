
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
  const revealElements = document.querySelectorAll(
    ".home2-page .reveal"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("active");
    });
  }
});

// HOME 2 SCROLL REVEAL ANIMATIONS

document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(
    ".home2-page .reveal"
  );

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal-ready");
    observer.observe(element);
  });
});



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
      message.textContent = "";
    });
  });

  // CLOSE POPUP
  function closePopup() {
    modal.classList.remove("active");
    document.body.classList.remove("booking-open");
  }

  closeBtn.addEventListener("click", closePopup);

  modal.addEventListener("click", function (e) {
    if (e.target === modal) closePopup();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePopup();
  });

  // PREVENT PAST DATES
  const today = new Date();
  dateInput.min = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  ).toISOString().split("T")[0];

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

      bookings.push(booking);
      localStorage.setItem("laveraBookings", JSON.stringify(bookings));

      message.textContent =
        "Pickup request submitted! Booking ID: " + booking.id;

      message.style.color = "green";
      form.reset();

    } catch (error) {
      message.textContent = "Unable to save booking. Please try again.";
      message.style.color = "red";
    }
  });

});


