import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import { Text, View, Image, ScrollView, ActivityIndicator } from "react-native";
import SearchBar from "../components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";


export default function Index() {
   const router = useRouter();
   const {data :movie ,loading:moviesLoading ,error:movieError}=useFetch(()=>fetchMovies({
    query:''
   }))
  return (
    <View className="flex-1 bg-primary ">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <Image source={icons.logo} className="w-12 h-12 mt-20 mb-5 mx-auto" />

        {moviesLoading ?(
          <ActivityIndicator
          size="large"
          color="#ab8bff"
          className="mt-10 self-center "
          />
        ):movieError ? (
          <Text> Error:{movieError}</Text>
        ):(
          <View>
          <SearchBar 
           onPress={()=>router.push("/serach")}
           placeholder="Search for a movie, series, or episode"
          />
          <>
            <Text className="text-lg text-white font-bold mt-5 mb-3 ">Latest Movie</Text>
          </>
        </View>
        )}


        
      </ScrollView>
    </View>
  );
}
