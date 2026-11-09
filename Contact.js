
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

  // ================= REVEAL ANIMATIONS =================

  document.documentElement.classList.add("js-enabled");

  const revealElements = document.querySelectorAll(".contact-page .reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealElements.forEach(element => revealObserver.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add("active"));
  }


  // ================= CONTACT FORM =================

  const contactForm = document.getElementById("laveraContactForm");
  const successMessage = document.getElementById("contactSuccess");

  if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const formData = new FormData(contactForm);

      const name = formData.get("name");
      const email = formData.get("email");
      const phone = formData.get("phone");
      const service = formData.get("service");
      const date = formData.get("date") || "Not specified";
      const location = formData.get("location") || "Not specified";
      const message = formData.get("message");

      const subject = encodeURIComponent("New LAVÉRA Contact Enquiry");

      const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Service: ${service}\n` +
        `Preferred Pickup Date: ${date}\n` +
        `Location: ${location}\n\n` +
        `Message:\n${message}`
      );

      const emailAddress = "hello@lavera.com";

      successMessage.classList.add("show");

      window.location.href =
        `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    });
  }


  // ================= PAST DATE PREVENTION =================

  const dateInput = document.getElementById("contactDate");

  if (dateInput) {
    const today = new Date();
    const localDate = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().split("T")[0];

    dateInput.min = localDate;
  }

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
