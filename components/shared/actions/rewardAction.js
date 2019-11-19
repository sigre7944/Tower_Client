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



export const updatePurchaseItem = (keyPath, notSetValue, updater) => ({
    type: "UPDATE_KEYPATH_PURCHASE_ITEM",
    keyPath,
    notSetValue,
    updater
})

export const deletePurchaseItem = (keyPath) => ({
    type: "UPDATE_PURCHASE_ITEM",
    keyPath,
})





export const updateBalance = (type, amount) => ({
    type,
    amount
})