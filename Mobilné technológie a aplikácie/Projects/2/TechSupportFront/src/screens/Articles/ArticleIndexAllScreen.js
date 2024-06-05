import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { Text, View, ActivityIndicator, Alert } from "react-native";
import { Icon, Button, Input } from "react-native-elements";
import { BASE_URL } from "../../config";
import Layout from "../../layouts/Main";
import { ArticleIndexAllStyles } from "../../styles/Articles/ArticleIndexAllStyles"


const ArticleIndexAllScreen = ({route, navigation}) => {

    const [title, setTitle] = useState(null);
    const [articles, setArticles] = useState([]);
    const [articlesL, setArticlesL] = useState(true);

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
        setArticlesL(true);

        axios.get(`${BASE_URL}/articles`, {
        }).then(res => {
            setArticles(res.data);
        }).catch(e => {
            throwError(e, false, "");
        }).finally(() => {
            setArticlesL(false);
        });
    }

    const back = () => {
        navigation.goBack();
    }

    const filter = () => {
        setArticlesL(true);

        axios.post(`${BASE_URL}/articles/search`, {
            title
        }).then(res => {
            setArticles(res.data);
        }).catch(e => {
            throwError(e, false, "");
        }).finally(() => {
            setArticlesL(false);
        });
    }

    useFocusEffect(
        React.useCallback(() => {
            load()
        }, [route, navigation])
    );

    return (
        <Layout>
            <View style={ArticleIndexAllStyles.titleWrapper}>
                <View style={ArticleIndexAllStyles.titleLine} />
                    <Text style={ArticleIndexAllStyles.titleStyle}>Best practices</Text>
                <View style={ArticleIndexAllStyles.titleLine} />
            </View>

            <View style={ArticleIndexAllStyles.controlsWrapper}>
                <Button 
                    onPress={ back } 
                    icon={<Icon name="arrow-left" type="font-awesome-5" size={30} color="#00557A"/>} 
                    type="clear" 
                    buttonStyle={ArticleIndexAllStyles.buttonStyle}  
                />

                <View style={ArticleIndexAllStyles.searchWrapper}>
                    <Input 
                        maxLength={120}
                        keyboardType="ascii-capable"
                        returnKeyLabel='done'
                        style={ArticleIndexAllStyles.inputStyle}
                        value={title}
                        placeholder="Search by name..."
                        onChangeText={text => setTitle(text)}
                        inputContainerStyle={{borderBottomWidth:0}}
                    />
                    <Button 
                        onPress={ filter } 
                        icon={<Icon name="filter" type="font-awesome-5" size={20} color="#00557A"/>} 
                        type="clear" 
                        buttonStyle={ArticleIndexAllStyles.buttonStyle}
                    />
                </View>

                
            </View>

            { articlesL && 
                <View style={ArticleIndexAllStyles.loadingStyle}>
                    <ActivityIndicator color={"#00557A"} size="large" />
                </View>
            }

            { !articlesL &&
                articles.map((val, index) => {
                    return (
                    <View key={index} style={ArticleIndexAllStyles.articleWrapper}>
                        <View style={ArticleIndexAllStyles.articleTitleWrapper}>
                            <Text style={ArticleIndexAllStyles.articleTitle} onPress={() => navigation.navigate("ArticleShow", {id: val.id})}>{val.title}</Text>
                        </View>

                        { val.user && val.user.name &&
                            <Text style={ArticleIndexAllStyles.autorStyle}><Icon name="clock" type="font-awesome-5" size={15}/> Created by {val.user.name} @{new Date(val.created_at).toLocaleDateString()}</Text>
                        }
                    </View>
                    );
                })
            }
        </Layout>
    )
};

export default ArticleIndexAllScreen;