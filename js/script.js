// This is a simple Password Generator App that will generate random password maybe you can you them to secure your account.
// I tried my best to make the code as simple as possible please dont mind the variable names.
// Also this idea came in my mind after checking Traversy Media's latest video.

// Clear the concole on every refresh
// Clear the console on every refresh
console.clear();

// Range Slider Properties.
const sliderProps = {
    fill: "#0B1EDF",
    background: "rgba(255, 255, 255, 0.214)",
};

// Selecting the Range Slider container which will affect the LENGTH property of the password.
const slider = document.querySelector(".range__slider");

// Text which will show the value of the range slider.
const sliderValue = document.querySelector(".length__title");

// Using Event Listener to apply the fill and also change the value of the text.
slider.querySelector("input").addEventListener("input", event => {
    sliderValue.setAttribute("data-length", event.target.value);
    applyFill(event.target);
});

// Function to apply fill to the slider.
function applyFill(slider) {
    const percentage = (100 * (slider.value - slider.min)) / (slider.max - slider.min);
    const bg = `linear-gradient(90deg, ${sliderProps.fill} ${percentage}%, ${sliderProps.background} ${percentage + 0.1}%)`;
    slider.style.background = bg;
    sliderValue.setAttribute("data-length", slider.value);
}

// Object containing functions to generate random characters for the password.
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};

// Generator Functions
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
    const symbols = '~!@#$%^&*()_+{}":?><;.,';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// Selecting all the DOM Elements that are necessary
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("slider");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateBtn = document.getElementById("generate");

// Button to copy the text
const copyBtn = document.getElementById("copy-btn");
const copyInfo = document.querySelector(".result__info.right");
const copiedInfo = document.querySelector(".result__info.left");

// Event listener for the copy button
copyBtn.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = resultEl.innerText;
    if (!password || password === "CLICK GENERATE") {
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();

    copyInfo.style.transform = "translateY(200%)";
    copyInfo.style.opacity = "0";
    copiedInfo.style.transform = "translateY(0%)";
    copiedInfo.style.opacity = "0.75";
});

// Event listener for the generate button
generateBtn.addEventListener("click", () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;

    resultEl.innerText = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);

    // Show/hide copy button based on whether a password has been generated
    if (resultEl.innerText !== "CLICK GENERATE") {
        copyBtn.style.opacity = "1";
        copyBtn.style.pointerEvents = "all";
    } else {
        copyBtn.style.opacity = "0";
        copyBtn.style.pointerEvents = "none";
    }

    // Reset copy info messages
    copyInfo.style.transform = "translateY(0%)";
    copyInfo.style.opacity = "0.75";
    copiedInfo.style.transform = "translateY(200%)";
    copiedInfo.style.opacity = "0";
});


// Function responsible for generating password pruebaaaa

function generatePassword(length, lower, upper, number, symbol) {
    let generatedPassword = "";
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
    const typesCount = typesArr.length;

    // Verificar si no hay ningún tipo de carácter seleccionado
    if (typesCount === 0) {
        // Seleccionar aleatoriamente uno de los tipos de caracteres disponibles
        const randomTypeIndex = Math.floor(Math.random() * 4);
        const selectedType = Object.keys(typesArr[randomTypeIndex])[0];
        generatedPassword += randomFunc[selectedType]();
        // Reducir la longitud en 1, ya que se ha generado un carácter
        length--;
    }

    for (let i = 0; i < length; i++) {
        const randomTypeIndex = Math.floor(Math.random() * typesCount);
        const selectedType = Object.keys(typesArr[randomTypeIndex])[0];
        generatedPassword += randomFunc[selectedType]();
    }

    return generatedPassword;
}

// Event listener for the checkboxes to ensure at least one checkbox is selected
[uppercaseEl, lowercaseEl, numberEl, symbolEl].forEach(el => {
    el.addEventListener("click", () => {
        disableOnlyCheckbox();
    });
});

// Function to disable only one checkbox if only one is checked
function disableOnlyCheckbox() {
    const totalChecked = [uppercaseEl, lowercaseEl, numberEl, symbolEl].filter(el => el.checked);
    totalChecked.forEach(el => {
        if (totalChecked.length === 1) {
            el.disabled = true;
        } else {
            el.disabled = false;
        }
    });
}
