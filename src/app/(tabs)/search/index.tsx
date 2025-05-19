import { View, Text, TextInput, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ArticleCard from '~/src/components/ArticleCard';

const arr = ['iOS 15 beta', 'iPad mini 6', 'iPadOS 15 beta', 'Save battery'];

const Search = () => {
  return (
    <ScrollView className="p-4">
      <Text className="text-4xl font-bold">Search</Text>
      <View className="relative mt-4 flex flex-row items-center justify-center">
        <FontAwesome name="search" size={20} color="#8e8e93" className="absolute left-3 z-10" />
        <TextInput
          placeholder="iOS 15, iPhone 13"
          className="flex-1 rounded-xl bg-gray-200 px-10"
        />
      </View>
      <View className="mt-10">
        <Text className="text-2xl font-bold">Discover</Text>
        <View className="mt-2">
          {arr.map((item, index) => (
            <View className="border-t border-gray-200 py-2" key={index}>
              <Text className="text-lg font-medium text-[#007AFF]">{item}</Text>
            </View>
          ))}
        </View>
      </View>
      <View className="mt-10">
        <Text className="pb-2 text-xl font-bold">Propose</Text>
        <View className="flex flex-col gap-5 border-t border-gray-200 py-10 pt-5">
          {[...Array(3)].map((_, index) => (
            <ArticleCard key={index} bookmark={false} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Search;
