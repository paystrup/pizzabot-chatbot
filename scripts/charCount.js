var inputField = document.getElementById('inputField');
var charCount = document.getElementById('charCount');
var maxCount = 500;

// set maxcount on input field
inputField.maxLength = maxCount;

function updateCharacterCount() {
    var characterCount = inputField.value.length;
    charCount.textContent = characterCount + "/" + maxCount;
};

inputField.addEventListener('input', updateCharacterCount);

// Set default state
updateCharacterCount();