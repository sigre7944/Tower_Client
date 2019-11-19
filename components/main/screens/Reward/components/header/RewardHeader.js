import React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faChevronLeft,
    faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import {
    styles
} from './styles/styles'

export default class RewardHeader extends React.PureComponent {
    _openPurchaseHistoryTab = () => {
        this.props.navigation.navigate('PurchaseHistory')
    }

    componentDidMount(){
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
                        <FontAwesome
                            name="bars"
                            size={20}
                            color={"#BDBDBD"}
                        />
                    </TouchableOpacity>

                    <View>
                        <Text
                            style={styles.middle_text_style}
                        >
                            Reward
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.end_icon_container}
                        onPress={this._openPurchaseHistoryTab}
                    >
                        <FontAwesomeIcon
                            icon={faShoppingCart}
                            size={20}
                            color={"#BDBDBD"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}