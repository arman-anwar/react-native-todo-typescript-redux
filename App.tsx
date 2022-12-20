import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import Home from './src/screens/Home';
import { store } from './src/features/store';
import ChosenTask from './src/screens/ChosenTask';

type RootStackParamList = {
  Home: undefined;
  ChosenTask: undefined;
  Scanner: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {

  const [toDoList, setToDoList] = useState([{ id: 1, task: 'brush your teeth' }]);
  const [task, setTask] = useState('');
  const [chosenTask, setChosenTask] = useState('');

  const GlobalState = {
    toDoList, setToDoList,
    task, setTask,
    chosenTask, setChosenTask
  }

  // navigation
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
          <Stack.Screen name="ChosenTask" options={{ headerShown: false }}>
            {props => <ChosenTask {...props} GlobalState={GlobalState} />}
          </Stack.Screen>


        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
