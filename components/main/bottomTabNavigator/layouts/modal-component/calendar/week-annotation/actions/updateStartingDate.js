export const updateStartingDate = ({week, month, year, startTime, trackingTime}) => ({
    type: "UPDATE_NEW_TASK",
    data: {
        startTime,
        trackingTime,
        schedule: {
            week,
            month,
            year
        }
    }
})