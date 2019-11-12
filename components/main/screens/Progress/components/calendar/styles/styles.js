import {
    StyleSheet,

} from 'react-native'

import * as CommonStyle from '../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    month_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyle.primary_colors.prim_1
    },

    year_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyle.text_icon_colors.ti_1,
        marginLeft: 5,
    },

    point_earned_text: {
        fontFamily: CommonStyle.sf_ui_display_medium_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: CommonStyle.primary_colors.prim_1
    },

    points_text: {
        fontFamily: CommonStyle.sf_ui_display_medium_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: CommonStyle.text_icon_colors.ti_1,
        marginLeft: 5,
    },

    day_text_absolute: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 12,
        lineHeight: 14,
        color: CommonStyle.text_icon_colors.ti_1,
        opacity: 0.3,
        // marginLeft: 5,
        letterSpacing: -0.02,
        textTransform: "uppercase",
    },

    week_text_absolute: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 14,
        lineHeight: 17,
        color: CommonStyle.primary_colors.prim_1,
        // marginLeft: 5,
        letterSpacing: -0.02,
    },

    cannot_choose_day_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02,
        color: CommonStyle.text_icon_colors.ti_1,
        opacity: 0.3,
    },

    not_chosen_round_day_container: {
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
    },

    week_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02,
        color: CommonStyle.primary_colors.prim_1
    },

    not_chosen_day_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02,
        color: CommonStyle.text_icon_colors.ti_1
    },

    chosen_day_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02,
        color: CommonStyle.primary_colors.prim_1
    },

    separating_line: {
        height: 1,
        marginTop: 20,
        marginHorizontal: 15,
        backgroundColor: CommonStyle.text_icon_colors.ti_4
    },

    point_banner: {
        width: 42,
        height: 87,
        borderRadius: 21,
        backgroundColor: CommonStyle.primary_colors.prim_1,
        alignItems: "center",
        justifyContent: "space-between",
    },

    time_informer_container: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
    },

    point_text_white: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: -0.02,
        color: "white"
    }
})
