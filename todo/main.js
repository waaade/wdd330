"use strict";
import Todos from "Todos.js";

const toDo = new Todos('todo', 'list');

//make it so addTodo function will be called when button is touched.
toDo.onTouch("#add", addTodo);