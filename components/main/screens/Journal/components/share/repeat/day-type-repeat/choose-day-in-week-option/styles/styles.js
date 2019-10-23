import {
    StyleSheet,

} from 'react-native'

import * as CommonStyle from '../../../../../../../../../shared/styles/style'

export const styles = StyleSheet.create({

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

    deactivated_left_end_day_in_week_container: {
        flex: 1,
        height: 26,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: CommonStyle.text_icon_colors.ti_3,
        backgroundColor: "white"
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

    deactivated_right_end_day_in_week_container: {
        flex: 1,
        height: 26,
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderWidth: 1,
        borderColor: CommonStyle.text_icon_colors.ti_3,
        backgroundColor: "white"
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

    deactivated_normal_end_day_in_week_container: {
        flex: 1,
        height: 26,
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderColor: CommonStyle.text_icon_colors.ti_3,
        backgroundColor: "white"
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
    },

    deactivated_day_in_week_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: -0.02,
        color: CommonStyle.text_icon_colors.ti_3
    }
})
