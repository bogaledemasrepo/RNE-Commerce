import Carosel from '@/components/carosel'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const Home = () => {
  return (<SafeAreaView style={{flex:1}}>
      <ScrollView>
        <View style={{width:"100%",height:32,display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:4}}>
          <View></View>
          <View><Ionicons name="notifications-outline" size={24} color="#858585ff" /></View>
        </View>
        <View style={{padding:8}}>
          <View style={{width:"100%",height:42,borderRadius:8,backgroundColor:"#eee",borderWidth:1,borderColor:"#ccccccff",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:4}}>
            <Ionicons name="search" size={28} color="#858585ff" />
            <TextInput style={{flex:1}} placeholder='search' />
            <AntDesign name="scan" size={24}  color="#858585ff" />
          </View>
        </View>
        <ScrollView style={{padding:8}} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:8}}>
          {[1,2,3,4,5,6].map(Item=>(
          <View key={Item} style={{width:88,height:100,display:"flex"}}>
            <View style={{height:"84%",width:"100%",borderRadius:8,borderWidth:1,borderColor:"#ccccccff"}}></View>
            <View><Text style={{fontSize:10,fontWeight:"bold",textAlign:"center"}}>Something</Text></View>
          </View>
          ))}

        </ScrollView>
        <View style={{padding:8}}>
          <Carosel />
        </View>
         <View style={{padding:8,display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
          <View style={{display:"flex",flexDirection:"row"}}>
            <View style={{paddingHorizontal:16,paddingVertical:4,borderColor:"#858585ff",borderWidth:1,borderRadius:16,backgroundColor:"#04050fb7"}}>
              <Text style={{color:"#fff",fontWeight:"bold"}}>For You</Text>
            </View>
            <View style={{paddingHorizontal:8,paddingVertical:4,borderColor:"#858585ff",borderWidth:1,borderRadius:16,flexDirection:"row",gap:4,marginHorizontal:4}}>
              <AntDesign name="star" size={16} color="#858585ff" />
              <Text style={{color:"#04050fb7",fontWeight:"bold",fontSize:12}}>Best Selers</Text>
            </View>
          </View>
          <View style={{display:"flex",flexDirection:"row",gap:4}}>
            <Text>See all</Text>
            <FontAwesome name="angle-right" size={20} color="#858585ff" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home