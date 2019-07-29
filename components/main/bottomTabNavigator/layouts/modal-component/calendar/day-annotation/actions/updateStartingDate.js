export const updateStartingDate = ({day, month, year, startTime, trackingTime}) => ({
    type: "UPDATE_NEW_TASK",
    data: {
        startTime,
        trackingTime,
        schedule: {
            day,
            month,
            year
        }
    }
})