import {
    StyleSheet,

} from 'react-native'

import * as CommonStyle from '../../../../shared/styles/style'

export const styles = StyleSheet.create({
    title_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyle.text_icon_colors.ti_1,
        marginLeft: 15,
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

    close_button_container: {
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 35,
        backgroundColor: CommonStyle.text_icon_colors.ti_6
    },

    save_button_container: {
        width: 35,
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 35,
        backgroundColor: CommonStyle.primary_colors.prim_1,
        marginLeft: 45,
    }
})
