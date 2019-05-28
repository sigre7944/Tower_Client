
export const monthComponent_arr = (state= [], action) => {
    switch(action.type){
        case 'UPDATE_DAY_ANNOTATION_MONTH_COMPONENT_ARR':
            return [...action.monthComponent_arr]
        
        default:
            return state
    }
}