import axios from "axios";
import React, { useState, useContext } from "react";
import { Text, View, Alert } from "react-native";
import { BASE_URL } from "../../config";
import Layout from "../../layouts/Main";
import { ActivityIndicator } from "react-native";
import { Icon, Image, Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFocusEffect } from '@react-navigation/native';
import { ArticleShowStyles } from "../../styles/Articles/ArticleShowStyles";
import { AuthContext } from "../../context/AuthContext";


const ArticleShowScreen = ({navigation, route}) => {

    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(true);
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

        axios.get(`${BASE_URL}/articles/${route.params.id}`, {
        }).then(res => {
            setArticle(res.data);
        }).catch(e => {
            throwError(e, false, "");
        }).finally(() => {
            setLoading(false);
        })
    }

    const back = () => {
        navigation.navigate("Article");
    };

    const edit = () => {
        if (userInfo.role != "ADMIN") throwError(null, true, "We are sorry, but only administrators can edit articles.");
        else navigation.navigate("ArticleEdit", {id: route.params.id});
    };

    useFocusEffect(
        React.useCallback(() => {
            load();
        }, [route, navigation])
    );

    return (
        <Layout>
             <View style={ArticleShowStyles.titleWrapper}>
                <View style={ArticleShowStyles.titleLine} />
                    <Text style={ArticleShowStyles.titleStyle}>Best practices</Text>
                <View style={ArticleShowStyles.titleLine} />
            </View>

            <View style={ArticleShowStyles.controlsWrapper}>
                <Button 
                    onPress={ back } 
                    icon={<Icon name="arrow-left" type="font-awesome-5" size={30} color='#00557A'/>} 
                    type="clear" 
                    buttonStyle={{justifyContent: 'flex-start'}}
                />

                { userInfo.token && userInfo.role == "ADMIN" &&
                    <Button 
                        onPress={ edit } 
                        icon={<Icon name="edit" type="font-awesome-5" size={30} color='#00557A'/>} 
                        type="clear"
                        title="Edit"
                        titleStyle={{fontStyle: 'italic', color: "#00557A"}} 
                        buttonStyle={{justifyContent: 'flex-start'}}
                    />
                }

                { (!userInfo.token || userInfo.role != "ADMIN") &&
                    <Button 
                        onPress={ edit } 
                        icon={<Icon name="edit" type="font-awesome-5" size={30} color='grey'/>} 
                        type="clear"
                        title="Edit"
                        titleStyle={{fontStyle: 'italic', color: "grey"}} 
                        buttonStyle={{justifyContent: 'flex-start'}}
                    />
                }
            </View>
            
            { loading && 
                <View style={ArticleShowStyles.loadingStyle}>
                    <ActivityIndicator color={"#00557A"} size="large" />
                </View>
            }

            { !loading &&
                <View style={ArticleShowStyles.articleWrapper}>
                    <Text style={ArticleShowStyles.articleTitle}>{article.title}</Text>
                    <Text style={ArticleShowStyles.autorStyle}>Created by {article.user.name}{`\n`}
                    {"Last update @" + new Date(article.created_at).toLocaleDateString()}{'\n'}
                    {article.category === "tips" && "Tips & Tricks" || article.category === "howto" && "How To..."}
                    </Text>
                    <Text style={ArticleShowStyles.articleText}>{article.text}</Text>

                    { progressI.display == 1 && 
                        <Text style={ArticleShowStyles.progressText}>{progressI.text} ({progress}%)</Text>
                    }

                    { article.articles_asset && article.articles_asset.length > 0 && article.articles_asset.map((val, index) => {
                        if(val.type.includes("image/")) {
                            return (
                                <View key={index}>
                                    <Text style={ArticleShowStyles.imageTitle}>
                                        <Icon name="image" type="font-awesome-5" size={30}/> {val.name}
                                    </Text>
                                    <Image source={{uri: `${BASE_URL}/articles/${article.id}/assets/${val.id}`}} style={ArticleShowStyles.imageStyle} PlaceholderContent={<ActivityIndicator color={"#000"} size="large" />}/>
                                </View>
                            ) 
                        } 
                        else {
                            return (
                                <TouchableOpacity key={index}>
                                    <Text style={ArticleShowStyles.fileStyle}><Icon name="file-download" type="font-awesome-5" size={30}/> {val.name} ({val.type})</Text>
                                </TouchableOpacity>
                            )
                        }
                    })
                    }
                </View>
            }
        </Layout>
    )
};

export default ArticleShowScreen;