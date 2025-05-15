import '../../global.css';

import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: 'I TIPS',
          title: 'Main page',
          tabBarIcon: (tabInfo) => {
            return (
              <FontAwesome name="home" size={24} color={tabInfo.focused ? '#007AFF' : '#8e8e93'} />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: 'Search',
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
        name="Bookmarks"
        options={{
          title: 'Bookmarks',
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
  );
}
