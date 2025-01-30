import "./style.css";
import {addProjectToDom, addTodoToDom,showForm} from "./domlogic.js";

let createInitalDefaultProject = () => {
    let project = createProject("Default")
    project.default = true 
    return project
}

let createProject = (title) => {
    return {title,default:false,projectContentArray:[]}
}

let addProjectToArray = (project) => {
    projectArray.push(project)
}

let projectArray = []

let createTodoEntry = (title,description,dueDate,priority,notes,checklist,status) => {
    return{title,description,dueDate,priority,notes,checklist,status}
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

let updateTodoEntry = (todoEntry,title,description,dueDate,priority,notes,checklist,status) => {
    todoEntry.title = title
    todoEntry.description = description
    todoEntry.dueDate = dueDate
    todoEntry.priority = priority
    todoEntry.notes = notes
    todoEntry.checklist = checklist
    todoEntry.status = status
}

let generateUpdateForm = () => {
    

}


let project = createInitalDefaultProject()
let project2 = createProject("project2")
let todoEntry = createTodoEntry("title","desc","dueDate","prio","notes","checklist",false)
let todoEntry2 = createTodoEntry("title","2","dueDate","prio","notes","checklist",false)
let todoEntry3 = createTodoEntry("title","3","dueDate","prio","notes","checklist",false)


addTodoEntryToContentArray(project,todoEntry)
//addTodoEntryToContentArray(project,todoEntry2)
//addTodoEntryToContentArray(project,todoEntry3)
addProjectToDom(project)
addProjectToDom(project2)
addTodoToDom(project,todoEntry)
addTodoToDom(project2,todoEntry2)
addTodoToDom(project2,todoEntry3)
