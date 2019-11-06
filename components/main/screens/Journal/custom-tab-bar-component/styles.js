import {
    StyleSheet,

} from 'react-native'

// import * as Font from 'expo-font'

export const sf_ui_display_light_font = "sf-ui-display-light"
export const sf_ui_display_medium_font = "sf-ui-display-medium"

export const styles = StyleSheet.create({
    annotation_text: {
        color: "#6E6E6E",
        fontFamily: sf_ui_display_light_font,
        fontSize: 20,
        lineHeight: 24,
        letterSpacing: -0.02
    },

    chosen_annotation_text: {
        color: "#54BAAC",
        fontFamily: sf_ui_display_light_font,
        fontSize: 20,
        lineHeight: 24,
        letterSpacing: -0.02
    },

    annotation_container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        flex: 1,
        height: 38
    }
})