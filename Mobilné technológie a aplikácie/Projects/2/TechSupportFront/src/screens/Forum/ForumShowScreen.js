import Layout from "../../layouts/Main";
import axios from 'axios';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { BASE_URL } from '../../config';
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { Button, Icon, Image } from 'react-native-elements';
import React, { useState, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import FormData from 'form-data';
import { AuthContext } from "../../context/AuthContext";
import { ForumShowStyles } from "../../styles/Forum/ForumShowStyles"

const ForumShowScreen = ({route, navigation}) => {

    const [forum, setForum] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState(false);
    const [commentText, setText] = useState("");
    const [commentEdit, setEdit] = useState(false);
    const [commentEditId, setEditId] = useState(0);
    const [progress, setProgress] = useState(0);
    const [progressI, setProgressI] = useState({display: 0});
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
        setLoading(true);
        setComment(false);

        axios.get(`${BASE_URL}/questions/${route.params.id}`, {
        }).then(res => {
            setForum(res.data);
        }).catch(e => {
            throwError(e, false, "");
        }).finally(() => {
            setLoading(false);
        });
    }

    const save = () => {
        if (commentText == "") {
            setComment(false);
            return;
        }

        setLoading(true);

        const data = new FormData();
        data.append('text', commentText);
        if (commentEdit) data.append('_method', 'PUT');
        else data.append('_method', 'POST');

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

        if (commentEdit) {
            axios.post(`${BASE_URL}/questions/${route.params.id}/comments/${commentEditId}`, data, config).then(res => {
                navigation.navigate("ForumShow", {id: res.data.id});
            }).catch(e => {
                throwError(e, false, "");
            }).finally(() => {
                setLoading(false);
                setComment(false);
                setText("");
                setEdit(false);
                setEditId(0);
            });
        }
        else {
            axios.post(`${BASE_URL}/questions/${route.params.id}/comments/`, data, config).then(res => {
                navigation.navigate("ForumShow", {id: res.data.id});
            }).catch(e => {
                throwError(e, false, "");
            }).finally(() => {
                setLoading(false);
                setComment(false);
                setText("");
            });
        }
    }

    const back = () => {
        navigation.navigate("Forum");
    }

    const toLogin = () => {
        navigation.navigate("Login");
    }

    const edit = () => {
        if (!userInfo.token) navigation.navigate("Login");
        else navigation.navigate("ForumEdit", {id: route.params.id});
    }

    const addComment = () => {
        if (!userInfo.token) navigation.navigate("Login");
        else {
            if (!comment) setComment(true);
            else setComment(false);
        }
    }

    const delComment = (commentId) => {
        const config = {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        };

        setLoading(true);

        axios.delete(`${BASE_URL}/questions/${route.params.id}/comments/${commentId}`, config).then(res => {
            navigation.navigate("ForumShow", {id: route.params.id});
        }).catch(e => {
            throwError(e, false, "");
        }).finally(() => {
            setLoading(false);
        })
    }

    const editComment = (commentId, commentText) => {
        if (!userInfo.token) {
            throwError(null, true, "Please, log in before editing comments.")
            navigation.navigate("Login");
        }
        else {
            if (commentEdit) {
                setComment(false);
                setText("");
                setEdit(false);
                setEditId(0);
            }
            else {
                setComment(true);
                setText(commentText);
                setEdit(true);
                setEditId(commentId);
            }
        }
    }

    const markComment = (commentId) => {
        if (forum.comment_id == commentId) return;
    
        if (!userInfo.token) navigation.navigate("Login");
        else {
            const config = {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                    // if backend supports u can use gzip request encoding
                    // "Content-Encoding": "gzip",
                },
            };

            setLoading(true);

            axios.get(`${BASE_URL}/questions/${route.params.id}/comments/${commentId}/answer`, config).then(res => {
                navigation.navigate("ForumShow", {id: res.data.id});
            }).catch(e => {
                throwError(e, false, "");
            }).finally(() => {
                setLoading(false);
                setComment(false);
                setText("");
                setEdit(false);
                setEditId(0);
            });
        }
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
            navigation.navigate("ForumShow", {id: route.params.id});
        }).catch(e => {
            throwError(e, false, "");
        }).finally(() => {
            setLoading(false);
        })
    }

    useFocusEffect(
      React.useCallback(() => {
          load()
      }, [route, navigation])
    );

    return (
        <Layout>
            <View style={ForumShowStyles.titleWrapper}>
                <View style={ForumShowStyles.titleLine} />
                    <Text style={ForumShowStyles.titleStyle}>Forum</Text>
                <View style={ForumShowStyles.titleLine} />
            </View>

            <View style={ForumShowStyles.controlsWrapper}>
                <Button 
                    icon={<Icon name="arrow-left" type="font-awesome-5" size={32} color="#00557A" />} 
                    style={{flex: 1}} 
                    onPress={ back } 
                    type='clear'
                />

                <Button 
                    onPress={ edit } 
                    icon={<Icon name="edit" type="font-awesome-5" size={32} color="#00557A" />} 
                    title="Edit" 
                    titleStyle={ForumShowStyles.editButtonTitleStyle} 
                    type="clear"
                />
            </View>

            <View style={{marginBottom: 40}}>
                <Text style={ForumShowStyles.questionTitle}>{forum.title}</Text>
                <Text style={ForumShowStyles.questionDetails}>
                    { !loading && 
                        forum.hasOwnProperty("user") && "Created by " + forum.user.name 
                    }{`\n`}
                    
                    { !loading &&  
                        "Last edited @" + new Date(forum.updated_at).toLocaleDateString()
                    }
                </Text>
                
                <Text style={ForumShowStyles.questionText}>{forum.text}</Text>

                { progressI.display == 1 && 
                    <Text style={ForumShowStyles.progressBar}>{progressI.text} ({progress}%)</Text>
                }

                { forum.questions_asset && forum.questions_asset.length > 0 && forum.questions_asset.map((val, index) => {
                    if(val.type.includes("image/")) {
                        return (
                            <View key={index}>
                                <Text style={ForumShowStyles.imageStyle}>
                                    <Icon name="image" type="font-awesome-5" size={30}/> {val.name} 
                                    <Icon name="trash" type="font-awesome-5" size={30} onPress={ () => delAsset(val.id) } color="#00557A"/>
                                </Text>
                                

                                <Image 
                                    source={{uri: `${BASE_URL}/questions/${forum.id}/assets/${val.id}`}} 
                                    style={{ width: '100%', height: undefined, aspectRatio: 1, resizeMode:'contain' }} 
                                    PlaceholderContent={<ActivityIndicator color={"#000"} size="large" />}
                                />
                            </View>
                        ) 
                    } 
                    else {
                        return (
                            <View key={index} style={ForumShowStyles.imageStyle}>
                                <Text style={{fontSize: 23, fontWeight: 'bold'}}>
                                    <Icon name="file-download" type="font-awesome-5" size={30}/> {val.name} ({val.type}) 
                                    <Icon name="trash" type="font-awesome-5" size={30} onPress={ () => delAsset(val.id) } color="#00557A"/>
                                </Text> 
                            </View>
                        )
                    }})
                }

                <View style={ForumShowStyles.addCommentStyle}>
                    <Text style={ForumShowStyles.commentTitleStyle}>Comments</Text>
                    { userInfo.token &&
                        <Button 
                            onPress={ addComment } 
                            icon={<Icon name="plus" type="font-awesome-5" size={30} color="#00557A"/>} 
                            type="clear" 
                            buttonStyle={{justifyContent: 'flex-start'}}
                        />
                    }

                    { !userInfo.token &&
                        <Button 
                            onPress={ toLogin } 
                            icon={<Icon name="plus" type="font-awesome-5" size={30} color="#00557A"/>} 
                            type="clear" 
                            buttonStyle={{justifyContent: 'flex-start'}}
                        />
                    }
                </View>
            </View>

            { comment &&
                <View flexDirection='row' alignItems='center' justifyContent='flex-end' style={ForumShowStyles.commentInputStyle}>
                    <TextInput 
                        multiline 
                        editable 
                        style={ForumShowStyles.inputContainerStyle} 
                        placeholder="Add comment..." 
                        onChangeText={newText => setText(newText)} 
                        defaultValue={commentText}
                    />

                    <Button 
                        onPress={ save } 
                        icon={<Icon name="paper-plane" type="font-awesome-5" size={30} color="#00557A"/>} 
                        type="button" 
                        buttonStyle={ForumShowStyles.sendCommentButtonStyle}
                    />
                </View>
            }

            <View style={{marginBottom: 50}}>
                { loading &&
                    <View style={ForumShowStyles.loadingStyle}>
                        <ActivityIndicator color={"#00557A"} size="large" />
                    </View>
                }

                { !loading && forum.comments &&
                    forum.comments.map((val, index) => {
                        return (
                            <View key={index} style={ForumShowStyles.commentsWrapper}>
                                <View style={ForumShowStyles.entryWrapper}>
                                    <Text style={ForumShowStyles.commentData}>{val.user.name}{'\n'}@{new Date(val.created_at).toLocaleDateString()}{'\n\n'}{val.text}</Text>
                                    <View style={ForumShowStyles.commentControls}>
                                        <Button 
                                            onPress={ () => delComment(val.id) } 
                                            icon={<Icon name="trash-alt" type="font-awesome-5" size={20} color="#fff"/>} 
                                            type="button" 
                                            buttonStyle={{marginLeft: 15}}
                                        />

                                        <Button 
                                            onPress={ () => editComment(val.id, val.text) } 
                                            icon={<Icon name="edit" type="font-awesome-5" size={20} color="#fff"/>}
                                            type="button"
                                        />   

                                        { forum.comment_id === val.id && 
                                            <Button 
                                                onPress={ () => markComment(val.id) } 
                                                icon={<Icon name="check" type="font-awesome-5" size={20} color="#00557A"/>} 
                                                type="button"
                                                title="Best Comment"
                                                titleStyle={{color: "#00557A", marginLeft: 5}}
                                            />
                                        } 

                                        { forum.comment_id !== val.id && 
                                            <Button 
                                                onPress={ () => markComment(val.id) } 
                                                icon={<Icon name="check" type="font-awesome-5" size={20} color="#fff"/>} 
                                                type="button"
                                            />
                                        }                            
                                    </View>
                                </View>
                            </View>
                        );
                    })
                }

                { !loading && !comment && forum.comments.length <= 0 &&
                    <View style={ForumShowStyles.noCommentsWrapper}>
                        <Text style={{fontStyle: 'italic'}}>Currently, there are no comments</Text>
                    </View>
                }
            </View>
        </Layout>
    )
};

export default ForumShowScreen;