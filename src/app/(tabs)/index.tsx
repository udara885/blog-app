import { View, Text, Image, ScrollView } from 'react-native';
import ArticleCard from '../../components/ArticleCard';
const index = () => {
  return (
    <ScrollView className="p-4">
      <Text className="text-3xl font-bold">Featured article</Text>
      <View className="mt-5">
        <Image
          source={{
            uri: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/homepod-mini-202110-gallery-2?wid=4056&hei=2400&fmt=jpeg&qlt=90&.v=YzU1Y3psR3RXUUN2a25lejU4Tnk4d0FiNzJheTNKc3hFeGpVdlA2eExJMXdaN2xodjlvbmtPQllSY1EyODdXVTE1UUxLT2t0cW42N3FvQzVqaGhrVVZrSkdLaFBubHNDZzZoYXRBZjFHbkYrYWpGdS9XeFgvbS9ITnNYOEhYaG4',
          }}
          className="relative h-80 w-full rounded-2xl"
        />
        <View className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white p-5">
          <Text className="mb-1 text-xs text-[#007AFF]">TIPS How</Text>
          <Text className="font-bold">TRICK How to restore factory settings for HomePod mini</Text>
        </View>
      </View>
      <Text className="mt-5 text-3xl font-bold">New articles</Text>
      <View className="mb-10 mt-5 flex flex-col gap-5">
        {[...Array(3)].map((_, index) => (
          <ArticleCard key={index} bookmark={true} />
        ))}
      </View>
    </ScrollView>
  );
};
export default index;
