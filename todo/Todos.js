import * as ls from "./ls.js";
import * as utilities from "./utilities.js";

let todoList = null;

export default class Todos {
    constructor(elementId, key) {
        this.elementId = utilities.qs(elementId);
        this.key = key;
        //make it so addTodo function will be called when button is touched.
        utilities.onTouch("#add", this.addTodo);
    }
    listTodos() {
        renderTodoList(getTodos("myList"), this.elementId);
    }
    addTodo() {
        const task = document.getElementById("new-item").value;
        saveTodo(task, "myList");
        this.listTodos();
    }
    
}

function saveTodo(task, key) {
    let date = new Date();    
    let todo = { id:date.getTime(), content:task, completed:false };
    //Add one item to list
    if (todoList == null) {
        todoList = [ todo ]
    }
    else {
        todoList.push(todo);
    }
    
    //Save entire list to localStorage
    ls.writeToLS(key, todoList);

    
}

function getTodos(key) {
    if (todoList == null) {
        let items = ls.readFromLS(key);
        todoList = items;
    }
    return todoList;
}

function renderTodoList(list, element) {
    //element.innerHTML = "";
    if (list != null) {
        //col1 has the "complete" buttons to mark when you've finished
        let col1 = document.getElementById("col1");
        col1.innerHTML = "";
        list.forEach(item => {
            let complete = document.createElement("div");
              
                if (item.completed) {
                    complete.innerHTML = "<p>✓</p>"
                }
                else {
                    complete.innerHTML = "<p>◯</p>";
                }
                complete.id = `c${item.id}`;                    
                col1.appendChild(complete);
            
        });

        //col2 has the actual text
        let col2 = document.getElementById("col2");
        col2.innerHTML = "";
        list.forEach(item => {
            let content = document.createElement("div");
            if (item.completed) {
                content.innerHTML = `<p><del>${item.content}</del></p>`;
            }
            else {
                content.innerHTML = `<p>${item.content}</p>`;
            }
            col2.appendChild(content);
        });
        //The delete button
        let col3 = document.getElementById("col3");
        col3.innerHTML = "";
        list.forEach(item => {
            let remove = document.createElement("div");
            remove.innerHTML = "<p>X</p>";
            remove.id = `r${item.id}`;               
            col3.appendChild(remove);

        });
        addCompleteListeners(list);
        addRemoveListeners(list);
    }
                    
    //Render footer as well
    let footer = utilities.qs("#list-footer");
    if (list == null) {
        footer.innerHTML = "0 tasks left";
    }
    else {
        footer.innerHTML = countNotDone(list) + " tasks left";
        }
        
        
    }

function addCompleteListeners(list) {
    list.forEach(item => {
        utilities.onTouch(`#c${item.id}`, ()=> {
            if (item.completed) {
                        item.completed = false;
                    }
            else {
                 item.completed = true;
                 }                    
            ls.writeToLS("myList", list);
            renderTodoList(getTodos("myList"), utilities.qs("#list"));
            });
    });
}

function addRemoveListeners(list) {
    for (let i = 0; i < list.length; i++) {
           utilities.onTouch(`#r${list[i].id}`, ()=> { 
                list.splice(i, 1);
                ls.writeToLS("myList", list);
                renderTodoList(getTodos("myList"), utilities.qs("#list"));
           });         
     }
}

function countNotDone(list) {
    let count = 0;
    list.forEach(item => {
        if (!item.completed) {
            count++;
        }
    });
    return count;
}