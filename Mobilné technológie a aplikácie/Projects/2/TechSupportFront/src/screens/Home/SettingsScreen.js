import Layout from "../../layouts/Main";
import { View, Text } from "react-native";
import { Button, Icon, Input } from 'react-native-elements';
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SettingScreenStyles } from "../../styles/Home/SettingsScreenStyles";


const SettingsScreen = ({navigation}) => {

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [password_confirmation, setPasswordConfirmation] = useState(null);
  const [showName, setShowName] = useState(false);
  const [showMail, setShowMail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {isLoading, settings} = useContext(AuthContext);

  const back = () => {
    navigation.navigate("Forum");
  }
  
  const enableName = () => {
    if (showName) setShowName(false);
    else setShowName(true);
  }

  const enableMail = () => {
    if (showMail) setShowMail(false);
    else setShowMail(true);
  }

  const enablePassword = () => {
    if (showPassword) setShowPassword(false);
    else setShowPassword(true);
  }

  return (
    <Layout>
      <View style={SettingScreenStyles.titleWrapper}>
          <View style={SettingScreenStyles.titleLine} />
              <Text style={SettingScreenStyles.titleStyle}>Settings</Text>
          <View style={SettingScreenStyles.titleLine} />
      </View>

      <View style={{flexDirection: 'row'}}>
          <View style={SettingScreenStyles.buttonWrapper}>
            <Button icon={<Icon name="arrow-left" type="font-awesome-5" size={32} color="#00557A" />} onPress={ back } type='clear'/>
          </View>
      </View>

      <View style={SettingScreenStyles.screenContainer}>
        <View style={SettingScreenStyles.settingsWrapper}>

          { showName && 
          <>
            <View style={SettingScreenStyles.inputWrapperEnabled}>
              <Text style={SettingScreenStyles.settingsEntryStyle}>Change username</Text>
              <Button icon={<Icon name="minus" type="font-awesome-5" size={25} color="#00557A" />} onPress={ enableName } type='clear' style={{flex: 1}}></Button>
            </View>
            <Input
              maxLength={120}
              keyboardType="ascii-capable"
              returnKeyLabel='next'
              style={SettingScreenStyles.input}
              value={name}
              placeholder="New username"
              onChangeText={text => setName(text)}
              inputContainerStyle={{borderBottomWidth:0}}
              placeholderTextColor="#ccc"
            />
          </>
          }

          { !showName && 
          <View style={SettingScreenStyles.inputWrapperDisabled}>
            <Text style={SettingScreenStyles.settingsEntryStyle}>Change username</Text>
            <Button icon={<Icon name="plus" type="font-awesome-5" size={25} color="#00557A" />} onPress={ enableName } type='clear' style={{flex: 1}}></Button>
          </View>
          }

          <View style={SettingScreenStyles.separatorLine}/>

          { showMail && 
          <>
            <View style={SettingScreenStyles.inputWrapperEnabled}>
              <Text style={SettingScreenStyles.settingsEntryStyle}>Change e-mail</Text>
              <Button icon={<Icon name="minus" type="font-awesome-5" size={25} color="#00557A" />} onPress={ enableMail } type='clear' style={{flex: 1}}></Button>
            </View>
            <Input
              maxLength={120}
              keyboardType="email-address"
              returnKeyLabel='next'
              style={SettingScreenStyles.input}
              value={email}
              placeholder="New e-mail"
              onChangeText={text => setEmail(text)}
              inputContainerStyle={{borderBottomWidth:0}}
              placeholderTextColor="#ccc"
            />
          </>
          }

          { !showMail &&   
          <View style={SettingScreenStyles.inputWrapperDisabled}>
            <Text style={SettingScreenStyles.settingsEntryStyle}>Change e-mail</Text>
            <Button icon={<Icon name="plus" type="font-awesome-5" size={25} color="#00557A" />} onPress={ enableMail } type='clear' style={{flex: 1}}></Button>
          </View>
          } 

          <View style={SettingScreenStyles.separatorLine}/>

          { showPassword && 
          <>
            <View style={SettingScreenStyles.inputWrapperEnabled}>
              <Text style={SettingScreenStyles.settingsEntryStyle}>Change password</Text>
              <Button icon={<Icon name="minus" type="font-awesome-5" size={25} color="#00557A" />} onPress={ enablePassword } type='clear' style={{flex: 1}}></Button>
            </View>

            <Input
              style={SettingScreenStyles.input}
              value={password}
              maxLength={50}
              placeholder="New Password"
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              inputContainerStyle={{borderBottomWidth:0}}
              placeholderTextColor="#ccc"
            />

            <Input
              style={SettingScreenStyles.input}
              value={password_confirmation}
              maxLength={50}
              placeholder="Password Confirmation"
              onChangeText={text => setPasswordConfirmation(text)}
              secureTextEntry={true}
              inputContainerStyle={{borderBottomWidth:0}}
              placeholderTextColor="#ccc"
            />
          </>
          }

          { !showPassword && 
          <View style={SettingScreenStyles.inputWrapperDisabled}>
            <Text style={SettingScreenStyles.settingsEntryStyle}>Change password</Text>
            <Button icon={<Icon name="plus" type="font-awesome-5" size={25} color="#00557A" />} onPress={ enablePassword } type='clear' style={{flex: 1}}></Button>
          </View>
          }

          <Button
          title={ "Save" }
          onPress={ () => settings(name, email, password, password_confirmation, navigation) }
          buttonStyle={SettingScreenStyles.buttonStyle}
          loading={isLoading}
          loadingProps={{size: 40}}
          titleStyle={SettingScreenStyles.buttonTitleStyle}
          />
        </View>
      </View>
    </Layout>
  )
};

export default SettingsScreen;