var inputField = document.querySelector('#inputField');
var charCount = document.querySelector('#charCount');
var errorMsg = "Too many characters!";
var maxCount = 500;
var emptyMsgColor = "#d4d4d4"; // hardcoded, should be imported from design tokens in the future:))))

// set maxcount on input field
inputField.maxLength = maxCount;

function updateCharacterCount() {
    // Reset color (in case it was red)
    charCount.style.color = "";

    var characterCount = inputField.value.length;
    charCount.textContent = characterCount + "/" + maxCount;

    if (characterCount >= maxCount) {
        charCount.style.color = "red";
        charCount.textContent = characterCount + "/" + maxCount + " " + errorMsg;
    };

    if (characterCount == 0) {
        charCount.style.color = emptyMsgColor;
    }
};

inputField.addEventListener('input', updateCharacterCount);

// Set default state
updateCharacterCount();