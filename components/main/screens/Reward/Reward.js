import React from 'react';

import {
  View,
  FlatList
} from 'react-native';

import TrackingSection from './components/tracking-section/TrackingSection.Container'
import StoreSection from './components/store-section/StoreSection'

import RewardHeader from "./components/header/RewardHeader";

export default class Reward extends React.PureComponent {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    return ({
      header: <RewardHeader navigation={navigation} />,
      swipeable: false
    })
  }

  state = {
    data: [],
    should_flatlist_update: 0
  }

  _keyExtractory = (item, index) => `reward-${item.id}-holder`

  _renderItem = ({ item, index }) => {
    if (item.id === "tracking-main-reward") {
      return (
        <TrackingSection />
      )
    }

    return (
      <StoreSection />
    )
  }

  componentDidMount() {
    const didFocusScreen = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.props.changeRouteAction(payload.state.routeName)
      }
    )

    let data = []

    data.push({
      id: "tracking-main-reward"
    })
    data.push({
      id: "balance-store-section"
    })

    this.setState({
      data
    })
  }



  render() {
    return (
      <View
        style={{
          backgroundColor: "white"
        }}
      >
        <FlatList
          keyExtractor={this._keyExtractory}
          renderItem={this._renderItem}
          data={this.state.data}
          extraData={this.state.should_flatlist_update}
        />
      </View>
    );
  }
}
