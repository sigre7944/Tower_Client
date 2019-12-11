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

import ChooseOptions from "../share/journal/choose-options/ChooseOptions";

export default class JournalHeader extends React.PureComponent {

    state = {
        toggleEditMultipleTasks: false,
    }

    _openDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer())
    }

    _toggleReturn = () => {
        this.props.toggleReturn()
    }

    _toggleEditMultipleTasksAction = () => {
        this.setState(prevState => ({
            toggleEditMultipleTasks: !prevState.toggleEditMultipleTasks
        }))
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


                {this.state.toggleEditMultipleTasks ?
                    <ChooseOptions
                        _toggleEditMultipleTasksAction={this._toggleEditMultipleTasksAction}
                        navigation={this.props.navigation}
                    />
                    :
                    null
                }
            </View>
        )
    }
}