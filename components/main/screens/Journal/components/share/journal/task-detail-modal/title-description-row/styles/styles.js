import {
    StyleSheet,

} from 'react-native'


import * as CommonStyles from '../../../../../../../../../shared/styles/style'

export const styles = StyleSheet.create({

    complete_box_container: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.3)",
    },

    title: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1
    },

    description: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_3,
        marginTop: 16,
    }
})
