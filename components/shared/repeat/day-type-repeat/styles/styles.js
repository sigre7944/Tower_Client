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

    picker_button_container: {
        marginLeft: 20,
        width: 84,
        height: 28,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        backgroundColor: CommonStyle.primary_colors.prim_3
    },

    unchosen_left_end_day_in_week_container: {
        flex: 1,
        height: 26,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: CommonStyle.primary_colors.prim_2,
        backgroundColor: "white"
    },

    chosen_left_end_day_in_week_container: {
        flex: 1,
        height: 26,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: CommonStyle.primary_colors.prim_1,
        backgroundColor: CommonStyle.primary_colors.prim_1
    },

    unchosen_right_end_day_in_week_container: {
        flex: 1,
        height: 26,
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderWidth: 1,
        borderColor: CommonStyle.primary_colors.prim_2,
        backgroundColor: "white"
    },

    chosen_right_end_day_in_week_container: {
        flex: 1,
        height: 26,
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderWidth: 1,
        borderColor: CommonStyle.primary_colors.prim_1,
        backgroundColor: CommonStyle.primary_colors.prim_1
    },

    unchosen_normal_day_in_week_container: {
        flex: 1,
        height: 26,
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: CommonStyle.primary_colors.prim_2,
        backgroundColor: "white"
    },

    chosen_normal_day_in_week_container: {
        flex: 1,
        height: 26,
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: CommonStyle.primary_colors.prim_1,
        backgroundColor: CommonStyle.primary_colors.prim_1
    },

    unchosen_day_in_week_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: -0.02,
        color: CommonStyle.primary_colors.prim_1
    },

    chosen_day_in_week_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: -0.02,
        color: "white"
    }

})
