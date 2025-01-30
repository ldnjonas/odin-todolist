export {addProjectToDom,addTodoToDom};


let addProjectToDom = (project) => {
    let projectContainer = document.querySelector("#project-container")
    let div = document.createElement("div")

    div.classList.add("project-"+project.title)
    
    let p = document.createElement("p")
    p.textContent = project.title

    projectContainer.appendChild(div)
    div.appendChild(p)    
}

let addTodoToDom = (project,todoEntry) => {
    let projectContainerItem = document.querySelector(".project-"+project.title)
    let div = document.createElement("div")
    div.classList.add("todoEntry")
    div.id = todoEntry.title
    projectContainerItem.appendChild(div)
    for(let property in todoEntry){
        let p = document.createElement("p")
        p.textContent = `${property}: ${todoEntry[property]}`
        console.log(`${property}: ${todoEntry[property]}`)
        div.appendChild(p)
    }
    let updateInfoButton = document.createElement("Button")
    updateInfoButton.textContent = "Update"
    updateInfoButton.addEventListener("click", () => {alert("Update")})
    div.appendChild(updateInfoButton)

    let deleteButton = document.createElement("Button")
    deleteButton.textContent = "Delete"
    deleteButton.addEventListener("click", () => {removeDivFromDOM(todoEntry.title)})
    div.appendChild(deleteButton)
}

let removeDivFromDOM = (divID) => {
    let div = document.querySelector("#"+divID)
    div.remove()
}