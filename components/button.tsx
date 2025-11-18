import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
interface Prop{
    onPress:()=>void,
    title:string,
    bg:string;
}
const Button = ({bg,onPress,title}:Prop) => {
  return (
    <Pressable
        style={[styles.button,{backgroundColor:bg}]}
        onPress={onPress}>
        <Text style={(styles.text, styles.buttonText)}>{title}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
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
})