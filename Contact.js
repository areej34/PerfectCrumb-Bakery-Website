// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // ===========================
  // Contact Form Handling
  // ===========================
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = this.querySelector("input[type='text']").value.trim();
      const email = this.querySelector("input[type='email']").value.trim();
      const message = this.querySelector("textarea").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      // Simulate form submission
      alert(`Thank you, ${name}! Your message has been sent.`);
      this.reset();
    });
  }

});
