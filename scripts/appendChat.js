export default function appendChatMessage(
  userName,
  isBot,
  timestamp,
  message,
  containerSelector
) {
  // Define the chat classes for the user and bot
  const chatClasses = isBot ? "chat" : "chat chat_user";

  // Define the image source for the user and bot
  const imgSrcUser = "assets/images/profile_placeholder.jpg";
  const imgSrcBot = "assets/images/robotIcon.png";
  const imgSrc = isBot ? imgSrcBot : imgSrcUser;

  // Create the chat message HTML
  const chatHTML = `
    <div class="${chatClasses}">
        <div class="chat_img">
            <img src="${imgSrc}" alt="Profile Picture" />
        </div>
        <div class="chat_msg">
            <div class="chat_msgInfo">
                <p class="chat_msgInfo_name">${userName}</p>
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
