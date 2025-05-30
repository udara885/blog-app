import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ArticleCard from '~/src/components/ArticleCard';
import { Link, useNavigation } from 'expo-router';
import { useStore } from '~/src/store/store';
import { useEffect, useState } from 'react';
import { Article } from '~/src/types/types';

const Search = () => {
  const { articles, getArticles } = useStore();

  const navigation = useNavigation();

  const [randomProposeArticles, setRandomProposeArticles] = useState<Article[]>([]);

  const [randomCategories, setRandomCategories] = useState<string[]>([]);

  const [searchText, setSearchText] = useState('');

  const [searchSuggestions, setSearchSuggestions] = useState<Article[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setSearchText('');
      setSearchSuggestions([]);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const fetchAllArticles = async () => {
      await getArticles();
    };
    fetchAllArticles();
  }, [getArticles]);

  useEffect(() => {
    if (articles.length > 0) {
      const getRandomArticles = () => {
        const shuffled = [...articles].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(4, articles.length));
      };
      setRandomProposeArticles(getRandomArticles());

      const getRandomCategories = () => {
        const uniqueCategories = [...new Set(articles.map((article) => article.category))];
        const shuffledCategories = [...uniqueCategories].sort(() => 0.5 - Math.random());
        return shuffledCategories.slice(0, Math.min(4, uniqueCategories.length));
      };
      setRandomCategories(getRandomCategories());
    }
  }, [articles]);

  useEffect(() => {
    if (searchText.trim() === '') {
      setSearchSuggestions([]);
      return;
    }
    const filteredArticles = articles.filter((article) =>
      article.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchSuggestions(filteredArticles.slice(0, 5));
  }, [searchText, articles]);

  return (
    <ScrollView className="px-4 pt-10 dark:bg-black">
      <Text className="text-4xl font-bold dark:text-white">Search</Text>
      <View className="relative flex flex-row items-center justify-center mt-4">
        <FontAwesome name="search" size={20} color="#8e8e93" className="absolute z-10 left-3" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#8e8e93"
          className="flex-1 rounded-xl bg-gray-200 px-10 dark:bg-[#212529] dark:text-white"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      {searchSuggestions.length > 0 && (
        <View className="mt-2 rounded-xl bg-white shadow-md dark:bg-[#212529]">
          {searchSuggestions.map((article, index) => (
            <Link
              key={index}
              href={{ pathname: '/ArticleScreen', params: { article: JSON.stringify(article) } }}
              asChild>
              <TouchableOpacity>
                <View
                  className={`px-4 py-3 ${index !== searchSuggestions.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
                  <Text className="dark:text-white">{article.title}</Text>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      )}
      <View className="mt-10">
        <Text className="text-2xl font-bold dark:text-white">Discover</Text>
        <View className="mt-2">
          {randomCategories.map((category, index) => (
            <Link
              className="border-t border-gray-200 py-2 dark:border-[#212529]"
              href={{ pathname: '/DiscoverScreen', params: { category } }}
              key={index}>
              <Text className="text-lg font-medium text-[#007AFF]">{category}</Text>
            </Link>
          ))}
        </View>
      </View>
      <View className="-mx-4 mt-5 px-4 py-4 dark:bg-[#212529] ">
        <Text className="pb-2 text-xl font-bold dark:text-white">Propose</Text>
        <View className="flex flex-col gap-5 py-10 pt-5 border-t border-gray-200 dark:border-gray-500">
          {randomProposeArticles.map((article, index) => (
            <Link
              href={{ pathname: '/ArticleScreen', params: { article: JSON.stringify(article) } }}
              key={index}>
              <View className="dark:rounded-2xl dark:bg-[#343A40] dark:p-2">
                <ArticleCard bookmark={false} article={article} />
              </View>
            </Link>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Search;
