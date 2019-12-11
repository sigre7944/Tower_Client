export const chooseCategory = (data) => ({
    type: "UPDATE_CURRENT_CHOSEN_CATEGORY",
    data
})

export const createCategory = (id, data) => ({
    type: "CREATE_CATEGORY",
    id,
    data
})

export const updateCategory = (keyPath, notSetValue, updater) => ({
    type: "UPDATE_CATEGORY",
    keyPath,
    notSetValue,
    updater
})

export const deleteCategory = (id) => ({
    type: "DELETE_CATEGORY",
    id
})

export const returnNewCategories = (data) => ({
    type: "RETURN_NEW_CATEGORIES",
    data
})