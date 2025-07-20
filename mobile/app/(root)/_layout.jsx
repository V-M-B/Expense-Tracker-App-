import { Stack } from 'expo-router/stack'
import { Redirect } from 'expo-router'
import {useUser} from "@clerk/clerk-expo"
import SafeScreen from "../../components/SafeScreen.js"


export default function Layout() {
  const {isSignedIn,isLoaded} = useUser();

  if(!isLoaded) return null;
  // this is fro better user experinces
  if(!isSignedIn) return <Redirect href={"/sign-in"}/>

  return(
  <SafeScreen>
     <Stack screenOptions={{headerShown:false}} />
     </SafeScreen>
     )
}