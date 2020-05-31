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
    //Clear before re-rendeing.
    element.innerHTML = "";
    if (list != null) {
        list.forEach(item => {
        element.innerHTML += ("<li>" + item.content + "</li>");
    });
    }
    
}