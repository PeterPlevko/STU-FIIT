import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/Home/LoginScreen';
import RegisterScreen from '../screens/Home/RegisterScreen';
import AboutUsScreen from '../screens/Home/AboutUsScreen';
import ForumShowScreen from '../screens/Forum/ForumShowScreen';
import ForumEditScreen from '../screens/Forum/ForumEditScreen';
import ForumIndexScreen from '../screens/Forum/ForumIndexScreen';
import ArticleIndexScreen from '../screens/Articles/ArticleIndexScreen';
import ArticleShowScreen from '../screens/Articles/ArticleShowScreen';
import ArticleEditScreen from '../screens/Articles/ArticleEditScreen';
import ChatIndexScreen from '../screens/Chat/ChatIndexScreen';
import ChatShowScreen from '../screens/Chat/ChatShowScreen';
import CallScreen from '../screens/Chat/CallScreen';
import JoinScreen from '../screens/Chat/JoinScreen';
import ArticleAddScreen from '../screens/Articles/ArticleAddScreen';
import ForumAddScreen from '../screens/Forum/ForumAddScreen';
import ArticleIndexAllScreen from '../screens/Articles/ArticleIndexAllScreen';
import SettingsScreen from '../screens/Home/SettingsScreen';

const Navigator = () => {
  const Navigator = createStackNavigator();

  return (
    <Navigator.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, headerMode: 'none', statusbar: 'none' }}>
      <Navigator.Screen name="Home" component={HomeScreen} />
      <Navigator.Screen name="AboutUs" component={AboutUsScreen} />

      <Navigator.Screen name="Login" component={LoginScreen} />
      <Navigator.Screen name="Register" component={RegisterScreen} />
      <Navigator.Screen name="Settings" component={SettingsScreen} />

      <Navigator.Screen name="Chat" component={ChatIndexScreen} />
      <Navigator.Screen name="ChatShow" component={ChatShowScreen} />
      <Navigator.Screen name="Call" component={CallScreen} />
      <Navigator.Screen name="Join" component={JoinScreen} />

      <Navigator.Screen name="Forum" component={ForumIndexScreen} />
      <Navigator.Screen name="ForumShow" component={ForumShowScreen} />
      <Navigator.Screen name="ForumEdit" component={ForumEditScreen} />
      <Navigator.Screen name="ForumAdd" component={ForumAddScreen} />

      <Navigator.Screen name="Article" component={ArticleIndexScreen} />
      <Navigator.Screen name="ArticleAll" component={ArticleIndexAllScreen} />
      <Navigator.Screen name="ArticleShow" component={ArticleShowScreen} />
      <Navigator.Screen name="ArticleEdit" component={ArticleEditScreen} />
      <Navigator.Screen name="ArticleAdd" component={ArticleAddScreen} />
    </Navigator.Navigator>
  );
};

export default Navigator;