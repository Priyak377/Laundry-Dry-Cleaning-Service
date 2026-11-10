
document.addEventListener("DOMContentLoaded", () => {





  const html = document.documentElement;

  const todayDate = document.getElementById("todayDate");

  if (todayDate) {
    todayDate.textContent = new Intl.DateTimeFormat("en-IN", {
      weekday: "long",
      month: "long",
      day: "2-digit",
      year: "numeric"
    }).format(new Date()).toUpperCase();
  }


  const themeToggle = document.getElementById("dashboardThemeToggle");
  const savedTheme = localStorage.getItem("lavera-theme") || "light";

  html.setAttribute("data-theme", savedTheme);

  function updateThemeIcon() {
    if (!themeToggle) return;

    themeToggle.innerHTML =
      html.getAttribute("data-theme") === "dark"
        ? '<i class="fa-regular fa-sun"></i>'
        : '<i class="fa-regular fa-moon"></i>';
  }

  updateThemeIcon();

  themeToggle?.addEventListener("click", () => {
    const currentTheme = html.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", nextTheme);
    localStorage.setItem("lavera-theme", nextTheme);

    updateThemeIcon();
  });


  const directionToggle = document.getElementById("dashboardDirectionToggle");
  const savedDirection = localStorage.getItem("lavera-direction") || "ltr";

  html.setAttribute("dir", savedDirection);

  function updateDirectionButton() {
    if (!directionToggle) return;

    directionToggle.textContent =
      html.getAttribute("dir") === "rtl" ? "LTR" : "RTL";
  }

  updateDirectionButton();

  directionToggle?.addEventListener("click", () => {
    const currentDirection = html.getAttribute("dir");
    const nextDirection = currentDirection === "rtl" ? "ltr" : "rtl";

    html.setAttribute("dir", nextDirection);
    localStorage.setItem("lavera-direction", nextDirection);

    updateDirectionButton();
  });

  const sidebar = document.getElementById("sidebar");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const sidebarClose = document.getElementById("sidebarClose");
  const sidebarOverlay = document.getElementById("sidebarOverlay");

  function openSidebar() {
    sidebar?.classList.add("open");
    sidebarOverlay?.classList.add("show");
  }

  function closeSidebar() {
    sidebar?.classList.remove("open");
    sidebarOverlay?.classList.remove("show");
  }

  mobileMenuBtn?.addEventListener("click", openSidebar);
  sidebarClose?.addEventListener("click", closeSidebar);
  sidebarOverlay?.addEventListener("click", closeSidebar);


  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(item => item.classList.remove("active"));
      link.classList.add("active");

      closeSidebar();
    });
  });



  const searchInput = document.getElementById("dashboardSearch");
  const ordersTableBody = document.getElementById("ordersTableBody");

  searchInput?.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase().trim();
    const rows = ordersTableBody?.querySelectorAll("tr") || [];

    rows.forEach(row => {
      const rowText = row.textContent.toLowerCase();
      row.style.display = rowText.includes(searchValue) ? "" : "none";
    });
  });


  const revenuePeriod = document.getElementById("revenuePeriod");
  const revenueAmount = document.getElementById("revenueAmount");
  const chartLabels = document.getElementById("chartLabels");

  const revenueData = {
    week: {
      amount: "₹58,420",
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    month: {
      amount: "₹2,48,650",
      labels: ["01", "05", "10", "15", "20", "25", "30"]
    },
    year: {
      amount: "₹24,86,500",
      labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov", "Dec"]
    }
  };

  revenuePeriod?.addEventListener("change", () => {
    const selected = revenueData[revenuePeriod.value];

    if (!selected) return;

    revenueAmount.textContent = selected.amount;

    chartLabels.innerHTML = selected.labels
      .map(label => `<span>${label}</span>`)
      .join("");
  });


  const notificationButton = document.getElementById("notificationButton");

  notificationButton?.addEventListener("click", () => {
    alert("You have 3 new notifications:\n\n1. New laundry order received.\n2. Pickup scheduled for today.\n3. New customer enquiry received.");
  });


  document.querySelectorAll(".table-action").forEach(button => {
    button.addEventListener("click", () => {
      const row = button.closest("tr");
      const orderId = row?.querySelector(".order-id")?.textContent || "Order";

      alert(`You selected ${orderId}.\n\nConnect your order details page to view full information.`);
    });
  });



  document.querySelectorAll(".progress-track span").forEach(bar => {
    const progress = bar.style.getPropertyValue("--progress");

    if (progress) {
      bar.style.width = progress;
    }
  });

});
const profileMenu = document.getElementById("profileMenu");
const profileDropdown = document.getElementById("profileDropdown");

profileMenu?.addEventListener("click", (e) => {
  e.stopPropagation();
  profileDropdown?.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".profile-wrapper")) {
    profileDropdown?.classList.remove("show");
  }
});

function handleLogout() {
    if (confirm("Are you sure you want to log out?")) {
        sessionStorage.removeItem("laveraLoggedIn");
        window.location.replace("dashboardlogin.html");
    }
}

document.getElementById("sidebarLogoutBtn")
    ?.addEventListener("click", handleLogout);

document.getElementById("logoutBtn")
    ?.addEventListener("click", handleLogout);