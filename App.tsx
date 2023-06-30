import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import { User, onAuthStateChanged } from 'firebase/auth';

import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import LikedScreen from './src/screens/LikedScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import UserScreen from './src/screens/UserScreen';
import CityScreen from './src/screens/CityScreen';
import CountryScreen from './src/screens/CountryScreen';
import PlaceScreen from './src/screens/PlaceScreen';
import Login from './src/screens/Login';
import LikedCityScreen from './src/screens/LikedCityScreen';
import { FIREBASE_AUTH } from './FirebaseConfig';

import { UserProvider } from './context/UserContext';



const HomeStack = createStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="CityScreen" component={CityScreen} options={({ route }) => ({ title: route.params.city })}/>
    <HomeStack.Screen name="CountryScreen" component={CountryScreen} options={({ route }) => ({ title: route.params.country })} />
    <HomeStack.Screen name="PlaceScreen" component={PlaceScreen} />
    <HomeStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
  </HomeStack.Navigator>
);

const LikedStack = createStackNavigator();

const LikedStackNavigator = () => (
  <LikedStack.Navigator initialRouteName="LikedScreen" screenOptions={{ headerShown: false }}>
    <LikedStack.Screen name="LikedScreen" component={LikedScreen} />
    <LikedStack.Screen name="LikedCity" component={LikedCityScreen} options={{headerShown: false, animationTypeForReplace: 'push'}}/>
  </LikedStack.Navigator>
);

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
      <Tab.Navigator
          screenOptions={({ route }) => ({
              tabBarActiveTintColor: '#BB2649',
              tabBarInactiveTintColor: '#000000',
              tabBarStyle: [{ display: 'flex' }],
              tabBarIcon: ({ color, size }) => {
                  const routeIcons = {
                      'Home': 'home',
                      'Liked': 'heart',
                      'Search': 'search',
                      'Explore': 'compass',
                      'User': 'user'
                  };
                  let iconName = routeIcons[route.name];
                  return <Icon name={iconName} size={size} color={color} type="font-awesome" />;
              },
          })}
      >
          <Tab.Screen name="Home" component={HomeStackNavigator} />
          <Tab.Screen name="Liked" component={LikedStackNavigator} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Explore" component={ExploreScreen} />
          <Tab.Screen name="User" component={UserScreen} />
      </Tab.Navigator>
  );
};

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user: User | null) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return null;
  }

  return (
    <UserProvider>
      <NavigationContainer>
        {user ? <BottomTabNavigator /> : <Login />}
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
