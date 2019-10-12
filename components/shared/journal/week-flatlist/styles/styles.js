import {
    StyleSheet,

} from 'react-native'


export const sf_ui_display_light_font = "sf-ui-display-light"
export const sf_ui_display_medium_font = "sf-ui-display-medium"

export const styles = StyleSheet.create({
    not_chosen_week: {
        width: 88,
        height: 23,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2011,
    },

    chosen_week: {
        width: 88,
        height: 23,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "#E5F5F3"
    },

    not_chosen_week_text: {
        color: "#6E6E6E",
        fontFamily: sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02
    },

    chosen_week_text: {
        color: "#54BAAC",
        fontFamily: sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02
    },

    chosen_inform_text_container:{
        justifyContent: "center",
        alignItems: "center",
        height: 28
    },

    not_chosen_inform_text_container:{
        justifyContent: "center",
        alignItems: "center",
        height: 20
    },
    

    chosen_inform_text: {
        fontFamily: sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: -0.02,
        color: "#54BAAC",
    },

    not_chosen_inform_text: {
        fontFamily: sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 14,
        letterSpacing: -0.02,
        color: "#BDBDBD",
    }
})
