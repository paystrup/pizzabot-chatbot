import appendChatMessage from "./appendChat.js";
import scrollToBottom from "./scrollToBottom.js";
import updateCharacterCount from "./charCount.js";
import {
  chatInput,
  chatOutput,
  submitBtn,
  botName,
  userName,
  maxCharCount,
  defaultErrorMsg,
  charCount,
} from "./_variables.js";
import { messagesCreateEndpoint, getChatHistory } from "./_endpoints.js";
import appendErrorChatMessage from "./appendErrorChat.js";
import updateChatBanner from "./updateChatBanner.js";

async function postData(question) {
  try {
    const data = { question }; // Create a data object with the question
    const response = await fetch(messagesCreateEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Serialize the data object as JSON
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
      appendErrorChatMessage(
        "Network response was not ok. Please try again",
        chatOutput,
        "warning"
      );
    }

    const responseData = await response.json();
    console.log(responseData);
  } catch (error) {
    console.error("Error:", error);
    appendErrorChatMessage(defaultErrorMsg, chatOutput, "warning");
  }
}

// Function to get chat history from PHP endpoint
async function getMessages() {
  try {
    const response = await fetch(getChatHistory, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
      appendErrorChatMessage(
        "Network response was not ok. Please try again",
        chatOutput,
        "warning"
      );
    }

    const chatHistory = await response.json();
    console.log(chatHistory);

    // Loop through the chat history and append messages using the appendChatMessage function
    chatHistory.forEach(({ message, user, timestamp }) => {
      const isBot = user === "server"; // Check if the user is the server (bot)
      const chatName = isBot ? botName : userName; // Check the user, set the chat name
      appendChatMessage(chatName, isBot, timestamp, message, chatOutput);
    });

    updateChatBanner(chatHistory); // Render empty state or first query to chat banner
    scrollToBottom(); // Scroll to bottom
  } catch (error) {
    console.error("Error:", error);
    appendErrorChatMessage(defaultErrorMsg, chatOutput, "warning");
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

  // Remove the "shake" class if it was previously added
  chatInput.classList.remove("shake");

  const rawInputValue = chatInput.value; // Get the raw input value
  const inputValue = chatInput.value.trim(); // remove leading/trailing whitespace
  const regex = /\S/; // Regex to match non-whitespace characters

  if (regex.test(inputValue) && rawInputValue.length <= maxCharCount) {
    postData(inputValue);
    getMessages();
    resetInputField();
  } else {
    // Display an error msg if the input is empty or too long
    console.log("Input field cannot be empty");
    charCount.style.color = "red";
    charCount.textContent = "Input field cannot be empty";

    // Add the "shake" class to indicate the error
    chatInput.classList.add("shake");

    // Listen for the end of the "shake" animation and remove the class
    chatInput.addEventListener(
      "animationend",
      () => {
        inputField.classList.remove("shake");
      },
      { once: true }
    ); // { once: true } ensures the event listener is removed after the animation ends
  }
}

// Event listener for input and submit button
submitBtn.addEventListener("click", validateChatInput);

chatInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    validateChatInput(e);
  }
});
