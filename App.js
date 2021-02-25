// disactivate warnings :
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
// Screens
import HomeScreen from './screens/HomeScreen';
import GalleryScreen from './screens/GalleryScreen';
import SnapScreen from './screens/SnapScreen';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// Redux
import person from './reducers/person.reducer';
import userName from './reducers/userName.reducer';
import { Provider } from 'react-redux';
import {createStore, combineReducers}  from 'redux';
const store = createStore(combineReducers({person, userName}));

function BottomNavigation() {
  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
            if (route.name === 'Snap') {
              iconName = 'ios-camera';
            } else if (route.name === 'Gallery') {
            iconName = 'ios-images' ;          
            } 
        return <Ionicons name={iconName} size={24} color={color} />;
      },     
    })} 
      tabBarOptions={{
        activeTintColor: '#009788',
        inactiveTintColor: '#FFFFFF',
        style:{backgroundColor:'#111224'}
      }} 
    >
      <Tab.Screen name="Gallery" component={GalleryScreen} /> 
      <Tab.Screen name="Snap" component={SnapScreen} />
    </Tab.Navigator>)
}

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer style={styles.container}>
     <Stack.Navigator screenOptions={{headerShown: false}}>
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="BottomNavigation" component={BottomNavigation}/>
     </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
