import { Dimensions, Platform, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Based on Iphone 7 plus viewport
const w_scale = SCREEN_WIDTH / 414;
const h_scale = SCREEN_HEIGHT / 736;

export function normalize(size, based = "width" | "height") {
  const newSize = based === "height" ? size * h_scale : size * w_scale;
  if (Platform.isPad) {
    return size;
  } else {
    if (Platform.OS === "ios") {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    }
  }
}
