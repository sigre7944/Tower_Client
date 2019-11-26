export const updateHeaderText = (data) => ({
    type: "UPDATE_HEADER_TEXT",
    data
})

export const changeRouteAction = routeName => ({
    type: 'CHANGE_ROUTE',
    routeName
})

export const toggleReturn = () => ({
    // action for returning to today's position when clicking on header
    type: 'TOGGLE_RETURN'
})

export const updateTitle = (title) => ({
    type: "CHANGE_ADD_TASK_TITLE",
    title
})

export const updateType = (type, keyPath, notSetValue, updater) => ({
    type,
    keyPath,
    notSetValue,
    updater
})

export const updateDescription = (description) => ({
    type: "CHANGE_ADD_TASK_DESCRIPTION",
    description
})

export const changeAnnotation = (annotation) => ({
    type: "CHANGE_CURRENT_ANNOTATION",
    annotation
})

export const toggleEditMultipleTasksAction = () => ({
    type: "TOGGLE_EDIT_MULTIPLE_TASKS"
})

export const returnNewChosenDateData = (type, data) => ({
    type,
    data
})

export const updateCurrentChosenJournalType = (data) => ({
    type: "UPDATE_CURRENT_CHOSEN_JOURNAL_TYPE",
    data
})