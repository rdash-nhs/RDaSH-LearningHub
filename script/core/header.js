/**
 * Shared header component — injected into every page.
 * Call injectHeader('home') on each page, passing the active nav item key.
 *
 * Nav keys: home | educator | learner | feedback | catalogue | video-vault |
 *           qi | mast | rooms | faqs | volunteers (parent, opens dropdown) |
 *           volunteer-faqs | volunteer-feedback | volunteer-support
 */
function injectHeader(activePage) {
  const navItems = [
    { key: "home",         label: "Home",                 href: "index.html" },
    { key: "educator",     label: "Educator",             href: "educator.html" },
    { key: "learner",      label: "Learner",              href: "learner.html" },
    { key: "feedback",     label: "Feedback",             href: "feedback.html" },
    { key: "catalogue",    label: "Course Catalogue",     href: "course-catalogue.html" },
    { key: "video-vault",  label: "Video Vault",          href: "video-vault.html" },
    { key: "qi",           label: "Quality Improvement",  href: "quality-improvement.html" },
    { key: "mast",         label: "MAST",                 href: "mast.html" },
    { key: "rooms",        label: "Rooms",                href: "rooms.html" },
    { key: "faqs",         label: "FAQs",                 href: "faqs.html" },
  ];

  // Volunteer sub-pages shown as a hover dropdown on the Volunteers nav item.
  const volunteerSubPages = [
    { key: "volunteer-home",      label: "Home",     href: "volunteer-home.html" },
    { key: "volunteer-faqs",      label: "FAQs",     href: "volunteer-faqs.html" },
    { key: "volunteer-feedback",  label: "Feedback", href: "volunteer-feedback.html" },
    { key: "volunteer-support",   label: "Support",  href: "volunteer-support.html" },
  ];
  const volunteerActive =
    activePage === "volunteer-home" ||
    activePage === "volunteers" ||
    activePage === "volunteer-faqs" ||
    activePage === "volunteer-feedback" ||
    activePage === "volunteer-support";

  const volunteerLinks = volunteerSubPages
    .map(
      (item) =>
        `<a class="dropdown-item ${activePage === item.key ? "active" : ""}" href="${item.href}">${item.label}</a>`,
    )
    .join("\n              ");

  const volunteerDropdown = `
      <li class="nav-item dropdown nav-dropdown-hover">
        <a class="nav-link dropdown-toggle ${volunteerActive ? "active" : ""}" href="volunteer-home.html" aria-haspopup="true" aria-expanded="false">Volunteers</a>
        <ul class="dropdown-menu">
              ${volunteerLinks}
        </ul>
      </li>`;

  const navLinks = navItems
    .map(
      (item) =>
        `<li class="nav-item"><a class="nav-link ${activePage === item.key ? "active" : ""}" href="${item.href}">${item.label}</a></li>`,
    )
    .join("\n              ") + "\n              " + volunteerDropdown;

  const headerHTML = `
  <header class="nhs-header">
    <div class="container">
      <div class="brand-row">
        <img src="Assets/learning_hub.svg" class="header-left-logo" alt="Learning Hub logo" />
        <h1></h1>
        <img src="Assets/rdashwhite.PNG" class="header-right-logo" alt="RDaSH logo" />
      </div>
      <nav class="navbar navbar-expand-lg">
        <div class="container px-0 d-flex align-items-center">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-center" id="navMenu">
            <ul class="navbar-nav">
              ${navLinks}
            </ul>
          </div>
          <div style="width: 100px;" class="d-none d-lg-block"></div>
        </div>
      </nav>
      <div class="container mt-3">
        <div class="row align-items-center g-2">
          <div class="col">
            <div class="nhsuk-search-input">
              <div class="nhsuk-input-wrapper nhsuk-search-input__wrapper">
                <input class="nhsuk-input nhsuk-search-input__input" id="searchInput" name="search" type="search" placeholder="" autocomplete="off" aria-label="Search" onkeyup="if(event.key==='Enter')searchPages()">
                <button class="nhsuk-search-input__clear" id="searchClearBtn" type="button" aria-label="Clear search" onclick="clearSearch()" title="Clear search" style="display: none;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" focusable="false" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                <button class="nhsuk-button nhsuk-search-input__button" id="searchSubmitBtn" type="submit" aria-label="Search" onclick="searchPages()" title="Search (press Return)">
                  <svg class="nhsuk-icon nhsuk-icon--search" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" focusable="false" aria-hidden="true">
                    <path d="m20.7 18.9-4.1-4.1a7 7 0 1 0-1.4 1.4l4 4.1a1 1 0 0 0 1.5 0c.4-.4.4-1 0-1.4ZM6 10.6a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div class="col-auto">
            <div class="d-flex flex-wrap align-items-center gap-2 control-toolbar p-2 rounded">
              <button id="contrastToggle" type="button"
                class="nhs-contrast-toggle"
                aria-pressed="false" aria-label="Toggle high contrast mode">
                <span class="contrast-toggle-icon" aria-hidden="true">◑</span>
                <span class="contrast-toggle-label">High Contrast</span>
              </button>
              <div class="btn-group btn-group-sm" role="group" aria-label="Text Size">
                <button onclick="setTextSize('scale-small')" class="btn btn-outline-secondary">A–</button>
                <button onclick="setTextSize('scale-medium')" class="btn btn-outline-secondary">A</button>
                <button onclick="setTextSize('scale-large')" class="btn btn-outline-secondary">A+</button>
                <button onclick="setTextSize('scale-xlarge')" class="btn btn-outline-secondary">A++</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>`;

  const mount = document.getElementById("header-mount");
  if (mount) mount.innerHTML = headerHTML;

  mount?.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      link.classList.remove("nav-link-flash");
      void link.offsetWidth;
      link.classList.add("nav-link-flash");
      window.setTimeout(() => link.classList.remove("nav-link-flash"), 220);
    });
  });

  // Apply the same yellow "pressed" flash to dropdown items on click.
  // Navigation is delayed briefly so the flash (yellow background + black
  // border) is visible before the page unloads, matching the nav-link behaviour.
  mount?.querySelectorAll(".nav-dropdown-hover .dropdown-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      item.classList.remove("nav-link-flash");
      void item.offsetWidth;
      item.classList.add("nav-link-flash");
      const href = item.getAttribute("href");
      window.setTimeout(() => {
        if (href) window.location.href = href;
      }, 150);
    });
  });

  // Keep the Volunteers dropdown's aria-expanded in sync with its hover/focus
  // state. The link navigates on click, so Bootstrap is not managing it.
  const volunteerToggle = mount?.querySelector(".nav-dropdown-hover > .dropdown-toggle");
  const volunteerItem = mount?.querySelector(".nav-dropdown-hover");
  if (volunteerToggle && volunteerItem) {
    const setExpanded = (open) =>
      volunteerToggle.setAttribute("aria-expanded", open ? "true" : "false");
    volunteerItem.addEventListener("mouseenter", () => setExpanded(true));
    volunteerItem.addEventListener("mouseleave", () => setExpanded(false));
    volunteerToggle.addEventListener("focus", () => setExpanded(true));
    volunteerToggle.addEventListener("blur", (e) => {
      // Only collapse when focus leaves the dropdown entirely.
      if (!volunteerItem.contains(e.relatedTarget)) setExpanded(false);
    });
  }

  // Wire up theme selector after injection
  initThemeSelector();
  initSearchClearButton();
}

/**
 * Shared footer component — injected into every page.
 */
function injectFooter() {
  const footerHTML = `
  <footer class="site-footer mt-auto py-5">
    <div class="container text-center">
      <div class="row mb-3">
        <div class="col">
          <h6 class="text-uppercase fw-bold mb-1" style="font-size: 0.75rem; letter-spacing: 2px;">
            RDaSH Learning Hub
          </h6>
          <p class="small mb-0"></p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <button class="btn btn-sm btn-back-to-top rounded-pill px-3"
            onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
            <i class="bi bi-arrow-up me-1"></i> Back to Top
          </button>
        </div>
      </div>
    </div>
  </footer>`;

  const mount = document.getElementById("footer-mount");
  if (mount) mount.innerHTML = footerHTML;
}

/**
 * Shared class modal — injected into every page that needs it.
 */
function injectClassModal() {
  const modalHTML = `
  <div class="modal fade" id="classModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content border-0 shadow-lg rounded-4">
        <div class="modal-header border-0 pb-0">
          <div class="d-flex align-items-center">
            <div class="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
              <i class="bi bi-journal-bookmark-fill text-primary fs-4"></i>
            </div>
            <h5 class="modal-title fw-bold text-dark" id="modalTitle">Course Details</h5>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-4">
          <div id="modalDetails"></div>
        </div>
        <div class="modal-footer border-0 pt-0 pb-4 px-4 justify-content-between">
          <button type="button" class="btn btn-light rounded-pill px-4 text-muted fw-bold" data-bs-toggle="modal"
            data-bs-target="#classModal">
            <i class="bi bi-x-lg me-1"></i> Close
          </button>
          <a id="modalLink" href="#" target="_blank" class="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm"
            style="display:none;">
            Book on ESR <i class="bi bi-arrow-right-short ms-1"></i>
          </a>
        </div>
      </div>
    </div>
  </div>`;

  const mount = document.getElementById("modal-mount");
  if (mount) mount.innerHTML = modalHTML;
}