/**
 * NAVIGATION & THEME ENGINE
 * Shared across all pages — handles search, theme selection, text scaling.
 */

/**
 * Search — redirects to the search results page with the query.
 * Works across all pages since each page is now a separate file.
 */
function searchPages() {
  const input = document.getElementById("searchInput");
  if (!input) return;
  const query = input.value.trim();
  if (query === "") return; // stay on current page if empty
  window.location.href = `search.html?q=${encodeURIComponent(query)}`;
}

/**
 * Clear the search input and hide the clear button.
 */
function clearSearch() {
  const input = document.getElementById("searchInput");
  const clearBtn = document.getElementById("searchClearBtn");
  if (!input) return;
  input.value = "";
  input.focus();
  if (clearBtn) clearBtn.style.display = "none";
}

/**
 * Show/hide the clear button based on focus and input content:
 * hidden while the input is focused, shown when blurred with text present.
 */
function initSearchClearButton() {
  const input = document.getElementById("searchInput");
  const clearBtn = document.getElementById("searchClearBtn");
  if (!input || !clearBtn) return;

  const update = () => {
    clearBtn.style.display = input.value.trim() !== "" ? "flex" : "none";
  };

  update();
  input.addEventListener("input", update);
}

/**
 * Theme selector — wire up the high-contrast toggle button after header injection.
 */
function initThemeSelector() {
  const toggle = document.getElementById("contrastToggle");
  if (!toggle) return;

  // Sync button state with the currently saved theme
  const savedTheme = localStorage.getItem("user-theme") || "blue";
  const isContrast = savedTheme === "contrast";
  toggle.setAttribute("aria-pressed", String(isContrast));
  toggle.classList.toggle("is-active", isContrast);

  toggle.addEventListener("click", () => {
    // Read current state from the button so we can't get out of sync
    const currentlyContrast = toggle.getAttribute("aria-pressed") === "true";
    const nextTheme = currentlyContrast ? "blue" : "contrast";

    document.body.classList.forEach((className) => {
      if (className.startsWith("theme-")) {
        document.body.classList.remove(className);
      }
    });

    document.body.classList.add(`theme-${nextTheme}`);
    localStorage.setItem("user-theme", nextTheme);

    const nowContrast = nextTheme === "contrast";
    toggle.setAttribute("aria-pressed", String(nowContrast));
    toggle.classList.toggle("is-active", nowContrast);
  });
}

/**
 * Text scaling — persists across pages via localStorage.
 */
function setTextSize(scaleClass) {
  const scales = ["scale-small", "scale-medium", "scale-large", "scale-xlarge"];
  document.body.classList.remove(...scales);
  document.body.classList.add(scaleClass);
  localStorage.setItem("user-font-scale", scaleClass);
}

/**
 * Apply saved theme and text size on page load.
 * Call this on every page's DOMContentLoaded.
 */
function applySavedPreferences() {
  const savedTheme = localStorage.getItem("user-theme") || "blue";
  const toggle = document.getElementById("contrastToggle");
  if (toggle) {
    const isContrast = savedTheme === "contrast";
    toggle.setAttribute("aria-pressed", String(isContrast));
    toggle.classList.toggle("is-active", isContrast);
  }
  document.body.classList.add(`theme-${savedTheme}`);

  const savedScale = localStorage.getItem("user-font-scale") || "scale-medium";
  setTextSize(savedScale);
}