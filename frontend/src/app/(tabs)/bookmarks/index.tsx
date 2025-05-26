import { Link } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import ArticleCard from '~/src/components/ArticleCard';
import { articles } from '~/src/data/articles';

const Bookmarks = () => {
  return (
    <ScrollView className="px-4 pt-10 dark:bg-black">
      <Text className="text-4xl font-bold dark:text-white">Bookmarks</Text>
      <View className="mt-5 flex flex-col gap-5">
        {articles
          .filter((article) => article.isBookmarked)
          .map((article, index) => (
            <Link
              href={{ pathname: '/ArticleScreen', params: { article: JSON.stringify(article) } }}
              key={index}>
              <ArticleCard bookmark={true} article={article} />
            </Link>
          ))}
      </View>
    </ScrollView>
  );
};

export default Bookmarks;
