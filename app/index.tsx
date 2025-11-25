
import COLORS from "@/constants/color";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {

  return ( <View
      style={styles.container}
    >
    <View style={[styles.card, styles.shadowProp]}>
        <View>
          <Text style={styles.heading}>
            RN-E-Commerce
          </Text>
        </View>
        <Text>
          Using the elevation style prop to apply box-shadow for iOS devices
        </Text>
      </View>
      <View style={styles.action}>
          <Pressable
            style={styles.button}
            onPress={() => router.navigate("/(auth)/sign-in/page")}>
            <Text style={(styles.text, styles.buttonText)}>Get started</Text>
          </Pressable>
        </View>
      <View>
    </View>
    </View>
  );
}


const styles = StyleSheet.create({
   container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 16,
    justifyContent: "center"
  },
      
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 13,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  button: {
    backgroundColor: '#4830D3',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    borderRadius: 4,
    marginTop: 30,
    flex:1
  },
  buttonText: {
    color: '#fff',
    fontSize:16,
    fontWeight:'bold'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
  action:{
    width:"100%",
    display:"flex",
    flexDirection:"row",
    gap:16
  }
});