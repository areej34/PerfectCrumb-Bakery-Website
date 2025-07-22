document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".wishlist-items");
  const countSpan = document.getElementById("wishlist-count");

  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  // Render Wishlist Items
  function renderWishlist() {
    container.innerHTML = "";

    if (wishlist.length === 0) {
      container.innerHTML = "<p>Your wishlist is empty.</p>";
      if (countSpan) countSpan.textContent = "0";
      return;
    }

    wishlist.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "wishlist-card";
      card.innerHTML = `
        <img src="${item.img}" alt="${item.name}" style="width:150px; height:150px; object-fit:cover; border-radius:10px;">
        <h4>${item.name}</h4>
        <p>Rs ${item.price.toLocaleString()}</p>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;
      container.appendChild(card);
    });

    if (countSpan) countSpan.textContent = wishlist.length;
  }

  // Initial render
  renderWishlist();

  // Handle removal with event delegation
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.dataset.index;
      wishlist.splice(index, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      renderWishlist(); // Re-render and update count
    }
  });
});

    