//TODO add tasks delete

type Task = {
    id: number,
    name: string,
    done: boolean
}

function WriteToLocalstorage(data: Task[], name: string): void{
    localStorage.setItem(name, JSON.stringify(data))
}

function GetFromLocalStorage(name: string): Task[] {
    return JSON.parse(localStorage.getItem(name))
}

function updateToDoStatus(id: number): void{
    const todoList = GetFromLocalStorage("todoList")
    todoList.forEach((task) => {
        if(task.id === id){
            task.done = !task.done
        }
    })
    WriteToLocalstorage(todoList, "todoList")
}

function deleteToDo(id: number){
    const todoList = GetFromLocalStorage("todoList")
    todoList.forEach((task, index) => {
        if(task.id === id){
            todoList.splice(index, 1)
        }
    })
    WriteToLocalstorage(todoList, "todoList")
}

//function that draws the list of tasks in HTML
function renderTasks(parent: HTMLElement): void {
    //clearing parent list
    parent.innerHTML = ""

    const todoList = GetFromLocalStorage("todoList")
    todoList.forEach(task => {
        parent.append(createTaskElement(task))
    })
}

//function that create task from the input with default not done
function createTask(taskName: string, status?: boolean): Task | null {
    return {
        id: Date.now(),
        name: taskName,
        done: status === undefined ? false : status,
    }
}

//function to create task HTML element. Returns either element or null
function createTaskElement(task: Task): HTMLElement | null {
    //creating parent element
    const parent = document.createElement("li")
    parent.classList.add("task")

    let name = document.createElement("h3")
    name.classList.add("taskName")
    name.innerHTML = task.name

    let btnsWrapper = document.createElement("div")
    btnsWrapper.classList.add("btnsWrapper")

    //add checkbox and it's functionality
    let checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.classList.add("checkbox")
    checkbox.checked = task.done
    
    checkbox.addEventListener('change', () => {
        updateToDoStatus(task.id)
    })

    let deleteBtn = document.createElement("button")
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "40")
    svg.setAttribute("height", "40")
    svg.classList.add("svg")
    fetch('./img/delete.svg')
  .then(response => response.text())
  .then(svgContent => {
    svg.innerHTML = svgContent;
  })
  .catch(error => {
    console.error("Error fetching SVG:", error);
  });

  // Append the SVG to the button
deleteBtn.appendChild(svg);
    deleteBtn.classList.add("deleteBtn")
    deleteBtn.addEventListener('click', () => {
        deleteToDo(task.id)
        renderTasks(document.getElementById("list"));
    })

    btnsWrapper.append(deleteBtn,checkbox)
    parent.append(name, btnsWrapper)

    return parent
}

//initialization function. It gets all the elements from index.html, adds functionality to form, 
function initialize() {
    //get data from localStorage
    let todoList: Task[] = GetFromLocalStorage("todoList")

    let list = document.getElementById("list")
    //Render task from localstorage
    renderTasks(list)
    
    // get form for task creation
    let form = document.getElementById("form")
    let taskNameInput = document.getElementById("taskNameInput") as HTMLInputElement
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        // submit in list only when name is not empty
        if(taskNameInput.value != ""){
            todoList = GetFromLocalStorage("todoList")
            todoList.push(createTask(taskNameInput.value))
            taskNameInput.value = ""
            WriteToLocalstorage(todoList, "todoList")
            renderTasks(list)
        }
        
    })
}

initialize()