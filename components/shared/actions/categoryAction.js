export const chooseCategory = (data) => ({
    type: "UPDATE_CURRENT_CHOSEN_CATEGORY",
    data
})

export const createCategory = (id, data) => ({
    type: "CREATE_CATEGORY",
    id,
    data
})

export const updateCategory = (id, data) => ({
    type: "UPDATE_CATEGORY",
    id,
    data
})

export const deleteCategory = (id) => ({
    type: "DELETE_CATEGORY",
    id
})