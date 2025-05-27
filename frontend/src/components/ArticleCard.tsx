import { View, Text, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { usePathname } from 'expo-router';
import { format } from 'timeago.js';
import { Article } from '../types/types';
import { useStore } from '../store/store';
import * as Burnt from 'burnt';

const ArticleCard = ({ bookmark, article }: { bookmark: boolean; article: Article }) => {
  const { updateArticle } = useStore();

  const { title, image, createdAt, category, isBookmarked, _id } = article;

  const pathname = usePathname();

  const toggleBookmark = async () => {
    const { success, message } = await updateArticle(_id as string, {
      ...article,
      isBookmarked: !isBookmarked,
    });
    if (!success) {
      Burnt.toast({
        title: message,
      });
    } else {
      Burnt.toast({
        title: !isBookmarked ? 'Bookmark added' : 'Bookmark removed',
      });
    }
  };

  return (
    <View className="flex flex-row w-full gap-5">
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
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-sm text-[#8e8e93]">
            {createdAt ? format(createdAt) : ''} · {category}
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
