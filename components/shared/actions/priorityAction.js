
export const updatePriority = (keyPath, notSetValue, updater) => ({
    type: "UPDATE_PRIORITY",
    keyPath,
    notSetValue,
    updater
})

export const returnNewPriorities = (data) => ({
    type: "RETURN_NEW_PRIORITIES",
    data
})

export const resetPriorities = () => ({
    type: "RESET_PRIORITIES"
})