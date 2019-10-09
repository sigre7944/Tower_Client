import {
    StyleSheet,

} from 'react-native'


export const sf_ui_display_light_font = "sf-ui-display-light"
export const sf_ui_display_medium_font = "sf-ui-display-medium"

export const styles = StyleSheet.create({
    not_chosen_day: {
        marginTop: 3,
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },

    chosen_day: {
        marginTop: 5,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E5F5F3"
    },

    not_chosen_text: {
        color: "#252A31",
        fontFamily: sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: -0.02,
        
    },

    chosen_text: {
        color: "#54BAAC",
        fontFamily: sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: -0.02
    },

    chosen_day_text: {
        fontFamily: sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: -0.02,
        color: "#54BAAC",
    },

    not_chosen_day_text: {
        fontFamily: sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: -0.02,
        color: "#252A31",
        opacity: 0.3
    }
})
