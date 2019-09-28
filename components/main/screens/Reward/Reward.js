import React from 'react';

import {
  View,
  ScrollView
} from 'react-native';

import TrackingSection from './components/tracking-section/TrackingSection'
import StoreSection from './components/store-section/StoreSection'

export default class Reward extends React.Component {

  state = {
    
  }

  addNewReward = () => {
    this._scrollViewRef.scrollToEnd()
  }
  _setScrollViewRef = (ref) => {
    this._scrollViewRef = ref
  }

  render() {
    return (
      <ScrollView
        // endFillColor={"#F2F2F2"}
        style={{
          backgroundColor: "#F2F2F2"
        }}

        ref={this._setScrollViewRef}
      >
        {/* Tracking section */}
        <TrackingSection

        />

        {/* Store Section */}
        <StoreSection 
          addNewReward = {this.addNewReward}
        />
      </ScrollView>
    );
  }
}

