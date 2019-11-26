import {
    StyleSheet,

} from 'react-native'

import * as CommonStyles from '../../shared/styles/style'

export const styles = StyleSheet.create({
    header_container: {
        paddingTop: 57,
        height: 125,
        backgroundColor: "white"
    },
    middle_text_style: {
        color: "#2C2C2C",
        lineHeight: 31,
        letterSpacing: -0.02,
        fontFamily: CommonStyles.sf_ui_display_medium_font,
        fontSize: 26,
    },

    end_icon_container: {
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 40,
    },

    date_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 20,
        lineHeight: 23,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1
    },

    task_card_container: {
        flexDirection: "row",
        height: 62,
        shadowColor: "rgba(0, 0, 0, 0.08)",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 10,
        shadowOpacity: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
        position: "relative"
    },

    complete_box_container_unchosen: {
        width: 28,
        height: 28,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: CommonStyles.text_icon_colors.ti_3,
        justifyContent: "center",
        alignItems: "center"
    },

    complete_box_container_chosen: {
        width: 28,
        height: 28,
        borderRadius: 5,
        backgroundColor: CommonStyles.primary_colors.prim_1,
        justifyContent: "center",
        alignItems: "center"
    },

    task_title: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1
    },

    goal_tracking: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_3,
        marginTop: 5
    },

    bottom_nav_icon_button_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 60,
    },

    chosen_option_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: CommonStyles.primary_colors.prim_1
    }
})
