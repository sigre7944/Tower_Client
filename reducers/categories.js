
import * as FileSystem from 'expo-file-system';

let initialState = {}
//     filePath = FileSystem.documentDirectory + "categories.json"

// export let categories


// FileSystem.getInfoAsync(filePath)
//     .then(data => {
//         if (data.exists) {
//             FileSystem.readAsStringAsync(filePath)
//                 .then(data => {
//                     initialState = JSON.parse(data)

//                     console.log(initialState)
//                 })
//         }

//         else {

//             FileSystem.writeAsStringAsync(
//                 filePath,
//                 JSON.stringify({
//                     "cate_0": {
//                         "name": "Inbox",
//                         "color": "red"
//                     }
//                 })
//             )
//                 .then(() => {
//                     return FileSystem.readAsStringAsync(filePath)


//                 })
//                 .then(data => {
//                     initialState = JSON.parse(data)

//                     categories = (state = initialState, action) => {
//                         switch (action.type) {
//                             case 'CREATE_CATEGORY':
//                                 return { ...state, ...action.data }

//                             default:
//                                 if (state === undefined) {
//                                     return initialState
//                                 }

//                                 return state
//                         }
//                     }

//                 })
//         }
//     })
//     .catch (err => {
//     console.log(err)
// })

export const categories = (state = initialState, action) => {

    switch (action.type) {
        case 'CREATE_CATEGORY':
            return { ...state, ...action.data }

        default:

            return state
    }
}

