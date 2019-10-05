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
export const deleteReward = (id) => ({
    type: "DELETE_REWARD",
    id
})





export const updateMainReward = (id) => ({
    type: "UPDATE_MAIN_REWARD",
    id
})





export const addPurchaseItem = (id, data) => ({
    type: "ADD_PURCHASE_ITEM",
    id,
    data
})
export const updatePurchaseItem = (id, data) => ({
    type: "UPDATE_PURCHASE_ITEM",
    id,
    data
})
export const deletePurchaseItem = (id) => ({
    type: "UPDATE_PURCHASE_ITEM",
    id
})





export const depositBalance = (amount) => ({
    type: "DEPOSIT_AMOUNT",
    amount
})
export const withdrawBalance = (amount) => ({
    type: "WITHDRAW_AMOUNT",
    amount
})