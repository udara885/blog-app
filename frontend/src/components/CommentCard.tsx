import { View, Text } from 'react-native';
import { Comment } from '../types/types';
import { format } from 'timeago.js';

const CommentCard = ({ comment }: { comment: Comment }) => {
  return (
    <View className="flex flex-row gap-3 mt-5">
      <View className="bg-blue-500 rounded-full size-10" />
      <View className="flex-1">
        <View className="self-start rounded-lg bg-gray-200 px-3 py-2 dark:bg-[#343A40]">
          <Text className="font-bold dark:text-white">{comment.name}</Text>
          <Text className="dark:text-white">{comment.comment}</Text>
        </View>
        <Text className="text-sm text-gray-400 dark:text-white">
          {comment.createdAt ? format(new Date(comment.createdAt)) : ''}
        </Text>
      </View>
    </View>
  );
};

export default CommentCard;
