// Get a random default answer from defaultAnswers.json
export default async function getRandomDefaultAnswer() {
  try {
    const response = await fetch("data/defaultAnswers.json");
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
    chatOutput.innerHTML += `<p><strong>Bot:</strong> Oops, something went wrong while fetching default answers.</p>`;
  }
}
