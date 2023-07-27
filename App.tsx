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
import FriendScreen from './src/screens/FriendScreen';
import LikedCityScreen from './src/screens/LikedCityScreen';
import { FIREBASE_AUTH } from './FirebaseConfig';

import { UserProvider } from './context/UserContext';

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => (
  <HomeStack.Navigator initialRouteName="HomeScreen"  screenOptions={{ headerShown: true, headerStyle:{backgroundColor:"#BB2649", height:50}, headerTitle:''}}>
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    <HomeStack.Screen name="CityScreen" component={CityScreen}/>
    <HomeStack.Screen name="CountryScreen" component={CountryScreen}/>
    <HomeStack.Screen name="PlaceScreen" component={PlaceScreen} />
    <HomeStack.Screen name="FriendScreen" component={FriendScreen} />
  </HomeStack.Navigator>
);

const SearchStack = createStackNavigator();

const SearchStackNavigator = () => (
  <SearchStack.Navigator initialRouteName="SearchScreen"  screenOptions={{ headerShown: true, headerStyle:{backgroundColor:"#BB2649", height:50}, headerTitle:''}}>
    <SearchStack.Screen name="SearchScreen" component={SearchScreen} />
  </SearchStack.Navigator>
);

const ExploreStack = createStackNavigator(); 

const ExploreStackNavigator = () => (
  <ExploreStack.Navigator initialRouteName="ExploreScreen"  screenOptions={{ headerShown: true, headerStyle:{backgroundColor:"#BB2649", height:50}, headerTitle:''}}>
    <ExploreStack.Screen name="ExploreScreen" component={ExploreScreen} />
  </ExploreStack.Navigator>
);

const LikedStack = createStackNavigator();

const LikedStackNavigator = () => (
  <LikedStack.Navigator initialRouteName="LikedScreen" screenOptions={{ headerShown: true, headerStyle:{backgroundColor:"#BB2649", height:50}, headerTitle:''}}>
    <LikedStack.Screen name="LikedScreen" component={LikedScreen} />
    <LikedStack.Screen name="LikedCity" component={LikedCityScreen} options={{headerShown: false, animationTypeForReplace: 'push'}}/>
  </LikedStack.Navigator>
);

const UserStack = createStackNavigator();

const UserStackNavigator = () => (
  <UserStack.Navigator initialRouteName="UserScreen" screenOptions={{ headerShown: true, headerStyle:{backgroundColor:"#BB2649", height:50}, headerTitle:''}}>
    <UserStack.Screen name="UserScreen" component={UserScreen} />
  </UserStack.Navigator>
);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
                      'User': 'user',
                  };
                  let iconName = routeIcons[route.name];
                  return <Icon name={iconName} size={size} color={color} type="font-awesome" />;
              },
          })}
      >
          <Tab.Screen name="Home" component={HomeStackNavigator} options={{  headerShown:false,  headerStyle: { height: 50}}} />
          <Tab.Screen name="Liked" component={LikedStackNavigator} options={{  headerShown:false,  headerStyle: { height: 50}}}/>
          <Tab.Screen name="Search" component={SearchStackNavigator} options={{  headerShown:false,  headerStyle: { height: 50}}}/>
          <Tab.Screen name="Explore" component={ExploreStackNavigator} options={{  headerShown:false,  headerStyle: { height: 50}}}/>
          <Tab.Screen name="User" component={UserStackNavigator} options={{  headerShown:false,  headerStyle: { height: 50} }}/>
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
        <Stack.Navigator >
            {user ? (
              <>
                <Stack.Screen name="Tabs" component={BottomTabNavigator} options={{ headerShown: false }} />
              </>
          ) : (
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
