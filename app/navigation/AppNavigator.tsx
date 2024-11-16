import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoginScreen from '../screens/loginScreen';
import HomeScreen from '../screens/homeScreen';
import BookmarkScreen from '../screens/bookmarkScreen';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();

  const handleLogout = (navigation: any) => {
    dispatch(logout());
    navigation.replace('Login'); // Arahkan kembali ke halaman Login
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTitle: 'Home', // Tambahkan teks "Home" 
            headerLeft: () => null,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => handleLogout(navigation)}
                style={{ marginRight: 15 }}
              >
                <Icon name="logout" size={24} color="#d9534f" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Bookmark"
          component={BookmarkScreen}
          options={{
            headerTitle: 'Bookmarks',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
