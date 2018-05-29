import { Dimensions, Platform } from 'react-native'

// 屏幕宽高
const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height

// iPhoneX
const X_WIDTH = 375
const X_HEIGHT = 812
// 当前机型是否为iPhoneX
const ISIPHONEX = (Platform.OS === 'ios' && SCREEN_WIDTH === X_WIDTH && SCREEN_HEIGHT === X_HEIGHT)

// Android 平台下导航栏高度
const NAVIGATIONBAR_WIDTH_ANDROID = 56
// ios平台下导航栏高度
const NAVIGATIONBAR_WIDTH_IOS = ISIPHONEX ? 88 : 64
// ios平台下导航栏内容区域距离顶部边距
const NAVIGATIONBAR_PADDING_TOP_IOS = ISIPHONEX ? 44 : 20

export default {
  ISIPHONEX,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  NAVIGATIONBAR_WIDTH_ANDROID,
  NAVIGATIONBAR_WIDTH_IOS,
  NAVIGATIONBAR_PADDING_TOP_IOS
}
