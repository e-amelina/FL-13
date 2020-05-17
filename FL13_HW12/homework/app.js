const delay = 300;
const notFound = -1;
const root = document.getElementById('root');

const listBooks = document.createElement('div');
listBooks.className = 'list-book';
root.append(listBooks);

const dynamicBlock = document.createElement('div');
dynamicBlock.className = 'dynamic-block';
root.append(dynamicBlock);

const booksList = JSON.parse(localStorage.getItem('books'));

createListBook(listBooks);

window.addEventListener('popstate', (e) => {
    e.preventDefault();
    updateState(location.hash.slice(1));
});

window.addEventListener('load', checkLocation());

function checkLocation() {
    let newURL = location.href;
    const id = location.search.slice(4);
    let hash = location.hash;
    if (id > booksList.length ||
        hash !== 'add' && hash !== 'previw' && hash !== 'edit' && hash !== '') {
        if (location.href.indexOf('?') !== notFound) {
            newURL = newURL.slice(0, location.href.indexOf('?'));
        }
        if (location.href.indexOf('#') !== notFound) {
            newURL = newURL.slice(0, location.href.indexOf('#'));
        }
        location.href = newURL;
    }
}


function createListBook(parent) {
    parent.append(createListItem(booksList));

    const buttonAdd = document.getElementById('btn-add');
    buttonAdd.addEventListener('click', (e) => {
        e.preventDefault();
        let newURL = location.href;
        if (location.href.indexOf('?') !== notFound) {
            newURL = newURL.slice(0, location.href.indexOf('?'));
        }
        if (location.href.indexOf('#') !== notFound) {
            newURL = newURL.slice(0, location.href.indexOf('#'));
        }
        window.history.pushState('', '', newURL + `#add`);
        updateState(location.hash.slice(1));
    });

    const booksImg = document.getElementsByClassName('book-img');
    for (let i = 0; i < booksImg.length; i++) {
        booksImg[i].setAttribute('href', `?id=${i + 1}#preview`);
        booksImg[i].addEventListener('click', (e) => {
            e.preventDefault();
            const state = {
                page: e.target.getAttribute('href')
            };
            history.pushState(state, '', state.page);
            updateState(location.hash.slice(1));
        });
    }

    const editButtons = document.getElementsByClassName('btn-edit');
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].setAttribute('href', `?id=${i + 1}#edit`);
        editButtons[i].addEventListener('click', (e) => {
            e.preventDefault();
            const state = {
                page: e.target.getAttribute('href')
            };
            history.pushState(state, '', state.page);
            updateState(location.hash.slice(1));
        });
    }
}

function applyChanges(id) {
    const changingBook = booksList[id];
    const inputs = document.querySelectorAll('input');
    const labels = document.querySelectorAll('label');
    const plot = document.querySelector('textarea');
    for (let i = 0; i < inputs.length; i++) {
        changingBook[labels[i].innerText] = inputs[i].value;
    }
    changingBook[labels[inputs.length].innerText] = plot.value;

    localStorage.setItem('books', JSON.stringify(booksList));
}

function createListItem(data) {
    const listOfBook = document.createElement('ul');
    data.forEach((obj) => {
        const book = document.createElement('li');
        book.className = 'book';

        const img = document.createElement('img');
        img.src = obj.image;
        img.className = 'book-img'
        book.append(img);

        const block = document.createElement('p');
        block.className = 'title-author';

        const name = document.createElement('p');
        name.innerText = obj.name;
        block.append(name)

        const author = document.createElement('p');
        author.innerText = obj.author;
        block.append(author);
        book.append(block);

        const description = document.createElement('p');
        description.className = 'decription';
        description.innerText = obj.plot;
        book.append(description);

        const edit = document.createElement('button');
        edit.innerText = 'Edit'
        edit.className = 'btn-edit';
        book.append(edit);

        listOfBook.append(book);
    });

    const add = document.createElement('button');
    add.innerText = 'Add books';
    add.id = 'btn-add';
    listOfBook.append(add);

    return listOfBook;
}

function showBook(id) {

    const currentBook = booksList[id];
    const show = document.createElement('div');
    show.className = 'book-show';

    const img = document.createElement('img');
    img.src = currentBook.image;
    img.className = 'book-img-show';
    show.append(img);

    const block = document.createElement('p');
    block.className = 'title-author-show';

    const name = document.createElement('p');
    name.innerText = currentBook.name;
    block.append(name);

    const author = document.createElement('p');
    author.innerText = currentBook.author;
    block.append(author);
    show.append(block);

    const description = document.createElement('p');
    description.className = 'decription-show';
    description.innerText = currentBook.plot;
    show.append(description);

    return show;
}

function paintForm(id, fill) {
    const currentBook = booksList[id];
    const editForm = document.createElement('div');
    editForm.className = 'form-edit';
    const form = document.createElement('form');
    form.id = 'form';
    form.action = '#';
    form.method = 'get';

    Object.keys(currentBook).forEach((item) => {
        const container = document.createElement('div');
        if (item === 'plot') {
            const textArea = document.createElement('textarea');
            if (fill) {
                textArea.value = currentBook[item];
            }
            textArea.id = item;
            textArea.required = true;
            container.append(textArea);
        } else {

            const input = document.createElement('input');
            if (fill) {
                input.value = currentBook[item];
            }
            if (item === 'image') {
                input.type = 'url';
            }
            input.required = true;
            input.id = item;
            container.append(input);
        }
        const label = document.createElement('label');
        label.innerText = item;
        label.for = item;
        label.title = 'This field is required';
        container.append(label);
        form.append(container);
    });

    const cancel = document.createElement('button');
    cancel.innerText = 'Cancel'
    cancel.id = 'btn-cancel';
    form.append(cancel);

    const save = document.createElement('button');
    save.type = 'submit';
    save.innerText = 'Save'
    save.id = 'btn-save';
    form.append(save);

    editForm.append(form);

    return editForm;
}

function addToListBook() {
    const newBook = {};
    const inputs = document.querySelectorAll('input');
    const labels = document.querySelectorAll('label');
    const plot = document.querySelector('textarea');
    for (let i = 0; i < inputs.length; i++) {
        newBook[labels[i].innerText] = inputs[i].value;
    }
    newBook[labels[inputs.length].innerText] = plot.value;
    booksList.push(newBook);

    localStorage.setItem('books', JSON.stringify(booksList));
}

function updateState(currentPage) {
    if (currentPage) {
        const id = location.search.slice(4);
        const parent = document.querySelector('.dynamic-block');
        if (parent.childNodes.length) {
            parent.removeChild(parent.firstChild);
        }
        if (currentPage === 'preview') {
            if (listBooks.childNodes.length) {
                listBooks.removeChild(listBooks.firstChild);
            }
            createListBook(listBooks);
            parent.append(showBook(id - 1));
        }
        if (currentPage === 'edit') {
            parent.append(paintForm(id - 1, true));
            const buttonCancel = document.getElementById('btn-cancel');
            buttonCancel.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('Discard changes?')) {
                    window.history.back();
                }
            });

            const form = document.getElementById('form');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                applyChanges(location.search.slice(4) - 1);
                setTimeout(() => {
                    confirm('Book successfully updated');
                    window.history.pushState('', '', `?id=${location.search.slice(4)}#preview`);
                    updateState(location.hash.slice(1));
                }, delay);
            });
        }
        if (currentPage === 'add') {
            parent.append(paintForm(0, false));
            const form = document.getElementById('form');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                addToListBook();
                setTimeout(() => {
                    confirm('Book successfully created');
                    let newURL = location.href;
                    if (location.href.indexOf('#') !== notFound) {
                        newURL = newURL.slice(0, location.href.indexOf('#'));
                    }
                    window.history.pushState('', '', newURL);
                    window.addEventListener('popstate', updateState(location.hash.slice(1)));

                }, delay);
            });
        }
    } else {
        if (listBooks.childNodes.length) {
            listBooks.removeChild(listBooks.firstChild);
        }
        if (dynamicBlock.childNodes.length) {
            dynamicBlock.removeChild(dynamicBlock.firstChild);
        }
        createListBook(listBooks);
    }
}