document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".billing form");
  const placeOrderBtn = document.querySelector(".place-order-btn");
  const totalDisplay = document.querySelector(".checkout-total");
  const itemList = document.querySelector(".checkout-items");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function formatPrice(value) {
    return `Rs ${value.toLocaleString()}/-`;
  }

  function renderCheckoutItems() {
    itemList.innerHTML = "";

    if (cart.length === 0) {
      itemList.innerHTML = `<p style="padding: 1rem;">Your cart is empty.</p>`;
      totalDisplay.innerHTML = "";
      placeOrderBtn.disabled = true;
      return;
    }

    let total = 0;

    cart.forEach((item) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      const itemRow = document.createElement("div");
      itemRow.className = "checkout-item";
      itemRow.style.marginBottom = "1rem";
      itemRow.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <strong>${item.name}</strong><br>
            Quantity: ${item.quantity} × ${formatPrice(item.price)}
          </div>
          <div><strong>${formatPrice(subtotal)}</strong></div>
        </div>
      `;
      itemList.appendChild(itemRow);
    });

    totalDisplay.innerHTML = `<strong>Total:</strong> ${formatPrice(total)}`;
    placeOrderBtn.disabled = false;
  }

  renderCheckoutItems();

  placeOrderBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty. Please add items before checkout.");
      return;
    }

    const requiredFields = [
      "first_name", "last_name", "street_address", "town", "zip", "phone", "email"
    ];

    let valid = true;
    let firstInvalidField = null;

    requiredFields.forEach((id) => {
      const field = document.getElementById(id);
      if (!field || !field.value.trim()) {
        valid = false;
        field.style.border = "2px solid red";
        if (!firstInvalidField) firstInvalidField = field;
      } else {
        field.style.border = "";
      }
    });

    if (!valid) {
      alert("Please fill in all required fields.");
      firstInvalidField.focus();
      return;
    }

    alert("Your order has been placed successfully!");
    form.reset();
    localStorage.removeItem("cart");
    location.reload();
  });
});
