// selecting all input fields and submit button
const errors = document.querySelectorAll(".error");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userCreatePassword = document.getElementById("userCreatePassword");
const userConfirmPassword = document.getElementById("userConfirmPassword");
const submitButton = document.getElementById("submitBtn");

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
    let unValidCharacter = "123456789@#$%(){}[]|~";

    for (let i = 0; i < namePara.length; i++) if (unValidCharacter.includes(namePara[i])) return false;
    return true;
}
// check validity of Email
function validateEmail(emailPara) {
    if (!validateEmptyInputs(emailPara)) {
        setError(1);
        return true;
    }
    return emailPara.includes("@gmail.com") ? true : false;
}
// check validity of Create Password
function validateCreatePassword(createPasswordPara) {
    if (!validateCreatePasswordLength(createPasswordPara)) {
        setError(2, "Password length must be greater than 6");
        return true;
    }
    let validNumber = "0123456789";
    let validCharacters = "@#$&*";

    let presentNumber = false;
    let presentCharacter = false;

    for (let i = 0; i < createPasswordPara.length; i++) {
        if (!presentNumber && validNumber.includes(createPasswordPara[i])) presentNumber = true;

        if (!presentCharacter && validCharacters.includes(createPasswordPara[i])) presentCharacter = true;

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
    if (!validateEmptyInputs(userConfirmPassword.value)) {
        setError(3);
        return true;
    }
    return userCreatePassword.value === userConfirmPassword.value ? true : false;
}
// Used to set errors with error messages ( default is for empty inputs )
function setError(errorBlockIndex, errorMsg = "Please fill this field", displayProperty = "flex") {
    errors[errorBlockIndex].textContent = errorMsg;
    errors[errorBlockIndex].style.display = displayProperty;
}

// focusout : When user loose focus from input then error message must be removed
userName.addEventListener("focusin", setError.bind(this, 0, "", "none"));
userEmail.addEventListener("focusin", setError.bind(this, 1, "", "none"));
userCreatePassword.addEventListener("focusin", setError.bind(this, 2, "", "none"));
userConfirmPassword.addEventListener("focusin", setError.bind(this, 3, "", "none"));

// on submit check all inputs validity
submitButton.addEventListener("click", evt => {
    evt.preventDefault();

    if (!validateName(userName.value)) setError(0, "Username should not contain numbers and special character");
    if (!validateEmail(userEmail.value)) setError(1, "Email is not valid");
    if (!validateCreatePassword(userCreatePassword.value)) setError(2, "Password must have atleast one number and special character");
    if (!validateConfirmPassword()) setError(3, "Password does not matching");
});
