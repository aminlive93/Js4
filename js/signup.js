var inputName = document.getElementById('name');
var inputPassword = document.getElementById('password');
var inputEmail = document.getElementById('email');
var inputArr = Array.from(document.querySelectorAll('input'));
var success = document.querySelector('.success');
var danger = document.querySelector('.danger');
var signBtn = document.querySelector('button');
var form = document.querySelector('form');
var exists = document.querySelector('.exists');
var inputsinvalid = document.querySelector('.inputsinvalid');
var signIn = document.querySelector('a');
var userContainer;
var step;
var inputNonBlankCount;
var regexvalidation;


if (localStorage.getItem('userdata') == null) {      ///retrieve data from local storage 
    userContainer = [];
}
else {
    userContainer = JSON.parse(localStorage.getItem('userdata'));
}

for (var i = 0; i < inputArr.length; i++) { ////regex
    inputArr[i].addEventListener('input', function (e) {
        regexvalidation = true;
        var inputId = e.target.id;
        var inputValue = e.target.value
        var regex = {
            name: /^[A-Za-z]{3,}$/,
            password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/,
            email: /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        }

        if (regex[inputId].test(inputValue) == true) {
            e.target.classList.add('is-valid');
            e.target.classList.remove('is-invalid');
        }

        else {
            e.target.classList.remove('is-valid');
            e.target.classList.add('is-invalid');
            regexvalidation = false;
        }
        console.log(regexvalidation)
    })
}



form.addEventListener('click', function (e) {  /// prevent reload
    e.preventDefault()
})


// function regexcheck() {
//     if (validCount == inputArr.length) {
//         inputsinvalid.classList.add('d-none');
//         inputstatus() ;
//     }
//     else {
//         inputsinvalid.classList.remove('d-none') ;
//     }
// }


signBtn.addEventListener('click', inputstatus);
function inputstatus() {               //// required blank
    inputNonBlankCount = 0;
    for (var i = 0; i < inputArr.length; i++) {
        if (inputArr[i].value == "") {
            danger.classList.remove('d-none');
            success.classList.add('d-none');
            break;
        }
        else {
            inputNonBlankCount = 1 + inputNonBlankCount;
        }
    }
    if (inputNonBlankCount == inputArr.length && regexvalidation == false) {
        danger.classList.add('d-none');
        inputsinvalid.classList.remove('d-none');
        exists.classList.add('d-none');
    }
    else if (inputNonBlankCount == inputArr.length) {
        danger.classList.add('d-none');
        inputsinvalid.classList.add('d-none');
        usersignup();
    }

}


function clearform() {           /////clear
    inputName.value = null;
    inputEmail.value = null;
    inputPassword.value = null;
}

function usersignup() {            /////////signup
    var user = {
        username: inputName.value,
        useremail: inputEmail.value,
        userpassword: inputPassword.value,
    }
    userContainer.push(user);
    localStorage.setItem('userdata', JSON.stringify(userContainer))
    emailcount()
}

function emailcount() {     //emailcount
    step = 0;
    for (var i = 0; i < userContainer.length; i++) {
        if (userContainer[i].useremail == inputEmail.value && inputEmail.value != "") {
            step = step + 1;
        }
    }
    userrepeat()
}

////////user exists function
function userrepeat() {
    for (var i = 0; i < userContainer.length; i++) {
        if (step > 1 && inputEmail.value != "") {
            exists.classList.remove('d-none');
            danger.classList.add('d-none');
            success.classList.add('d-none');
            userContainer.pop();
            localStorage.setItem('userdata', JSON.stringify(userContainer));
            break;
        }
        else {
            exists.classList.add('d-none');
            danger.classList.add('d-none');
            success.classList.remove('d-none');
            window.location.href = ('./Signin.html');
        }
    }
}

signIn.addEventListener('click', function () {   //// signin redirect
    window.location.href = ('./Signin.html');
})