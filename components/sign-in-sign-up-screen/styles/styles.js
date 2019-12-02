import {
    StyleSheet,

} from 'react-native'

import * as CommonStyles from '../../shared/styles/style'

export const styles = StyleSheet.create({
    sign_in_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: "white",
        textTransform: "uppercase"
    },

    separating_line: {
        width: 80,
        height: 1,
        backgroundColor: CommonStyles.text_icon_colors.ti_4
    },

    or_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1,
        textTransform: "uppercase"
    },

    button_container: {
        // width: 311,
        height: 48,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 32,
        backgroundColor: CommonStyles.primary_colors.prim_1
    },

    sign_up_small_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_2
    },

    sign_up_small_underline_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: -0.02,
        fontWeight: "bold",
        textDecorationLine: "underline",
        color: CommonStyles.text_icon_colors.ti_1,
    },
})
