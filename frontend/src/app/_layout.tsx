import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StatusBar, View } from 'react-native';
import { useColorScheme } from 'nativewind';

const RootLayout = () => {
  const { colorScheme } = useColorScheme();

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
              <Pressable className="mr-4">
                <FontAwesome name="bookmark-o" size={24} color="white" />
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

export default RootLayout;
