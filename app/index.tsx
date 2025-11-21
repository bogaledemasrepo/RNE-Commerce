
import Button from "@/components/button";
import { Link, router } from "expo-router";
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
          <Link href={"/home/page"} asChild>
          <Button bg="" onPress={()=>{}} title={"Home"} />
          </Link>
          <Pressable
            style={styles.button}
            onPress={() => router.navigate("/(auth)/sign-in/page")}>
            <Text style={(styles.text, styles.buttonText)}>Login</Text>
          </Pressable>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding:16
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