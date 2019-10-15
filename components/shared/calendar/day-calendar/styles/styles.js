import {
    StyleSheet,

} from 'react-native'

import * as CommonStyle from '../../../../shared/styles/style'

export const styles = StyleSheet.create({
    month_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyle.primary_color
    },

    year_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyle.unchosen_primary_color,
        marginLeft: 5,
    },

    day_text_absolute: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 12,
        lineHeight: 14,
        color: CommonStyle.unchosen_dark_grey_color,
        marginLeft: 5,
        letterSpacing: -0.02,
        textTransform: "uppercase",
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
        color: CommonStyle.unchosen_dark_grey_color,
        opacity: 0.2,
    },

    not_chosen_round_day_container: {
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        backgroundColor: "white"
    },

    chosen_round_day_container: {
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        backgroundColor: CommonStyle.secondary_color
    },

    not_chosen_day_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02,
        color: CommonStyle.unchosen_dark_grey_color
    },

    chosen_day_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02,
        color: CommonStyle.primary_color
    },

    notChosen: {
        height: 40,
        width: 338 / 7,
        justifyContent: "center",
        alignItems: "center",
    },

    chosen: {
        height: 40,
        width: 338 / 7,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "pink"
    }
})
