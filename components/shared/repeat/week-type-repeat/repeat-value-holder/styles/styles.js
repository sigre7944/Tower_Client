import {
    StyleSheet,

} from 'react-native'

import * as CommonStyle from '../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    title_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyle.text_icon_colors.ti_1,
        marginLeft: 15,
    },

    every_option_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02,
        color: CommonStyle.primary_colors.prim_1
    },

    every_option_input: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02,
        color: CommonStyle.primary_colors.prim_1,
        width: 27,
        height: 28,
        borderBottomWidth: 1,
        borderBottomColor: CommonStyle.primary_colors.prim_3,
        marginLeft: 20,
        textAlign: "center"
    },

    picker_value_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 21,
        lineHeight: 24,
        letterSpacing: -0.02,
        color: CommonStyle.primary_colors.prim_1
    },

    picker_done_option_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 21,
        lineHeight: 24,
        letterSpacing: -0.02,
        color: CommonStyle.primary_colors.prim_1
    },

    picker_cancel_option_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 21,
        lineHeight: 24,
        letterSpacing: -0.02,
        color: CommonStyle.text_icon_colors.ti_3
    },

    picker_button_container: {
        marginLeft: 20,
        width: 84,
        height: 28,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: CommonStyle.primary_colors.prim_3
    },
})
