import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { styles } from "./styles/styles";

export default class Settings extends React.Component {


    render() {
        return (
            <TouchableOpacity>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <View
                        style={styles.user_icon_container}
                    >
                        
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}