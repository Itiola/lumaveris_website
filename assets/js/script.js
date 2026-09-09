const filterButtons = document.querySelectorAll('.filter-btn');
const insightCards = document.querySelectorAll('.insights-card');

if (filterButtons.length && insightCards.length) {
  const status = document.getElementById('insights-filter-status');
  const selectedTopics = new Set();
  const allButton = document.querySelector('[data-filter="all"]');

  const showMatchingInsights = () => {
    let matches = 0;
    insightCards.forEach(card => {
      const topics = (card.dataset.topics || '').split(/\s+/).filter(Boolean);
      const isMatch = !selectedTopics.size || [...selectedTopics].every(topic => topics.includes(topic));
      card.hidden = !isMatch;
      if (isMatch) matches += 1;
    });
    if (status) status.textContent = !selectedTopics.size
      ? `Showing all ${matches} insights`
      : `Showing ${matches} insight${matches === 1 ? '' : 's'} about ${[...selectedTopics].join(' and ')}`;
  };

  filterButtons.forEach(button => button.addEventListener('click', () => {
    const topic = button.dataset.filter;
    if (topic === 'all') {
      selectedTopics.clear();
      filterButtons.forEach(item => {
        item.classList.toggle('active', item === allButton);
        item.setAttribute('aria-pressed', String(item === allButton));
      });
    } else {
      selectedTopics.has(topic) ? selectedTopics.delete(topic) : selectedTopics.add(topic);
      button.classList.toggle('active', selectedTopics.has(topic));
      button.setAttribute('aria-pressed', String(selectedTopics.has(topic)));
      allButton.classList.toggle('active', !selectedTopics.size);
      allButton.setAttribute('aria-pressed', String(!selectedTopics.size));
    }
    showMatchingInsights();
  }));
}

// Contact form submission - AJAX frontend
document.getElementById("contact-form")?.addEventListener("submit", async function(event) {
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

