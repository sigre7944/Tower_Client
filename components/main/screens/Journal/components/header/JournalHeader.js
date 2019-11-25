import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faBars,
    faEllipsisV
} from "@fortawesome/free-solid-svg-icons";
import { DrawerActions } from 'react-navigation-drawer';
import {
    styles
} from './styles/styles'


export default class JournalHeader extends React.PureComponent {


    _openDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer())
    }

    _toggleReturn = () => {
        this.props.toggleReturn()
    }


    _toggleEditMultipleTasksAction = () => {
        this.props.toggleEditMultipleTasksAction()
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

                    <TouchableOpacity
                        onPress={this._toggleReturn}
                    >
                        <Text
                            style={styles.middle_text_style}>
                            {this.props.headerText}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.end_icon_container}
                        onPress={this._toggleEditMultipleTasksAction}
                    >
                        <FontAwesomeIcon
                            icon={faEllipsisV}
                            size={20}
                            color={"#BDBDBD"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}