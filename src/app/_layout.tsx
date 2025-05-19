import Feather from '@expo/vector-icons/Feather';
import { Stack } from 'expo-router';
import { Pressable, View } from 'react-native';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="ArticleScreen"
        options={{
          headerTitle: '',
          headerShadowVisible: false,
          headerRight: () => (
            <View className="flex flex-row items-center">
              <Pressable className="mr-4">
                <Feather name="bookmark" size={24} color="black" />
              </Pressable>
              <Pressable className="mr-4">
                <Feather name="share" size={24} color="black" />
              </Pressable>
            </View>
          ),
        }}
      />
    </Stack>
  );
};

export default RootLayout;
