
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



/* ================= LAVERA SERVICE DETAILS ================= */

const serviceDetails = {

"wash-fold": {
    title: "Wash & Fold",
    subtitle: "Fresh, clean and neatly folded laundry for a more effortless everyday routine.",
  image: "Images/img10.jpeg",
secondImage: "Images/img11.jpeg",
        description: "Our Wash & Fold service is designed for the clothes you wear every day. From everyday shirts and trousers to comfortable homewear and daily essentials, we make laundry care simpler through a thoughtful cleaning and finishing process. Each order is handled with attention to garment type, fabric requirements and your care instructions.",
        descriptionTwo: "Instead of spending valuable time washing, drying and folding your clothes, you can leave the routine to LAVÉRA. Your garments are cleaned, checked and neatly folded so they are easier to organise, store and wear.",
        approachTitle: "Everyday freshness.<br><em>Neatly taken care of.</em>",
        approach: "We begin by reviewing the garments and their care requirements. Suitable items are processed together with consideration for fabric type and colour. After cleaning and drying, garments are checked and folded neatly, making them convenient to put away and use.",
        points: [
            "Everyday clothing and laundry essentials",
            "Careful sorting based on garment requirements",
            "Neat folding and organised preparation"
        ],
        benefits: [
            ["fa-shirt", "Everyday Convenience", "Spend less time managing regular laundry and more time enjoying your day."],
            ["fa-droplet", "Fresh Cleaning", "A considered cleaning process for your everyday clothing and essentials."],
            ["fa-layer-group", "Neat Folding", "Garments are folded neatly to make storage and organisation easier."],
            ["fa-heart", "Thoughtful Handling", "Attention to clothing types, colours and care instructions."]
        ]
    },

    "dry-cleaning": {
        title: "Dry Cleaning",
        subtitle: "Specialised garment care for clothing that needs a more considered cleaning approach.",
      image: "Images/img8.jpeg",
secondImage: "Images/img8.jpeg",
        description: "Some garments require more than an ordinary wash. Structured clothing, selected delicate fabrics and special occasion outfits may have specific care instructions that need attention. LAVÉRA Dry Cleaning is designed for garments that are suitable for professional dry-cleaning methods.",
        descriptionTwo: "From workwear and formal outfits to selected delicate garments, we focus on appropriate handling, garment assessment and careful finishing. Our aim is to help maintain the appearance and presentation of clothing while respecting its care requirements.",
        approachTitle: "Special garments.<br><em>Special attention.</em>",
        approach: "Each garment is considered individually before processing. Care labels, fabric type and visible concerns are reviewed to help determine the appropriate handling. The garment then goes through the suitable professional cleaning and finishing process.",
        points: [
            "Suitable formal and structured garments",
            "Attention to fabric labels and care instructions",
            "Careful finishing for a neat presentation"
        ],
        benefits: [
            ["fa-user-tie", "Formal Wear Care", "A professional care option for suitable office wear and formal garments."],
            ["fa-magnifying-glass", "Garment Assessment", "Care requirements and garment condition are considered before processing."],
            ["fa-gem", "Delicate Attention", "Suitable garments receive a more considered handling approach."],
            ["fa-shirt", "Neat Finishing", "A finishing process focused on the appearance and presentation of garments."]
        ]
    },

    "ironing": {
        title: "Professional Ironing",
        subtitle: "A crisp, neat finish that helps your clothes look ready for the day ahead.",
      image: "Images/img13.jpeg",
secondImage: "Images/img13.jpeg",
        description: "Well-presented clothing can make a difference to how you feel throughout the day. Our Ironing Service is designed for garments that need a neat, smooth and well-finished appearance. From everyday shirts and trousers to suitable workwear, we help simplify the final step of your laundry routine.",
        descriptionTwo: "Instead of spending time setting up your ironing board and managing a pile of clothes, let LAVÉRA take care of the finishing. Garments are reviewed for their fabric requirements and handled with an appropriate ironing approach.",
        approachTitle: "A polished finish.<br><em>Without the effort.</em>",
        approach: "We consider garment construction, fabric type and care label instructions before ironing. The aim is to provide an appropriate finish while taking care around delicate materials, seams, collars, cuffs and other garment details.",
        points: [
            "Everyday shirts, trousers and suitable garments",
            "Fabric-conscious temperature and handling",
            "Neat preparation for wardrobe or use"
        ],
        benefits: [
            ["fa-shirt", "Neat Appearance", "Give suitable garments a smooth and well-presented finish."],
            ["fa-clock", "Save Your Time", "Make the finishing stage of your laundry routine easier."],
            ["fa-temperature-half", "Fabric Awareness", "Consideration of garment labels and suitable ironing requirements."],
            ["fa-briefcase", "Workwear Ready", "A convenient finishing option for your everyday professional wardrobe."]
        ]
    },

    "stain-removal": {
        title: "Stain Removal",
        subtitle: "Targeted attention for visible stains and everyday garment marks.",
     image: "Images/img14.png",
secondImage: "Images/img14.png",
        description: "Spills, food marks and everyday accidents can leave unwanted stains on clothing. Our Stain Removal service focuses on assessing visible marks and considering suitable treatment options based on the garment and fabric. Different stains respond differently, so the type of mark and material both matter.",
        descriptionTwo: "We believe in a careful rather than a one-method-fits-all approach. Sharing details about the stain, how long it has been present and any previous treatment can help us understand the garment's requirements before processing.",
        approachTitle: "A closer look.<br><em>A careful approach.</em>",
        approach: "The garment and stain are assessed before any treatment is considered. Fabric type, stain characteristics and previous cleaning attempts may affect the suitable method. Some stains may be permanent or may not respond fully, and results cannot be guaranteed.",
        points: [
            "Assessment of visible stains and fabric type",
            "Consideration of suitable spot-treatment methods",
            "Careful handling to help protect the garment"
        ],
        benefits: [
            ["fa-magnifying-glass", "Stain Assessment", "Understand the stain and garment before selecting a suitable approach."],
            ["fa-hand-sparkles", "Targeted Attention", "Focus on the affected area instead of treating every stain the same way."],
            ["fa-shirt", "Fabric Consideration", "Take garment material and care instructions into account."],
            ["fa-shield-heart", "Careful Treatment", "Use an appropriate approach while considering fabric sensitivity."]
        ]
    },

    "pickup-delivery": {
        title: "Pickup & Delivery",
        subtitle: "Laundry convenience that fits more comfortably into your busy schedule.",
   image: "Images/img15.png",
secondImage: "Images/img15.png",
        description: "A busy schedule can make even simple laundry tasks difficult to manage. LAVÉRA Pickup & Delivery is designed to make the laundry experience more convenient by helping you arrange collection and return of your garments, subject to service-area availability.",
        descriptionTwo: "Whether you are managing work, family responsibilities or a packed weekly routine, a convenient collection and delivery option can help reduce the time spent travelling and coordinating laundry. You can focus on your day while your laundry request is taken care of.",
        approachTitle: "Convenience at your door.<br><em>Care along the way.</em>",
        approach: "Start by selecting your preferred service and submitting your pickup details. Once availability and timing are confirmed, your garments can be collected for the selected service. After processing and final preparation, delivery can be arranged according to the confirmed schedule.",
        points: [
            "Convenient collection scheduling",
            "Service-area and timing confirmation",
            "Organised return of completed laundry"
        ],
        benefits: [
            ["fa-house", "Doorstep Convenience", "Reduce the need to travel just to manage your laundry."],
            ["fa-calendar-check", "Flexible Scheduling", "Request a collection time based on available slots."],
            ["fa-box", "Organised Collection", "Make it easier to hand over your laundry for processing."],
            ["fa-truck-fast", "Delivery Convenience", "Arrange return of completed garments where delivery is available."]
        ]
    }

};


/* ================= LOAD SELECTED SERVICE ================= */

document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);
    const serviceKey = params.get("service") || "wash-fold";

    const service = serviceDetails[serviceKey] || serviceDetails["wash-fold"];

    document.title = "LAVÉRA | " + service.title;

    const setText = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.innerHTML = value;
    };

    setText("detailTitle", service.title);
    setText("detailSubtitle", service.subtitle);
    setText("detailDescription", service.description);
    setText("detailDescriptionTwo", service.descriptionTwo);
    setText("detailApproachTitle", service.approachTitle);
    setText("detailApproach", service.approach);

    const heroImage = document.getElementById("detailHeroImage");
    const secondImage = document.getElementById("detailSecondImage");

    if (heroImage) {
        heroImage.src = service.image;
        heroImage.alt = service.title;
    }

    if (secondImage) {
        secondImage.src = service.secondImage;
        secondImage.alt = service.title + " care";
    }

    const pointsContainer = document.getElementById("informationPoints");

    if (pointsContainer) {
        pointsContainer.innerHTML = service.points.map(point => `
            <div>
                <i class="fa-solid fa-check"></i>
                ${point}
            </div>
        `).join("");
    }

    const benefitGrid = document.getElementById("benefitGrid");

    if (benefitGrid) {
        benefitGrid.innerHTML = service.benefits.map((benefit, index) => `
            <article class="benefit-card reveal" style="transition-delay:${index * 100}ms">
                <span class="benefit-icon">
                    <i class="fa-solid ${benefit[0]}"></i>
                </span>
                <h3>${benefit[1]}</h3>
                <p>${benefit[2]}</p>
            </article>
        `).join("");
    }


    /* ================= SCROLL REVEAL ================= */

    document.documentElement.classList.add("js-enabled");

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries, currentObserver) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    currentObserver.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.08
        });

        revealElements.forEach(element => observer.observe(element));

    } else {

        revealElements.forEach(element => element.classList.add("active"));

    }


    /* ================= FAQ INTERACTION ================= */

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        item.addEventListener("toggle", function () {

            if (item.open) {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) otherItem.open = false;
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

  // OPEN POPUP FROM ALL BUTTONS
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

  // CLOSE ON OUTSIDE CLICK
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closePopup();
    }
  });

  // CLOSE WITH ESCAPE
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
