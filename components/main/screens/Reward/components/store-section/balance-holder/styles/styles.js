import {
    StyleSheet,
} from 'react-native'

import * as CommonStyles from '../../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    balance_title: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 20,
        lineHeight: 23,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1
    },

    balance_value: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 26,
        lineHeight: 29,
        letterSpacing: -0.02,
        color: CommonStyles.primary_colors.prim_1,
    },

    currency: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyles.primary_colors.prim_1,
        marginLeft: 10
    }
})
