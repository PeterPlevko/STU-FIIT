import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Text, View, ActivityIndicator, Alert } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BASE_URL } from '../../config';
import Layout from '../../layouts/Main';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from "../../context/AuthContext";
import { HomeScreenStyles } from "../../styles/Home/HomeScreenStyles";


const HomeScreen = ({navigation, route}) => {

  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const navigateForum = () => {
    navigation.navigate("Forum");
  }

  const navigateChat = () => {
    if (!userInfo.token) navigation.navigate("Login");
    else navigation.navigate("Chat");
  }

  const navigateAboutUs = () => {
    navigation.navigate("AboutUs");
  }

  const navigateBestPractices = () => {
    navigation.navigate("Article");
  }

  useFocusEffect(
    React.useCallback(() => {
      axios.get(`${BASE_URL}/questions/latest`,{
      }).then(res => {
        setAnswers(res.data);
      }).catch(e => {
        throwError(e, false, "");
      }).finally(() => {
        setLoading(false);
      });
    }, [route, navigation])
  );

  return (
    <Layout>    
      <Image source={require('../../../assets/homeScreenGraphic.jpg')} style={HomeScreenStyles.imageStyle}/>

      <View style={HomeScreenStyles.titleWrapper}>
        <View style={HomeScreenStyles.titleLine} />
        <View>
          <Text style={HomeScreenStyles.titleStyle}>Recent answers</Text>
        </View>
        <View style={HomeScreenStyles.titleLine} />
      </View>

      { loading && 
          <View style={HomeScreenStyles.loadingStyle}>
              <ActivityIndicator color={"#00557A"} size="large" />
          </View>
      }

      { !loading &&  
        <View style={HomeScreenStyles.answersWrapper}>
          { answers.map((val, index) => {
              return (
                <View key={index} style={HomeScreenStyles.answers}>
                  <TouchableOpacity onPress={() => navigation.navigate("ForumShow", {id: val.id})}>
                    <Text style={HomeScreenStyles.answersTitle}>{val.title}</Text>
                    { val.user && val.user.name &&
                      <Text style={HomeScreenStyles.answersDetails}><Icon name="clock" color="white" type="font-awesome-5" size={13}/> {val.user.name} asked @{new Date(val.created_at).toLocaleDateString()}</Text>
                    }
                  </TouchableOpacity>
                </View>
              );
            })
          }
        </View>
      }

      <TouchableOpacity onPress={ navigateForum }>
        <Text style={HomeScreenStyles.more}>View more</Text>
      </TouchableOpacity>

      <Text style={HomeScreenStyles.categoriesTitle}>Categories</Text>

      <View style={HomeScreenStyles.categoriesWrapper}>
        <View style={HomeScreenStyles.bestPractices}>
          <TouchableOpacity onPress={ navigateBestPractices }>
            <Text style={HomeScreenStyles.category}>Best practices</Text>
          </TouchableOpacity>
        </View>

        <View style={HomeScreenStyles.chat}>
          <TouchableOpacity onPress={ navigateChat }>
            <Text style={HomeScreenStyles.category} >Chat</Text>
          </TouchableOpacity>
        </View>

        <View style={HomeScreenStyles.aboutUs}>
          <TouchableOpacity onPress={ navigateAboutUs }>
            <Text style={HomeScreenStyles.category}>About Us</Text>
          </TouchableOpacity>
        </View>

        <View style={HomeScreenStyles.forum}>
          <TouchableOpacity onPress={ navigateForum }>
            <Text style={HomeScreenStyles.category}>Forum</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
}

export default HomeScreen;