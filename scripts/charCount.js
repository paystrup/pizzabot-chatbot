import { charCount, inputField } from "./_variables.js";

let errorMsg = "Too many characters!";
let maxCount = 500;
let emptyMsgColor = "#d4d4d4"; // hardcoded, should be imported from design tokens in the future:))))

// set maxcount on input field
inputField.maxLength = maxCount;

export default function updateCharacterCount() {
  // Reset color
  charCount.style.color = "";

  var characterCount = inputField.value.length;
  charCount.textContent = characterCount + "/" + maxCount;

  if (characterCount >= maxCount) {
    charCount.style.color = "red";
    charCount.textContent = characterCount + "/" + maxCount + " " + errorMsg;
  }

  if (characterCount == 0) {
    charCount.style.color = emptyMsgColor;
  }
}

// Run function to set default state on DOM load
updateCharacterCount();

// Run function on input field change
inputField.addEventListener("input", updateCharacterCount);
