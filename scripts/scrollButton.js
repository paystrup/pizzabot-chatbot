import { scrollBtn } from "./_variables.js";

// Calculate windowHeight and scrollableHeight once

// Function to update the chevron rotation based on scroll position
function updateChevronRotation() {
  const windowHeight = window.innerHeight;
  const scrollableHeight = document.documentElement.scrollHeight - windowHeight;

  if (window.scrollY >= scrollableHeight * 0.9) {
    scrollBtn.classList.add("rotated"); // Add the 'rotated' class
  } else {
    scrollBtn.classList.remove("rotated"); // Remove the 'rotated' class
  }
}

// Btn to scroll either to top or bottom of the chat UI
// Event listener on DOM load
document.addEventListener("DOMContentLoaded", function () {
  const windowHeight = window.innerHeight;
  const scrollableHeight = document.documentElement.scrollHeight - windowHeight;

  // Show/hide button based on scroll position
  // TODO: Fix performance, not optimal to check every time the user scrolls, every pixel :DDD
  window.addEventListener("scroll", function () {
    if (document.documentElement.scrollHeight > windowHeight) {
      scrollBtn.style.display = "block";
      updateChevronRotation();
    } else {
      scrollBtn.style.display = "none";
    }
  });

  // Toggle scroll behavior when the button is clicked
  // Scroll to top if the user is at the bottom 90% of the page
  // Top 10% of the page -> scroll to bottom
  scrollBtn.addEventListener("click", function () {
    const windowHeight = window.innerHeight;
    const scrollableHeight =
      document.documentElement.scrollHeight - windowHeight;

    if (window.scrollY >= scrollableHeight * 0.9) {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
    } else {
      window.scrollTo({
        top: scrollableHeight,
        behavior: "smooth",
      }); // Scroll to bottom
    }
  });
});
