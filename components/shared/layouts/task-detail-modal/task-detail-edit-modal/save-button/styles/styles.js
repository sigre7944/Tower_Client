import {
    StyleSheet,

} from 'react-native'


import * as CommonStyles from '../../../../../styles/style'

export const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        height: 48,
        backgroundColor: CommonStyles.primary_colors.prim_1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        marginHorizontal: 30,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 15,
        shadowColor: "rgba(0, 0, 0, 0.06)",
        shadowOpacity: 1
    },

    text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: "white"
    }
})
