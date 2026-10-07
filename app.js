const filterButtons = [...document.querySelectorAll(".filter-btn")];
const categoryButtons = [...document.querySelectorAll(".category-card")];
const products = [...document.querySelectorAll(".product-card")];
const emptyState = document.querySelector("#emptyState");

function normalizeFilter(value) {
  if (value === "Maison") return ["Maison", "Électroménager"];
  if (value === "Divers") return ["Divers", "Boissons"];
  return [value];
}

function applyFilter(filter) {
  const matches = normalizeFilter(filter);
  let visible = 0;
  products.forEach(card => {
    const category = card.dataset.category;
    const show = filter === "Tous" || matches.includes(category);
    card.style.display = show ? "flex" : "none";
    if (show) visible++;
  });
  emptyState.style.display = visible ? "none" : "block";
  filterButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.filter === filter));
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
});

categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    applyFilter(filter === "Produits divers" ? "Divers" : filter);
    document.querySelector("#boutique").scrollIntoView({behavior:"smooth", block:"start"});
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    const id = anchor.getAttribute("href");
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:"smooth", block:"start"});
      }
    }
  });
});
