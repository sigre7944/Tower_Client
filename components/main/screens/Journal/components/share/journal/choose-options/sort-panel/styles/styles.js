import {
    StyleSheet,

} from 'react-native'

import * as CommonStyles from '../../../../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    title: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1
    },

    row_name: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_3
    },

    close_button_container: {
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: CommonStyles.text_icon_colors.ti_3,
        borderRadius: 18,
    },

    save_button_container: {
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: CommonStyles.primary_colors.prim_1,
        marginLeft: 44,
        borderRadius: 18,
    }
})
