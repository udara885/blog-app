import { View, Text, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
const ArticleCard = () => {
  return (
    <View className="flex flex-row gap-5">
      <Image
        source={{
          uri: 'https://www.macworld.com/wp-content/uploads/2023/01/notes-2-100754561-orig-2.jpg?resize=1200%2C800&quality=50&strip=all',
        }}
        className="h-32 w-40 rounded-2xl"
      />
      <View>
        <Text className="text-2xl">ArticleCard</Text>
        <Text>Test</Text>
        <View className="flex flex-row items-center gap-10">
          <Text>2h ago · News</Text>
          <FontAwesome name="bookmark" size={20} color="#007AFF" />
        </View>
      </View>
    </View>
  );
};
export default ArticleCard;
