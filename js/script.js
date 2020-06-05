//  select Elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');
// classes names
const CHECK = "uil-check-circle";
const UNCHECK = "uil-circle";
const line_Through = "lineThrough";

// variables
let LIST,
    id;
// get item from local storage
let data = localStorage.getItem('TODO')
    //  check if data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
} else {
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user interface
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    })
}
// clear the local storage
clear.addEventListener('click', function() {
        localStorage.clear();
        location.reload();
    })
    // show todays date
const options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function
function addToDo(toDo, id, done, trash) {
    if (trash) { return; }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? line_Through : "";
    const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                   <i class="uil uil-trash-alt de" job="delete"id="${id}"></i>
                    </i>
    `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

// add an item to the list using enter key
document.addEventListener("keyup", function(event) {
        if (event.keyCode == 13) {
            const toDo = input.value;
            // if the input isn't empty
            if (toDo) {
                addToDo(toDo, id, false, false);
                LIST.push({
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false,
                });
                // get item to local storage
                localStorage.setItem('TODO', JSON.stringify(LIST));
                id++;
            }
            input.value = "";
        }
    })
    // complete todo
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector('.text').classList.toggle(line_Through);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}
// remove todo
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

// target the items created dynamically
list.addEventListener('click', function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob == 'complete') {
        completeToDo(element);
    } else if (elementJob == 'delete') {
        removeToDo(element);
    }

    // get item to local storage
    localStorage.setItem('TODO', JSON.stringify(LIST));
})