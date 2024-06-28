var signUp = document.querySelector('a');
var inputPassword = document.getElementById('password');
var inputEmail = document.getElementById('email');
var inputArr = Array.from(document.querySelectorAll('input'));
var form = document.querySelector('form');
var signBtn = document.querySelector('button');
var danger = document.querySelector('.danger');
var notExist = document.querySelector('.warning');
var wrongPassword = document.querySelector('.wrongpassword');
var inputNonBlankCount;
var step;
var userContainer = [];
var emailSaver = [];
userContainer = JSON.parse(localStorage.getItem('userdata'));

signUp.addEventListener('click', function () {  /// signup redirect
    window.location.href = ('./Signup.html');
})

form.addEventListener('click', function (e) {  /// prevent reload
    e.preventDefault();
})

for (var i = 0; i < inputArr.length; i++) { ////regex
    inputArr[i].addEventListener('input', function (e) {
        validCount = inputArr.length;
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
        }
    })
}

signBtn.addEventListener('click', inputstatus);
function inputstatus() {               //// required blank
    inputNonBlankCount = 0;
        for (var i = 0; i < inputArr.length; i++) {
            if (inputArr[i].value == "") {
                danger.classList.remove('d-none');
                wrongPassword.classList.add('d-none');
                notExist.classList.add('d-none');
                break;
            }
            else {
                inputNonBlankCount = 1 + inputNonBlankCount;
            }
        }
    if (inputNonBlankCount == inputArr.length) {
        danger.classList.add('d-none');
        emailcount()
    }
}

function emailcount() {     //emailcount
    step = 0;
    if (userContainer == null || userContainer == '') {
        notExist.classList.remove('d-none');
    }
    else {
        for (var i = 0; i < userContainer.length; i++) {
            if (userContainer[i].useremail == inputEmail.value && userContainer[i].userpassword == inputPassword.value) {
                console.log('hello');
                notExist.classList.add('d-none');
                wrongPassword.classList.add('d-none');
                window.location.href = ('./home.html');
                emailSaver.push(userContainer[i].useremail);
                localStorage.setItem('emailsaver', emailSaver)
                break;
            }
            else if (userContainer[i].useremail == inputEmail.value && userContainer[i].userpassword != inputPassword.value) {
                wrongPassword.classList.remove('d-none');
                notExist.classList.add('d-none');
                break;
            }
            else {
                notExist.classList.remove('d-none');
            }
        }
    }
}
