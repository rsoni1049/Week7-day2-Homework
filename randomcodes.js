// Global variables
let code = ''; // stores generated code
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';
let getCode = ''; // stores user entered code
let btnvalue = true; // controls button state

// Function to generate random code
function generateCode() {
    // Clear previous code
    code = '';
    
    // Generate 8-character random code
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * str.length);
        code += str.charAt(randomIndex);
    }
    
    // Display the generated code
    document.getElementById('codes').textContent = code;
    
    // Initially disable the submit button
    disableButton(true);
}

// Function to enable/disable submit button
function disableButton(buttonState) {
    const submitBtn = document.getElementById('submitBtn');
    
    if (buttonState) {
        // Disable button
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
        submitBtn.style.cursor = 'not-allowed';
    } else {
        // Enable button
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    }
}

// Function to evaluate entered code
function evaluateCode() {
    // Get user input and trim whitespace
    getCode = document.getElementById('randomcode').value.trim();
    
    // Get generated code and trim whitespace
    const generatedCode = code.trim();
    
    // Compare codes (case-sensitive)
    if (getCode === generatedCode) {
        disableButton(false); // enable button if codes match
    } else {
        disableButton(true); // disable button if codes don't match
    }
}

// Event listeners
window.addEventListener('DOMContentLoaded', () => {
    // Generate code on page load
    generateCode();
    
    // Add input event listener to verification code field
    document.getElementById('randomcode').addEventListener('input', evaluateCode);
});