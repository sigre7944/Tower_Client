import {
    StyleSheet,

} from 'react-native'

import * as CommonStyle from '../../../../../../../shared/styles/style'

export const styles = StyleSheet.create({
    not_chosen_annotation_holder: {
        height: 32,
        width: 85,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 30,
    },

    chosen_annotation_holder: {
        height: 32,
        width: 85,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: CommonStyle.primary_colors.prim_3,
        borderRadius: 30,
    },

    not_chosen_annotation_text: {
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: CommonStyle.text_icon_colors.ti_3
    },

    chosen_annotation_text: {
        fontSize: 16,
        lineHeight: 19,
        letterSpacing: -0.02,
        color: CommonStyle.primary_colors.prim_1
    }
})
