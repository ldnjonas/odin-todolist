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

