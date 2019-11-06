import {
    StyleSheet,

} from 'react-native'


import * as CommonStyles from '../../../../styles/style'

export const styles = StyleSheet.create({
    minus: {
        width: 37,
        height: 5,
        borderRadius: 3,
        backgroundColor: "#D4D4D4"
    },

    title_small_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 15,
        letterSpacing: -0.02,
        color: "black",
        opacity: 0.25
    },

    text_input: {
        height: 45,
        borderColor: "rgba(0, 0, 0, 0.15)",
        borderBottomWidth: 1,
        alignItems: "center",
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1
    },

    normal_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1,
        marginLeft: 25,
    },

    cancel_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_3
    }
})
