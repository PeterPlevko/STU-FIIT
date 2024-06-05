import Layout from "../../layouts/Main";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BASE_URL } from '../../config';
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { Icon } from 'react-native-elements';
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatIndexStyles } from "../../styles/Chat/ChatIndexStyles";


const ChatIndexScreen = ({route, navigation}) => {

    const [chatroom, setChatroom] = useState([]);
    const [chatroomL, setChatroomL] = useState(true);
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

    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'multipart/form-data',
            // if backend supports u can use gzip request encoding
            // "Content-Encoding": "gzip",
        },
    };

    const load = () => {
        setChatroomL(true);

        axios.get(`${BASE_URL}/chats`, config 
        ).then(res => {
            setChatroom(res.data);
        }).catch(e => {
            throwError(e, false, "");
        }).finally(() => {
            setChatroomL(false);
        });
    }

    const back = () => {
        navigation.goBack();
    }

    useFocusEffect(
        React.useCallback(() => {
            load()
        }, [route, navigation])
    );

    return (
        <Layout>
            <View style={ChatIndexStyles.titleWrapper}>
                <View style={ChatIndexStyles.titleLine} />
                    <Text style={ChatIndexStyles.titleStyle}>Chatroom</Text>
                <View style={ChatIndexStyles.titleLine} />
            </View>

            <View style={ChatIndexStyles.controlsWrapper}>
                <View style={{margin: 10, flex: 1}}>
                    <TouchableOpacity onPress={ back }>
                        <Text><Icon name="arrow-left" type="font-awesome-5" size={32} color="#00557A" /></Text>
                    </TouchableOpacity>
                </View>
            </View>

            { chatroomL && 
                <View style={ChatIndexStyles.loadingStyle}>
                    <ActivityIndicator color={"#00557A"} size="large" />
                </View>
            }

            { !chatroomL &&
                chatroom.map((val, index) => {
                return (
                    <View key={index} style={{marginBottom: 50}}>
                        <TouchableOpacity onPress={() => navigation.navigate("ChatShow", {id: val.id})}>
                            <View style={ChatIndexStyles.entryWrapper}>
                                <View style={ChatIndexStyles.messageWrapper}>
                                    <Text style={ChatIndexStyles.messageSender}>{val.name}</Text>
                                    { val.unreads > 0 && 
                                        <Text style={ChatIndexStyles.unreadMessages}>{val.unreads}</Text>
                                    }
                                </View>

                                <View>
                                    <Text style={ChatIndexStyles.messageTextStyle} numberOfLines={1} ellipsizeMode='tail'>{val.latest.message}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
                })
            } 
        </Layout>
    )
};

export default ChatIndexScreen;