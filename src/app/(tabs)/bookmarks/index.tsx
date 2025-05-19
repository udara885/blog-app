import { View, Text, ScrollView } from 'react-native';
import ArticleCard from '~/src/components/ArticleCard';

const Bookmarks = () => {
  return (
    <ScrollView className="p-4">
      <Text className="text-4xl font-bold">Bookmarks</Text>
      <View className="mt-5 flex flex-col gap-5">
        {[...Array(3)].map((_, index) => (
          <ArticleCard bookmark={true} key={index} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Bookmarks;
