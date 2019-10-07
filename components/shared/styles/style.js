import {
    StyleSheet,

} from 'react-native'

// import * as Font from 'expo-font'

export const sf_ui_display_light_font = "sf-ui-display-light"
export const sf_ui_display_medium_font = "sf-ui-display-medium"

export const header_styles = StyleSheet.create({
    container: {
        paddingTop: 57,
        paddingHorizontal: 20,
        height: 125,
        backgroundColor: "white"
    },
    middle_text_style: {
        color: "#2C2C2C",
        lineHeight: 31,
        letterSpacing: -0.02,
        fontFamily: sf_ui_display_medium_font,
        fontSize: 26,
    },
    left_end_icon_container: {
        justifyContent: "center",
        height: 40,
        width: 50,
    },

    right_end_icon_container: {
        justifyContent: "center",
        alignItems: "flex-end",
        height: 40,
        width: 50,
    }
})

export const styles = StyleSheet.create({

})