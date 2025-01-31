import "./style.css";
import {addProjectToDom, addTodoToDom,showForm} from "./domlogic.js";
export {updateTodoEntryData,createTodoEntryViaForm}
let createInitalDefaultProject = () => {
    let project = createProject("Default")
    project.default = true 
    return project
}

let createProject = (title) => {
    return {title,default:false,projectContentArray:[],projectId:projectIdCounter++}
}

let addProjectToArray = (project) => {
    projectArray.push(project)
}

let projectArray = []
let entryIdCounter = 0
let projectIdCounter = 0

let createTodoEntry = (title,dueDate,description,priority,notes,checklist,status) => {
    return{title,dueDate,description,priority,notes,checklist,status,entryId:entryIdCounter++}
}

let addTodoEntryToContentArray = (project,entry) => {
    project.projectContentArray.push(entry)
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
}

let createTodoEntryViaForm = () => {
    let newTodoEntry = createTodoEntry()
    newTodoEntry.entryId = entryIdCounter++
    console.log(newTodoEntry)
    console.log(newTodoEntry.entryId)
    return newTodoEntry
}




let project = createInitalDefaultProject()
let project2 = createProject("project2")
let todoEntry = createTodoEntry("title","desc","dueDate","prio","notes","checklist",false)
let todoEntry2 = createTodoEntry("title","2","dueDate","prio","notes","checklist",false)
let todoEntry3 = createTodoEntry("title","3","dueDate","prio","notes","checklist",false)


addTodoEntryToContentArray(project,todoEntry)
addTodoEntryToContentArray(project,todoEntry2)
addTodoEntryToContentArray(project,todoEntry3)
addProjectToDom(project)
addProjectToDom(project2)
addTodoToDom(project,todoEntry)
addTodoToDom(project,todoEntry2)
addTodoToDom(project2,todoEntry3)
