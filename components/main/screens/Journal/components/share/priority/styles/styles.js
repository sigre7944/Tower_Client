import {
    StyleSheet,

} from 'react-native'

import * as CommonStyle from '../../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    title: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyle.text_icon_colors.ti_1,
        marginLeft: 15
    },

    normal_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02,
        color: CommonStyle.text_icon_colors.ti_1,
    },

    reward_input: {
        height: 25,
        width: 37,
        justifyContent: "center",
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyle.text_icon_colors.ti_2,
        borderBottomWidth: 1,
        borderColor: CommonStyle.text_icon_colors.ti_4,
        textAlign: "center"
    },

    currency: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyle.primary_colors.prim_1,
        marginLeft: 10,
    },

    close_icon_holder: {
        width: 35,
        height: 35,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: CommonStyle.text_icon_colors.ti_6
    },

    save_icon_holder: {
        width: 35,
        height: 35,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: CommonStyle.primary_colors.prim_1,
        marginLeft: 45
    },
})
