export const addTaskTitle = (state = "", action) => {
    switch(action.type){
        case "CHANGE_ADD_TASK_TITLE":
            return action.title

        default:
            return state
    }
}

export const addTaskDescription = (state = "", action) => {
    switch(action.type){
        case "CHANGE_ADD_TASK_DESCRIPTION":
            return action.description

        default:
            return state
    }
}