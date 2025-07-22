document.addEventListener("DOMContentLoaded", () => {
  // === SEARCH BAR TOGGLE ===
  const searchToggle = document.getElementById("search-toggle");
  const searchBar = document.getElementById("search-bar");
  const closeSearch = document.getElementById("close-search");
  searchBar.style.display = "none";
  updateCartIcon();

  searchToggle.addEventListener("click", (e) => {
    e.preventDefault();
    searchBar.style.display = "flex";
    searchBar.querySelector("input").focus();
  });

  closeSearch.addEventListener("click", () => {
    searchBar.style.display = "none";
  });

  document.addEventListener("click", (e) => {
    if (!searchBar.contains(e.target) && !searchToggle.contains(e.target)) {
      searchBar.style.display = "none";
    }
  });

  // === NEWSLETTER SUBSCRIPTION ===
  const newsletterForm = document.querySelector("footer .newsletter form");
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector("input").value;
    if (email && validateEmail(email)) {
      alert("Thank you for subscribing!");
      newsletterForm.reset();
    } else {
      alert("Please enter a valid email address.");
    }
  });

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

});