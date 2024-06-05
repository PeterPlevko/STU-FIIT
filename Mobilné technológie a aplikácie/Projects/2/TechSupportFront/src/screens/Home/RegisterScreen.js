import { useState, useContext } from "react";
import { View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import { AuthContext } from "../../context/AuthContext";
import Layout from "../../layouts/Main";
import { RegisterScreenStyles } from "../../styles/Home/RegisterScreenStyles";


const RegisterScreen = ({navigation}) => {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [password_confirmation, setPasswordConfirmation] = useState(null);
  const {isLoading, register} = useContext(AuthContext);

  const navigateLogin = () => {
    navigation.navigate("Login");
  }

  return (
    <Layout>
      <View style={RegisterScreenStyles.screenContainer}>
        <View style={RegisterScreenStyles.titleWrapper}>
          <View style={RegisterScreenStyles.titleLine} />
            <Text style={RegisterScreenStyles.titleStyle}>Register</Text>
          <View style={RegisterScreenStyles.titleLine} />
        </View>

        <View style={RegisterScreenStyles.wrapper}>
          <Input
            label="Name"
            maxLength={120}
            keyboardType="ascii-capable"
            returnKeyLabel='next'
            style={RegisterScreenStyles.input}
            value={name}
            placeholder="Joe Example"
            onChangeText={text => setName(text)}
            inputContainerStyle={{borderBottomWidth:0}}
          />

          <Input
            label="E-mail"
            maxLength={120}
            keyboardType="email-address"
            returnKeyLabel='next'
            style={RegisterScreenStyles.input}
            value={email}
            placeholder="example@mail.com"
            onChangeText={text => setEmail(text)}
            inputContainerStyle={{borderBottomWidth:0}}
          />

          <Input
            label="Password"
            style={RegisterScreenStyles.input}
            value={password}
            maxLength={50}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            inputContainerStyle={{borderBottomWidth:0}}
          />

          <Input
            label="Password Confirmation"
            style={RegisterScreenStyles.input}
            value={password_confirmation}
            maxLength={50}
            placeholder="Password"
            onChangeText={text => setPasswordConfirmation(text)}
            secureTextEntry={true}
            inputContainerStyle={{borderBottomWidth:0}}
          />

          <Button
            title={ "Register" }
            onPress={ () => register(name, email, password, password_confirmation, navigation) }
            buttonStyle={RegisterScreenStyles.buttonStyle}
            loading={isLoading}
            loadingProps={{size: 40}}
            titleStyle={RegisterScreenStyles.buttonTitleStyle}
          />
        </View>
        
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={RegisterScreenStyles.link} onPress={ navigateLogin }>Already have an account?</Text>
        </View>
      </View>
    </Layout>
  )
};

export default RegisterScreen;