import {
    StyleSheet,

} from 'react-native'

import * as CommonStyle from '../../../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    year_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyle.text_icon_colors.ti_1,
    },

    separating_line: {
        height: 1,
        marginTop: 20,
        marginHorizontal: 15,
        backgroundColor: CommonStyle.text_icon_colors.ti_4
    },

    unchosen_month_holder_container: {
        flex: 1,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
    },

    chosen_month_holder_container: {
        flex: 1,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: CommonStyle.primary_colors.prim_3
    },

    unchosen_month_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyle.text_icon_colors.ti_1
    },

    chosen_month_text: {
        fontFamily: CommonStyle.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyle.primary_colors.prim_1
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
