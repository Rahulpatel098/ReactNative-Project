import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
const TabIcon = ({ focused, icon, title }: { focused: boolean; icon: any; title: string }) => {
  if(focused){
  return (
    <ImageBackground
      source={images.highlight}
      className="flex-1 min-w-[112px] min-h-14 mt-4  justify-center items-center rounded-full overflow-hidden  "
    >
      <Image
        source={icon}
        tintColor="#151312"
        className="size-5"
      />
      <Text >{title}</Text>
    </ImageBackground>)
}else{
  return(
    <View className="flex-1 w-full flex-1 min-w-[112px]  min-h-14 mt-4  justify-center items-center rounded-full overflow-hidden ">
      <Image source={icon} tintColor="#a8b5db" className="size-5" />
      {/* <Text className="text-[#a8b5db]">{title}</Text> */}
    </View>
  )
}
}

const _layout = () => {
  return (
    <Tabs
    screenOptions={{
      tabBarShowLabel:false,
      tabBarItemStyle:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
      },
      tabBarStyle:{
        backgroundColor:'#0f0D23',
        borderRadius:50,
        marginHorizontal:5,
        marginBottom:5,
        height:52,
        position:'absolute',
        overflow:'hidden',
        borderWidth:1,
        borderColor:'#0f0D23',
      }
    }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon 
                focused={focused}
                icon={icons.home}
                title="Home"
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon 
                focused={focused}
                icon={icons.search}
                title="Search"
              />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon 
                focused={focused}
                icon={icons.person}
                title="Profile"
              />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon 
                focused={focused}
                icon={icons.save}
                title="Saved"
              />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
