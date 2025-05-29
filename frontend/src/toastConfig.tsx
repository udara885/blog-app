import React from 'react';
import { useColorScheme } from 'nativewind';
import { BaseToast, BaseToastProps } from 'react-native-toast-message';

interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}

const ToastWrapper = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme } = useColorScheme();
  return (
    <>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, { colorScheme })
          : child
      )}
    </>
  );
};

const toastConfig = {
  error: ({ colorScheme, ...props }: CustomToastProps & { colorScheme?: string }) => {
    const isDark = colorScheme === 'dark';

    return (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: isDark ? '#F97066' : '#D92D20',
          backgroundColor: isDark ? '#3A1212' : '#FEF3F2',
          borderColor: isDark ? '#F97066' : '#D92D20',
          borderWidth: 1,
          width: '60%',
          height: 52,
          borderRadius: 100,
        }}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        text1Style={{
          textAlign: 'center',
          fontSize: 14,
          fontWeight: '600',
          color: isDark ? '#F97066' : '#D92D20',
        }}
        text2Style={{
          color: isDark ? '#E5E5E5' : '#4B4B4B',
        }}
      />
    );
  },

  success: ({ colorScheme, ...props }: BaseToastProps & { colorScheme?: string }) => {
    const isDark = colorScheme === 'dark';

    return (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: isDark ? '#6CE9A6' : '#067647',
          backgroundColor: isDark ? '#0C231B' : '#ECFDF3',
          borderColor: isDark ? '#6CE9A6' : '#ABEFC6',
          borderWidth: 1,
          width: '60%',
          height: 52,
          borderRadius: 100,
        }}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        text1Style={{
          fontSize: 14,
          fontWeight: '600',
          color: isDark ? '#6CE9A6' : '#067647',
          textAlign: 'center',
        }}
        text2Style={{
          color: isDark ? '#E5E5E5' : '#4B4B4B',
        }}
      />
    );
  },

  delete: ({ colorScheme, ...props }: CustomToastProps & { colorScheme?: string }) => {
    const isDark = colorScheme === 'dark';

    return (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: isDark ? '#F97066' : '#D92D20',
          backgroundColor: isDark ? '#3A1212' : '#FEF3F2',
          borderColor: isDark ? '#F97066' : '#D92D20',
          borderWidth: 1,
          width: '60%',
          height: 52,
          borderRadius: 100,
        }}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        text1Style={{
          textAlign: 'center',
          fontSize: 14,
          fontWeight: '600',
          color: isDark ? '#F97066' : '#D92D20',
        }}
        text2Style={{
          color: isDark ? '#E5E5E5' : '#4B4B4B',
        }}
      />
    );
  },
};

const themedToastConfig = Object.entries(toastConfig).reduce(
  (acc, [key, Component]) => {
    acc[key as keyof typeof toastConfig] = (props: any) => (
      <ToastWrapper>{Component(props)}</ToastWrapper>
    );
    return acc;
  },
  {} as typeof toastConfig
);

export default themedToastConfig;
