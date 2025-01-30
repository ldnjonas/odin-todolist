import "./style.css";


let createProject = (title) => {
    return {title,projectContentArray:[]}
}

let addProjectToArray = (project) => {
    projectArray.push(project)
}

let projectArray = []

let createTodoEntry = (title,description,dueDate,priority,notes,checklist) => {
    return{title,description,dueDate,priority,notes,checklist}
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

let p1 = createProject("Project1")
addProjectToArray(p1)
let entry = createTodoEntry("Entry1","descripton","1.1.2025","high","notes","checklist")
p1.projectContentArray.push(entry)
addTodoEntryToContentArray(p1,entry)
console.log(getProjectByTitle("Project1"))
console.log( p1 === getProjectByTitle("Project1"))

console.log(p1.projectContentArray[0] === getTodoByTitle(p1,"Entry1"))