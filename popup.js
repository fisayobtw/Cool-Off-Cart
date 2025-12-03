document.addEventListener("DOMContentLoaded", () => {
  const headerSub = document.getElementById("headerSub");

  const loginView = document.getElementById("view-login");
  const cartView = document.getElementById("view-cart");
  const settingsView = document.getElementById("view-settings");

  const navCart = document.getElementById("navCart");
  const navSettings = document.getElementById("navSettings");

  const loginBtn = document.getElementById("loginBtn");
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");

  const waitSlider = document.getElementById("waitSlider");
  const waitLabel = document.getElementById("waitLabel");
  const triggerGrid = document.getElementById("triggerGrid");
  const itemAmountSelect = document.getElementById("itemAmountSelect");

  const shoeStatus = document.getElementById("shoeStatus");
  const checkoutBtn = document.getElementById("checkoutBtn");

  let loggedIn = false;
  let waitMinutes = parseInt(waitSlider.value, 10); // 60 default
  let triggerSeconds = 5;

  function showView(name) {
    // Hide all
    [loginView, cartView, settingsView].forEach((v) => {
      v.classList.remove("active");
    });
    [navCart, navSettings].forEach((n) => n.classList.remove("active"));

    if (!loggedIn) {
      // force login first
      loginView.classList.add("active");
      headerSub.textContent = "Welcome";
      return;
    }

    if (name === "cart") {
      cartView.classList.add("active");
      navCart.classList.add("active");
      headerSub.textContent = "Shopping";
    } else if (name === "settings") {
      settingsView.classList.add("active");
      navSettings.classList.add("active");
      headerSub.textContent = "Settings";
    }
  }

  // Initial state – show login
  loginView.classList.add("active");
  headerSub.textContent = "Welcome";

  loginBtn.addEventListener("click", () => {
    if (!emailInput.value || !passwordInput.value) {
      alert("Please enter your email and password (prototype only).");
      return;
    }
    loggedIn = true;
    // after login, go straight to cart
    loginView.classList.remove("active");
    showView("cart");
  });

  navCart.addEventListener("click", () => showView("cart"));
  navSettings.addEventListener("click", () => showView("settings"));

  // Wait time slider label
  function updateWaitLabel() {
    waitMinutes = parseInt(waitSlider.value, 10);
    if (waitMinutes < 1200) {
      waitLabel.textContent = `${waitMinutes} min`;
    } else {
      waitLabel.textContent = `${waitMinutes / 60} hour`;
    }
  }
  waitSlider.addEventListener("input", updateWaitLabel);
  updateWaitLabel();

  // Cool off trigger selection
  triggerGrid.addEventListener("click", (e) => {
    const btn = e.target.closest(".trigger-btn");
    if (!btn) return;
    triggerSeconds = parseInt(btn.dataset.seconds, 10);
    Array.from(triggerGrid.querySelectorAll(".trigger-btn")).forEach((b) =>
      b.classList.remove("active")
    );
    btn.classList.add("active");
  });

    // Cart interactions
    checkoutBtn.addEventListener("click", () => {
        chrome.tabs.create({
            url: "https://www.nike.com/t/sportswear-t-shirt-t7mFK69L/HV0178-010"
        });
    });


  // Simple countdown demo for the locked item (starts at 5 minutes)
  let remainingSeconds = 5 * 600;
  function formatTime(sec) {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }
  setInterval(() => {
    if (remainingSeconds <= 0) {
      shoeStatus.textContent = "✓ Ready for Purchase";
      shoeStatus.classList.remove("locked");
      shoeStatus.classList.add("ready");
      return;
    }
    remainingSeconds -= 1;
    shoeStatus.textContent = `Locked for ${formatTime(remainingSeconds)}`;
  }, 1000);
});

