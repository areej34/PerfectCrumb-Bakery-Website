document.addEventListener("DOMContentLoaded", () => {
    // ======================
  // SHOP SEARCH FILTER
  // ======================
  const searchInput = document.getElementById('shopSearchInput');
  const items = document.querySelectorAll('.item-card');

  if (searchInput) {
    searchInput.addEventListener('keyup', function () {
      const query = this.value.toLowerCase();
      items.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        if (title.includes(query)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }

  // ======================
  // CART SYSTEM
  // ======================
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartIcon();
  }

  function parsePrice(priceText) {
    return parseInt(priceText.replace(/[^\d]/g, ""));
  }

  function updateCartIcon() {
    let cartIcon = document.querySelector(".fa-shopping-cart");
    let itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    if (!document.querySelector('.cart-count')) {
      let counter = document.createElement("span");
      counter.className = "cart-count";
      counter.style.background = "#ff5a5f";
      counter.style.color = "#fff";
      counter.style.fontSize = "12px";
      counter.style.padding = "2px 6px";
      counter.style.borderRadius = "50%";
      counter.style.position = "absolute";
      counter.style.top = "-8px";
      counter.style.right = "-8px";
      cartIcon.parentElement.style.position = "relative";
      cartIcon.parentElement.appendChild(counter);
    }
    document.querySelector('.cart-count').innerText = itemCount;
  }

  // Add to cart logic
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach(button => {
  button.addEventListener("click", function () {
    const card = this.closest(".item-card");

    let itemName = card.querySelector("h4").innerText;
    let itemPrice = card.querySelector("p").innerText;
    let itemImage = card.querySelector("img").getAttribute("src");  // ✅ Get image path

    let item = cart.find(i => i.name === itemName);
    if (item) {
      item.quantity++;
    } else {
      cart.push({
        id: itemName,
        name: itemName,
        price: parsePrice(itemPrice),
        quantity: 1,
        image: itemImage   // ✅ Store image path
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
    updateCart();  // Or renderCart() depending on your setup

    alert(`${itemName} added to cart!`);
  });
});


  updateCartIcon();


  // ======================
  // WISHLIST FUNCTIONALITY
  // ======================
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  const likeButtons = document.querySelectorAll(".overlay-actions .fa-heart");

  likeButtons.forEach(button => {
    button.addEventListener("click", function () {
      const card = this.closest(".item-card");
      const name = card.querySelector("h4").innerText;
      const price = parsePrice(card.querySelector("p").innerText);
      const img = card.querySelector("img").getAttribute("src");

      const alreadyInWishlist = wishlist.some(item => item.name === name);

      if (!alreadyInWishlist) {
        wishlist.push({ name, price, img });
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert(`${name} added to wishlist!`);
        this.classList.add("liked");
        this.style.color = "red";
      } else {
        wishlist = wishlist.filter(item => item.name !== name);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert(`${name} removed from wishlist.`);
        this.classList.remove("liked");
        this.style.color = "";
      }
    });
  });

// ======================
// SHARE & COMPARE ACTIONS
// ======================
const overlayActions = document.querySelectorAll(".overlay-actions span");

overlayActions.forEach(action => {
  action.addEventListener("click", function () {
    const actionType = this.textContent.trim().toLowerCase();
    // Skip "Like" button
    if (actionType.includes("like")) return;

    alert(`You clicked "${actionType.charAt(0).toUpperCase() + actionType.slice(1)}"`);
  });
});


});
