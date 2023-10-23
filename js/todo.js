const addButton = document.querySelector('#addBtn');
const input = document.querySelector('input');

let toDoList = document.querySelector('#toDoList');

const listContainer = document.querySelector('#listContainer');

addButton.addEventListener('click', (event) => {
    event.preventDefault();

    if(input.value.length < 1) {
        alert('Please enter an item');
    } else {
        display();
        addItem();
    }
});

input.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') {
        event.preventDefault();
        addButton.click();
    }
})

function display() {
    if(listContainer.classList.contains('d-none')) {
        listContainer.classList.remove('d-none');
    }
}

listContainer.addEventListener('click', (event) => {
    if(event.target.tagName === 'LI') {
        event.target.classList.toggle('text-decoration-line-through');
        save()
    } else if(event.target.tagName === 'SPAN') {
        event.target.parentElement.remove();
        if(toDoList.childElementCount === 0) {
            listContainer.classList.add('d-none');
        }
        save()
    }
});

function addItem() {
    let li = document.createElement('LI');
    li.textContent = input.value;
    toDoList.appendChild(li);
    addRemoveBtn(li);
    input.value = input.defaultValue;
    save()
}

function addRemoveBtn(li) {
    let span = document.createElement('SPAN');
    let removeTxt = document.createTextNode('\u00d7');
    span.appendChild(removeTxt);
    li.appendChild(span);
}

function save() {
    localStorage.setItem('data', toDoList.innerHTML);
}

function retrieve() {
    if(localStorage.getItem('data') === null || localStorage.getItem('data') === '') {
        return;
    }
    display();
        toDoList.innerHTML = localStorage.getItem('data');
    
}
retrieve();