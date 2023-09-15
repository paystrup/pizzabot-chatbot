import getRandomDefaultAnswer from "./getDefaultAnswer.js";
import updateCharacterCount from "./charCount.js";
import { chatInput, chatOutput, submitBtn } from "./_variables.js";

// Function to get an answer from the JSON file
async function getAnswer() {
  const userInput = chatInput.value.toLowerCase();

  try {
    const response = await fetch("data/messages.json");
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

        chatOutput.innerHTML += `<p><strong>Bot:</strong> ${answerVariant}</p>`;
        return; // Return the random answer variant
      }
    }

    // IF no answer is found, return a random default answer
    await getRandomDefaultAnswer();
  } catch (error) {
    console.error("Error fetching data:", error);
    chatOutput.innerHTML += `<p><strong>Bot:</strong> Oops, something went wrong while fetching data.</p>`;
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
