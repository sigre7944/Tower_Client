const axios = require("axios")

export const fetchAPI = async (url) => {
    return axios({
        method: "get",
        url,
    })
}