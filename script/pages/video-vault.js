/**
 * VIDEO VAULT PAGE
 */

async function initVideoVaultPage() {
  injectHeader("video-vault");
  injectFooter();
  applySavedPreferences();

  await loadData({
    classes: null,
    descriptions: null,
    videoVault: CONFIG.files.videoVault,
    rooms: null,
    qi: null,
  });

  renderVideoVault(globalVideoVault);
  handleVideoVaultDeepLink();
}

/**
 * Read the ?video= query parameter, scroll to the matching
 * accordion card and expand it.
 */
function handleVideoVaultDeepLink() {
  const params = new URLSearchParams(window.location.search);
  const video = (params.get("video") || "").trim();
  if (!video) return;

  const target = utils.normalizeTitle(video);
  const cards = document.querySelectorAll("#vvCourseList .prospectus-card");

  for (const card of cards) {
    if (card.dataset.courseTitle === target) {
      const collapseEl = card.querySelector(".collapse");
      if (collapseEl && !collapseEl.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(collapseEl).show();
      }
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        card.style.boxShadow = "0 0 0 3px #c68a12";
        setTimeout(() => (card.style.boxShadow = ""), 4000);
      }, 300);
      return;
    }
  }
}

function renderVideoVault(videoData) {
  const container = document.getElementById("vvCourseList");
  const alphaContainer = document.getElementById("vvAlphabetNav");
  if (!container) return;

  const validVideos = videoData.filter(
    (d) => (d.CourseLink && d.CourseLink !== "awaiting link") || d.VideoLink || d.ExternalLink || d.ESRLink,
  );

  if (validVideos.length === 0) {
    container.innerHTML = `<div class="col-12 text-center py-5"><h4 class="text-muted">No videos found.</h4></div>`;
    return;
  }

  if (alphaContainer) {
    alphaContainer.innerHTML =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        .split("")
        .map(
          (l) =>
            `<button class="btn btn-sm text-white fw-bold border-0 p-1" onclick="filterVVByLetter('${l}')">${l}</button>`,
        )
        .join("") +
      `<button class="btn btn-sm btn-light ms-2 rounded-pill" style="color: #c68a12;" onclick="filterVVByLetter('ALL')">ALL</button>`;
  }

  container.innerHTML = validVideos
    .sort((a, b) =>
      utils.cleanTitle(a.Course).localeCompare(utils.cleanTitle(b.Course)),
    )
    .map((v, idx) => {
      const id = `vvCollapse_${idx}`;
      const normName = utils.normalizeTitle(v.Course || v.Title);
      return `
<div class="card mb-3 border shadow-sm prospectus-card" style="border-left: 5px solid #c68a12 !important; background-color: #fef9ef;" data-course-title="${normName}">
  <button class="btn w-100 text-start p-3 d-flex justify-content-between align-items-center border-0"
          style="background-color: #fef9ef;" data-bs-toggle="collapse" data-bs-target="#${id}">
      <div>
          <span class="fw-bold d-block text-dark">${utils.cleanTitle(v.Course)}</span>
          <small class="text-muted opacity-75">${v.Trainer || "Self-Directed"}</small>
      </div>
      <i class="bi bi-play-circle-fill fs-4" style="color: #c68a12;"></i>
  </button>
  <div class="collapse" id="${id}">
      <div class="card-body bg-white border-top">
          <div class="mb-3">
              <span class="badge bg-light text-dark border small"><i class="bi bi-people me-1"></i> Audience: ${v.TargetAudience || "All Staff"}</span>
          </div>
          <p class="small text-dark mb-3" style="white-space: pre-line;">${v.Description || "No description available."}</p>
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center p-3 rounded" style="background-color: #fef9ef; border: 1px solid #faeecd;">
              <span class="small fw-bold mb-2 mb-md-0" style="color: #c68a12;">Venue: ${v.Venue || "Video"}</span>
              <div class="d-flex flex-wrap">
                  ${generateActionButtons(v, "btn-warning")}
              </div>
          </div>
      </div>
  </div>
</div>`;
    })
    .join("");
}

function filterVVByLetter(letter) {
  const query = letter === "ALL" ? "" : letter.toLowerCase();
  const filtered = globalVideoVault.filter((d) => {
    const title = utils.cleanTitle(d.Course || d.Title).toLowerCase();
    return query === "" ? true : title.startsWith(query);
  });
  renderVideoVault(filtered);
}

function filterVideoVaultNew() {
  const query = document.getElementById("vvSearchInputNew").value.toLowerCase();
  const filtered = globalVideoVault.filter((d) => {
    const title = utils.cleanTitle(d.Course || d.Title).toLowerCase();
    const desc = (d.Description || "").toLowerCase();
    return title.includes(query) || desc.includes(query);
  });
  renderVideoVault(filtered);
}