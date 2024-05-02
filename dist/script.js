//TODO add tasks delete
function WriteToLocalstorage(data, name) {
    localStorage.setItem(name, JSON.stringify(data));
}
function GetFromLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name));
}
function updateToDoStatus(id) {
    const taskList = GetFromLocalStorage("todoList");
    taskList.forEach((task) => {
        if (task.id === id) {
            task.done = !task.done;
        }
    });
    WriteToLocalstorage(taskList, "todoList");
}
function deleteToDo(id) {
    const taskList = GetFromLocalStorage("todoList");
    taskList.forEach((task, index) => {
        if (task.id === id) {
            taskList.splice(index, 1);
        }
    });
    WriteToLocalstorage(taskList, "todoList");
}
//function that draws the list of tasks in HTML
function renderTasks(parent) {
    //clearing parent list
    parent.innerHTML = "";
    const taskList = GetFromLocalStorage("todoList");
    taskList.forEach(task => {
        parent.append(createTaskElement(task));
    });
}
//function that create task from the input with default not done
function createTask(taskName, status) {
    return {
        id: Date.now(),
        name: taskName,
        done: status === undefined ? false : status,
    };
}
//function to create task HTML element. Returns either element or null
function createTaskElement(task) {
    //creating parent element
    const parent = document.createElement("li");
    parent.classList.add("task");
    let name = document.createElement("h3");
    name.classList.add("taskName");
    name.innerHTML = task.name;
    let btnsWrapper = document.createElement("div");
    btnsWrapper.classList.add("btnsWrapper");
    //add checkbox and it's functionality
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => {
        updateToDoStatus(task.id);
    });
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener('click', () => {
        deleteToDo(task.id);
        window.location.reload();
    });
    btnsWrapper.append(deleteBtn, checkbox);
    parent.append(name, btnsWrapper);
    return parent;
}
//initialization function. It gets all the elements from index.html, adds functionality to form, 
function initialize() {
    //get data from localStorage
    let taskList = GetFromLocalStorage("todoList");
    let list = document.getElementById("list");
    //Render task from localstorage
    renderTasks(list);
    // get form for task creation
    let form = document.getElementById("form");
    let taskNameInput = document.getElementById("taskNameInput");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // submit in list only when name is not empty
        if (taskNameInput.value != "") {
            taskList.push(createTask(taskNameInput.value));
            taskNameInput.value = "";
            WriteToLocalstorage(taskList, "todoList");
            renderTasks(list);
        }
    });
}
initialize();
