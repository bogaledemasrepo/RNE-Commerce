import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import Carosel from "@/components/carosel";
import COLORS from "@/constants/color";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Detail() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background ,padding:8,justifyContent:"center",flexDirection:"column",gap:16}}>
      <View style={{width:"100%",gap:8}}>
        <View style={styles.inputContainer}>
          <Ionicons
            name="search-outline"
            size={24}
            color={COLORS.primary}
            style={styles.inputIcon}
          />
        <TextInput style={styles.input} placeholder="Search" placeholderTextColor={COLORS.placeholderText} />
        <AntDesign
            name="scan"
            size={24}
            color={COLORS.primary}
            style={styles.eyeIcon}
          />
        </View>
      </View>
      <ScrollView style={{flex:1,display:"flex",gap:16,flexDirection:"column"}} contentContainerStyle={{paddingBottom:16,gap:8}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:8}}>
          {[1,2,3,4].map(item=><View key={item} style={styles.card}>
            <Text style={{fontSize:12,marginVertical:16,color:"#1976D2",textAlign:"center"}}>RNE-Commerce</Text>
          </View>)}
        </ScrollView>
        <Carosel />
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    padding: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: COLORS.border,
    height:120,
    width:120,
    justifyContent:"center",
    alignItems:"center"
  },
    inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 8,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 48,
    color: COLORS.textDark,
  },
  eyeIcon: {
    padding: 8,
  },
});