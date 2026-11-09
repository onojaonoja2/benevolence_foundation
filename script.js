const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector("#primary-navigation");

if (menuToggle && primaryNavigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    primaryNavigation.classList.toggle("is-open", !isExpanded);
  });

  primaryNavigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      primaryNavigation.classList.remove("is-open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      menuToggle.setAttribute("aria-expanded", "false");
      primaryNavigation.classList.remove("is-open");
      menuToggle.focus();
    }
  });
}

const symptomInputs = document.querySelectorAll('input[name="symptoms"]');
const symptomFeedback = document.querySelector("#symptom-feedback");

if (symptomInputs.length && symptomFeedback) {
  const feedbackMessage = symptomFeedback.querySelector("p");

  symptomInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const selectedCount = document.querySelectorAll('input[name="symptoms"]:checked').length;
      const hasMultipleSymptoms = selectedCount >= 2;

      symptomFeedback.classList.toggle("is-advisory", hasMultipleSymptoms);
      feedbackMessage.textContent = hasMultipleSymptoms
        ? "You’ve selected two or more symptoms. Consider arranging a basic blood sugar screening and speaking with a healthcare professional. This checklist is not a diagnosis."
        : selectedCount === 1
          ? "One symptom selected. Symptoms can have many causes—consider a screening if you’re concerned."
          : "Select any symptoms that apply. We’ll offer a gentle next step.";
    });
  });
}

const cityTabs = [...document.querySelectorAll(".city-tab")];
const locationCards = [...document.querySelectorAll(".location-card")];
const locationList = document.querySelector("#center-list");

function selectCity(city, focusTab = false) {
  const activeTab = cityTabs.find((tab) => tab.dataset.city === city);
  if (!activeTab || !locationList) return;

  cityTabs.forEach((tab) => {
    const isSelected = tab === activeTab;
    tab.classList.toggle("is-active", isSelected);
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
  });

  locationCards.forEach((card) => {
    card.hidden = card.dataset.city !== city;
  });

  locationList.setAttribute("aria-labelledby", activeTab.id);
  if (focusTab) activeTab.focus();
}

cityTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectCity(tab.dataset.city));
  tab.addEventListener("keydown", (event) => {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % cityTabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + cityTabs.length) % cityTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = cityTabs.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      selectCity(cityTabs[nextIndex].dataset.city, true);
    }
  });
});

const currentYear = document.querySelector("#current-year");
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

const outreachDialog = document.querySelector(".outreach-dialog");
const outreachDialogImage = document.querySelector(".outreach-dialog-image");
const outreachDialogCaption = document.querySelector("#outreach-dialog-caption");
const outreachDialogClose = document.querySelector(".outreach-dialog-close");

if (
  outreachDialog
  && outreachDialogImage
  && outreachDialogCaption
  && outreachDialogClose
  && typeof outreachDialog.showModal === "function"
) {
  document.querySelectorAll(".outreach-photo").forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.querySelector("img");
      const caption = button.closest("figure")?.querySelector("figcaption");
      if (!image || !caption) return;

      outreachDialogImage.src = image.currentSrc || image.src;
      outreachDialogImage.alt = image.alt;
      outreachDialogCaption.textContent = caption.textContent;
      outreachDialog.showModal();
    });
  });

  outreachDialogClose.addEventListener("click", () => outreachDialog.close());
  outreachDialog.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      outreachDialog.close();
    }
  });
  outreachDialog.addEventListener("click", (event) => {
    if (event.target === outreachDialog) outreachDialog.close();
  });
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
  const revealSelector = [
    ".intro-copy",
    ".intro-visual",
    ".purpose-section .section-heading",
    ".purpose-card",
    ".menace-section .section-heading",
    ".menace-image",
    ".stat-card",
    ".complications-section .section-heading",
    ".complication-photo",
    ".complication-card",
    ".symptoms-content",
    ".symptoms-visual",
    ".centers-top",
    ".centers-visual",
    ".centers-panel",
    ".centers-bottom-cta",
    ".outreach-section .section-heading",
    ".outreach-card",
  ].join(", ");
  const revealTargets = document.querySelectorAll(revealSelector);

  [".purpose-grid", ".stat-stack", ".complication-cards", ".outreach-grid"].forEach((groupSelector) => {
    document.querySelectorAll(groupSelector).forEach((group) => {
      [...group.children].forEach((item, index) => {
        item.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 90}ms`);
      });
    });
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

  document.documentElement.classList.add("motion-ready");
  revealTargets.forEach((target) => {
    target.classList.add("reveal");
    revealObserver.observe(target);
  });
}
