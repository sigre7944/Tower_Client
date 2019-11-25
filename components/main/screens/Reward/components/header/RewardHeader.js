import React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faShoppingCart,
    faBars
} from "@fortawesome/free-solid-svg-icons";
import { DrawerActions } from 'react-navigation-drawer';
import {
    styles
} from './styles/styles'

export default class RewardHeader extends React.PureComponent {
    _openDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer())
    }

    _openPurchaseHistoryTab = () => {
        this.props.navigation.navigate('PurchaseHistory')
    }

    componentDidMount() {
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

                        onPress={this._openDrawer}
                    >
                        <FontAwesomeIcon
                            icon={faBars}
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