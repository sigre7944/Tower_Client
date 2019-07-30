export const updateStartingDate = ({week, month, year, startTime, trackingTime}) => ({
    type: "UPDATE_NEW_TASK",
    data: {
        type: "week",
        startTime,
        trackingTime,
        schedule: {
            week,
            month,
            year
        }
    }
})