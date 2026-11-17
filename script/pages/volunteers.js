/**
 * VOLUNTEERS PAGES
 * Each volunteer page (home, FAQs, feedback, support) is a separate file that
 * shares the site-wide injected header/footer. Pass the active nav key so the
 * Volunteers dropdown highlights the correct sub-page.
 */
function initVolunteersPage(activePage) {
  injectHeader(activePage);
  injectFooter();
  applySavedPreferences();
}