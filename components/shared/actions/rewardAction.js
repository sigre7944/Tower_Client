export const updateKeyPathReward = (keyPath, notSetValue, updater) => ({
    type: "UPDATE_KEYPATH_REWARD",
    keyPath,
    notSetValue,
    updater
})

export const deleteKeyPathReward = (keyPath) => ({
    type: "DELETE_KEYPATH_REWARD",
    keyPath
})





export const updateMainReward = (id) => ({
    type: "UPDATE_MAIN_REWARD",
    id
})





export const addPurchaseItem = (timestamp, id, data) => ({
    type: "ADD_PURCHASE_ITEM",
    id,
    timestamp,
    data
})
export const updatePurchaseItem = (timestamp, id, data) => ({
    type: "UPDATE_PURCHASE_ITEM",
    id,
    timestamp,
    data
})
export const deletePurchaseItem = (timestamp, id) => ({
    type: "UPDATE_PURCHASE_ITEM",
    timestamp,
    id
})





export const updateBalance = (type, amount) => ({
    type,
    amount
})