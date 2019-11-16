import {
    StyleSheet,

} from 'react-native'

import * as CommonStyles from '../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    big_title_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: CommonStyles.primary_colors.prim_1
    },

    unchosen_annotation_container: {
        flex: 1,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: "white"
    },

    chosen_annotation_container: {
        flex: 1,
        height: 24,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        backgroundColor: CommonStyles.primary_colors.prim_1
    },

    unchosen_annotation_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 15,
        letterSpacing: -0.02,
        color: CommonStyles.primary_colors.prim_2
    },

    chosen_annotation_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 12,
        lineHeight: 15,
        letterSpacing: -0.02,
        color: "white"
    },

    do_first_mark_container: {
        width: 36,
        height: 16,
        backgroundColor: CommonStyles.priority_colors.prio_1
    },

    delay_mark_container: {
        width: 36,
        height: 16,
        backgroundColor: CommonStyles.priority_colors.prio_3
    },

    plan_mark_container: {
        width: 36,
        height: 16,
        backgroundColor: CommonStyles.priority_colors.prio_2
    },

    delegate_mark_container: {
        width: 36,
        height: 16,
        backgroundColor: CommonStyles.priority_colors.prio_4
    },

    mark_text: {
        fontFamily: CommonStyles.sf_ui_display_light_font,
        fontSize: 14,
        lineHeight: 17,
        letterSpacing: -0.02,
        color: CommonStyles.text_icon_colors.ti_1,
        marginLeft: 10,
    }
})
