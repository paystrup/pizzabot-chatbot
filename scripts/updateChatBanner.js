import {
  chatHistoryBanner,
  chatHistoryBannerBox,
  emptyStateMsg_HistoryBanner,
} from "./_variables.js";

export default function updateChatBanner(array) {
  if (array.length === 0) {
    chatHistoryBanner.textContent = emptyStateMsg_HistoryBanner;
  } else {
    chatHistoryBanner.textContent = "Question:" + " " + array[0].message;
    chatHistoryBannerBox.classList.add("full");
  }
}
