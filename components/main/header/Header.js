import React from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import Modal from 'react-native-modalbox';
import { DrawerActions } from 'react-navigation-drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
    styles
} from './styles/styles'

export default class Header extends React.Component {

    state = {
        modalVisible: false,
        dropdownMenuVisible: false,

        journal_header_visible: false,

        progress_header_visible: false,

        reward_header_visible: false,

        purchase_history_visible: false,
    };


    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    _openDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer())
    }

    _openEditModal = () => {
        this.refs.optionModal.open()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.currentRoute !== prevProps.currentRoute) {
            if (this.props.currentRoute === "Day" || this.props.currentRoute === "Week" || this.props.currentRoute === "Month") {
                this.setState({
                    journal_header_visible: true,
                    progress_header_visible: false,
                    reward_header_visible: false,
                    purchase_history_visible: false,
                })
            }

            else if (this.props.currentRoute === "Progress") {
                this.setState({
                    journal_header_visible: false,
                    progress_header_visible: true,
                    reward_header_visible: false,
                    purchase_history_visible: false,
                })
            }

            else if (this.props.currentRoute === "Reward") {
                this.setState({
                    journal_header_visible: false,
                    progress_header_visible: false,
                    reward_header_visible: true,
                    purchase_history_visible: false,
                })
            }

            else if (this.props.currentRoute === "PurchaseHistory") {
                this.setState({
                    journal_header_visible: false,
                    progress_header_visible: false,
                    reward_header_visible: false,
                    purchase_history_visible: true,
                })
            }

            else {
                this.setState({
                    journal_header_visible: false,
                    progress_header_visible: false,
                    reward_header_visible: false,
                    purchase_history_visible: false,
                })
            }
        }
    }

    render() {
        return (
            <>
                {this.state.journal_header_visible ?
                    <JournalHeader
                        _openDrawer={this._openDrawer}
                        _openEditModal={this._openEditModal}
                        toggleReturn={this.props.toggleReturn}
                        headerText={this.props.headerText}
                    />

                    :

                    <>
                        {this.state.progress_header_visible ?
                            <ProgressHeader />

                            :

                            <>
                                {this.state.reward_header_visible ?
                                    <RewardHeader
                                        navigation={this.props.navigation}
                                    />

                                    :

                                    <>
                                        {this.state.purchase_history_visible ?
                                            <PurchaseHistoryHeader
                                                navigation={this.props.navigation}
                                            />

                                            :

                                            null
                                        }
                                    </>
                                }
                            </>
                        }
                    </>
                }
                <Modal
                    style={{ marginTop: 300, borderRadius: 10 }}
                    backButtonClose={true}
                    coverScreen={true}
                    isOpen={this.state.modalVisible}
                    ref={"optionModal"}
                    swipeToClose={true}
                    swipeArea={500}
                >
                    <View
                        style={{ flex: 1, alignSelf: "stretch" }}
                    >
                        <View>
                            <Text style={{ textAlign: 'center' }}><FontAwesome name="minus" style={{ fontSize: 26, color: "grey" }} /></Text>
                        </View>
                        <View style={{ flex: 1, alignSelf: "stretch" }}>
                            <Text>Edit Multiple Tasks</Text>
                            <Text>Sort</Text>
                            <Text>Share</Text>
                            <TouchableOpacity onPress={() => this.refs.optionModal.close()}>
                                <Text>CLOSE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </>
        );
    }
}

class JournalHeader extends React.PureComponent {

    _openDrawer = () => {
        this.props._openDrawer()
    }

    _openEditModal = () => {
        this.props._openEditModal()
    }
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
                        onPress={this._openDrawer}
                    >
                        <FontAwesome
                            name="bars"
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
                    >
                        <FontAwesome
                            name={"ellipsis-v"}
                            size={20}
                            color={"#BDBDBD"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

class ProgressHeader extends React.PureComponent {
    render() {
        return (
            <View style={{
                paddingTop: 20,
                paddingHorizontal: 10,
                height: 80,
                flexDirection: "row",
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'gray'
            }}>
                <View></View>

                <Text>
                    Progress
                </Text>

                <TouchableOpacity onPress={this._openEditModal}>
                    <Image
                        source={require('./dots.png')}
                        style={{
                            width: 36,
                            height: 36,
                            tintColor: 'white'
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

class RewardHeader extends React.PureComponent {
    openPurchaseHistoryTab = () => {
        this.props.navigation.navigate('PurchaseHistory')
    }

    render() {
        return (
            <View
                style={{
                    paddingTop: 20,
                    paddingHorizontal: 10,
                    height: 80,
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'gray'
                }}
            >
                <View></View>

                <Text>
                    Reward
                </Text>

                <TouchableOpacity onPress={this.openPurchaseHistoryTab}>
                    <Image
                        source={require('./dots.png')}
                        style={{
                            width: 36,
                            height: 36,
                            tintColor: 'white'
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

class PurchaseHistoryHeader extends React.PureComponent {
    gobackToRewardTab = () => {
        this.props.navigation.navigate('Reward')
    }

    render() {
        return (
            <View
                style={{
                    paddingTop: 20,
                    paddingHorizontal: 10,
                    height: 80,
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'gray'
                }}
            >
                <TouchableOpacity
                    onPress={this.gobackToRewardTab}
                >
                    <Image
                        source={require('./dots.png')}
                        style={{
                            width: 36,
                            height: 36,
                            tintColor: 'white'
                        }}
                    />
                </TouchableOpacity>

                <Text>
                    Purchase History
                </Text>

                <TouchableOpacity>
                    <Image
                        source={require('./dots.png')}
                        style={{
                            width: 36,
                            height: 36,
                            tintColor: 'white'
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}