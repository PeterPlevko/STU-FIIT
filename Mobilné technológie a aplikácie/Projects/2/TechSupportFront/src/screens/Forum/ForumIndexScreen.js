import Layout from "../../layouts/Main";
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BASE_URL } from '../../config';
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { Icon, Button, Input } from 'react-native-elements';
import React, { useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { ForumIndexStyles } from "../../styles/Forum/ForumIndexStyles";


const ForumIndexScreen = ({route, navigation}) => {

    const [forum, setForum] = useState([]);
    const [forumL, setForumL] = useState(true);
    const [title, setTitle] = useState(null);
    const {userInfo} = useContext(AuthContext);

    const throwError = (error, otherErr, otherErrText) => {
      let errorText;

      if (otherErr) {
          errorText = otherErrText;
      }
      else {
          errorText = "Ooops! We have encountered following errors: \n\n";

          if (error && error.response && error.response.data && error.response.data.errors) {
              for (const [key, value] of Object.entries(error.response.data.errors))
              errorText = errorText + value[0] + '\n';
          }
          else errorText = "Ooops! We have encountered an error, please try again.";
      }

      Alert.alert("Error", errorText);
  }

    const load = () => {
      setForumL(true);

      axios.get(`${BASE_URL}/questions`, {
      }).then(res => {
          setForum(res.data);
      }).catch(e => {
          throwError(e, false, "");
      }).finally(() => {
          setForumL(false);
      });
    }

    const back = () => {
      navigation.navigate("Home");
    }

    const plus = () => {
      if (!userInfo.token) navigation.navigate("Login");
      else navigation.navigate("ForumAdd");
    }

    const filter = () => {
      setForumL(true);

      axios.post(`${BASE_URL}/questions/search`, {
          title
      }).then(res => {
        setForum(res.data);
      }).catch(e => {
        throwError(e, false, "");
      }).finally(() => {
        setForumL(false);
      });
  }

    useFocusEffect(
      React.useCallback(() => {
          load()
      }, [route, navigation])
    );
    
    return (
        <Layout>
            <View style={ForumIndexStyles.titleWrapper}>
                <View style={ForumIndexStyles.titleLine} />
                    <Text style={ForumIndexStyles.titleStyle}>Forum</Text>
                <View style={ForumIndexStyles.titleLine} />
            </View>

            <View style={ForumIndexStyles.controlsWrapper}>
                <Button 
                  onPress={ back } 
                  icon={<Icon name="arrow-left" type="font-awesome-5" size={30} color="#00557A" />} 
                  type="clear" 
                  buttonStyle={{justifyContent: 'flex-start'}}
                />

                <View style={ForumIndexStyles.searchWrapper}>
                    <Input 
                        maxLength={120}
                        keyboardType="ascii-capable"
                        returnKeyLabel='done'
                        style={ForumIndexStyles.inputStyle}
                        value={title}
                        placeholder="Search by name..."
                        onChangeText={text => setTitle(text)}
                        inputContainerStyle={{borderBottomWidth:0}}
                    />
                    <Button 
                        onPress={ filter } 
                        icon={<Icon name="filter" type="font-awesome-5" size={20} color="#00557A"/>} 
                        type="clear" 
                        buttonStyle={ForumIndexStyles.buttonStyle}
                    />
                </View>

                <Button 
                  onPress={ plus } 
                  icon={<Icon name="plus" type="font-awesome-5" size={30} color="#00557A" />} 
                  type="clear" 
                  buttonStyle={{justifyContent: 'flex-end'}}
                />
            </View>

            <View style={{marginBottom: 50}}>
            { forumL && 
                <View style={ForumIndexStyles.loadingStyle}>
                    <ActivityIndicator color={"#00557A"} size="large" />
                </View>
            }

            { !forumL &&
                forum.map((val, index) => {
                  return (
                  <View key={index} style={ForumIndexStyles.entryWrapper}>
                    <TouchableOpacity onPress={() => navigation.navigate("ForumShow", {id: val.id})}>
                      <Text style={ForumIndexStyles.entryTitle} ellipsizeMode='tail' numberOfLines={1}>{val.title}{'\t\t'}
                      { val.comment_id != null &&
                            <Icon name="check-circle" type="font-awesome-5" size={20} color="#00557A"/>
                      }
                      </Text>{
                        val.user && val.user.name &&
                        <Text style={ForumIndexStyles.entryDetails}>{val.user.name} asked @{new Date(val.created_at).toLocaleDateString()}</Text>
                      }
                    </TouchableOpacity>
                  </View>
                  );
                }
              )
            } 
            </View>
        </Layout>
    )
};

export default ForumIndexScreen;