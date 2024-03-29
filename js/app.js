(() => {
    const DATE_ELEMENT = document.getElementById("date");
    const LIST_ELEMENT = document.getElementById("list");
    const INPUT_ELEMENT = document.getElementById("todo");
    const ADD_BUTTON_ELEMENT = document.getElementById("add-button");
    const ADDRESS = 'https://jsonplaceholder.typicode.com/todos';

    const CHECK = "fa-check-circle";
    const UNCHECK = "fa-circle-thin";
    const LINE_THROUGH = "lineThrough";

    const OPTIONS = {weekday:"long", month:"short", day:"numeric"};
    const TODAY = new Date();

    let toDosList = [];

    DATE_ELEMENT.innerHTML = TODAY.toLocaleDateString("en-US", OPTIONS);

    (() => {
        fetch(ADDRESS)
      .then(response => response.json())
      .then(json => addToList(json));
    })();

    let addToList = (todos) => {
        for (let todo of todos){
            addToDo(todo.title, todo.id, todo.completed);
        }
    };

    let addToDo = (toDo, id, completed = false, trash = false) => {
        if(trash){ return; }

        const DONE = completed ? CHECK : UNCHECK;
        const LINE = completed ? LINE_THROUGH : "";

        let item = `
                      <li class="item">
                        <i class="fa ${DONE} co" data-job="complete" id="${id}"></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fa fa-trash-o de" data-job="delete" id=${id}></i>
                      </li>
                    `;

        LIST_ELEMENT.insertAdjacentHTML("beforeend", item);

        toDosList.push({
                    name: toDo,
                    id : id,
                    completed : completed,
                    trash : trash
                });

    };

    document.addEventListener("keyup", (even) => {
        if(even.keyCode == 13){
            let max = 0;
            for(let i of toDosList){
                if (i.id > max){
                    max = i.id;
                }
            }

            let toDo = INPUT_ELEMENT.value;
            if(toDo){

                addToDo(toDo, max+1);
            }
            INPUT_ELEMENT.value = ""
        }
    });

    let completeToDO = (id) => {
        let element = document.getElementById(id);
        element.classList.toggle(CHECK);
        element.classList.toggle(UNCHECK);
        element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

        toDosList[element.id].completed = !toDosList[element.id].completed;
    };

    let removeToDO = (id) => {
        let element = document.getElementById(id);
        element.parentNode.parentNode.removeChild(element.parentNode);

        toDosList[element.id].trash = true;
    };

    LIST_ELEMENT.addEventListener("click", (event) => {
        const element = event.target;
        const elementJob = element.dataset.job;

        if(elementJob === "complete"){
            completeToDO(element.id);
        }else if(elementJob === "delete"){
            removeToDO(element.id);
        }
    });

    ADD_BUTTON_ELEMENT.addEventListener("click", (event) => {
        const element = event.target;
        const elementJob = element.dataset.job;

        if(elementJob === "add"){
            let max = 0;
            for(let i of toDosList){
                if (i.id > max){
                    max = i.id;
                }
            }

            let toDo = INPUT_ELEMENT.value;
            if(toDo){
                addToDo(toDo, max+1);
            }
            INPUT_ELEMENT.value = ""
        }
    });
})();

