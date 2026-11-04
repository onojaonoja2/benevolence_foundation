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
