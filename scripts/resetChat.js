import { deleteChatHistory } from "./_endpoints.js";
import { resetChatForm } from "./_variables.js";

function resetChat(endpoint) {
    fetch(endpoint, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.status === 205) {
            // Reset Content response, handle success
            // Redirect to index.php, reloads DOM + client side functionality
            location.reload();
        } else if (response.status === 404) {
            // Not Found response, handle error here
            console.error('No chat history found in PHP Session');
        } else if (response.status === 405) {
            // Method Not Allowed response, handle error here
            console.error('Only DELETE requests are allowed');
        } else {
            // Handle other response statuses here
            console.error('Unexpected response status: ' + response.status);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

resetChatForm.addEventListener("click", function(e) {
    console.log("Resetting chat history...");
    e.preventDefault();
    resetChat(deleteChatHistory);
});