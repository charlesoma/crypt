import React from 'react';
import { View, Dimensions } from 'react-native';
import Home from './components/Home';
import { Provider } from "react-redux";
import { configureStore } from './store/index'

const store = configureStore();
const win = Dimensions.get('window');

export default function App() {
  return (
    <Provider store={store}>
      <View style={{backgroundColor: '#000', height: win.height}}>
        <Home />
      </View>
    </Provider>
  );
}
