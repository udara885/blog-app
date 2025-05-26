import { View, Text, ScrollView } from 'react-native';
import ArticleCard from '../../components/ArticleCard';
import { Link } from 'expo-router';
import { articles } from '~/src/data/articles';
import FeaturedArticleCard from '~/src/components/FeaturedArticleCard';

const Index = () => {
  return (
    <ScrollView className="p-4 dark:bg-black">
      <Text className="text-3xl font-bold dark:text-white">Featured articles</Text>
      <View className="mt-5">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[...Array(3)].map((_, index) => (
            <Link href="/ArticleScreen" className="mr-3" key={index}>
              <FeaturedArticleCard />
            </Link>
          ))}
        </ScrollView>
      </View>
      <Text className="mt-5 text-3xl font-bold dark:text-white">New articles</Text>
      <View className="flex flex-col gap-5 mt-5 mb-10">
        {articles.map((article, index) => (
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

export default Index;
