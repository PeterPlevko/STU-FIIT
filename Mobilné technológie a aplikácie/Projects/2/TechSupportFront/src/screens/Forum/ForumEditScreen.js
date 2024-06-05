import Layout from "../../layouts/Main";
import axios from 'axios';
import { BASE_URL } from '../../config';
import { View, Text, Alert } from "react-native";
import { Input, Button, Icon } from 'react-native-elements';
import React, { useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import FormData from 'form-data';
import { AuthContext } from "../../context/AuthContext";
import * as DocumentPicker from 'expo-document-picker';
import { ForumEditStyles } from "../../styles/Forum/ForumEditStyles";

const ForumEditScreen = ({route, navigation}) => {

    const [title, setTitle] = useState(null);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const {userInfo} = useContext(AuthContext);

    const back = () => {
        navigation.goBack();
    }

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

    const save = () => {
        setLoading(true);

        const data = new FormData();
        data.append('title', title);
        data.append('text', text);
        data.append('_method', 'PUT');

        const config = {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'multipart/form-data',
                // if backend supports u can use gzip request encoding
                // "Content-Encoding": "gzip",
            },
            transformRequest: (data, headers) => {
                // !!! override data to return formData
                // since axios converts that to string
                return data;
            },
            onUploadProgress: (progressEvent) => {
                // use upload data, since it's an upload progress
                // iOS: {"isTrusted": false, "lengthComputable": true, "loaded": 123, "total": 98902}
            },
            data: data,
        };

        axios.post(`${BASE_URL}/questions/${route.params.id}`, data, config).then(res => {
            navigation.navigate("ForumShow", {id: res.data.id});
        }).catch(e => {
            throwError(e, false, "");
        }).finally(() => {
            setLoading(false);
        })
    }

    const delAsset = (assetId) => {
        const config = {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        setLoading(true);

        axios.delete(`${BASE_URL}/questions/${route.params.id}/assets/${assetId}`, config).then(res => {
            setFiles(res.data.questions_asset);
        }).catch(e => {
            throwError(e, false, "");
        }).finally(() => {
            setLoading(false);
        })
    }

    const file = async () => {
        try {
            setLoading(true);

            let result = await DocumentPicker.getDocumentAsync({
                multiple: true
            });

            const data = new FormData();
            data.append('files[]', {
                uri: result.uri,
                name: result.uri.split('/').pop(), //split the uri at / and get the last element of the resulting array which actually is the name with the image extention (e.g, abc.jpg)
                type: result.mimeType,
            });

            const config = {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                    'Content-Type': 'multipart/form-data',
                    // if backend supports u can use gzip request encoding
                    // "Content-Encoding": "gzip",
                },
                transformRequest: (data, headers) => {
                    // !!! override data to return formData
                    // since axios converts that to string
                    return data;
                },
                onUploadProgress: (progressEvent) => {
                    // use upload data, since it's an upload progress
                    // iOS: {"isTrusted": false, "lengthComputable": true, "loaded": 123, "total": 98902}
                },
                data: data,
            };

            axios.post(`${BASE_URL}/questions/${route.params.id}/assets`, data, config).then(res => {
                setFiles(res.data.questions_asset);
            }).catch(e => {
                throwError(e, false, "");
            }).finally(() => {
                setLoading(false);
            })
        } 
        catch (e) {
            throwError(e, true, "We are sorry, but there has been an internal error. Try again later.")
        }
    }

    const del = () => {
        const config = {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        setLoading(true);

        axios.delete(`${BASE_URL}/questions/${route.params.id}`, config).then(res => {
            navigation.navigate("Forum");
        }).catch(e => {
            throwError(e, false, "");
        }).finally(() => {
            setLoading(false);
        })
    }

    useFocusEffect(
        React.useCallback(() => {
            axios.get(`${BASE_URL}/questions/${route.params.id}`, {
            }).then(res => {
                setTitle(res.data.title);
                setText(res.data.text);
                setFiles(res.data.questions_asset);
            }).catch(e => {
                throwError(e, false, "");
            })
        }, [route, navigation])
    );

    return (
        <Layout>
            <View style={ForumEditStyles.titleWrapper}>
                <View style={ForumEditStyles.titleLine} />
                    <Text style={ForumEditStyles.titleStyle}>Forum</Text>
                <View style={ForumEditStyles.titleLine} />
            </View>

            <View style={ForumEditStyles.controlsWrapper}>
                <Button 
                    onPress={ back } 
                    icon={{ name: "arrow-left", type:"font-awesome-5", size: 30, color: "#00557A" }}
                    loading={loading}
                    type="clear" 
                    buttonStyle={{justifyContent: 'flex-start'}}
                />

                <Button 
                    onPress={ save } 
                    icon={{ name: "save", type:"font-awesome-5", size: 30, color: "#00557A" }} 
                    loading={loading} 
                    title="Save" 
                    titleStyle={ForumEditStyles.buttonTitleStyle} 
                    type="clear" 
                    buttonStyle={{justifyContent: 'flex-start'}}
                />

                <Button 
                    onPress={ del } 
                    icon={{ name: "trash", type:"font-awesome-5", size: 30, color: "#00557A" }} 
                    loading={loading} 
                    type="clear" 
                    buttonStyle={{}}
                />
            </View>

            <Input
                label="Title"
                maxLength={250}
                keyboardType="ascii-capable"
                returnKeyLabel='next'
                style={ForumEditStyles.inputStyle}
                value={title}
                placeholder="Title for this article"
                onChangeText={text => setTitle(text)}
                inputContainerStyle={{borderBottomWidth:0}}
            />

            <Input
                multiline
                numberOfLines={4}
                editable
                label="Text"
                keyboardType="ascii-capable"
                returnKeyLabel='done'
                style={ForumEditStyles.inputStyle}
                value={text}
                placeholder="Text of this article"
                onChangeText={text => setText(text)}
                inputContainerStyle={{borderBottomWidth:0}}
            />

            <View style={{width: '100%', marginBottom: 20, marginTop: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                { files.map((val, index) => {
                        return (
                            <Text key={index}>{val.name} <Icon name="trash" type="font-awesome-5" color='#00557A' onPress={ () => delAsset(val.id) }/></Text>
                        )
                    })
                }   
            </View>

            <Button
                type="clear"
                icon={{name: "plus", type: 'font-awesome-5', size: 30, color: '#00557A'}}
                title={ "Add document..." }
                titleStyle={ForumEditStyles.addButtonTitleStyle}
                style={{alignSelf: 'flex-start'}}
                buttonStyle={ForumEditStyles.addButtonStyle}
                onPress={ file }
                loading={loading}
            />
        </Layout>
    )
};

export default ForumEditScreen;