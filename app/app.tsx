import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from '../store/store';
import AppNavigator from './navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { restoreToken } from '../store/authSlice';

const App = () => {
  useEffect(() => {
    // Memulihkan token dari AsyncStorage saat aplikasi dimuat
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        store.dispatch(restoreToken(token));
      }
    };
    loadToken();
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
