import {
    StyleSheet,

} from 'react-native'

import * as CommonStyles from '../../shared/styles/style'

export const styles = StyleSheet.create({
    timestamp_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyles.primary_colors.prim_1,
        marginLeft: 22,
    },

    item_title: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1
    },

    item_latest_timestamp: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_3,
        marginTop: 5,
    },

    item_value: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1,
        marginRight: 23,
    },

    item_quantity: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1,
    },

    delete_all_records_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: "#EB5757",
        marginLeft: 10
    }
})
