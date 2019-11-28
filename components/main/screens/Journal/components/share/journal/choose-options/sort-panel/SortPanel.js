import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';

import { styles } from "./styles/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default class SortPanel extends React.PureComponent {

    render() {
        return (
            <View
                style={{
                    
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                >
                    <MaterialIcons
                        name="sort"
                        color="#2C2C2C"
                        size={28}
                    />

                    <Text
                        style={styles.title}
                    >
                        Sort by
                    </Text>
                </View>
            </View>
        )
    }
}