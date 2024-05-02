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
    const taskList = GetFromLocalStorage("todoList")
    taskList.forEach((task) => {
        if(task.id === id){
            task.done = !task.done
        }
    })
    WriteToLocalstorage(taskList, "todoList")
}

//function that draws the list of tasks in HTML
function renderTasks(parent: HTMLElement): void {
    //clearing parent list
    parent.innerHTML = ""

    const taskList = GetFromLocalStorage("todoList")
    taskList.forEach(task => {
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

    //add checkbox and it's functionality
    let checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.classList.add("checkbox")
    checkbox.checked = task.done
    
    checkbox.addEventListener('change', () => {
        updateToDoStatus(task.id)
    })
    parent.append(name, checkbox)

    return parent
}

//initialization function. It gets all the elements from index.html, adds functionality to form, 
function initialize() {
    //get data from localStorage
    let taskList: Task[] = GetFromLocalStorage("todoList")

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
            taskList.push(createTask(taskNameInput.value))
            taskNameInput.value = ""
            WriteToLocalstorage(taskList, "todoList")
            renderTasks(list)
        }
        
    })
}

initialize()