const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const cafeCards = [...document.querySelectorAll(".cafe-card")];
const noResults = document.querySelector("#noResults");

function applySearch(value) {
  const query = value.trim().toLowerCase();
  let matches = 0;

  cafeCards.forEach((card) => {
    const searchable = `${card.dataset.name} ${card.dataset.tags}`.toLowerCase();
    const visible = !query || searchable.includes(query);
    card.hidden = !visible;
    if (visible) matches += 1;
  });

  if (noResults) {
    noResults.hidden = matches !== 0;
  }
}

if (searchForm && searchInput) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    applySearch(searchInput.value);
    document.querySelector("#nearby").scrollIntoView({ behavior: "smooth" });
  });

  searchInput.addEventListener("input", () => applySearch(searchInput.value));
}

document.querySelectorAll(".save-button").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("saved");
    button.textContent = button.classList.contains("saved") ? "♥" : "♡";
  });
});

if (searchInput) {
  document.querySelectorAll(".collection-card").forEach((card) => {
    card.addEventListener("click", () => {
      const filter = card.dataset.filter;
      searchInput.value = filter;
      applySearch(filter);
      document.querySelector("#nearby").scrollIntoView({ behavior: "smooth" });
    });
  });
}

const collectionGrid = document.querySelector("#collectionGrid");
if (collectionGrid) {
  document.querySelector("#nextCollection").addEventListener("click", () => {
    collectionGrid.scrollBy({ left: 280, behavior: "smooth" });
  });
  document.querySelector("#prevCollection").addEventListener("click", () => {
    collectionGrid.scrollBy({ left: -280, behavior: "smooth" });
  });
}

const contactForm = document.querySelector("#contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector("#formSuccess").hidden = false;
    contactForm.reset();
  });
}
