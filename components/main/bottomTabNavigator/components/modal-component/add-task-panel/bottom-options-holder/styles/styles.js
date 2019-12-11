import {
    StyleSheet,

} from 'react-native'

import * as CommonStyle from '../../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    option_container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    confirm_container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: CommonStyle.primary_colors.prim_1,
        borderTopLeftRadius: 10,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 1,
        shadowColor: "rgba(0, 0, 0, 0.15)"
    }
})
