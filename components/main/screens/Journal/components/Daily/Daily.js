import React from "react";
import JournalTab from "../share/journal/JournalTab.Container";

import NetInfo from "@react-native-community/netinfo";
import { fromJS } from "immutable";

export default class Daily extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => ({
    swipeEnabled: false
})

  componentDidMount() {
    // This code will run only in native
    // this.unsubscribe_net_info = NetInfo.addEventListener(state => {
    //   let sending_obj = {
    //     is_internet_reachable: state.isInternetReachable,
    //     connection_type: state.type
    //   };

    //   this.props.updateGeneralSettings(["net_info"], {}, v =>
    //     fromJS(sending_obj)
    //   );
    // });
  }

  componentWillUnmount() {
      this.unsubscribe_net_info()
  }

  render() {
    return (
      <>
        {/* Should implement conditional render to limit re-renderings */}
        <JournalTab
          type="day"
          action_type="ADD_EDIT_DAY_TASK"
          {...this.props}
        />
      </>
    );
  }
}
