import { botName } from "./_variables.js";

function appendErrorChatMessage(message, containerSelector, errorState) {
  // Define the chat classes -> add errorState
  let chatClasses = `chat chat_${errorState ? `${errorState}` : ""}`;

  // Add timestamp to a let variable
  const timestamp = new Date().toLocaleTimeString();

  // Define the image source for the error msg -> bot
  const imgSrc = "assets/images/robotIcon.png";

  // Create the chat message HTML
  const chatHTML = `
    <div class="${chatClasses}">
        <div class="chat_img">
            <img src="${imgSrc}" alt="Profile Picture" />
        </div>
        <div class="chat_msg">
            <div class="chat_msgInfo">
                <p class="chat_msgInfo_name">${botName}</p>
                <p class="chat_msgInfo_time">${timestamp}</p>
            </div>
            <div class="chat_bubble">
                <p>${message}</p>
            </div>
        </div>
    </div>`;

  // Append the chat message HTML to the specified chat container
  containerSelector.innerHTML += chatHTML;
}

export default appendErrorChatMessage;
