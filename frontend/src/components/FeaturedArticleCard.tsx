import { View, Text, Image } from 'react-native';
import { Article } from '../types/types';

const FeaturedArticleCard = ({ article }: { article: Article }) => {
  return (
    <View className="w-[25rem] rounded-2xl">
      <Image
        source={{
          uri: article.image,
        }}
        className="relative w-full h-80 rounded-2xl"
      />
      <View className="absolute p-5 bg-white bottom-5 left-5 right-5 rounded-2xl dark:bg-black/80">
        <Text className="mb-1 text-xs text-[#007AFF]">{article.category}</Text>
        <Text className="font-bold dark:text-white">{article.title}</Text>
      </View>
    </View>
  );
};
export default FeaturedArticleCard;
