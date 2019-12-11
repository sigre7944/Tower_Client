import {
    StyleSheet,

} from 'react-native'

import * as CommonStyles from '../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    separating_line: {
        flex: 1,
        height: 1,
        backgroundColor: CommonStyles.text_icon_colors.ti_4,
        marginHorizontal: 16,
    },

    big_completions_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 26,
        lineHeight: 29,
        letterSpacing: -0.02,
        color: CommonStyles.primary_colors.prim_1
    },

    informing_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 15,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_3
    }
})
