import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";

const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  console.log(poster_path);
  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          // className="w-full h-53 rounded-lg"
          style={{ width: "100%", height: 200, borderRadius: 10 }}
          resizeMode="cover"
        />
        <Text className="text-sm font-bold mt-2 text-white" numberOfLines={1}>{title}</Text>
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-sm text-white">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text className="Text-xs text-light-300 font-medium m-1">
            {release_date}
          </Text>
          {/* <Text className='text-xs font-medium TEtx-light-300' */}
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
