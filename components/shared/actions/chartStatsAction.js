// export const updateChartStats = (type, timestamp, data) => ({
//     type,
//     timestamp,
//     data
// })

export const updateChartStats = (type, keyPath, notSetValue, updater) => ({
    type,
    keyPath,
    notSetValue,
    updater
})

export const returnNewChartStats = (type, data) => ({
    type,
    data
})
