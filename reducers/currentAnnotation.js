export const currentAnnotation = (state = "day", action) => {
    switch(action.type){
        case "CHANGE_CURRENT_ANNOTATION":
            return action.annotation

        default:
            return state
    }

}