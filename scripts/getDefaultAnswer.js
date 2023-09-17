import { defaultMessagesEndpoint } from "./_endpoints.js";
import { defaultErrorMsg } from "./_variables.js";

// Get a random default answer from defaultAnswers.json
export default async function getRandomDefaultAnswer() {
  try {
    const response = await fetch(defaultMessagesEndpoint);
    const defaultData = await response.json();

    if (Array.isArray(defaultData) && defaultData.length > 0) {
      const randomIndex = Math.floor(Math.random() * defaultData.length);
      const randomDefaultAnswer = defaultData[randomIndex].answer;

      chatOutput.innerHTML += `<p><strong>Bot:</strong> ${randomDefaultAnswer}</p>`;
    } else {
      chatOutput.innerHTML += `<p><strong>Bot:</strong> No default answers available.</p>`;
    }
  } catch (error) {
    console.error("Error fetching default answers data:", error);
    chatOutput.innerHTML += `<p><strong>Bot:</strong> ${defaultErrorMsg}</p>`;
  }
}
