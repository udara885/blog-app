import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StatusBar, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { ArticleProvider, useArticle } from '../context/ArticleContext';
import { useStore } from '../store/store';
import Toast from 'react-native-toast-message';

const StackNavigator = () => {
  const { colorScheme } = useColorScheme();

  const { currentArticle, setCurrentArticle } = useArticle();

  const { updateArticle } = useStore();

  const toggleBookmark = async () => {
    if (!currentArticle) return;
    const updatedArticle = { ...currentArticle, isBookmarked: !currentArticle.isBookmarked };
    try {
      const { success, message } = await updateArticle(
        currentArticle._id as string,
        updatedArticle
      );
      if (!success) {
        Toast.show({
          type: 'error',
          text1: message,
        });
      } else {
        Toast.show({
          type: 'success',
          text1: currentArticle.isBookmarked ? 'Bookmark removed' : 'Bookmark added',
        });
      }
      setCurrentArticle(updatedArticle);
    } catch (error) {
      console.error('Failed to toggle bookmark: ', error);
    }
  };

  useEffect(() => {
    if (colorScheme === 'dark') {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('black');
    } else {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('white');
    }
  }, [colorScheme]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="ArticleScreen"
        options={{
          headerTitle: '',
          headerShadowVisible: false,
          headerTransparent: true,
          headerTintColor: 'white',
          headerRight: () => (
            <View className="flex flex-row items-center">
              <Pressable className="mr-4" onPress={toggleBookmark}>
                <FontAwesome
                  name={currentArticle?.isBookmarked ? 'bookmark' : 'bookmark-o'}
                  size={24}
                  color="white"
                />
              </Pressable>
              <Pressable className="mr-4">
                <Feather name="share" size={24} color="white" />
              </Pressable>
            </View>
          ),
        }}
      />
    </Stack>
  );
};

const RootLayout = () => {
  return (
    <ArticleProvider>
      <StackNavigator />
      <Toast />
    </ArticleProvider>
  );
};

export default RootLayout;
