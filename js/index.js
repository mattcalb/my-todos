var todos = JSON.parse(localStorage.getItem("todos")) || [];

const form = document.querySelector("form");

const input = document.querySelector("input");

const todoList = document.getElementById("todos");

form.addEventListener('submit', (e) => {

    e.preventDefault();

    const newTodo = {
        "todo": input.value,
        "completed": false
    }

    todos.push(newTodo);

    saveTodos();

    refreshTodos();

    input.value = "";
})

function refreshTodos() {

    todoList.innerHTML = "";

    for (let i = 0; i < todos.length; i++) {

        todoElement = document.createElement("li");

        todoElement.setAttribute('onclick', `completeTodo(${i})`);

        deleteButton = document.createElement("button");

        deleteButton.classList.add('delete-btn', 'material-icons', 'right-align');

        buttonText = document.createTextNode("delete");

        deleteButton.appendChild(buttonText);

        deleteButton.setAttribute('onclick', `deleteTodo(${i})`);

        todoName = document.createElement("div");

        todoName.classList.add('todo-name')

        todoName.innerText = todos[i].todo;

        if (todos[i].completed) {
            todoName.classList.add('completed');
        }

        todoElement.appendChild(todoName);

        todoElement.appendChild(deleteButton);

        todoList.appendChild(todoElement);
    }

}

refreshTodos();

function completeTodo(index) {

    todos[index].completed = !todos[index].completed;

    refreshTodos();

    saveTodos();
}

function deleteTodo(index) {

    event.stopPropagation(); // prevent the completeTodo function from being triggered when the user delete a todo

    todos.splice(index, 1);

    refreshTodos();

    saveTodos();
}


function saveTodos() {

    localStorage.setItem('todos', JSON.stringify(todos));

}