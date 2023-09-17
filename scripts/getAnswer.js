import getRandomDefaultAnswer from "./getDefaultAnswer.js";
import appendChatMessage from "./appendChat.js";
import scrollToBottom from "./scrollToBottom.js";
import updateCharacterCount from "./charCount.js";
import {
  chatInput,
  chatOutput,
  submitBtn,
  defaultErrorMsg,
  botName,
} from "./_variables.js";
import { messagesEndpoint } from "./_endpoints.js";

// Function to get an answer from the JSON file
async function getAnswer() {
  const userInput = chatInput.value.toLowerCase();

  try {
    const response = await fetch(messagesEndpoint);
    const data = await response.json();

    for (const message of data) {
      if (
        message.question.toLowerCase().includes(userInput) ||
        message.keywords.some((keyword) =>
          keyword.toLowerCase().includes(userInput)
        )
      ) {
        // Get a random answer variant
        const randomAnswerIndex = Math.floor(
          Math.random() * message.answers.length
        );
        const answerVariant = message.answers[randomAnswerIndex];

        // Append usermsg
        appendChatMessage(
          "You",
          false,
          new Date().toLocaleTimeString(),
          userInput,
          chatOutput
        );

        // Apend botmsg
        appendChatMessage(
          botName,
          true,
          new Date().toLocaleTimeString(),
          answerVariant,
          chatOutput
        );
        return; // Return the random answer variant
      }
    }

    // IF no answer is found, return a random default answer
    await getRandomDefaultAnswer();
  } catch (error) {
    console.error("Error fetching data:", error);
    appendChatMessage(
      botName,
      true,
      new Date().toLocaleTimeString(),
      defaultErrorMsg,
      chatOutput
    );
  } finally {
    scrollToBottom();
  }
}

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
    getAnswer();
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
