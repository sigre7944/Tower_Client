import {
    StyleSheet,

} from 'react-native'

import * as CommonStyle from '../../shared/styles/style'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CommonStyle.primary_colors.prim_1
    },

    sign_in_sign_up_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: "white",
        marginLeft: 16
    },

    text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: "white",
    },

    edit_container: {
        height: 42,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F2994A"
    },

    delete_container: {
        height: 42,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EB5757"
    }
})
