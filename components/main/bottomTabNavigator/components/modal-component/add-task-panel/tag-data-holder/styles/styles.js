import {
    StyleSheet,

} from 'react-native'

import * as CommonStyle from '../../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    day_tag_schedule_container: {
        width: 153,
        height: 32,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: CommonStyle.text_icon_colors.ti_4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        marginLeft: 17,
        marginTop: 26,
    },

    day_tag_uncolorful_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 15,
        lineHeight: 18,
        letterSpacing: -0.02,
        color: CommonStyle.text_icon_colors.ti_3,
        marginLeft: 9,
    },

    day_tag_repeat_container: {
        width: 132,
        height: 32,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: CommonStyle.text_icon_colors.ti_3,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        marginLeft: 17,
        marginTop: 26,
    },

    day_tag_container: {
        paddingHorizontal: 15,
        height: 32,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: CommonStyle.text_icon_colors.ti_3,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        marginLeft: 17,
        marginTop: 26,
    }
})
