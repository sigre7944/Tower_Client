import {
    StyleSheet,

} from 'react-native'

import * as CommonStyle from '../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    every_option_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02,
        color: CommonStyle.primary_colors.prim_1
    },

    unchosen_every_option_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02,
        color: CommonStyle.text_icon_colors.ti_3
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

    unchosen_every_option_input: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02,
        color: CommonStyle.text_icon_colors.ti_3,
        width: 27,
        height: 28,
        borderBottomWidth: 1,
        borderBottomColor: CommonStyle.text_icon_colors.ti_3,
        marginLeft: 20,
        textAlign: "center"
    },

    repeat_end_chosen_button_container: {
        width: 16,
        height: 16,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: CommonStyle.primary_colors.prim_1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },

    repeat_end_chosen_button_activated: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: CommonStyle.primary_colors.prim_1
    },

    repeat_end_chosen_button_container_deactivated: {
        width: 16,
        height: 16,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: CommonStyle.text_icon_colors.ti_3,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white"
    },
})
