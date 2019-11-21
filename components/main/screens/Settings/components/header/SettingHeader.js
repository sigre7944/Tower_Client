import React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faBars,
    faEllipsisV
} from "@fortawesome/free-solid-svg-icons";
import {
    styles
} from './styles/styles'

export default class SettingHeader extends React.PureComponent {

    _toggleReturn = () => {
        this.props.toggleReturn()
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <TouchableOpacity
                        style={styles.end_icon_container}
                    >
                        <FontAwesomeIcon
                            icon={faBars}
                            size={20}
                            color={"#BDBDBD"}
                        />
                    </TouchableOpacity>

                    <View>
                        <Text
                            style={styles.middle_text_style}>
                            Settings
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.end_icon_container}
                    >
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}