var inputField = document.getElementById('inputField');
var charCount = document.getElementById('charCount');

function updateCharacterCount() {
    var characterCount = inputField.value.length;
    charCount.textContent = "Character Count: " + characterCount;
};

inputField.addEventListener('input', updateCharacterCount);

// Set default state
updateCharacterCount();