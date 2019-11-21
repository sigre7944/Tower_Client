import {
    StyleSheet,
} from 'react-native'

import * as CommonStyles from '../../../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    title: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1,
        marginLeft: 13
    },

    reward_title_informer: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_3
    },

    reward_input: {
        marginTop: 10,
        height: 33,
        borderBottomWidth: 1,
        borderColor: CommonStyles.text_icon_colors.ti_4,
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1
    },

    set_as_main_reward_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1
    },

    cancel_container: {
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: CommonStyles.text_icon_colors.ti_3,
        borderRadius: 18,
        marginRight: 44,
    },

    save_container: {
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: CommonStyles.primary_colors.prim_1,
        borderRadius: 18,
    },

    delete_reward_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02,
        color: "#EB5757"
    },

    delete_warning_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1
    }
})
