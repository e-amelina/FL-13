const eveningTime = 20;
const dayTime = 8;
const minLengthLogin = 4;

validateLogin();

function validateLogin() {
    const login = prompt('Input your login');

    if (login === null) {
        alert('Canceled');

        return;
    }
    if (login.length < minLengthLogin) {
        alert('I don\'t know any users having name length less than 4 symbols');
        validateLogin();

        return;
    }
    if (login === 'User' || login === 'Admin') {
        validatePassword(login);
    } else {
        alert('I don\'t know you');
        validateLogin();
    }
}


function validatePassword(login) {
    const password = prompt('Input your password');

    if (password === null) {
        alert('Canceled');

        return;
    }
    if (
        login === 'User' && password === 'UserPass' ||
        login === 'Admin' && password === 'RootPass'
    ) {
        greeting(login);

        return;
    } else {
        alert('Wrong password');
        validatePassword(login);
    }
}

function greeting(login) {
    const time = new Date().getHours();

    if (time < eveningTime && time > dayTime) {
        alert(`Good day, dear ${login}!`);
    } else {
        alert(`Good evening, dear ${login}!`);
    }
}