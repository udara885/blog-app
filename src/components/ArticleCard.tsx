import { View, Text, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from 'react';
import { usePathname } from 'expo-router';
import { format } from 'timeago.js';

interface Article {
  title: string;
  image: string;
  category: string;
  description: string;
  createdAt: Date;
  isBookmarked: boolean;
}

const ArticleCard = ({ bookmark, article }: { bookmark: boolean; article: Article }) => {
  const [post, setPost] = useState(article);

  const toggleBookmark = () => {
    setPost({ ...post, isBookmarked: !isBookmarked });
  };

  const { title, image, createdAt, category, isBookmarked } = post;

  const pathname = usePathname();

  return (
    <View className="flex w-full flex-row gap-5">
      <Image
        source={{
          uri: image,
        }}
        className="h-28 w-[40%] rounded-2xl"
      />
      <View className="flex w-[60%] flex-1 flex-col justify-between">
        <Text numberOfLines={3} className="text-base font-semibold dark:text-white">
          {title}
        </Text>
        <View className="flex w-full flex-row items-center justify-between">
          <Text className="text-sm text-[#8e8e93]">
            {format(createdAt)} · {category}
          </Text>
          <View className="flex flex-row items-center gap-3">
            {bookmark && (
              <FontAwesome
                name={isBookmarked ? 'bookmark' : 'bookmark-o'}
                size={15}
                color="#007AFF"
                onPress={toggleBookmark}
              />
            )}
            {pathname === '/bookmarks' && (
              <Entypo name="dots-three-horizontal" size={15} color="gray" />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ArticleCard;
