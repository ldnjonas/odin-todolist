import "./style.css";
import {addProjectToDom, addTodoToDom,showForm,createInitialUI} from "./domlogic.js";
export {updateTodoEntryData,createTodoEntryViaForm,getProjectFormData,getProjectIdCounter,removeEntryFromArray,removeProjectFromArray}
let createInitalDefaultProject = () => {
    let project = createProject("Default")
    project.default = true 
    return project
}

let createProject = (title) => {
    let project = {title,default:false,projectContentArray:[],projectId:projectIdCounter}
    addProjectToArray(project)
    
    return project
}

let addProjectToArray = (project) => {
    projectArray.push(project)
    projectIdCounter++
    savePageContent()
}

let projectArray = []
let entryIdCounter = 0
let projectIdCounter = projectArray.length

let getProjectIdCounter = () => {
    return projectIdCounter
}

let createTodoEntry = (title,dueDate,description,priority,notes,checklist,status) => {
    return{title,dueDate,description,priority,notes,checklist,status,entryId:entryIdCounter++}
}

let addTodoEntryToContentArray = (project,entry) => {
    project.projectContentArray.push(entry)
    savePageContent()
}

let getProjectByTitle = (projectTitle) => {
    for(let project of projectArray){
        if(project.title === projectTitle){
            return project
        }
    }
}

let getTodoByTitle = (project,todoTitle) => {
    for(let todoEntry of project.projectContentArray){
        if(todoEntry.title === todoTitle)
            return todoEntry
    }
}

let toogleEntryStatus = (projectTitle,todoTitle) => {
    let todoEntry = getTodoByTitle(getProjectByTitle(projectTitle),todoTitle)
    if(todoEntry){
        todoEntry = false
    }else{
        todoEntry = true
    }
}

let updateTodoEntryData = (todoEntry) => {
    let form =  document.querySelector("form")
    todoEntry.title = form.title.value
    todoEntry.dueDate = form.dueDate.value
    todoEntry.description = form.description.value
    todoEntry.priority = form.priority.value
    todoEntry.notes = form.notes.value
    todoEntry.checklist = form.checklist.value
    todoEntry.status = form.status.value
    savePageContent()
}

let createTodoEntryViaForm = (project) => {
    let newTodoEntry = createTodoEntry()
    addTodoEntryToContentArray(project,newTodoEntry)
    newTodoEntry.entryId = entryIdCounter++
    console.log(newTodoEntry)
    console.log(newTodoEntry.entryId)
    return newTodoEntry
}

let getProjectFormData = () => {
    let projectForm = document.querySelector("#add-new-project-form")
    return createProject(projectForm.title.value)
}

let removeEntryFromArray = (project,todoEntry) => {
    let index = 0
    console.log("Before: "+project.projectContentArray.length)
    for(let entry of project.projectContentArray){
        if(entry === todoEntry){
            project.projectContentArray.splice(index,1)
            console.log("After: "+project.projectContentArray.length)
            return
        }
        index++ 
    }
}

let removeProjectFromArray = (project) => {
    projectArray.splice(projectArray.indexOf(project),1)
    savePageContent()
}

let savePageContent = () => {
    localStorage.setItem("projectArray",JSON.stringify(projectArray))
}

let restorePageContent = () => { 
    let pageContent = localStorage.getItem("projectArray")
    let encodedData = JSON.parse(pageContent)
    for (let project of encodedData){
    addProjectToArray(project)
    addProjectToDom(project)
    }
    for (let project of encodedData){
        for (let projectContentArray of project.projectContentArray){
            addTodoToDom(project,projectContentArray)
        }
    }
    
}


createInitialUI()
restorePageContent()

