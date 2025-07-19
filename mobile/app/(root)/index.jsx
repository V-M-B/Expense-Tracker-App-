import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { SignOutButton } from '../../components/SignOutButton'
import { useTransactions } from '../../hooks/useTransactions'
import {useEffect} from 'react'
import PageLoader from '../../components/PageLoader'
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // add any other styles you need
  },
});

export default function Page() {
  const { user } = useUser()
  const {transactions,summary,loadData,isLoaded}=useTransactions(user.id)
  // deleteTransactionsisLoading
  useEffect(()=>{
    loadData()
  },[loadData])
  // console.log("transactions",transactions)
  // console.log("summary",summary)
  // console.log("userid",user.id)

  if(isLoaded) return <PageLoader/>   

  return (
    <View style ={styles.container}>
    <View style ={styles.content}>
      {/* header */}
    <View style ={styles.container}> </View>
    {/* left */}
    <View style={styles.headerLeft}>

    {/* right */}
    </View>
    </View>
    </View>
  )
}