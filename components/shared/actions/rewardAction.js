export const createReward = (id, data) => ({
    type: "CREATE_REWARD",
    id,
    data
})

export const updateReward = (id, data) => ({
    type: "UPDATE_REWARD",
    id,
    data
})

export const updateMainReward = (id) => ({
    type: "UPDATE_MAIN_REWARD",
    id
})

export const deleteReward = (id) => ({
    type: "DELETE_REWARD",
    id
})