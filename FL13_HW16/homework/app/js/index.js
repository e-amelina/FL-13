const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');

const sendHTTPRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);

        const loading = document.querySelector('.loading');
        loading.hidden = false;

        const buttons = document.querySelectorAll('button');
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }

        xhr.responseType = 'json';

        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }

        if (method === 'DELETE') {
            xhr.setRequestHeader('Authorization', 'admin');
        }

        xhr.onerror = () => {
            reject('Error');
        }

        xhr.onload = () => {
            resolve(xhr.response);

        }
        xhr.send(JSON.stringify(data));
    });

    return promise;
}

window.addEventListener('load', () => {
    createPageHeader(appContainer);
    getUsers();
})

function createPageHeader(parent) {
    const title = document.createElement('h1');
    title.innerText = 'Manage User App';
    parent.append(title);

    const addUser = document.createElement('form');
    addUser.id = 'formAddUser';
    addUser.addEventListener('submit', (e) => {
        e.preventDefault();
        addNewUser();
    });

    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.id = 'name';
    inputName.placeholder = 'Name';
    addUser.append(inputName);

    const inputUserName = document.createElement('input');
    inputUserName.type = 'text';
    inputUserName.id = 'username';
    inputUserName.placeholder = 'User Name';
    addUser.append(inputUserName);

    const button = document.createElement('button');
    button.innerText = 'Add New User';
    button.type = 'submit';

    addUser.append(button);

    parent.append(addUser);

    const content = document.createElement('p');
    content.className = 'loading';
    content.innerText = 'Loading...';
    content.hidden = true;
    parent.append(content);
}


function createPagesElements(parent, data) {


    const users = document.createElement('div');
    users.id = 'users';

    data.forEach(element => {
        const user = document.createElement('form');
        user.className = 'user';

        const idUser = document.createElement('label');
        idUser.innerText = element.id;
        user.append(idUser);

        const inputName = document.createElement('input');
        inputName.type = 'text';
        inputName.value = element.name;
        user.append(inputName);

        const inputUserName = document.createElement('input');
        inputUserName.type = 'text';
        inputUserName.value = element.username;
        user.append(inputUserName);

        const updateButton = document.createElement('button');
        updateButton.innerText = 'Update';
        updateButton.addEventListener('click', e => {
            e.preventDefault();
            const target = e.target;
            updateUser(target);
        })
        user.append(updateButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', e => {
            e.preventDefault();
            const target = e.target;
            deleteUser(target);
        })
        user.append(deleteButton);

        users.append(user);

    });

    parent.append(users);

}

function addNewUser() {
    const dataUser = {
        name: document.getElementById('name').value,
        username: document.getElementById('username').value
    };

    sendHTTPRequest('POST', `${baseUrl}\\users`, dataUser).then(() => {
        getUsers();
    })
}

function deleteUser(target) {
    const parent = target.parentNode;
    const childs = parent.childNodes;
    const userId = childs[0].innerText;

    sendHTTPRequest('DELETE', `${baseUrl}\\users\\${userId}`)
        .then(() => {
            getUsers();
        });

}

function updateUser(target) {
    const parent = target.parentNode;
    const childs = parent.childNodes;
    const userId = childs[0].innerText;

    const data = {
        name: childs[1].value,
        username: childs[2].value
    }

    sendHTTPRequest('PUT', `${baseUrl}\\users\\${userId}`, data)
        .then(() => {
            getUsers();
        })

}

function getUsers() {
    sendHTTPRequest('GET', `${baseUrl}\\users`)
        .then(data => {
            const container = document.getElementById('users');
            if (container) {
                const parent = container.parentNode;
                parent.removeChild(container);
            }
            createPagesElements(appContainer, data);
        })
        .finally(() => {
            const buttons = document.querySelectorAll('button');
            buttons[0].disabled = false;

            document.getElementById('name').value = '';
            document.getElementById('username').value = '';

            const content = document.querySelector('.loading');
            content.hidden = true;
        })
}