import React from 'react';

import {
  View,
  ScrollView,
  StyleSheet,
  Keyboard,
  Animated,
  KeyboardAvoidingView
} from 'react-native';

import TrackingSection from './components/tracking-section/TrackingSection.Container'
import StoreSection from './components/store-section/StoreSection'

export default class Reward extends React.Component {

  componentDidMount() {
    const didFocusScreen = this.props.navigation.addListener(
      'didFocus',
      payload => {
        this.props.changeRouteAction(payload.state.routeName)
      }
    )

    // const willFocusScreen = this.props.navigation.addListener(
    //   'willFocus',
    //   payload => {
    //     this.props.changeRouteAction(payload.state.routeName)
    //   }
    // )
  }

  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: "#F2F2F2",
        }}
      >
        {/* Tracking section */}
        <TrackingSection
        />

        {/* Store Section */}
        <StoreSection
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

})