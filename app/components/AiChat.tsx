import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';
import { Link } from 'expo-router';

const AiChat = () => {
  return (
    <View style={{
      position: 'absolute',
      bottom: 50,
      right: 24,
      zIndex: 999,
    }}>
      <Link href="/chat/chatWithAi" asChild>
        <TouchableOpacity>
         <Image
          source={icons.aiIcon}
          className="w-[110px] h-[110px]"
          resizeMode="contain"
        />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default AiChat;
