import { Stack } from 'expo-router'
import React from 'react'

function HomeLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name='page' />
        <Stack.Screen name='detail/index' />
    </Stack>
  )
}

export default HomeLayout