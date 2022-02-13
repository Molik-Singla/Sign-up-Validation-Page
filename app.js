// selecting all input fields and submit button
const errors = document.querySelectorAll(".error");
const inputUserName = document.getElementById("userName");
const inputUserEmail = document.getElementById("userEmail");
const inputUserCreatePassword = document.getElementById("userCreatePassword");
const inputUserConfirmPassword = document.getElementById("userConfirmPassword");
const submitButton = document.getElementById("submitBtn");

const popUpWindow = document.querySelector(".popUpForSuccessSubmit");
const closeButton = document.querySelector(".closeBtn");

closeButton.addEventListener("click", () => {
    popUpWindow.classList.add("fade-out");

    inputUserName.value = "";
    inputUserEmail.value = "";
    inputUserCreatePassword.value = "";
    inputUserConfirmPassword.value = "";
});
// check if input is empty or not
function validateEmptyInputs(inputPara) {
    return inputPara === "" ? false : true;
}

// check validity of Username
function validateName(namePara) {
    // if field is empty then set error as empty and return from here
    if (!validateEmptyInputs(namePara)) {
        setError(0);
        return true;
    }
    let unValidCharacter = "123456789@#$%(){}[]|~^";

    for (let iter = 0; iter < namePara.length; iter++) if (unValidCharacter.includes(namePara[iter])) return false;
    return true;
}
// check validity of Email
function validateEmail(emailPara) {
    if (!validateEmptyInputs(emailPara)) {
        setError(1);
        return true;
    }
    // email is valid if it starts with string , does not contain any special character rather than one @

    if (!emailPara.includes("@gmail.com")) return false;
    else {
        let before = emailPara.split("@")[0].toLowerCase();
        if (before.length === 0) return false;

        let chars = "abcdefghijklmnopqrstuvwxyz";
        let unValidChars = "#$@%^&*";
        for (let char of before) if (unValidChars.includes(char)) return false;

        for (let char of before)
            if (!chars.includes(char)) return false;
            else break;
    }
    return true;
}
// check validity of Create Password
function validateCreatePassword(createPasswordPara) {
    if (!validateCreatePasswordLength(createPasswordPara)) {
        setError(2, "Password length must be greater than 6");
        return true;
    }
    let validNumber = "0123456789";
    let validCharacters = "@#$&*^~!";

    let presentNumber = false;
    let presentCharacter = false;

    for (let iter = 0; iter < createPasswordPara.length; iter++) {
        if (!presentNumber && validNumber.includes(createPasswordPara[iter])) presentNumber = true;
        if (!presentCharacter && validCharacters.includes(createPasswordPara[iter])) presentCharacter = true;
        if (presentCharacter && presentNumber) return true;
    }
    return false;
}
// check validity of Create Password Length
function validateCreatePasswordLength(createPasswordPara) {
    return createPasswordPara.length >= 7 ? true : false;
}
// check validity of Confirm Password
function validateConfirmPassword() {
    if (!validateEmptyInputs(inputUserConfirmPassword.value)) {
        setError(3);
        return true;
    }
    return inputUserCreatePassword.value === inputUserConfirmPassword.value ? true : false;
}
// Used to set errors with error messages ( default is for empty inputs )
function setError(errorBlockIndex, errorMsg = "Please fill this field", displayProperty = "flex") {
    errors[errorBlockIndex].textContent = errorMsg;
    errors[errorBlockIndex].style.display = displayProperty;
}

// focusout : When user loose focus from input then error message must be removed
inputUserName.addEventListener("focusin", setError.bind(this, 0, "", "none"));
inputUserEmail.addEventListener("focusin", setError.bind(this, 1, "", "none"));
inputUserCreatePassword.addEventListener("focusin", setError.bind(this, 2, "", "none"));
inputUserConfirmPassword.addEventListener("focusin", setError.bind(this, 3, "", "none"));

// on submit check all inputs validity
submitButton.addEventListener("click", evt => {
    evt.preventDefault();

    if (!validateName(inputUserName.value)) setError(0, "inputUsername should not contain numbers and special character");
    if (!validateEmail(inputUserEmail.value)) setError(1, "Email is not valid");
    if (!validateCreatePassword(inputUserCreatePassword.value)) setError(2, "Password must have atleast one number and special character");
    if (!validateConfirmPassword()) setError(3, "Password does not matching");

    // if 4 of the fields does not have any error that means all data is valid
    let nonePropertyCount = 0;
    for (let i = 0; i < errors.length; i++) if (window.getComputedStyle(errors[i]).display === "none") nonePropertyCount++;

    if (nonePropertyCount === 4) popUpWindow.classList.add("swing-in-top-fwd");
});