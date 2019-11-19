import {
    StyleSheet,
} from 'react-native'

import * as CommonStyles from '../../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    add_button_container: {
        height: 189,
        backgroundColor: CommonStyles.primary_colors.prim_1,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },

    reward_holder_container: {
        height: 189,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
        shadowOffset: {
            width: 4,
            height: 4
        },
        shadowOpacity: 1,
        shadowRadius: 15,
        shadowColor: "rgba(0, 0, 0, 0.08)"
    },

    reward_name: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_2,
        marginTop: 10,
    },

    reward_value: {
        fontFamily: CommonStyles.sf_ui_display_medium_font,
        fontSize: 26,
        lineHeight: 29,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1,
        marginTop: 22,
    },

    reward_get_button_container: {
        width: 110,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: CommonStyles.primary_colors.prim_1,
        borderRadius: 30,
        marginTop: 22
    },

    reward_get_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: "white"
    }
})
