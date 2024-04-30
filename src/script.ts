type Task = {
    name: string,
    done: boolean
}

//function that draws the list of tasks in HTML
function drawTasks(taskList: Task[], parent: HTMLElement): void {
    //clearing parent list
    parent.innerHTML = ""
    taskList.forEach(task => {
        //creating and defining elements
        let wrapper = document.createElement("div")
        wrapper.classList.add("task")

        let nameElem = document.createElement("h4")
        nameElem.classList.add("taskName")
        nameElem.innerHTML = task.name

        let checkboxElem = document.createElement("input")
        checkboxElem.type = "checkbox"
        checkboxElem.classList.add("taskCheckbox")
        checkboxElem.checked = task.done
        if(checkboxElem){
            wrapper.classList.add("done")
        }
        
        wrapper.append(nameElem, checkboxElem)
        parent.append(wrapper)
    })
}

//function that create task from the input with default not done
function createTask(taskName: string): Task | null {
    return {
        name: taskName,
        done: false
    }
}

//function to create task HTML element. Returns either element or null
function createTaskElement(task: Task): HTMLElement | null {
    //creating parent element
    const parent = document.createElement("li")
    parent.classList.add("task")



    //add checkbox and it's functionality
    let checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = task.done
    return parent
}

//initialization function. It gets all the elements from index.html, adds functionality to form, 
function initialize(): void {
    // creating variables
    let taskList: Task[] = []

    let list = document.getElementById("list")

    // get form for task creation
    let form = document.getElementById("form")
    let taskNameInput = document.getElementById("taskNameInput") as HTMLInputElement
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        taskList.push(createTask(taskNameInput.value))
        drawTasks(taskList, list)
    })

}

initialize()