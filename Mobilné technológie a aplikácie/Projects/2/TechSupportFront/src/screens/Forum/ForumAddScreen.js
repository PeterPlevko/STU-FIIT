import { useContext, useState } from "react";
import { Text, View, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import Layout from "../../layouts/Main";
import * as DocumentPicker from 'expo-document-picker';
import axios from "axios";
import { BASE_URL } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import FormData from 'form-data';
import { ForumAddStyles } from "../../styles/Forum/ForumAddStyles";

const ForumAddScreen = ({navigation}) => {

    const [title, setTitle] = useState(null);
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
        data.append('_method', 'POST');

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

        axios.post(`${BASE_URL}/questions`, data, config).then(res => {
            navigation.navigate("ForumShow", {id: res.data.id});
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
            if(result.type !== "cancel") setFiles([...files, result]);
        } 
        catch (e) {
            throwError(e, true, "We are sorry, but there has been an internal error. Try again later.");
        }
    }

    return (
        <Layout>
            <View style={ForumAddStyles.titleWrapper}>
                <View style={ForumAddStyles.titleLine} />
                    <Text style={ForumAddStyles.titleStyle}>Forum</Text>
                <View style={ForumAddStyles.titleLine} />
            </View>

            <View style={ForumAddStyles.controlsWrapper}>
                <Button 
                    onPress={ back } 
                    loading={loading}
                    icon={{ name: "arrow-left", type:"font-awesome-5", size: 30, color: "#00557A" }} 
                    type="clear" 
                    buttonStyle={{justifyContent: 'flex-start'}}
                />
                <Button 
                    onPress={ save } 
                    icon={{ name: "save", type:"font-awesome-5", size: 30, color: "#00557A" }} 
                    loading={loading}
                    title="Save" 
                    titleStyle={ForumAddStyles.buttonTitleStyle} 
                    type="clear" 
                    buttonStyle={{justifyContent: 'flex-start'}}
                />
            </View>

            <Input
                label="Title"
                maxLength={250}
                keyboardType="ascii-capable"
                returnKeyLabel='next'
                style={ForumAddStyles.inputStyle}
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
                style={ForumAddStyles.inputStyle}
                value={text}
                placeholder="Text of this article"
                onChangeText={text => setText(text)}
                inputContainerStyle={{borderBottomWidth:0}}
            />

            <Button
                type="clear"
                icon={{name: "plus", type: 'font-awesome-5', size: 25, color: "#00557A", marginRight: 10, marginBottom: 30}}
                title={ files.length > 0 ? `${files.length} Chosen ...` : "Add document..."}
                titleStyle={{textDecorationLine: 'underline', fontStyle: 'italic', fontSize: 20, color: '#00557A', marginBottom: 30}}
                style={{alignSelf: 'flex-start'}}
                buttonStyle={{alignItems: 'center', justifyContent: 'flex-start'}}
                onPress={ file }
                loading={loading}
            />
        </Layout>
    )
};

export default ForumAddScreen;