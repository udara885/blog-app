import { View, Text, Image } from 'react-native';

const FeaturedArticleCard = () => {
  return (
    <View className="w-[24rem] rounded-2xl">
      <Image
        source={{
          uri: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/homepod-mini-202110-gallery-2?wid=4056&hei=2400&fmt=jpeg&qlt=90&.v=YzU1Y3psR3RXUUN2a25lejU4Tnk4d0FiNzJheTNKc3hFeGpVdlA2eExJMXdaN2xodjlvbmtPQllSY1EyODdXVTE1UUxLT2t0cW42N3FvQzVqaGhrVVZrSkdLaFBubHNDZzZoYXRBZjFHbkYrYWpGdS9XeFgvbS9ITnNYOEhYaG4',
        }}
        className="relative w-full h-80 rounded-2xl"
      />
      <View className="absolute p-5 bg-white bottom-5 left-5 right-5 rounded-2xl dark:bg-black/80">
        <Text className="mb-1 text-xs text-[#007AFF]">TIPS How</Text>
        <Text className="font-bold dark:text-white">
          TRICK How to restore factory settings for HomePod mini
        </Text>
      </View>
    </View>
  );
};
export default FeaturedArticleCard;
