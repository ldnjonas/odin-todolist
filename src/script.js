import "./style.css";

let createInitalDefaultProject = () => {
    let project = createProject("Default")
    project.default = true 
}

let createProject = (title) => {
    let project = {title,default:false,projectContentArray:[]}
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
