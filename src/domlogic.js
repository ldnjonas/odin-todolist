import {updateTodoEntryData} from "./script.js";
export {addProjectToDom,addTodoToDom,toggleFormVisibility};


let addProjectToDom = (project) => {
    let projectContainer = document.querySelector("#project-container")
    let div = document.createElement("div")

    div.classList.add("project-"+project.projectId)
    
    let p = document.createElement("p")
    p.textContent = project.title

    projectContainer.appendChild(div)
    div.appendChild(p)    
}

let addTodoToDom = (project,todoEntry) => {
    let projectContainerItem = document.querySelector(".project-"+project.projectId)
    let div = document.createElement("div")
    div.classList.add("todoEntry")
    div.id = todoEntry.entryId
    projectContainerItem.appendChild(div)
    let fieldId = 0
    for(let property in todoEntry){
        if(property === "entryId"){continue}
        let p = document.createElement("p")
        p.textContent = `${property}: ${todoEntry[property]}`
        p.id = "entry"+todoEntry.entryId+"-"+"field"+fieldId++
        div.appendChild(p)
    }
    let updateInfoButton = document.createElement("Button")
    updateInfoButton.textContent = "Update"
    updateInfoButton.addEventListener("click", () => {createUpdateForm(todoEntry),toggleFormVisibility()})
    div.appendChild(updateInfoButton)

    let deleteButton = document.createElement("Button")
    deleteButton.textContent = "Delete"
    deleteButton.addEventListener("click", () => {removeDivFromDOM(todoEntry.entryId)})
    div.appendChild(deleteButton)
}

let removeDivFromDOM = (divID) => {
    let div = document.querySelector("#"+divID)
    div.remove()
}

let toggleFormVisibility = () => {
    let form = document.querySelector("form")
    form.style.display==="block" ? form.style.display="none":form.style.display="block"
 
}

let createUpdateForm = (todoEntry) => {
    let form =  document.querySelector("form")
    form.style.position="absolute"
    form.style.left="50%"
    form.style.top="50%"
    
    form.title.value = todoEntry.title
    form.description.value = todoEntry.description
    form.duedate.value = todoEntry.duedate
    form.priority.value = todoEntry.priority
    form.notes.value = todoEntry.notes
    form.checklist.value = todoEntry.checklist
    form.status.value = todoEntry.status
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        updateTodoEntryData(todoEntry)
        updateTodoOnDOM(todoEntry)
        console.log("hier")
        toggleFormVisibility()
        },{ once: true })

}

let updateTodoOnDOM = (todoEntry) => {
    
    let fieldId = 0
    for(let property in todoEntry){
        if(property === "entryId"){continue}        
        let p = document.querySelector("#entry"+todoEntry.entryId+"-"+"field"+fieldId++)
        p.textContent = `${property}: ${todoEntry[property]}`
    }
}



