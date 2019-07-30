export const updateStartingDate = ({month, year, startTime, trackingTime}) => ({
    type: "UPDATE_NEW_TASK",
    data: {
        type: "month",
        startTime,
        trackingTime,
        schedule: {
            month,
            year
        }
    }
})