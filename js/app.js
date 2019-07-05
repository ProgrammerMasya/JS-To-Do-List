const dataElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const addbutton = document.getElementById("addbutton")

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST = [], id = 0;

const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();

dataElement.innerHTML = today.toLocaleDateString("en-US", options);

fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(json => addToList(json));

function addToList(a) {
    const position = "beforeend";
    var item;
    var DONE, LINE;
    for (var i=0; i < a.length-1; i++){
        DONE = a[i].completed ? CHECK : UNCHECK;
        LINE = a[i].completed ? LINE_THROUGH : "";
        item = `
                  <li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${a[i].title}</p>
                    <i class="fa fa-trash-o de" job="delete" id=${id}></i>
                  </li>
                `;
        list.insertAdjacentHTML(position, item);
        LIST.push({
                name: a[i].title,
                id : id,
                completed : a[i].completed,
                trash : false
            });

            id++;
    }
}

function addToDo(toDo, id, completed, trash) {

    if(trash){ return; }

    const DONE = completed ? CHECK : UNCHECK;
    const LINE = completed ? LINE_THROUGH : "";

    const item = `
                  <li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id=${id}></i>
                  </li>
                `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
}

document.addEventListener("keyup", function (even) {
    if(even.keyCode == 13){
        const toDo = input.value;
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id : id,
                completed : false,
                trash : false
            });

            id++;
        }
        input.value = ""
    }
});

function completeToDO(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].completed = LIST[element.id].completed ? false : true;
}

function removeToDO(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

list.addEventListener("click", function (event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob === "complete"){
        completeToDO(element);
    }else if(elementJob === "delete"){
        removeToDO(element);
    }
});

addbutton.addEventListener("click", function (event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob === "add"){
        const toDo = input.value;
        if(toDo){
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id : id,
                completed : false,
                trash : false
            });

            id++;
        }
        input.value = ""
    }
});

