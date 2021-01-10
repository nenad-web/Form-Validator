const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');


function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email.value)){
        showSuccess()
    } else {
        showError(email, 'Email is not valid');
    }
}

const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

const checkLength = (input, min, max) => {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters!`);
    } else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} charaters!`)
    } else {
        showSuccess();
    }
}

const checkPasswordsMatch = (input1, input2) => {
    if(input1.value !== input2.value){
        showError(input2, 'Passwords do not match!');
    }
} 

function checkRequired(inputArr){
    inputArr.forEach((input) => {
       if(input.value.trim() === ''){
           showError(input, `${getFieldName(input)} is required`)
       } else {
           showSuccess(input)
       }
    });
}

form.addEventListener('submit', function(e){
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 16);
    checkLength(password, 6, 20);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
})