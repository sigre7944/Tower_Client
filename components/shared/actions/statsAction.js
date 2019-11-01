// export const updateStats = (type, timestamp, data) => ({
//     type,
//     timestamp,
//     data
// })

export const updateStats = (type, keyPath, notSetValue, updater) => ({
    type,
    keyPath,
    notSetValue,
    updater
})

export const returnNewStats = (type, data) => ({
    type,
    data
})
