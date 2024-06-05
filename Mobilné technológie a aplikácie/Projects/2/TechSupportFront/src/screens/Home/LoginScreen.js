import React, { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { Input, Button, Image } from 'react-native-elements';
import { AuthContext } from '../../context/AuthContext';
import Layout from '../../layouts/Main';
import { LoginScreenStyles } from '../../styles/Home/LoginScreenStyles';


const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, login} = useContext(AuthContext);

  const navigateRegister = () => {
    navigation.navigate("Register");
  }

  return (
    <Layout>
      <View style={LoginScreenStyles.screenContainer}>
        <View style={LoginScreenStyles.loginWrapper}>
          <Image source={require('../../../assets/LogoLoginScreen.png')} style={LoginScreenStyles.imageStyle}/>
          <View style={LoginScreenStyles.lineStyle} />

          <Input
            label="E-mail"
            maxLength={120}
            keyboardType="email-address"
            returnKeyLabel='next'
            style={LoginScreenStyles.input}
            value={email}
            placeholder="example@mail.com"
            onChangeText={text => setEmail(text)}
            inputContainerStyle={{borderBottomWidth:0}}
          />

          <Input
            label="Password"
            style={LoginScreenStyles.input}
            value={password}
            maxLength={50}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            inputContainerStyle={{borderBottomWidth:0}}
          />

          <Button
            title={ "Log in" }
            onPress={ () => login(email, password, navigation) }
            buttonStyle={LoginScreenStyles.buttonStyle}
            loading={isLoading}
            loadingProps={{size: 40}}
            titleStyle={LoginScreenStyles.buttonTitleStyle}
          />

          <View style={LoginScreenStyles.linkWrapper}>
              <Text style={LoginScreenStyles.link} onPress={ navigateRegister }>Don't have an account?</Text>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default LoginScreen;