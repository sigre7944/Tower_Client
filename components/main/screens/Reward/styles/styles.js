import {
    StyleSheet,

} from 'react-native'

import * as CommonStyles from '../../../../shared/styles/style'

export const styles = StyleSheet.create({
    informing_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1
    },

    motivating_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1,
        marginTop: 3
    },

    add_reward_button_container: {
        width: 316,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: CommonStyles.primary_colors.prim_1,
        marginTop: 48,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOpacity: 1
    }
})
