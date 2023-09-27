import { charCount, inputField, maxCharCount } from "./_variables.js";

let errorMsg = "Max. character count reached!";
let emptyMsgColor = "#d4d4d4"; // hardcoded, should be imported from design tokens in the future:))))

// set maxcount on input field
inputField.maxLength = maxCharCount;

export default function updateCharacterCount() {
  // Reset color
  charCount.style.color = "";

  var characterCount = inputField.value.length;
  charCount.textContent = characterCount + "/" + maxCharCount;

  if (characterCount >= maxCharCount) {
    charCount.style.color = "red";
    charCount.textContent =
      characterCount + "/" + maxCharCount + " - " + errorMsg;
  }

  if (characterCount == 0) {
    charCount.style.color = emptyMsgColor;
  }
}

// Run function to set default state on DOM load
updateCharacterCount();

// Run function on input field change
inputField.addEventListener("input", updateCharacterCount);
