import {
    StyleSheet,

} from 'react-native'

import * as CommonStyles from '../../../../shared/styles/style'

export const styles = StyleSheet.create({
    text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1
    },

    normal_warning_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1,
        textAlign: "center"
    },

    small_warning_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 13,
        lineHeight: 16,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_3,
        textAlign: "center"
    },
})
