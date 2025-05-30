import { useLocalSearchParams, Link } from 'expo-router';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useStore } from '../store/store';
import { useEffect, useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import ArticleCard from '../components/ArticleCard';

const DiscoverScreen = () => {
  const { category } = useLocalSearchParams();

  const { articles, getArticles } = useStore();

  const [loading, setLoading] = useState(true);

  const [categoryTitle, setCategoryTitle] = useState(category);

  const categories = [...new Set(articles.map((article) => article.category))];

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      await getArticles();
      setLoading(false);
    };
    fetchArticles();
  }, [getArticles]);

  if (loading)
    return (
      <View className="flex flex-col items-center justify-center h-full gap-3 dark:bg-black">
        <AntDesign name="loading1" size={50} color="gray" />
        <Text className="text-xl font-bold text-gray-400">Loading...</Text>
      </View>
    );

  return (
    <ScrollView className="px-4 dark:bg-black">
      <View className="mt-16">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
            <Pressable
              key={index}
              className={`mr-3 flex flex-row gap-2 self-start rounded-full px-4 py-2 ${category === categoryTitle ? 'bg-black dark:bg-white' : 'bg-gray-300 dark:bg-[#343A40]'}`}
              onPress={() => setCategoryTitle(category)}>
              <Text
                className={`${category === categoryTitle ? 'font-bold text-white dark:text-black' : 'dark:text-white'}`}>
                {category}
              </Text>
              <View>
                <Text
                  className={`${category === categoryTitle ? 'font-bold text-white dark:text-black' : 'dark:text-white'}`}>
                  {articles.filter((article) => article.category === category).length}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <View className="flex flex-col gap-5 mt-5">
          {articles
            .filter((article) => article.category === categoryTitle)
            .map((article) => (
              <Link
                href={{ pathname: '/ArticleScreen', params: { article: JSON.stringify(article) } }}
                key={article._id}>
                <View className="dark:rounded-2xl dark:bg-[#343A40] dark:p-2">
                  <ArticleCard bookmark article={article} />
                </View>
              </Link>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default DiscoverScreen;
