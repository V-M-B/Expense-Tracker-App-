import { View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {COLORS} from "../app/constants/colors.js"


const SafeScreen = ({children}) => {
    const insets = useSafeAreaInsets();
  return (
    <View style={{paddingTop:insets.top, flex:1, backgroundColor:COLORS.BACKGROUND}} >
     { children}
    </View>
  )
}

export default SafeScreen