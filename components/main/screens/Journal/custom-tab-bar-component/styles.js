import {
    StyleSheet,

} from 'react-native'

// import * as Font from 'expo-font'

import * as CommonStyles from '../../../../shared/styles/style'

export const styles = StyleSheet.create({
    annotation_text: {
        color: CommonStyles.text_icon_colors.ti_2,
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 20,
        lineHeight: 24,
        letterSpacing: -0.02
    },

    chosen_annotation_text: {
        color: CommonStyles.primary_colors.prim_1,
        fontFamily: CommonStyles.sf_ui_display_light_font,
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