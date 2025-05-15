import { View, Text, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';

const ArticleCard = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <View className="flex w-full flex-row gap-5">
      <Image
        source={{
          uri: 'https://www.macworld.com/wp-content/uploads/2023/01/notes-2-100754561-orig-2.jpg?resize=1200%2C800&quality=50&strip=all',
        }}
        className="h-28 w-[40%] rounded-2xl"
      />
      <View className="flex w-[60%] flex-col justify-between">
        <Text className="text-base font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quis
        </Text>
        <View className="flex w-full flex-row items-center gap-28">
          <Text className="text-sm text-gray-600">2h ago · News</Text>
          <FontAwesome
            name={isBookmarked ? 'bookmark' : 'bookmark-o'}
            size={20}
            color="#007AFF"
            onPress={toggleBookmark}
          />
        </View>
      </View>
    </View>
  );
};

export default ArticleCard;
