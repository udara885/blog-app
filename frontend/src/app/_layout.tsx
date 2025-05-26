import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, usePathname } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, StatusBar, useColorScheme, View } from 'react-native';

const RootLayout = () => {
  const pathname = usePathname();

  const theme = useColorScheme();

  useEffect(() => {
    if (pathname === '/ArticleScreen') {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('black');
    } else if (theme === 'dark') {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('#FFFFFF');
    } else {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#FFFFFF');
    }
  }, [pathname, theme]);

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
