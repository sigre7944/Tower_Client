import {
    StyleSheet,

} from 'react-native'

import * as CommonStyles from '../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    user_icon_container: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: CommonStyles.primary_colors.prim_1,
        justifyContent: "center",
        alignItems: "center"
    },

    normal_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1
    },

    small_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_2
    },

    plan_icon_container: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 2.5,
        borderColor: CommonStyles.primary_colors.prim_1,
        justifyContent: "center",
        alignItems: "center"
    },

    separating_line: {
        marginHorizontal: 17,
        height: 1,
        backgroundColor: CommonStyles.text_icon_colors.ti_4
    },

    currency_symbol: {
        fontFamily: CommonStyles.fontFamily,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyles.primary_colors.prim_1
    }
})
