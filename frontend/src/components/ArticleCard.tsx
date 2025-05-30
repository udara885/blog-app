import { View, Text, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { format } from 'timeago.js';
import { Article } from '../types/types';
import { useStore } from '../store/store';
import Toast from 'react-native-toast-message';

const ArticleCard = ({ bookmark, article }: { bookmark: boolean; article: Article }) => {
  const { updateArticle } = useStore();

  const { title, image, createdAt, category, isBookmarked, _id } = article;

  const toggleBookmark = async () => {
    const { success, message } = await updateArticle(_id as string, {
      ...article,
      isBookmarked: !isBookmarked,
    });
    if (!success) {
      Toast.show({
        type: 'error',
        text1: message,
      });
    } else {
      Toast.show({
        type: 'success',
        text1: isBookmarked ? 'Bookmark removed' : 'Bookmark added',
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
            {createdAt ? format(new Date(createdAt)) : ''} · {category}
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
          </View>
        </View>
      </View>
    </View>
  );
};

export default ArticleCard;
