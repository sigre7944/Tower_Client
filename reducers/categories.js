


let initialState= {}

// fs.('../data')
//     .then((data) => {
//         try {
//             // initialState = JSON.parse(data)

//             console.log(data)
//         }
//         catch (err) {
//             console.log(err)
//         }
//     })
//     .catch((err) => {
//         console.log(err)
//     })


export const categories = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_CATEGORY':
            return { ...state, ...action.data }

        default:
            return state
    }
}