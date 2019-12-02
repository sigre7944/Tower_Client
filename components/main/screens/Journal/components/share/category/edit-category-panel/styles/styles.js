import {
    StyleSheet,

} from 'react-native'

import * as CommonStyle from '../../../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    title_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 26,
        lineHeight: 29,
        letterSpacing: -0.02,
        color: CommonStyle.primary_colors.prim_1,
        marginTop: 30,
        marginLeft: 30,
    },

    small_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 15,
        letterSpacing: -0.02,
        color: CommonStyle.text_icon_colors.ti_3,
        marginLeft: 30,
    },

    text_input: {
        height: 25,
        justifyContent: "center",
        color: CommonStyle.text_icon_colors.ti_1,
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        marginBottom: 10,
    },

    button_container: {
        justifyContent: "center",
        marginTop: 18,
        marginHorizontal: 30,
        borderColor: CommonStyle.text_icon_colors.ti_4,
        borderBottomWidth: 1,
    },

    invite_friends_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        color: CommonStyle.text_icon_colors.ti_1,
        letterSpacing: -0.02,
        marginTop: 18,
        marginLeft: 30,
    },

    title_warning_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        color: "#EB5757",
        letterSpacing: -0.02,
    },

    warning_close_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        color: CommonStyle.text_icon_colors.ti_3,
        letterSpacing: -0.02,
    }
})
