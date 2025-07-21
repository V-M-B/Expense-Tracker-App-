import { Slot } from "expo-router";
import SafeScreen from "../components/SafeScreen.js"
import {ClerkProvider} from "@clerk/clerk-expo"
import { tokenCache } from '@clerk/clerk-expo/token-cache'


export default function RootLayout() {
  return ( 
    <ClerkProvider
    publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    tokenCache={tokenCache}>
    <SafeScreen>
    <Slot screenOptions={{headerShown:false}}/>
  </SafeScreen>
  </ClerkProvider>
  )
}
