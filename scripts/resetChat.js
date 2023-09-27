import { deleteChatHistory } from "./_endpoints.js";
import { resetChatForm } from "./_variables.js";
import { defaultErrorMsg, chatOutput } from "./_variables.js";
import appendErrorChatMessage from "./appendErrorChat.js";

function resetChat(endpoint) {
  fetch(endpoint, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.status === 205) {
        // Reset Content response, handle success
        // Redirect to index.php, reloads DOM + client side functionality
        location.reload();
      } else if (response.status === 404) {
        // Not Found response, handle error here
        console.error("No chat history found in PHP Session");
        appendErrorChatMessage(defaultErrorMsg, chatOutput, "warning");
      } else if (response.status === 405) {
        // Method Not Allowed response, handle error here
        console.error("Only DELETE requests are allowed");
        appendErrorChatMessage(defaultErrorMsg, chatOutput, "warning");
      } else {
        // Handle other response statuses here
        console.error("Unexpected response status: " + response.status);
        appendErrorChatMessage(defaultErrorMsg, chatOutput, "warning");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      appendErrorChatMessage(defaultErrorMsg, chatOutput, "warning");
    });
}

resetChatForm.addEventListener("click", function (e) {
  console.log("Resetting chat history...");
  e.preventDefault();
  resetChat(deleteChatHistory);
});
