import { StyleSheet } from "react-native";

import * as CommonStyles from "../../../../../../../../shared/styles/style";
import { normalize } from "../../../../../../../../shared/helpers";
export const styles = StyleSheet.create({
  minus: {
    width: normalize(37, "width"),
    height: normalize(5, "height"),
    borderRadius: normalize(3, "width"),
    backgroundColor: "#D4D4D4"
  }
});
