import '../../../global.css';

import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Animated, Modal, Pressable, Text, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useColorScheme } from 'nativewind';

const arr1 = ['Theme', 'Notification', 'Clear cache', 'Change font size'];

const arr2 = [
  { title: 'Report application errors', icon: 'bug' as const },
  { title: 'Share the application', icon: 'share-alt' as const },
];

const themes = ['light', 'dark'];

const TabsLayout = () => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const [isThemeMenuVisible, setIsThemeMenuVisible] = useState(false);

  const slideAnim = useRef(new Animated.Value(0)).current;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const { colorScheme, toggleColorScheme } = useColorScheme();

  const openBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  const toggleThemeMenu = () => {
    setIsThemeMenuVisible(!isThemeMenuVisible);
  };

  const selectTheme = (theme: string) => {
    setIsThemeMenuVisible(false);
    if (theme === 'light' && colorScheme === 'dark') {
      toggleColorScheme();
    } else if (theme === 'dark' && colorScheme === 'light') {
      toggleColorScheme();
    }
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
      setIsThemeMenuVisible(false);
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
  }, [isBottomSheetVisible, fadeAnim, slideAnim]);

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colorScheme === 'dark' ? '#212529' : 'white',
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            headerStyle: { backgroundColor: colorScheme === 'dark' ? 'black' : 'white' },
            headerTintColor: colorScheme === 'dark' ? 'white' : 'black',
            headerTitle: 'I TIPS',
            title: 'Main page',
            headerRight: () => (
              <Pressable className="mr-4" onPress={openBottomSheet}>
                <Feather
                  name="settings"
                  size={24}
                  color={colorScheme === 'dark' ? 'white' : 'black'}
                />
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
              right: 0,
              left: 0,
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
              <Text className="text-3xl font-bold dark:text-white">Settings</Text>
              <AntDesign name="closecircle" size={20} color="gray" onPress={closeBottomSheet} />
            </View>
            <View className="rounded-xl bg-white dark:bg-[#343A40]">
              {arr1.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    if (index === 0) toggleThemeMenu();
                  }}
                  className={`${index !== arr1.length - 1 && 'border-b-2 border-gray-100 dark:border-gray-500'} mx-3 flex flex-row items-center justify-between py-3`}>
                  <Text className="text-lg font-bold dark:text-white">{item}</Text>
                  <View className="flex flex-row items-center gap-1">
                    {index === 0 && (
                      <Text className="text-lg capitalize text-gray-500">{colorScheme}</Text>
                    )}
                    {index !== 2 && <AntDesign name="right" size={20} color="lightgray" />}
                  </View>
                </Pressable>
              ))}
            </View>
            {isThemeMenuVisible && (
              <View className="absolute right-8 top-32 z-10 rounded-lg bg-gray-100 p-2 dark:bg-[#212529]">
                {themes.map((theme, index) => (
                  <Pressable
                    key={index}
                    onPress={() => selectTheme(theme)}
                    className={`rounded-lg px-4 py-2 ${colorScheme === theme ? 'bg-white dark:bg-gray-700' : ''}`}>
                    <View className="flex-row items-center justify-between gap-1">
                      <Text className="capitalize dark:text-white">{theme}</Text>
                      {colorScheme === theme && (
                        <AntDesign
                          name="check"
                          size={18}
                          color={colorScheme === 'dark' ? 'white' : 'black'}
                        />
                      )}
                    </View>
                  </Pressable>
                ))}
              </View>
            )}
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
                      color={colorScheme === 'dark' ? 'white' : 'black'}
                    />
                  </View>
                </View>
              ))}
            </View>
            <View className="mt-2 flex flex-col items-center">
              <Text className="text-gray-500">© 2025 - iThuThuat.vn</Text>
              <Text className="text-gray-500">Version 1.0</Text>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

export default TabsLayout;
