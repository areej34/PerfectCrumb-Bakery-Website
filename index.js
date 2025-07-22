document.addEventListener("DOMContentLoaded", () => {
  // SHOW MORE BUTTON
  const showMoreBtn = document.querySelector(".show-more");
  const items = document.querySelectorAll(".collection-grid .item-card");

  if (showMoreBtn && items.length > 0) {
    let visibleItems = 4;

    function updateVisibility() {
      items.forEach((item, index) => {
        item.style.display = index < visibleItems ? "block" : "none";
      });

      if (visibleItems >= items.length) {
        showMoreBtn.style.display = "none";
      }
    }

    // Initial call
    updateVisibility();

    showMoreBtn.addEventListener("click", () => {
      visibleItems += 4;
      updateVisibility();
    });
  }

  // === HERO ORDER NOW BUTTON ===
  const orderBtn = document.querySelector(".hero .hero-text button");
  orderBtn.addEventListener("click", () => {
    window.location.href = "Shop.html";
  });

});