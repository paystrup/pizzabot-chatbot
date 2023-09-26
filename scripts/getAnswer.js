import appendChatMessage from "./appendChat.js";
import scrollToBottom from "./scrollToBottom.js";
import updateCharacterCount from "./charCount.js";
import {
  chatInput,
  chatOutput,
  submitBtn,
  botName,
  userName
} from "./_variables.js";
import { messagesCreateEndpoint, getChatHistory } from "./_endpoints.js";

async function postData(question) {
  try {
    const data = { question }; // Create a data object with the question
    const response = await fetch(messagesCreateEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(data) // Serialize the data object as JSON
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to get chat history from PHP endpoint
async function getMessages() {
  try {
    const response = await fetch(getChatHistory, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const chatHistory = await response.json();
    console.log(chatHistory)

    // Loop through the chat history and append messages using the appendChatMessage function
    chatHistory.forEach(({ message, user, timestamp }) => {
      const isBot = user === 'server'; // Check if the user is the server (bot)
      const chatName = isBot ? botName : userName; // Check the user, set the chat name
      appendChatMessage(chatName, isBot, timestamp, message, chatOutput);
    });

    scrollToBottom();

  } catch (error) {
    console.error('Error:', error);
  }
}

// Call function on DOM reload to show chat history
getMessages();

// Function to reset the input field value and refocus it
function resetInputField() {
  chatInput.value = "";
  chatInput.focus();
  updateCharacterCount();
}

// Function to validate input and prevent default submission behavior
function validateChatInput(e) {
  e.preventDefault();
  const inputValue = chatInput.value.trim(); // Get the input value and remove leading/trailing whitespace
  const regex = /\S/; // Regex to match non-whitespace characters

  if (regex.test(inputValue)) {
    postData(inputValue);
    getMessages();
    resetInputField();
  } else {
    // Display an error message or take other appropriate action
    console.log("Input field cannot be empty");
  }
}

// Event listener for input and submit button
submitBtn.addEventListener("click", validateChatInput);

chatInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    validateChatInput(e);
  }
});
