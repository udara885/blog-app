import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import ArticleCard from '~/src/components/ArticleCard';
import { useStore } from '~/src/store/store';
import { Article } from '~/src/types/types';

const Bookmarks = () => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Article[]>([]);

  const [loading, setLoading] = useState(true);

  const { articles, getArticles } = useStore();

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      await getArticles();
      setLoading(false);
    };
    fetchArticles();
  }, [getArticles]);

  useEffect(() => {
    setBookmarkedArticles(articles.filter((article) => article.isBookmarked));
  }, [articles]);

  if (loading)
    return (
      <View className="flex flex-col items-center justify-center h-full gap-3 dark:bg-black">
        <AntDesign name="loading1" size={50} color="gray" />
        <Text className="text-xl font-bold text-gray-400">Loading...</Text>
      </View>
    );

  if (bookmarkedArticles.length <= 0)
    return (
      <View className="flex flex-col items-center justify-center h-full gap-3 dark:bg-black">
        <FontAwesome name="bookmark" size={50} color="gray" />
        <Text className="text-xl font-bold text-gray-400">No Bookmarks</Text>
      </View>
    );

  return (
    <ScrollView className="px-4 pt-10 dark:bg-black">
      <Text className="text-4xl font-bold dark:text-white">Bookmarks</Text>
      <View className="flex flex-col gap-5 mt-5">
        {bookmarkedArticles.map((article, index) => (
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
