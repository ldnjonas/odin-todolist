import {updateTodoEntryData,createTodoEntryViaForm,createProject,getProjectFormData,getProjectIdCounter,removeEntryFromArray,removeProjectFromArray} from "./script.js";
export {addProjectToDom,addTodoToDom,toggleFormVisibility,createInitialUI};


let addProjectToDom = (project) => {
    let projectContainer = document.querySelector("#project-container")
    let div = document.createElement("div")

    let projectId = getProjectIdCounter()
    if(projectId<=5){projectContainer.style.gridTemplateColumns = "repeat("+projectId+",1fr)"}
    div.classList.add("project-"+project.projectId)
    
    let p = document.createElement("p")
    p.classList.add("project-title")
    p.textContent = project.title

    projectContainer.appendChild(div)
    div.appendChild(p)
    let addTodoButton = document.createElement("button")
    addTodoButton.classList.add("add-todo-btn")
    addTodoButton.textContent = "Add new Todo"
    addTodoButton.addEventListener("click", () => {createNewTodoEntryForm(project)})
    div.append(addTodoButton)

    let removeProjectButton = document.createElement("button")
    removeProjectButton.classList.add("remove-project-btn")
    removeProjectButton.textContent = "Remove Project"
    removeProjectButton.addEventListener("click", () => {removeProjectFromDom(project)})
    div.append(removeProjectButton)

    div.style.backgroundColor = project.backgroundColor
    div.style.margin = "10px"
    div.style.padding = "10px"
    div.style.borderRadius = "5px"

    
}

let removeProjectFromDom = (project) => {
    let projectOnDom = document.querySelector(".project-"+project.projectId)
    projectOnDom.remove()
    removeProjectFromArray(project)

}

let addTodoToDom = (project,todoEntry) => {
    let projectContainerItem = document.querySelector(".project-"+project.projectId)
    let div = document.createElement("div")
    div.classList.add("todoEntry")
    div.id = "entry"+todoEntry.entryId

    let addNewTodoBtn = document.querySelector(".project-"+project.projectId+" > .add-todo-btn")

    projectContainerItem.insertBefore(div,addNewTodoBtn)
    //projectContainerItem.appendChild(div)
    let fieldId = 0
    
    // for(let property in todoEntry){
    //     if(property === "entryId"){continue}
    //     let p = document.createElement("p")
    //     p.textContent = `${property}: ${todoEntry[property]}`
    //     p.id = "entry"+todoEntry.entryId+"-"+"field"+fieldId++
    //     div.appendChild(p)
    // }

    let upperContentPart = document.createElement("div")
    upperContentPart.classList.add("upper-content-part")
    let bottomContentPart = document.createElement("div")
    bottomContentPart.classList.add("bottom-content-part")
    bottomContentPart.style.display = "none"
    div.append(upperContentPart)
    div.append(bottomContentPart)
    for(let property in todoEntry){
        if(property === "entryId"){continue}
        //let p = document.createElement("p")
        //p.textContent = `${property[0].toUpperCase()}${property.slice(1)}: ${todoEntry[property]}`
        //p.id = "entry"+todoEntry.entryId+"-"+"field"+fieldId++
        let line = document.createElement("p")
        let key = document.createElement("span")
        let value = document.createElement("span")
        
        line.id = "entry"+todoEntry.entryId+"-"+"field"+fieldId++ 
        key.classList.add("key")
        value.classList.add("value")

        
        key.textContent = `${property[0].toUpperCase()}${property.slice(1)}: `
        key.style.fontWeight = "800"

        value.textContent = `${todoEntry[property]}`
        
        line.append(key)
        line.append(value)

        



        if(property === "title" || property === "dueDate"){
            //upperContentPart.append(p)

            upperContentPart.append(line)

        }else{
            //bottomContentPart.append(p)

            upperContentPart.append(line)

        }
    }

    

    

    let updateInfoButton = document.createElement("Button")
    updateInfoButton.textContent = "Update"
    updateInfoButton.addEventListener("click", () => {createUpdateForm(todoEntry),toggleFormVisibility()})
    div.appendChild(updateInfoButton)

    let deleteButton = document.createElement("Button")
    deleteButton.textContent = "Delete"
    deleteButton.addEventListener("click", () => {/*console.log("Project: "+project.title+" todoEntry:" + todoEntry.title)*/removeEntry(project,todoEntry)})
    div.appendChild(deleteButton)

    let showFullTodoButton = document.createElement("Button")
    showFullTodoButton.textContent = "Show"
    showFullTodoButton.addEventListener("click", () => {toggleFullTodoVisibility(todoEntry.entryId)})
    div.appendChild(showFullTodoButton)
}

let removeDivFromDOM = (project,todoEntry) => {
    let div = document.querySelector(".project-"+project.projectId+" > #entry"+todoEntry.entryId)
    div.remove()
   

}

let removeEntry = (project,todoEntry) => {
    removeDivFromDOM(project,todoEntry)
    removeEntryFromArray(project,todoEntry)
}

let toggleFormVisibility = () => {
    let form = document.querySelector("form")
    form.style.display==="block" ? form.style.display="none":form.style.display="block"
 
}

let toggleProjectFormVisibility = () => {
    let form = document.querySelector("#add-new-project-form")
    form.style.display==="block" ? form.style.display="none":form.style.display="block"
}


let toggleFullTodoVisibility = (todoEntryId) => {
    let bottomContentPart = document.querySelector("#entry"+todoEntryId+" > .bottom-content-part")
    bottomContentPart.style.display==="none" ? bottomContentPart.style.display = "flow" : bottomContentPart.style.display="none"
}   

let createUpdateForm = (todoEntry) => {
    let form =  document.querySelector("form")
    form.style.position="absolute"
    form.style.left="50%"
    form.style.top="50%"
    
    form.title.value = todoEntry.title
    form.dueDate.value = todoEntry.dueDate
    form.description.value = todoEntry.description
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
        // let key = document.querySelector("#entry"+todoEntry.entryId+"-"+"field"+fieldId++)
        let key = document.querySelector("#entry"+todoEntry.entryId+"-"+"field"+fieldId +" > .key")
        let value = document.querySelector("#entry"+todoEntry.entryId+"-"+"field"+fieldId +" > .value")
        key.style.fontWeight = "800"


        key.textContent = `${property[0].toUpperCase()}${property.slice(1)}: `
        value.textContent = `${todoEntry[property]}`
        fieldId++
    }
}

let createNewTodoEntryForm = (project) =>{
    let form =  document.querySelector("form")
    let newTodoEntry = createTodoEntryViaForm(project)
    console.log(newTodoEntry.entryId)
    form.title.value = ""
    form.dueDate.value = ""
    form.description.value = ""
    form.priority.value = ""
    form.notes.value = ""
    form.checklist.value = ""
    form.status.value = ""
    toggleFormVisibility()
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        updateTodoEntryData(newTodoEntry)
        addTodoToDom(project,newTodoEntry)
        console.log(newTodoEntry.title)
        console.log("hier")
        toggleFormVisibility()
        },{ once: true })
}

let createInitialUI = () => {
    let projectForm = document.querySelector("#add-new-project-form")
    let addNewProjectButton = document.querySelector("#add-new-project-btn")
    addNewProjectButton.addEventListener("click",() => {toggleProjectFormVisibility()})
    projectForm.addEventListener("submit", (event) => {
        addProjectToDom(getProjectFormData())
        toggleProjectFormVisibility()
        projectForm.title.value=""
        event.preventDefault();
    },)
}




