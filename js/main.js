let database = []
let signUpBtn = document.getElementById('signUpBtn')
let loginBtn = document.getElementById('loginBtn')
let logoutBtn = document.getElementById('logoutBtn')
let signUpName = document.getElementById('signUpName')
let signUpEmail = document.getElementById('signUpEmail')
let signUpPassword = document.getElementById('signUpPassword')
let loginEmail = document.getElementById('loginEmail')
let loginPass = document.getElementById('loginPass')
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

// Check if LocalStorage have any data

if (localStorage.getItem('usersData') != null) {
    restoreData()
}

// Get data from localstorage

function restoreData() {
    database = JSON.parse(localStorage.getItem('usersData'))
}

// Saving data in localstorage

function saveData() {
    localStorage.setItem('usersData', JSON.stringify(database))
}


function signUpCheck() {
    if (database.length == 0) {
        addNewUser()
    } else {
        for (let i = 0; i < database.length; i++) {
            if (database[i].userEmail == (signUpEmail.value)) {
                alert(`Email is Exist`);
                return
            }
        }
        addNewUser()
        alert('signed up successfully')
        window.open('index.html', '_parent')
    }
}

// Get Data from user in sign up page and save in database

function addNewUser() {
    database.push({
        userName: signUpName.value,
        userEmail: signUpEmail.value,
        userPass: signUpPassword.value
    });
    saveData()
    clearSignupInputs()
}

function clearSignupInputs() {
    signUpName.value = ''
    signUpEmail.value = ''
    signUpPassword.value = ''
}

// Check if login data is exist in database
function loginCheck() {
    for (let i = 0; i < database.length; i++) {
        if (database[i].userEmail == (loginEmail.value) && database[i].userPass == (loginPass.value)) {
            homeIndex = i
            window.open('home.html','_parent')
            return
        }
    }
    alert('no user exist');

}

function logoutFun() {
    window.open('index.html', '_parent')
}

function validate(inputElem, regex) {
    var testRegex = regex;
    if (testRegex.test(inputElem.value)) {
        inputElem.classList.add("is-valid");
        inputElem.classList.remove("is-invalid");
        validateSubmit = true
    } else {
        inputElem.classList.add("is-invalid");
        inputElem.classList.remove("is-valid");
        validateSubmit = false
    }
}

// --------------- Events ---------------



if (loginBtn != null) {

    loginBtn.addEventListener('click', loginCheck)
}

if (signUpBtn != null) {

    signUpBtn.addEventListener('click', signUpCheck)
}

if (logoutBtn != null) {

    logoutBtn.addEventListener('click', logoutFun)
}

if (signUpName != null) {

    signUpName.addEventListener("input", function () {
        validate(signUpName, nameRegex);
    });
}

if (signUpEmail != null) {

    signUpEmail.addEventListener("input", function () {
        validate(signUpEmail, emailRegex);
    });
}

if (signUpPassword != null) {

    signUpPassword.addEventListener("input", function () {
        validate(signUpPassword, passRegex);
    });

}





// function loginDirect