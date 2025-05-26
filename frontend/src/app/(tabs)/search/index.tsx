import { View, Text, TextInput, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ArticleCard from '~/src/components/ArticleCard';
import { Link } from 'expo-router';
import { articles } from '~/src/data/articles';

const arr = ['iOS 15 beta', 'iPad mini 6', 'iPadOS 15 beta', 'Save battery'];

const Search = () => {
  return (
    <ScrollView className="px-4 pt-10 dark:bg-black">
      <Text className="text-4xl font-bold dark:text-white">Search</Text>
      <View className="relative mt-4 flex flex-row items-center justify-center">
        <FontAwesome name="search" size={20} color="#8e8e93" className="absolute left-3 z-10" />
        <TextInput
          placeholder="iOS 15, iPhone 13"
          placeholderTextColor="#8e8e93"
          className="flex-1 rounded-xl bg-gray-200 px-10 dark:bg-[#212529] dark:text-white"
        />
      </View>
      <View className="mt-10">
        <Text className="text-2xl font-bold dark:text-white">Discover</Text>
        <View className="mt-2">
          {arr.map((item, index) => (
            <View className="border-t border-gray-200 py-2 dark:border-[#212529]" key={index}>
              <Text className="text-lg font-medium text-[#007AFF]">{item}</Text>
            </View>
          ))}
        </View>
      </View>
      <View className="-mx-4 mt-5 px-4 py-4 dark:bg-[#212529] ">
        <Text className="pb-2 text-xl font-bold dark:text-white">Propose</Text>
        <View className="flex flex-col gap-5 border-t border-gray-200 py-10 pt-5 dark:border-gray-500">
          {articles.map((article, index) => (
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
