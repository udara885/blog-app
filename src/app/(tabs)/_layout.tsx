import '../../../global.css';

import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Modal, Pressable, Text, useColorScheme, View } from 'react-native';
import { useState } from 'react';

const arr1 = ['Dark mode', 'Notification', 'Clear cache', 'Change font size'];

const arr2 = [
  { title: 'Report application errors', icon: 'bug' as const },
  { title: 'Share the application', icon: 'share-alt' as const },
];

const TabsLayout = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const openBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  const theme = useColorScheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme === 'dark' ? '#212529' : 'white',
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            headerStyle: { backgroundColor: theme === 'dark' ? 'black' : 'white' },
            headerTintColor: theme === 'dark' ? 'white' : 'black',
            headerTitle: 'I TIPS',
            title: 'Main page',
            headerRight: () => (
              <Pressable className="mr-4" onPress={openBottomSheet}>
                <Feather name="settings" size={24} color={theme === 'dark' ? 'white' : 'black'} />
              </Pressable>
            ),
            tabBarIcon: (tabInfo) => {
              return (
                <FontAwesome
                  name="home"
                  size={24}
                  color={tabInfo.focused ? '#007AFF' : '#8e8e93'}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="search/index"
          options={{
            title: 'Search',
            headerShown: false,
            tabBarIcon: (tabInfo) => {
              return (
                <FontAwesome
                  name="search"
                  size={24}
                  color={tabInfo.focused ? '#007AFF' : '#8e8e93'}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="bookmarks/index"
          options={{
            title: 'Bookmarks',
            headerShown: false,
            tabBarIcon: (tabInfo) => {
              return (
                <FontAwesome
                  name="bookmark"
                  size={24}
                  color={tabInfo.focused ? '#007AFF' : '#8e8e93'}
                />
              );
            },
          }}
        />
      </Tabs>
      <Modal visible={isBottomSheetVisible} transparent={true} onRequestClose={closeBottomSheet}>
        <View className="flex-1 justify-end">
          <Pressable onPress={closeBottomSheet} className="absolute inset-0 bg-black/50" />
          <View className="rounded-t-2xl bg-gray-100 p-5 dark:bg-[#212529]">
            <View className="mb-5 flex flex-row items-center justify-between">
              <Text className="text-3xl font-bold dark:text-white">Settings</Text>
              <AntDesign name="closecircle" size={20} color="gray" onPress={closeBottomSheet} />
            </View>
            <View className="rounded-xl bg-white dark:bg-[#343A40]">
              {arr1.map((item, index) => (
                <View
                  key={index}
                  className={`${index !== arr1.length - 1 && 'border-b-2 border-gray-100 dark:border-gray-500'} mx-3 flex flex-row items-center justify-between py-3`}>
                  <Text className="text-lg font-bold dark:text-white">{item}</Text>
                  <View className="flex flex-row items-center gap-1">
                    {index === 0 && <Text className="text-lg text-gray-500">System</Text>}
                    {index !== 2 && <AntDesign name="right" size={20} color="lightgray" />}
                  </View>
                </View>
              ))}
            </View>
            <Text className="mt-2 pl-3 text-sm text-gray-500">
              Changing the font size will apply to the entire application.
            </Text>
            <View className="mt-2 rounded-xl bg-white dark:bg-[#343A40]">
              {arr2.map((item, index) => (
                <View
                  key={index}
                  className={`mx-3 flex flex-row items-center justify-between ${index !== arr2.length - 1 && 'border-b-2 border-gray-100 dark:border-gray-500'} py-3`}>
                  <Text className="text-lg font-bold dark:text-white">{item.title}</Text>
                  <View className="flex flex-row items-center gap-1">
                    <FontAwesome
                      name={item.icon}
                      size={24}
                      color={theme === 'dark' ? 'white' : 'black'}
                    />
                  </View>
                </View>
              ))}
            </View>
            <View className="mt-2 flex flex-col items-center">
              <Text className="text-gray-500">© 2025 - iThuThuat.vn</Text>
              <Text className="text-gray-500">Version 1.0</Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default TabsLayout;
