import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, Pressable, ScrollView, Modal, TextInput, Animated } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { format } from 'timeago.js';
import { useEffect, useRef, useState } from 'react';
import { useArticle } from '../context/ArticleContext';
import { useStore } from '../store/store';
import Toast from 'react-native-toast-message';
import CommentCard from '../components/CommentCard';
import { Comment } from '../types/types';
import { useColorScheme } from 'nativewind';

const ArticleScreen = () => {
  const { article } = useLocalSearchParams();

  const [articleData, setArticleData] = useState(article ? JSON.parse(article.toString()) : null);

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { setCurrentArticle } = useArticle();

  const { updateArticle } = useStore();

  const { colorScheme } = useColorScheme();

  const [comment, setComment] = useState({
    name: '',
    email: '',
    comment: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    comment: '',
  });

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

  const validateForm = () => {
    let errors = {
      name: '',
      email: '',
      comment: '',
    };

    if (!comment.name) errors.name = 'Name is required';
    if (!comment.email) errors.email = 'Email is required';
    if (!comment.comment) errors.comment = 'Comment is required';

    setErrors(errors);

    return !Object.values(errors).some((error) => error !== '');
  };

  const submitComment = async () => {
    if (!validateForm()) return;

    const newComment = {
      ...comment,
      createdAt: new Date().toISOString(),
    };

    const comments = articleData.comments ? [...articleData.comments, newComment] : [newComment];

    const updatedArticle = { ...articleData, comments };

    const { success, message } = await updateArticle(articleData._id, updatedArticle);

    if (!success) {
      Toast.show({
        type: 'error',
        text1: message,
      });
      setArticleData(articleData);
    } else {
      Toast.show({
        type: 'success',
        text1: 'Comment added',
      });
      setArticleData(updatedArticle);
      setComment({
        name: '',
        email: '',
        comment: '',
      });
      closeBottomSheet();
    }
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
  }, [isBottomSheetVisible, fadeAnim, slideAnim]);

  useEffect(() => {
    setCurrentArticle(articleData);
    return () => setCurrentArticle(null);
  }, [setCurrentArticle, articleData]);

  return (
    <>
      <ScrollView className="px-4 dark:bg-black">
        <View className="flex flex-col items-center">
          <View className="relative">
            <Image source={{ uri: articleData.image }} className="h-[31.25rem] w-screen" />
            <View className="absolute bottom-0 p-4">
              <View className="self-start px-3 py-1 rounded-full bg-gray-500/90">
                <Text className="font-bold text-center text-white">{articleData.category}</Text>
              </View>
              <Text className="mt-2 text-2xl font-bold text-white">{articleData.title}</Text>
            </View>
          </View>
          <View className="py-5">
            <View className="flex flex-row items-center gap-5">
              <View className="bg-blue-500 rounded-full size-10"></View>
              <Text className="font-bold dark:text-white">Udara Lakshan</Text>
              <View className="flex flex-row items-center gap-1">
                <AntDesign name="clockcircle" size={12} color="gray" />
                <Text className="text-sm text-gray-400 dark:text-white">
                  {format(new Date(articleData.createdAt))}
                </Text>
              </View>
            </View>
            <Text
              className={`mt-5 ${articleData.comments.length === 0 && 'mb-16'} dark:text-white`}>
              {articleData.description}
            </Text>
            {articleData.comments.length !== 0 && (
              <View className="mt-5 mb-16">
                <Text className="text-2xl font-bold dark:text-white">Comments</Text>
                {articleData.comments.map((comment: Comment, index: number) => (
                  <CommentCard key={index} comment={comment} />
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View className="absolute left-0 right-0 items-center bottom-5">
        <Pressable
          className="dark:bg- flex w-[90%] flex-row items-center justify-center gap-2 rounded-xl bg-gray-200 py-2 dark:bg-[#212529]"
          onPress={openBottomSheet}>
          <MaterialCommunityIcons
            name="comment-text"
            size={24}
            color={colorScheme === 'dark' ? 'white' : 'gray'}
          />
          <Text className="text-xl font-bold text-gray-400 dark:text-white">Comment</Text>
        </Pressable>
      </View>
      <Modal
        visible={isBottomSheetVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeBottomSheet}>
        <View className="justify-end flex-1">
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
            <Pressable onPress={closeBottomSheet} className="w-full h-full" />
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
            <View className="flex flex-row items-center justify-between mb-5">
              <Text className="text-3xl font-bold dark:text-white">Submit a comment</Text>
              <AntDesign name="closecircle" size={20} color="gray" onPress={closeBottomSheet} />
            </View>
            <View className="flex flex-col gap-2">
              <TextInput
                placeholder="Write your comment..."
                className="rounded-xl bg-white px-3 dark:bg-[#343A40] dark:text-white"
                placeholderTextColor={colorScheme === 'dark' ? '#6C757D' : 'black'}
                multiline={true}
                value={comment.comment}
                onChangeText={(text) => setComment({ ...comment, comment: text })}
              />
              {errors.comment ? <Text className="text-red-500">{errors.comment}</Text> : null}
              <TextInput
                placeholder="Name"
                className="rounded-xl bg-white px-3 dark:bg-[#343A40] dark:text-white"
                placeholderTextColor={colorScheme === 'dark' ? '#6C757D' : 'black'}
                value={comment.name}
                onChangeText={(text) => setComment({ ...comment, name: text })}
              />
              {errors.name ? <Text className="text-red-500">{errors.name}</Text> : null}
              <TextInput
                placeholder="Email address"
                className="rounded-xl bg-white px-3 dark:bg-[#343A40] dark:text-white"
                placeholderTextColor={colorScheme === 'dark' ? '#6C757D' : 'black'}
                value={comment.email}
                onChangeText={(text) => setComment({ ...comment, email: text })}
              />
              {errors.email ? <Text className="text-red-500">{errors.email}</Text> : null}
              <Text className="text-sm text-gray-500">
                Your email won&apos;t be published. By submitting, you agree to our
                <Text className="text-[#007AFF]"> Privacy Policy </Text>
                and comment guidelines
              </Text>
              <Pressable
                className="flex flex-row items-center justify-center w-full gap-1 py-3 mx-auto rounded-xl"
                style={{ backgroundColor: '#007AFF' }}
                onPress={submitComment}>
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
