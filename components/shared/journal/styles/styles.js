import {
    StyleSheet,
} from 'react-native'

import * as CommonStyles from '../../styles/style'

export const styles = StyleSheet.create({
    completed_container: {
        width: 125,
        height: 28,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: CommonStyles.primary_colors.prim_3,
        borderRadius: 15,
        marginVertical: 25,
        marginLeft: 25
    },

    completed_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02,
        color: CommonStyles.primary_colors.prim_1
    }
})
