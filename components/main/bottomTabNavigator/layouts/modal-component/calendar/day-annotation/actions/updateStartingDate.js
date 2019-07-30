export const updateStartingDate = ({day, month, year, startTime, trackingTime}) => ({
    type: "UPDATE_NEW_TASK",
    data: {
        type: "day",
        startTime,
        trackingTime,
        schedule: {
            day,
            month,
            year
        }
    }
})