import Layout from "../../layouts/Main";
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import { BASE_URL } from '../../config';
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { Icon, Button } from 'react-native-elements';
import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatShowStyles } from "../../styles/Chat/ChatShowStyles";

const ChatShowScreen = ({route, navigation}) => {

    const [chatShow, setChatShow] = useState([]);
    const [chatShowL, setChatShowL] = useState(true);
    const [newMessage, setMessage] = useState("");
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

    const readMessages = () => {
        const config = {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        axios.put(`${BASE_URL}/chats/${route.params.id}/read`, {}, config
        ).catch(e => {
            throwError(e, false, "");
        });
    }

    const load = () => {
        const config = {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
                // if backend supports u can use gzip request encoding
                // "Content-Encoding": "gzip",
            }
        };

        setChatShowL(true);
        readMessages();

        axios.get(`${BASE_URL}/chats/${route.params.id}`, config 
        ).then(res => {
            setChatShow(res.data);
        }).catch(e => {
            throwError(e, false, "");
        }).finally(() => {
            setChatShowL(false);
        });
    } 

    const send = () => {
        /*if (newMessage == "") {
            setComment(false);
            return;
        }*/

        setChatShowL(true);
        /*for(let i = 0 ; i < files.length ; i++)
            data.append(`files[${i}]`, files[i], files[i].name);*/

        const config = {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
                // if backend supports u can use gzip request encoding
                // "Content-Encoding": "gzip",
            }
        };

        axios.post(`${BASE_URL}/chats/${route.params.id}`, {"text": newMessage}, config).then(res => {
            setChatShow([...chatShow, res.data])
        }).catch(e => {
            throwError(e, false, "");
        }).finally(() => {
            readMessages();
            setChatShowL(false);
            setMessage("");
        });
    }

    const chat = () => {
        navigation.navigate("Chat");
    };

    useFocusEffect(
      React.useCallback(() => {
          load()      
      }, [route, navigation])
    );

    return (
        <Layout>
            <View style={ChatShowStyles.titleWrapper}>
                <View style={ChatShowStyles.titleLine} />
                    <Text style={ChatShowStyles.titleStyle}>Chatroom</Text>
                <View style={ChatShowStyles.titleLine} />
            </View>

            <View style={ChatShowStyles.controlsWrapper}>
                <View style={ChatShowStyles.buttonWrapper}>
                    <Button 
                        icon={<Icon name="arrow-left" type="font-awesome-5" size={32} color="#00557A"/>} 
                        onPress={ chat }
                        type='clear'
                    />
                </View>

                <View>
                    <Button 
                            icon={<Icon name="phone" type="font-awesome-5" size={25} color="#00557A"/>} 
                            onPress={ () => navigation.navigate("Call", {my_id: userInfo.id, op_id: route.params.id}) } 
                            style={ChatShowStyles.buttonWrapper}
                            type='clear'
                        />
                </View>

                <View>
                    <Button 
                        icon={<Icon name="plus" type="font-awesome-5" size={25} color="#00557A"/>} 
                        onPress={ () => navigation.navigate("Join", {my_id: userInfo.id, op_id: route.params.id}) } 
                        style={ChatShowStyles.buttonWrapper}
                        type='clear'
                    />
                </View>
            </View>
            
            <View style={{marginBottom: 30}}>
            { chatShowL && 
                <View style={ChatShowStyles.loadingStyle}>
                    <ActivityIndicator color={"#00557A"} size="large" />
                </View>
            }

            { !chatShowL &&
                chatShow.map((val, index) => {
                return (
                    <View key={index}>
                        { val.user_from.id!=userInfo.id &&
                            <View style={{flexDirection: 'row'}}>
                                <View style={ChatShowStyles.messageWrapperFrom}>
                                    <View>
                                        <Text style={{textAlign: 'left'}}>{val.message}</Text>
                                    </View>
                                </View>
                            </View>
                        }

                        { val.user_from.id==userInfo.id && 
                            <View style={{flexDirection: 'row-reverse'}}>
                                <View style={ChatShowStyles.messageWrapperTo}>
                                    <View>
                                        <Text style={{textAlign: 'left'}}>{val.message}</Text>
                                    </View>
                                </View>
                            </View>
                        }
                    </View>
                    );
                })
            }
            </View>

            <View flexDirection='row' alignItems='center' justifyContent='flex-end' style={ChatShowStyles.messageSendWrapper}>
                <TextInput 
                    multiline 
                    editable 
                    style={ChatShowStyles.inputStyle} 
                    placeholder="Write message..." 
                    onChangeText={newText => setMessage(newText)} 
                    defaultValue={newMessage}
                />
                <Button 
                    onPress={ send } 
                    icon={<Icon name="paper-plane" type="font-awesome-5" size={30} color="#00557A"/>} 
                    type="button" 
                    buttonStyle={ChatShowStyles.sendButtonStyle}
                />
            </View>
        </Layout>
    )
};

export default ChatShowScreen;