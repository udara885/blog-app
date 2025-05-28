import { View, Text, ScrollView } from 'react-native';
import ArticleCard from '../../components/ArticleCard';
import { Link } from 'expo-router';
import FeaturedArticleCard from '~/src/components/FeaturedArticleCard';
import { useEffect, useState } from 'react';
import { useStore } from '~/src/store/store';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Article } from '~/src/types/types';

const Index = () => {
  const { articles, getArticles } = useStore();

  const [loading, setLoading] = useState(true);

  const [randomFeaturedArticles, setRandomFeaturedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      getArticles();
      setLoading(false);
    };
    fetchArticles();
  }, [getArticles]);

  useEffect(() => {
    if (articles.length > 0) {
      const getRandomArticles = () => {
        const shuffled = [...articles].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(5, articles.length));
      };
      setRandomFeaturedArticles(getRandomArticles());
    }
  }, [articles.length]);

  return (
    <ScrollView className="p-4 dark:bg-black">
      <Text className="text-3xl font-bold dark:text-white">Featured articles</Text>
      <View className="mt-5">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {randomFeaturedArticles.map((article, index) => (
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
          <View className="flex flex-col items-center justify-center gap-3 mt-10">
            <AntDesign name="loading1" size={50} color="gray" />
            <Text className="text-xl font-bold text-gray-400">Loading...</Text>
          </View>
        ) : articles.length !== 0 ? (
          [...articles]
            .reverse()
            .slice(0, 5)
            .map((article, index) => (
              <Link
                href={{ pathname: '/ArticleScreen', params: { article: JSON.stringify(article) } }}
                key={index}>
                <ArticleCard bookmark={true} article={article} />
              </Link>
            ))
        ) : (
          <View className="flex flex-col items-center justify-center gap-3 mt-10">
            <MaterialIcons name="article" size={50} color="gray" />
            <Text className="text-xl font-bold text-gray-400">No New Articles</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Index;
