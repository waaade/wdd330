import * as ls from "ls.js";
import * as utilities from "utilities";
export default class Todos {
    constructor(elementId, key) {
        this.elementId = elementId;
        this.key = key;
        listTodos();
    }

    function addTodo() {
        const task = Document.getElementById("new-item").value;
        saveTodo(task, "myList");
        listTodos();
    }

    function listTodos() {
        const element = Document.getElementById("list");
        renderTodoList(getTodos("myList"), element);
    }
}

let todoList = null;

function saveTodo(task, key) {
    let date = new Date();    
    let todo = { id:date.getTime(), content:task, completed:false }
    //Add one item to list
    todoList.push(todo);
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
    element.innerHTML = "";
    list.forEach(item => {
        element.append("<li>'item.content'</li>");
    });
}