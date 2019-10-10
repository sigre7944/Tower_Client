import {
    StyleSheet,

} from 'react-native'


export const sf_ui_display_light_font = "sf-ui-display-light"
export const sf_ui_display_medium_font = "sf-ui-display-medium"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },

    banner: {
        textAlign: 'left',
        paddingLeft: 8,
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 10
    },

    scrollViewTasks: {
        alignSelf: "stretch",
        height: 50
    },

    actionText: {
        height: 50
    },
})
