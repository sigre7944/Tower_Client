import {
    StyleSheet,

} from 'react-native'

import * as CommonStyles from '../../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    chosen_month_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1
    },

    day_in_month_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 10,
        lineHeight: 13,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1
    },

    y_axis_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 14,
        fill: CommonStyles.text_icon_colors.ti_1
    },


    month_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 15,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1
    }
})
