import {
    StyleSheet,

} from 'react-native'

import * as CommonStyle from '../../../../../../../../shared/styles/style'

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
        fontSize: 12,
        lineHeight: 14,
        color: CommonStyle.primary_colors.prim_1,
        // marginLeft: 5,
        letterSpacing: -0.02,
    },

    day_holder_container: {
        flex: 1,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
    },

    cannot_choose_day_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02,
        color: CommonStyle.text_icon_colors.ti_1,
        opacity: 0.3,
    },

    not_chosen_week_row_container: {
        width: 328,
        marginTop: 20,
        borderRadius: 32,
    },

    chosen_week_row_container: {
        width: 328,
        marginTop: 20,
        borderRadius: 32,
        backgroundColor: CommonStyle.primary_colors.prim_3
    },

    not_chosen_round_day_container: {
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
    },

    chosen_round_day_container: {
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        backgroundColor: CommonStyle.primary_colors.prim_3
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

    option_text: {
        marginLeft: 20,
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: "rgba(0, 0, 0, 0.3)"
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
    }
})
