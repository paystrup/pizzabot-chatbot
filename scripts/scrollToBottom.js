// To ensure new chats are shown after POST
// Scroll to the bottom of the chat UI ✅

// Scroll to the body height -> bottom -> of the HTML document -> works for now
function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}
  
// Call function on DOM reload -> after chatbot.php redirects through header
document.addEventListener("DOMContentLoaded", function () {
    scrollToBottom();
});