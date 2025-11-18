import { AntDesign, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  return (<SafeAreaView style={{flex:1}}>
          <ScrollView style={{padding:16}}>
            <View style={{margin:"auto"}}>
              <View style={{borderRadius:100,position:"relative"}}>
                <Image style={{borderRadius:100,margin:"auto",backgroundColor:"#fff",padding:8,marginVertical:8}} resizeMode='cover' width={100} height={100} source={require('../../../assets/images/man.png')} />
                <AntDesign style={{position:"absolute",bottom:0,right:"20%"}}  name="cloud-upload" size={36} color="#008cffff" />
              </View>
              <View style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <Text style={{fontSize:18,fontWeight:"bold"}}>Bogale Demas</Text>
                <View style={{display:"flex",gap:4,flexDirection:"row",alignItems:"center"}}>
                  <Feather name="mail" size={20} color={"#858585ff"}  />
                  <Text style={{fontSize:16,color:"#858585ff"}}>bgdm@gmail.com</Text>
                </View>
              </View>
            </View>
            <View style={{marginTop:16}}>
              <View>
                <Text style={{fontSize:16,color:"#858585ff"}}>Personal Information</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginVertical:4}}>
                <Text>Email Address</Text>
                <View>
                  <FontAwesome name="angle-right" size={20} color="#858585ff" />
                </View>
              </View>
              <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginVertical:4}}>
                <Text>Name</Text>
                <View>
                  <FontAwesome name="angle-right" size={20} color="#858585ff" />
                </View>
              </View>
            </View>
            <View style={{width:"100%",height:1,backgroundColor:"#cacacaff",marginVertical:16}}></View>
            <View>
              <View>
                <Text style={{fontSize:16,color:"#858585ff"}}>Security</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginVertical:8,alignItems:"center"}}>
                <Text>Change Password</Text>
                  <FontAwesome name="angle-right" size={20} color="#858585ff" />
              </View>
            </View>
            <View style={{width:"100%",height:1,backgroundColor:"#cacacaff",marginVertical:16}}></View>
            <View>
              <View>
                <Text style={{fontSize:16,color:"#858585ff"}}>Help & Support</Text>
              </View>
              <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginVertical:4,alignItems:"center"}}>
                <Text>About us</Text>
                  <FontAwesome name="angle-right" size={20} color="#858585ff" />
              </View>
              <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginVertical:4,alignItems:"center"}}>
                <Text>Frequently asked quastions</Text>
                  <FontAwesome name="angle-right" size={20} color="#858585ff" />
              </View>
              <View style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginVertical:4,alignItems:"center"}}>
                <Text>Submit feedback</Text>
                  <FontAwesome name="angle-right" size={20} color="#858585ff" />
              </View>
             <Pressable
                style={[styles.button]}
                onPress={()=>router.navigate("/")}>
                  <MaterialCommunityIcons name="logout" size={24} color="#858585ff" />
                <Text style={(styles.text, styles.buttonText)}>Logout</Text>
            </Pressable>
            </View>
            <View style={{width:"100%",height:1,backgroundColor:"#cacacaff",marginVertical:36}}></View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
    button: {
    backgroundColor: '#fff',
    display:"flex",
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    borderWidth:1,
    borderColor:'#858585ff',
    borderRadius: 4,
    marginTop: 30,
    flex:1,
  },
  buttonText: {
    color: '#858585ff',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
})