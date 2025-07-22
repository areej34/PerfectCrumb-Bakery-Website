function updateCartIcon() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  let icon = document.querySelector(".fa-shopping-cart");

  if (!document.querySelector('.cart-count')) {
    let counter = document.createElement("span");
    counter.className = "cart-count";
    counter.style.cssText = "background:#ff5a5f;color:white;font-size:12px;padding:2px 6px;border-radius:50%;position:absolute;top:-8px;right:-8px;";
    icon.parentElement.style.position = "relative";
    icon.parentElement.appendChild(counter);
  }

  document.querySelector(".cart-count").innerText = itemCount;
}
