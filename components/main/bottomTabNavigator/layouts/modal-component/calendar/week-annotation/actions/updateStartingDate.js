export const updateStartingDate = ({day, week, month, year, startTime, trackingTime}) => ({
    type: "UPDATE_NEW_WEEK_TASK",
    data: {
        startTime,
        trackingTime,
        schedule: {
            day,
            week,
            month,
            year
        }
    }
})