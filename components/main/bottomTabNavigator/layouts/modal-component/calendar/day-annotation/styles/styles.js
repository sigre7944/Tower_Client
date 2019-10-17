import {
    StyleSheet,

} from 'react-native'

import * as CommonStyle from '../../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    separating_line: {
        height: 1,
        marginTop: 20,
        marginHorizontal: 15,
        backgroundColor: CommonStyle.unchosen_third_color
    },

    option_text: {
        marginLeft: 20,
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: "rgba(0, 0, 0, 0.3)"
    },

    close_icon_holder: {
        width: 35,
        height: 35,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: CommonStyle.text_icon_colors.ti_6
    },

    save_icon_holder: {
        width: 35,
        height: 35,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: CommonStyle.primary_colors.prim_1,
        marginLeft: 45
    }
})
