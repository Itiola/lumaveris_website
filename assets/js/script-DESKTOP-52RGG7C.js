// Select elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.menu-overlay');
const filterButtons = document.querySelectorAll('.filter-btn');
const insightCards = document.querySelectorAll('.insights-card');

// Toggle menu function
function toggleMenu() {
  const isOpen = navLinks.classList.contains('active'); 

  navLinks.classList.toggle('active');
  hamburger.classList.toggle('toggle');
  overlay.classList.toggle('active');

  // accessibility: reflect state on the button
  hamburger.setAttribute('aria-expanded', String(!isOpen));

}

// Close menu function
function closeMenu() {
  navLinks.classList.remove('active');
  hamburger.classList.remove('toggle');
  overlay.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
}

// Event listeners
hamburger.addEventListener('click', toggleMenu); // Toggle on click
overlay.addEventListener('click', closeMenu);    // Close when clicking overlay

// Close when clicking a nav link
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') closeMenu();
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

// Prevent body scroll when menu is open
function preventBodyScroll() {
  const isMenuOpen = navLinks.classList.contains('active');
  document.body.style.overflow = isMenuOpen ? 'hidden' : '';
}

// Update the toggle function to include scroll prevention
const originalToggleMenu = toggleMenu;
toggleMenu = function() {
  originalToggleMenu();
  preventBodyScroll();
};

const originalCloseMenu = closeMenu;
closeMenu = function() {
  originalCloseMenu();
  preventBodyScroll();
};

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // remove "active" class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.getAttribute('data-filter');

    insightCards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Contact form submission - AJAX frontend
document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    const messageEl = document.getElementById("form-message");

    // Reset old message
    messageEl.textContent = "";
    messageEl.className = "form-message"; // reset classes

    try {
        const response = await fetch("https://lumaveris.onrender.com/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            messageEl.textContent = "✅ " + result.message;
            messageEl.classList.add("success");
            this.reset();
        } else {
            messageEl.textContent = "❌ " + (result.error || "Failed to send message.");
            messageEl.classList.add("error");
        }
    } catch (error) {
        console.error("Error:", error);
        messageEl.textContent = "⚠️ Something went wrong.";
        messageEl.classList.add("error");
    }

    // Fade out message after 4 seconds
    setTimeout(() => {
        messageEl.classList.add("fade-out");
    }, 4000);

    // Clear content completely after fade animation
    setTimeout(() => {
        messageEl.textContent = "";
        messageEl.className = "form-message"; // reset
    }, 5000);
});
