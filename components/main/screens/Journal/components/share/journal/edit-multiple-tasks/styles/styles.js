import {
    StyleSheet,

} from 'react-native'

import * as CommonStyles from '../../../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    edit_text: {
        marginLeft: 20,
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1
    },

    separating_line: {
        height: 1,
        marginHorizontal: 22,
        backgroundColor: "#E0E0E0"
    }
})
