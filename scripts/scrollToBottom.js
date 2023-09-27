// To ensure new chats are shown after POST
// Scroll to the bottom of the chat UI ✅
import { inputField } from "./_variables.js";

// Scroll to the body height -> bottom -> of the HTML document -> works for now
export default function scrollToBottom() {
  window.scrollTo(0, document.body.scrollHeight);
  inputField.focus(); // also focus on input field for better UX
}

// Call function on DOM reload, ensure new chats are shown after POST, or on page reload if chat history exists
document.addEventListener("DOMContentLoaded", function () {
  scrollToBottom();
});
