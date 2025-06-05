import { View, Text, ActivityIndicatorBase, ActivityIndicator } from 'react-native'
import React from 'react'
import SearchBar from '../components/SearchBar'

const serach = () => {

  return (
    <View>
      <Text>serach</Text>
      <SearchBar 
       placeholder='Search for a movie, series, or episode'
       onPress={()=>{}}
      />
    
    </View>
  )
}

export default serach