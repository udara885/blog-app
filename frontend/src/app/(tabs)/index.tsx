import { View, Text, ScrollView } from 'react-native';
import ArticleCard from '../../components/ArticleCard';
import { Link } from 'expo-router';
import FeaturedArticleCard from '~/src/components/FeaturedArticleCard';
import { useEffect, useState } from 'react';
import { useStore } from '~/src/store/store';

const Index = () => {
  const { articles, getArticles } = useStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      getArticles();
      setLoading(false);
    };
    fetchArticles();
  }, [getArticles]);

  return (
    <ScrollView className="p-4 dark:bg-black">
      <Text className="text-3xl font-bold dark:text-white">Featured articles</Text>
      <View className="mt-5">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {articles.map((article, index) => (
            <Link
              href={{ pathname: '/ArticleScreen', params: { article: JSON.stringify(article) } }}
              className="mr-3"
              key={index}>
              <FeaturedArticleCard article={article} />
            </Link>
          ))}
        </ScrollView>
      </View>
      <Text className="mt-5 text-3xl font-bold dark:text-white">New articles</Text>
      <View className="flex flex-col gap-5 mt-5 mb-10">
        {loading ? (
          <Text className="text-white">Loading...</Text>
        ) : articles.length !== 0 ? (
          articles.map((article, index) => (
            <Link
              href={{ pathname: '/ArticleScreen', params: { article: JSON.stringify(article) } }}
              key={index}>
              <ArticleCard bookmark={true} article={article} />
            </Link>
          ))
        ) : (
          <Text className="text-white">No New Articles</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Index;
