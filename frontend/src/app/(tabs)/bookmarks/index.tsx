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

  return (
    <ScrollView className="px-4 pt-10 dark:bg-black">
      <Text className="text-4xl font-bold dark:text-white">Bookmarks</Text>
      <View className="flex flex-col gap-5 mt-5">
        {loading ? (
          <Text>Loading...</Text>
        ) : bookmarkedArticles.length !== 0 ? (
          bookmarkedArticles.map((article, index) => (
            <Link
              href={{ pathname: '/ArticleScreen', params: { article: JSON.stringify(article) } }}
              key={index}>
              <ArticleCard bookmark={true} article={article} />
            </Link>
          ))
        ) : (
          <Text className="text-white">No Bookmarked Articles</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default Bookmarks;
