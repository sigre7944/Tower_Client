
import * as FileSystem from 'expo-file-system';

let initialState = {},
    filePath = FileSystem.documentDirectory + "categories.json"


FileSystem.getInfoAsync(filePath)
    .then(data => {
        if (data.exists) {
            FileSystem.readAsStringAsync(filePath)
                .then(data => {
                    initialState = JSON.parse(data)
                })
        }

        else {

            FileSystem.writeAsStringAsync(
                filePath,
                JSON.stringify({
                    "cate_0": {
                        "name": "Inbox",
                        "color": "red"
                    }
                })
            )
                .then(() => {
                    return FileSystem.readAsStringAsync(filePath)
                })
                .then(data => {
                    initialState = JSON.parse(data)
                })
        }
    })
    .catch(err => {
        console.log(err)
    })

export const categories = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_CATEGORY':
            return { ...state, ...action.data }

        default:
            return state
    }
}