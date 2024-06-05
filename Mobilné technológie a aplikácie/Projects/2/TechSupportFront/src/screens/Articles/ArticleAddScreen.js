import { useContext, useState } from "react";
import { Text, View, Alert } from "react-native";
import { Input, Button, CheckBox } from "react-native-elements";
import Layout from "../../layouts/Main";
import * as DocumentPicker from 'expo-document-picker';
import axios from "axios";
import { BASE_URL } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import { ArticleAddStyles } from "../../styles/Articles/ArticleAddStyles";
import FormData from 'form-data';
import mime from 'mime';


const ArticleAddScreen = ({navigation}) => {

    const [title, setTitle] = useState(null);
    const [category, setCategory] = useState(null);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
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

    const back = () => {
        navigation.goBack();
    }

    const save = () => {
        setLoading(true);

        const data = new FormData();
        data.append('title', title);
        data.append('text', text);
        data.append('category', category);

        for(let i = 0 ; i < files.length ; i++)
            data.append(`files[${i}]`,  {
                uri: files[i].uri,
                name: files[i].uri.split('/').pop(), //split the uri at / and get the last element of the resulting array which actually is the name with the image extention (e.g, abc.jpg)
                type: files[i].mimeType,
            });
            
        const config = {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'multipart/form-data',
            },
            transformRequest: (data, headers) => {
                // !!! override data to return formData
                // since axios converts that to string
                return data;
            },
            data: data,
        };

        axios.post(`${BASE_URL}/articles`, data, config).then(res => {
            navigation.navigate("ArticleShow", {id: res.data.id});
        }).catch(e => {
            throwError(e, false, "");
        }).finally(() => {
            setLoading(false);
        })
    }

    const file = async () => {
        try {
            let result = await DocumentPicker.getDocumentAsync({
                multiple: true
            });
            if (result.type !== "cancel") setFiles([...files, result]);
        } 
        catch (e) {
            throwError(e, true, "We are sorry, but there has been an internal error. Try again later.")
        }
    }

    return (
        <Layout>
            <View style={ArticleAddStyles.titleWrapper}>
                <View style={ArticleAddStyles.titleLine} />
                    <Text style={ArticleAddStyles.titleStyle}>Best practices</Text>
                <View style={ArticleAddStyles.titleLine} />
            </View>

            <View style={ArticleAddStyles.buttonWrapper}>
                <Button 
                    onPress={ back }
                    loading={loading} 
                    icon={{ name: "arrow-left", type: "font-awesome-5", size: 30, color: "#00557A" }} 
                    type="clear" 
                    buttonStyle={{justifyContent: 'flex-start'}}
                />

                <Button 
                    onPress={ save } 
                    icon={{ name: "save", type:"font-awesome-5", size: 30, color: "#00557A" }} 
                    loading={loading} 
                    title="Save" 
                    titleStyle={ArticleAddStyles.saveTitle} 
                    type="clear" 
                    buttonStyle={{justifyContent: 'flex-start'}}
                />
            </View>

            <Input
                label="Title"
                maxLength={250}
                keyboardType="ascii-capable"
                returnKeyLabel='next'
                style={ArticleAddStyles.inputs}
                value={title}
                placeholder="Title for this article"
                onChangeText={text => setTitle(text)}
                inputContainerStyle={{borderBottomWidth:0}}
            />

            <View style={ArticleAddStyles.container}>
                <Text style={ArticleAddStyles.categoryStyle}>Category</Text>
                <View style={ArticleAddStyles.pickerWrapper}>
                    <CheckBox
                        center
                        title="How to ..."
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={category == 'howto'}
                        onPress={() => setCategory("howto")}
                    />
                    <CheckBox
                        center
                        title="Tips & Tricks"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={category == 'tips'}
                        onPress={() => setCategory("tips")}
                    />
                </View>
            </View>

            <Input
                multiline
                numberOfLines={4}
                editable
                label="Text"
                keyboardType="ascii-capable"
                returnKeyLabel='done'
                style={ArticleAddStyles.inputs}
                value={text}
                placeholder="Text of this article"
                onChangeText={text => setText(text)}
                inputContainerStyle={{borderBottomWidth:0}}
            />

            <Button
                type="clear"
                icon={{name: "plus", type: 'font-awesome-5', size: 25, color: "#00557A", marginRight: 10, marginBottom: 30}}
                title={ files.length > 0 ? `${files.length} Chosen ...` : "Add document..."}
                titleStyle={ArticleAddStyles.btnTitleStyle}
                style={{alignSelf: 'flex-start'}}
                buttonStyle={{alignItems: 'center', justifyContent: 'flex-start'}}
                onPress={ file }
                loading={loading}
            />
        </Layout>
    )
};

export default ArticleAddScreen;