import { View, Text, Image } from 'react-native';
import ArticleCard from '../components/ArticleCard'
const index = () => {
  return (
    <View className="p-5">
      <Text>Featured article</Text>
      <View>
        <Image
          source={{
            uri: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/homepod-mini-202110-gallery-2?wid=4056&hei=2400&fmt=jpeg&qlt=90&.v=YzU1Y3psR3RXUUN2a25lejU4Tnk4d0FiNzJheTNKc3hFeGpVdlA2eExJMXdaN2xodjlvbmtPQllSY1EyODdXVTE1UUxLT2t0cW42N3FvQzVqaGhrVVZrSkdLaFBubHNDZzZoYXRBZjFHbkYrYWpGdS9XeFgvbS9ITnNYOEhYaG4',
          }}
          className="h-60 w-full"
        />
        <View>
          <Text>TRICK How to restore factory settings for</Text>
          <Text>HomePod mini</Text>
        </View>
      </View>
      <Text>New article</Text>
      <View>
        <ArticleCard/>
      </View>
    </View>
  );
};
export default index;
