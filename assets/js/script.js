const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    // Toggle the 'is-active' class on both the button and the menu
    menuToggle.classList.toggle('is-active');
    navMenu.classList.toggle('is-active');
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
