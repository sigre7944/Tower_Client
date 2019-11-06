import {
    StyleSheet,

} from 'react-native'

import * as CommonStyles from '../../../styles/style'

export const styles = StyleSheet.create({
    not_chosen_month: {
        width: 83,
        height: 23,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },

    chosen_month: {
        width: 83,
        height: 23,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: CommonStyles.primary_colors.prim_3
    },

    not_chosen_month_text: {
        color: CommonStyles.text_icon_colors.ti_2,
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02

    },

    chosen_month_text: {
        color: CommonStyles.primary_colors.prim_1,
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02
    },

    not_chosen_inform_text_container: {
        justifyContent: "center",
        alignItems: "center",
        height: 20,
    },

    chosen_inform_text_container: {
        justifyContent: "center",
        alignItems: "center",
        height: 28,
    },

    not_chosen_inform_text: {
        color: CommonStyles.text_icon_colors.ti_3,
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: -0.02
    },

    chosen_inform_text: {
        color: CommonStyles.primary_colors.prim_1,
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: -0.02
    }
})
