document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.querySelector(".cart-items");
  const priceDisplay = document.querySelector(".cart-summary p");

  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Render cart
  function renderCart() {
    cartContainer.innerHTML = "";
    if (cart.length === 0) {
      cartContainer.innerHTML = `<p style="padding: 1rem;">Your cart is empty.</p>`;
      priceDisplay.innerHTML = `<strong>Total:</strong> Rs 0/-`;
      return;
    }

    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h3 class="cart-item-title">${item.name}</h3>
          <p class="cart-item-price">Rs ${item.price.toLocaleString()}</p>
          <div class="cart-item-controls">
            <label for="quantity-${index}">Qty:</label>
            <input type="number" id="quantity-${index}" value="${item.quantity}" min="1" class="cart-item-qty" data-index="${index}">
          </div>
        </div>
        <button class="cart-remove" data-index="${index}" aria-label="Remove item">
          <i class="fas fa-trash"></i>
        </button>
      `;
      cartContainer.appendChild(itemDiv);
    });

    updateTotal();
  }

  // Update total price
  function updateTotal() {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    priceDisplay.innerHTML = `<strong>Total:</strong> Rs ${total.toLocaleString()}/-`;
  }

  // Handle quantity changes
  cartContainer.addEventListener("input", (e) => {
    if (e.target.classList.contains("cart-item-qty")) {
      const index = e.target.dataset.index;
      cart[index].quantity = Math.max(1, parseInt(e.target.value));
      localStorage.setItem("cart", JSON.stringify(cart));
      updateTotal();
    }
  });

  // Handle item removal
  cartContainer.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".cart-remove");
    if (removeBtn) {
      const index = removeBtn.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  });

  renderCart();
});

