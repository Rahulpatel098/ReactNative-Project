
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { Text, View, Image, ScrollView, ActivityIndicator, FlatList } from "react-native";
import SearchBar from "../components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "../components/MovieCard";
import { useEffect } from "react";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "../components/TrendingCard";
import AiChat from "../components/AiChat";


export default function Index() {
   const router = useRouter();
   const {
     data:trendingMovies,
     loading: trendingLoading,
     error:TrendingError
   }=useFetch(getTrendingMovies );

   const {data :movie ,loading:moviesLoading ,error:movieError}=useFetch(()=>fetchMovies({
    query:''
   }))
   
  return (
    <View className="flex-1 bg-primary relative">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <Image source={icons.logo} className="w-20 h-20 mt-15 mb-1 mx-auto" />
       {/* for the indication of the loading of the movie or the error  */}
        {moviesLoading || trendingLoading ?(
          <ActivityIndicator
          size="large"
          color="#ab8bff"
          className="mt-10 self-center "
          />
        ):movieError || TrendingError ? (
          <Text className="text-white"> Error:{movieError?.message || TrendingError?.message}</Text>
        ):(
          <View className="flex-1 mt-5">
      
          <SearchBar 
           onPress={()=>router.push("/search")}
           placeholder="Search for a movie, series, or episode"
          />
          {/* // For trendingMovies */}
          {trendingLoading && (
            <View className="mt-10 ">
              
            </View>
          )}
          <>

            {/* flatlist for the trending movies */}
            <Text className="Text-lg text-white font-bold m-3">Trending Movies</Text>
            <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4 mt-3 "
            data={trendingMovies} 
            renderItem={({item ,index})=>(
              <TrendingCard
              movie={item}
              index={index}
              />
              // <Text className="text-white text-sm">{item.title}</Text>
            )}
            keyExtractor={(item)=>item.movie_id}
            />

            <Text className="text-lg text-white font-bold mt-5 mb-3  ">Latest Movie</Text>
            {/* flatlist for the latest movie */}
            <FlatList
              data={movie}
              renderItem={({item})=>(
               <MovieCard
               {...item}
               />
              )}
              keyExtractor={(item)=>item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent:'flex-start',
                gap:20,
                paddingRight:5,
                marginBottom:10
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </>
        </View>
        )};
      </ScrollView>
        <AiChat/>
    </View>
  );
};

// export default Index;