function updateTask(task) {
    task.done = !task.done;
}
//function that draws the list of tasks in HTML
function renderTasks(taskList, parent) {
    //clearing parent list
    parent.innerHTML = "";
    taskList.forEach(task => {
        //creating and defining elements
        let wrapper = document.createElement("div");
        wrapper.classList.add("task");
        let nameElem = document.createElement("h3");
        nameElem.classList.add("taskName");
        nameElem.innerHTML = task.name;
        let checkboxElem = document.createElement("input");
        checkboxElem.type = "checkbox";
        checkboxElem.classList.add("checkbox");
        checkboxElem.checked = task.done;
        if (checkboxElem) {
            wrapper.classList.add("done");
        }
        wrapper.append(nameElem, checkboxElem);
        parent.append(wrapper);
    });
}
//function that create task from the input with default not done
function createTask(taskName, status) {
    return {
        name: taskName,
        done: status === undefined ? false : status,
    };
}
//function to create task HTML element. Returns either element or null
function createTaskElement(task) {
    //creating parent element
    const parent = document.createElement("li");
    parent.classList.add("task");
    //add checkbox and it's functionality
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener('change', (e) => {
        task.done = !task.done;
    });
    return parent;
}
//initialization function. It gets all the elements from index.html, adds functionality to form, 
function initialize() {
    // creating variables
    let taskList = [];
    let list = document.getElementById("list");
    // get form for task creation
    let form = document.getElementById("form");
    let taskNameInput = document.getElementById("taskNameInput");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // submit in list only when name is not empty
        if (taskNameInput.value != "") {
            console.log(taskNameInput.value);
            taskList.push(createTask(taskNameInput.value));
            taskNameInput.value = "";
            renderTasks(taskList, list);
        }
    });
}
initialize();
