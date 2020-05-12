const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');
const folders = [];

createMenu(rootNode);
createTreeFolders(rootNode, data);

function createTreeFolders(parent, data) {
  const folderList = document.createElement('ul');
  folderList.style.display = 'list-item';
  parent.append(folderList);
  parent.append(createFolderAndFiles(data, folderList));
}

function createFolderAndFiles(arr, parentElement) {

  arr.forEach((obj) => {
    const folderList = document.createElement('ul');

    const element = document.createElement('li');

    const container = document.createElement('div');
    container.className = 'container-items';

    const inputRename = document.createElement('input');
    inputRename.innerText = obj.title;
    inputRename.hidden = true;

    container.append(inputRename);
    container.append(createTitle(obj.title));

    const icon = document.createElement('span');
    icon.className = 'material-icons';

    if (obj.folder) {
      folderList.style.display = 'none';
      element.className = 'folder';
      icon.innerHTML = 'folder';

      container.prepend(icon);
      element.append(container);
      element.append(folderList);

      folders.push(element);
    } else {
      icon.innerHTML = 'insert_drive_file';
      element.className = 'file';

      container.prepend(icon);
      element.append(container);
    }

    if (obj.children) {
      element.append(createFolderAndFiles(obj.children, folderList));
    }
    parentElement.append(element);
  })

  return parentElement;
}

function createTitle(textTitle) {
  const context = document.createElement('span');
  context.innerHTML = textTitle;
  context.style.verticalAlign = 'super';
  context.style.color = 'black';

  return context;
}

const menu = document.querySelector('.menu');
openFolder();
showContectMenu();

function openFolder() {
  folders.forEach(folder => {
    folder.addEventListener('click', (e) => {
      const children = e.target.closest('li').childNodes;
      showItems(children);
      e.stopPropagation();
    })
  });
}

function showItems(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].style.display === 'none') {
      arr[i].style.display = 'list-item';

      if (arr[i].childNodes.length) {
        arr[0].childNodes[0].innerHTML = 'folder_open';
      } else {
        arr[0].childNodes[0].innerHTML = 'folder_open';
        arr[i].append(createContentEmptyFolder());
        arr[i].style.paddingLeft = '0px';
      }
    } else {
      if (arr[i].style.display === 'list-item') {
        arr[i].style.display = 'none';
        arr[0].childNodes[0].innerHTML = 'folder';
      }
    }

  }
}

function createContentEmptyFolder() {
  const folderContent = document.createElement('span');
  folderContent.innerHTML = 'Folder is empty';
  folderContent.style.color = 'black';
  folderContent.style.fontFamily = 'Georgia, \'Times New Roman\', Times, serif';
  folderContent.style.fontStyle = 'italic';
  return folderContent;
}

function createMenu(parent) {
  const menu = document.createElement('menu');
  menu.className = 'menu';
  const titlesMenu = ['Rename', 'Delete Item'];
  titlesMenu.forEach((title) => {
    const menuItem = document.createElement('li');
    menuItem.className = 'menu-item';
    const contentMenuItem = document.createElement('span')
    contentMenuItem.innerHTML = title;
    menuItem.append(contentMenuItem);
    menu.append(menuItem);
  });
  parent.append(menu);
}

function showMenu(x, y) {
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
  menu.classList.add('show-menu');
}

function hideMenu() {
  menu.classList.remove('show-menu');
  menu.style.top = '0px';
}

function showContectMenu() {
  document.addEventListener('contextmenu', (e) => {
    menu.classList.remove('disable');
    e.preventDefault();
    const target = e.target;
    showMenu(e.pageX, e.pageY);

    if (target === rootNode) {
      menu.classList.add('disable');
      document.addEventListener('click', () => {
        hideMenu();
      });

      return;
    }
    document.addEventListener('click', (e) => {
      const func = e.target.innerHTML;
      hideMenu();
      functionContextMenu(target, func);
      document.addEventListener('click', () => {
        hideMenu();
      })
    })
  });
}

function rename(target) {
  const parent = target.parentNode;
  const title = parent.childNodes[2];
  title.hidden = true;

  const inputName = parent.childNodes[1];
  inputName.hidden = false;
  inputName.value = title.innerText;

  let lastPosition = inputName.value.length;
  if (inputName.value.includes('.')) {
    lastPosition = inputName.value.indexOf('.');
  }

  inputName.focus();
  inputName.setSelectionRange(0, lastPosition);

  inputName.addEventListener('select', e => {
    e.stopPropagation();
    inputName.addEventListener('keyup', e => {
      const enterUnicode = 13;
      if (e.keyCode === enterUnicode) {
        const name = inputName.value;
        title.hidden = false;
        inputName.hidden = true;
        title.innerText = name;
      }
    })
    inputName.addEventListener('blur', () => {
      const name = inputName.value;
      title.hidden = false;
      inputName.hidden = true;
      title.innerText = name;
    })
  })
}

function deleteItem(target) {
  const elem = target.closest('li');
  const parent = elem.parentNode;
  elem.remove();
  if (!parent.childNodes.length) {
    parent.append(createContentEmptyFolder());
    parent.style.paddingLeft = '0px';
  }
}

function functionContextMenu(target, nameFunc) {
  if (nameFunc === 'Rename') {
    rename(target);
  }
  if (nameFunc === 'Delete Item') {
    deleteItem(target);
  }
}

