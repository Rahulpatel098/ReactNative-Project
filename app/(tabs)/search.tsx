import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import useFetch from '@/services/useFetch'
import { fetchMovies } from "@/services/api";
import { images } from '@/constants/images';
import MovieCard from '../components/MovieCard';
import { icons } from '@/constants/icons';
import { updateSearchcount } from '@/services/appwrite';
const search = () => {
  const [serachquery,setserachquery]=useState('');
  const { data: movie, loading: moviesLoading, error: movieError , refetch :loadMovies ,reset} = useFetch(() => fetchMovies({
    query: `${serachquery}`
  }),false);

  useEffect(()=>{
    const timeoutId = setTimeout (async()=>{
      
      if(serachquery.trim()){
        await loadMovies();
       
    }else{
      reset();
    }
  },1000);
     return ()=>clearTimeout(timeoutId);
  },[serachquery]);
  useEffect(()=>{
 if(movie?.length>0 && movie?.[0]){
        updateSearchcount(serachquery,movie[0]);
       }
  },[movie])
     
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0 ' resizeMode='cover' />
 
      <FlatList
        data={movie}
        renderItem={({ item }) => (
          <MovieCard
            {...item}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        className='px-5 mt-1'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 20,
          paddingRight: 5,
          marginBottom: 10
        }}
        contentContainerStyle={{paddingBottom:100}}
        ListHeaderComponent={
          <>
          <View className='w-full flex-row justify-center mt-15'>
            <Image source={icons.logo} className='w-20 h-20'/>
          </View>
          <View>
            <SearchBar placeholder='search movies...' onPress={()=>{}}
              value={serachquery}
              onChangeText={(text:string)=>setserachquery(text)}

            />
           
          </View>
          {
            moviesLoading 
            &&(<ActivityIndicator size={'large'} color='#0000ff'/>)

          }
          {
            movieError && (<Text className='Text-red-500'>error :{movieError.messsaga}</Text>)
          }

        {
          !moviesLoading &&  !movieError && serachquery.trim() && movie?.length>0 && (
            <Text className='text-xl text-white'>
                Serach result for {''}
                <Text className='text-accent '>{serachquery}</Text>
            </Text>
          )
          
        }
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !movieError ?(
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>


              {serachquery.trim() ? 'no movies found' : 'serach'}  
                
              </Text>
              </View>
          ) :null
        }
      />

    </View>
  )
}

export default search