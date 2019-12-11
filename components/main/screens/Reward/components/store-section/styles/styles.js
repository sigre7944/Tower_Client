import {
    StyleSheet,
} from 'react-native'

import * as CommonStyles from '../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    separating_line: {
        flexDirection: "row",
        height: 1,
        backgroundColor: CommonStyles.text_icon_colors.ti_4,
        marginTop: 32,
    },

    other_rewards_title: {
        marginTop: 32,
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 20,
        lineHeight: 23,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1
    }
})
