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

// Function to calculate Levenshtein distance between two strings
function calculateLevenshteinDistance(a, b) {
  const dp = Array.from(Array(a.length + 1), (_, i) =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[a.length][b.length];
}

// Function to calculate weighted similarity score
function calculateSimilarityScore(question, keywords, userInput) {
  // Calculate Levenshtein distance between question and user input
  const questionDistance = calculateLevenshteinDistance(
    question.toLowerCase(),
    userInput
  );

  // Calculate Levenshtein distance between keywords and user input
  const keywordDistances = keywords.map((keyword) =>
    calculateLevenshteinDistance(keyword.toLowerCase(), userInput)
  );
  const keywordDistance = Math.min(...keywordDistances);

  // Calculate a weighted score based on question and keyword distances
  const score =
    0.7 * (1 - questionDistance / Math.max(question.length, userInput.length)) +
    0.3 * (1 - keywordDistance / userInput.length);

  return score;
}

// Function to get an answer from the JSON file
async function getAnswer() {
  const userInput = chatInput.value.toLowerCase();

  try {
    const response = await fetch(messagesEndpoint);
    const data = await response.json();

    let bestMatch = { score: 0, answer: null };

    for (const message of data) {
      const score = calculateSimilarityScore(
        message.question,
        message.keywords,
        userInput
      );

      if (score > bestMatch.score) {
        bestMatch.score = score;
        bestMatch.answer = message.answers;
      }
    }

    if (bestMatch.answer) {
      // Get a random answer variant
      const randomAnswerIndex = Math.floor(
        Math.random() * bestMatch.answer.length
      );
      const answerVariant = bestMatch.answer[randomAnswerIndex];

      // Append usermsg
      appendChatMessage(
        "You",
        false,
        new Date().toLocaleTimeString(),
        userInput,
        chatOutput
      );

      // Append botmsg
      appendChatMessage(
        botName,
        true,
        new Date().toLocaleTimeString(),
        answerVariant,
        chatOutput
      );
    } else {
      // IF no answer is found, return a random default answer
      await getRandomDefaultAnswer();
    }
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
