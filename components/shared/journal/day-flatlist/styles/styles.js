import {
    StyleSheet,

} from 'react-native'

import * as CommonStyles from '../../../styles/style'

export const styles = StyleSheet.create({
    not_chosen_day: {
        marginTop: 3,
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: "center",
        alignItems: "center",
    },

    chosen_day: {
        marginTop: 5,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: CommonStyles.primary_colors.prim_3
    },

    not_chosen_text: {
        color: CommonStyles.text_icon_colors.ti_2,
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: -0.02,
        
    },

    chosen_text: {
        color: CommonStyles.primary_colors.prim_1,
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: -0.02
    },

    chosen_day_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: -0.02,
        color: CommonStyles.primary_colors.prim_1,
    },

    not_chosen_day_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_2,
        opacity: 0.3
    }
})
