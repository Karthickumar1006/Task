import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Source/screen/Login';
import Dashboard from './Source/screen/Dashboard';
import DetailedNewsFeed from './Source/screen/DetailedNewsFeed';
import BookMarked from './Source/screen/BookMarked';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="DetailedNewsFeed" component={DetailedNewsFeed} />
        <Stack.Screen name="BookMarked" component={BookMarked} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
