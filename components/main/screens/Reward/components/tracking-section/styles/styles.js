import {
    StyleSheet,
} from 'react-native'

import * as CommonStyles from '../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    main_value_title: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 26,
        lineHeight: 29,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1
    },

    main_value_cheering: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_2,
        marginTop: 5,
    },

    cannot_get_button_container: {
        width: 110,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: CommonStyles.text_icon_colors.ti_4,
        marginTop: 21,
    },

    can_get_button_container: {
        width: 110,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: CommonStyles.primary_colors.prim_1,
        marginTop: 21,
    },

    get_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: "white"
    },

    balance_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 26,
        lineHeight: 29,
        letterSpacing: -0.02,
        color: CommonStyles.primary_colors.prim_1
    },

    reward_value_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_2
    },

    no_reward_tracked_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1,
        textAlign: "center"
    }
})
