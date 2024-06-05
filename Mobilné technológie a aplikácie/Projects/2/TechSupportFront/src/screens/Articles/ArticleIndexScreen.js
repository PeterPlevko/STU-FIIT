import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import React, { useState, useContext } from "react";
import { Text, View, ActivityIndicator, Alert } from "react-native";
import { Icon, Button } from "react-native-elements";
import { BASE_URL } from "../../config";
import Layout from "../../layouts/Main";
import { AuthContext } from "../../context/AuthContext";
import { ArticleIndexStyles } from "../../styles/Articles/ArticleIndexStyles";


const ArticleIndexScreen = ({route, navigation}) => {

    const [how, setHow] = useState([]);
    const [howL, setHowL] = useState(true);
    const [tip, setTip] = useState([]);
    const [tipL, setTipL] = useState(true);
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
        setHowL(true);
        setTipL(true);

        axios.get(`${BASE_URL}/articles/latest/howto`, {
        }).then(res => {
            setHow(res.data);
        }).catch(e => {
            throwError(e, false, "");
        }).finally(() => {
            setHowL(false);
        });

        axios.get(`${BASE_URL}/articles/latest/tips`, {
        }).then(res => {
            setTip(res.data);
        }).catch(e => {
            throwError(e, false, "");
        }).finally(() => {
            setTipL(false);
        });
    }

    const back = () => {
        navigation.goBack();
    }

    const plus = () => {
        if (!userInfo.token) navigation.navigate("Login");
        else navigation.navigate("ArticleAdd");
    }

    useFocusEffect(
        React.useCallback(() => {
            load()
        }, [route, navigation])
    );

    return (
        <Layout>
            <View style={ArticleIndexStyles.titleWrapper}>
                <View style={ArticleIndexStyles.titleLine} />
                    <Text style={ArticleIndexStyles.titleStyle}>Best practices</Text>
                <View style={ArticleIndexStyles.titleLine} />
            </View>

            <View style={ArticleIndexStyles.controlsWrapper}>
                <Button 
                    onPress={ back } 
                    icon={<Icon name="arrow-left" type="font-awesome-5" size={30} color="#00557A"/>} 
                    type="clear" 
                    buttonStyle={{justifyContent: 'flex-start'}}
                />

                <Button 
                    onPress={ plus } 
                    icon={<Icon name="plus" type="font-awesome-5" size={30} color="#00557A"/>} 
                    type="clear" 
                    buttonStyle={{justifyContent: 'flex-start'}}
                />
            </View>

            <Text style={ArticleIndexStyles.howtoTitle}>How To...</Text>

            { howL && 
                <View style={ArticleIndexStyles.loadingStyle}>
                    <ActivityIndicator color={"#00557A"} size="large" />
                </View>
            }

            { !howL &&
                how.map((val, index) => {
                    return (
                        <View key={index} style={ArticleIndexStyles.entryWrapper} onPress={() => navigation.navigate("ArticleShow", {id: val.id})}>
                            <View style={ArticleIndexStyles.buttonWrapper}>
                                <Text style={ArticleIndexStyles.entryTitle} onPress={() => navigation.navigate("ArticleShow", {id: val.id})}>{val.title}</Text>
                            </View>

                            { val.user && val.user.name &&
                                <Text style={{ fontSize: 15, fontStyle: 'italic'}}>Created by {val.user.name} @{new Date(val.created_at).toLocaleDateString()}</Text>
                            }
                        </View>
                    );
                })
            }

            { !howL && how.length > 0 && 
                <Text style={ArticleIndexStyles.viewMoreLink} onPress={ () => navigation.navigate("ArticleAll") }>View more</Text>
            }

            { !howL && how.length <= 0 && 
                <>
                    <Text style={ArticleIndexStyles.messageStyle}>There are no articles in this category.</Text>
                    <Text style={ArticleIndexStyles.messageLinkStyle} onPress={ () => navigation.navigate("ArticleAdd") }>Create one!</Text>
                </>
            }

            <Text style={ArticleIndexStyles.tipsTitle}>Tips & Tricks</Text>

            { tipL && 
                <View style={ArticleIndexStyles.loadingStyle}>
                    <ActivityIndicator color={"#00557A"} size="large" />
                </View>
            }

            { !tipL &&
                tip.map((val, index) => {
                    return (
                        <View key={index} style={ArticleIndexStyles.entryWrapper} onPress={() => navigation.navigate("ArticleShow", {id: val.id})}>
                            <View style={ArticleIndexStyles.buttonWrapper}>
                                <Text style={ArticleIndexStyles.entryTitle} onPress={() => navigation.navigate("ArticleShow", {id: val.id})}>{val.title}</Text>                            
                            </View>
                            { val.user && val.user.name &&
                                <Text style={{ fontSize: 15, fontStyle: 'italic'}}>Created by {val.user.name} @{new Date(val.created_at).toLocaleDateString()}</Text>
                            }
                        </View>
                    );
                })
            }

            { !tipL && tip.length > 0 && 
                <Text style={ArticleIndexStyles.viewMoreLink} onPress={ () => navigation.navigate("ArticleAll") }>View more</Text>
            }

            { !tipL && tip.length <= 0 && 
                <>
                    <Text style={ArticleIndexStyles.messageStyle}>There are no articles in this category.</Text>
                    <Text style={ArticleIndexStyles.messageLinkStyle} onPress={ () => navigation.navigate("ArticleAdd") }>Create one!</Text>
                </>
            }
        </Layout>
    )
};

export default ArticleIndexScreen;