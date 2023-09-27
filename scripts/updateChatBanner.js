import {
  chatHistoryBanner,
  chatHistoryBannerBox,
  emptyStateMsg_HistoryBanner,
  chatOutput,
} from "./_variables.js";

export default function updateChatBanner(array) {
  // Check if an empty state element exists
  const emptyStateBanner = chatOutput.querySelector(".emptyStateBanner");

  if (array.length === 0) {
    if (!emptyStateBanner) {
      // Create the empty state element only if it doesn't exist
      const emptyStateBanner = document.createElement("div");
      emptyStateBanner.classList.add("emptyStateBanner", "fadeInUp");

      emptyStateBanner.innerHTML = `
        <div class="emptyStateBanner_heading">
            <h3>Welcome to pizzabot 1.0</h3>
        </div>

        <p>Your personal pizza chatbot, that knows everything about pizza. Almost.</p>

        <a href="https://github.com/eaaa-dob-wu-e23a/chatbot-paystrup" target="_blank">Read the documentation</a>

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="hoverUpDown">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
        </svg>

      `;

      chatOutput.appendChild(emptyStateBanner);
    }

    chatHistoryBanner.textContent = emptyStateMsg_HistoryBanner;
  } else {
    // Remove the empty state element if it exists
    if (emptyStateBanner) {
      chatOutput.removeChild(emptyStateBanner);
    }

    chatHistoryBanner.textContent = "Question: " + array[0].message;
    chatHistoryBannerBox.classList.add("full");
  }
}
