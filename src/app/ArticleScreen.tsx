import { useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Modal,
  TextInput,
  useColorScheme,
  Animated,
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { format } from 'timeago.js';
import { useEffect, useRef, useState } from 'react';

const ArticleScreen = () => {
  const { article } = useLocalSearchParams();

  const articleData = article ? JSON.parse(article.toString()) : null;

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: -1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsBottomSheetVisible(false);
    });
  };

  useEffect(() => {
    if (isBottomSheetVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isBottomSheetVisible]);

  const theme = useColorScheme();

  return (
    <>
      <ScrollView className="px-4 dark:bg-black">
        <View className="flex flex-col items-center">
          <View className="relative">
            <Image source={{ uri: articleData.image }} className="h-[31.25rem] w-screen" />
            <View className="absolute bottom-0 p-4">
              <View className="self-start rounded-full bg-gray-500/90 px-3 py-1">
                <Text className="text-center font-bold text-white">{articleData.category}</Text>
              </View>
              <Text className="mt-2 text-2xl font-bold text-white">{articleData.title}</Text>
            </View>
          </View>
          <View className="py-5">
            <View className="flex flex-row items-center gap-5">
              <View className="size-10 rounded-full bg-blue-500"></View>
              <Text className="font-bold dark:text-white">Udara Lakshan</Text>
              <View className="flex flex-row items-center gap-1">
                <AntDesign name="clockcircle" size={12} color="gray" />
                <Text className="text-sm text-gray-400 dark:text-white">
                  {format(articleData.createdAt)}
                </Text>
              </View>
            </View>
            <Text className="mt-5 dark:text-white">{articleData.description}</Text>
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-5 left-0 right-0 items-center">
        <Pressable
          className="dark:bg- flex w-[90%] flex-row items-center justify-center gap-2 rounded-xl bg-gray-200 py-2 dark:bg-[#212529]"
          onPress={openBottomSheet}>
          <MaterialCommunityIcons
            name="comment-text"
            size={24}
            color={theme === 'dark' ? 'white' : 'gray'}
          />
          <Text className="text-xl font-bold text-gray-400 dark:text-white">Comment</Text>
        </Pressable>
      </View>
      <Modal
        visible={isBottomSheetVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeBottomSheet}>
        <View className="flex-1 justify-end">
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              opacity: fadeAnim,
            }}>
            <Pressable onPress={closeBottomSheet} className="h-full w-full" />
          </Animated.View>
          <Animated.View
            style={{
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0],
                  }),
                },
              ],
            }}
            className="rounded-t-2xl bg-gray-100 p-5 dark:bg-[#212529]">
            <View className="mb-5 flex flex-row items-center justify-between">
              <Text className="text-3xl font-bold dark:text-white">Submit a comment</Text>
              <AntDesign name="closecircle" size={20} color="gray" onPress={closeBottomSheet} />
            </View>
            <View className="flex flex-col gap-2">
              <TextInput
                placeholder="Write your comment..."
                className="rounded-xl bg-white px-3 dark:bg-[#343A40] dark:text-white"
                placeholderTextColor={theme === 'dark' ? '#6C757D' : 'black'}
                multiline={true}
              />
              <TextInput
                placeholder="Name"
                className="rounded-xl bg-white px-3 dark:bg-[#343A40] dark:text-white"
                placeholderTextColor={theme === 'dark' ? '#6C757D' : 'black'}
              />
              <TextInput
                placeholder="Email address"
                className="rounded-xl bg-white px-3 dark:bg-[#343A40] dark:text-white"
                placeholderTextColor={theme === 'dark' ? '#6C757D' : 'black'}
              />
              <Text className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                <Text className="text-[#007AFF]">Et repellendus maxime </Text>
                fugiat maiores a
              </Text>
              <Pressable
                className="mx-auto flex w-full flex-row items-center justify-center gap-1 rounded-xl py-3"
                style={{ backgroundColor: '#007AFF' }}>
                <MaterialCommunityIcons name="comment-text" size={24} color="white" />
                <Text className="text-lg font-bold text-white">Send</Text>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

export default ArticleScreen;
