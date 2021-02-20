import React,{useEffect} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OneSignal from 'react-native-onesignal';

import Login from "./src/pages/Login";
import Home from "./src/pages/Home";
import Inicio from "./src/pages/Inicio";
import Grafico from "./src/pages/DrawerPages/Grafico";
import { Button } from 'react-native-paper';

const Stack = createStackNavigator();

export default function App(){

  useEffect(() => {
    OneSignal.init("7641bc3d-c0ed-48de-b297-23cb861f6c0c");
    OneSignal.addEventListener('opened', onOpened);
  },[]);
  
  function onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('openResult: ', openResult);
  }

  return(
    <NavigationContainer>
      <Stack.Navigator
        
        screenOptions={{
          headerShown: false,
        }}
        >
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Inicio" component={Inicio}/>
        <Stack.Screen name="Grafico" component={Grafico}/>
    </Stack.Navigator>
    </NavigationContainer>
    
  );

}

