import {
    StyleSheet,

} from 'react-native'


import * as CommonStyles from '../../../styles/style'

export const styles = StyleSheet.create({
    not_chosen_week: {
        width: 88,
        height: 23,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2011,
    },

    chosen_week: {
        width: 88,
        height: 23,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: CommonStyles.primary_colors.prim_3
    },

    not_chosen_week_text: {
        color: CommonStyles.text_icon_colors.ti_2,
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02
    },

    chosen_week_text: {
        color: CommonStyles.primary_colors.prim_1,
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02
    },

    chosen_inform_text_container: {
        justifyContent: "center",
        alignItems: "center",
        height: 28
    },

    not_chosen_inform_text_container: {
        justifyContent: "center",
        alignItems: "center",
        height: 20
    },


    chosen_inform_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: -0.02,
        color: CommonStyles.primary_colors.prim_1,
    },

    not_chosen_inform_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_3,
    }
})
