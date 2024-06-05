import { useContext, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { Icon, Image, ListItem, Overlay } from 'react-native-elements';
import { View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

function TechHeader() {
    const navigation = useNavigation();
    const {userInfo, logout} = useContext(AuthContext);

    const [menu, menuVisible] = useState(false), [user, userVisible] = useState(false);

    const menuToggle = () => {
        menuVisible(!menu);
    };

    // LEFT Menu
    const goHome = () => { navigation.navigate("Home"); };
    const goArticles = () => { navigation.navigate("Article"); };
    const goForum = () => { navigation.navigate("Forum"); };
    const goAboutUs = () => { navigation.navigate("AboutUs"); };
    // RIGHT Menu
    const goLogout = () => { logout(); navigation.navigate("Login") };
    const goLogin = () => { navigation.navigate("Login"); };
    const goChat = () => { 
        if(!userInfo.token) navigation.navigate("Login");
        else navigation.navigate("Chat"); 
    };
    const goRegister = () => { navigation.navigate("Register"); };
    const goSettings = () => { navigation.navigate("Settings"); };

    const userToggle = () => {
        userVisible(!user);
    };

    const styles = StyleSheet.create({
        header: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            width: '95%',
            marginTop: 45,
            borderRadius: 60,
            backgroundColor: '#00557A',
            marginHorizontal: 10,
            height: 60,
            padding: 5,
            paddingLeft: 20,
            paddingRight: 20
        },
        menu: {
            alignSelf: 'flex-start',
            marginTop: 5,
            top: 100,
            left: 20,
            position: 'absolute', // add if dont work with above
            opacity: 1,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: "#00557A",
            width: 175
        },
        user: {
            alignSelf: 'flex-end',
            marginTop: 5,
            top: 100,
            end: 20,
            position: 'absolute', // add if dont work with above
            opacity: 1,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: "#00557A",
            width: 175,
        },
        username: {
            fontWeight: 'bold',
            alignSelf: 'flex-end'
        },
        backdrop: {
            opacity: 0,
        },
    });

    return (
        <View style={{ height: 100, width: '100%' }}>
            <StatusBar hidden={true}/>
            <View style={styles.header}>
                <Icon name="bars" type="font-awesome-5" color="#fff" style={{fontSize: 40, padding: 0, margin: 0}} onPress={menuToggle}/>
                <Image style={{ width: 180, height: 45, justifyContent: 'center', alignSelf: 'center', alignItems: 'center', padding: 0, margin: 0 }} source={require('../../assets/Logo.png')}/>
                <Icon name="user" type="font-awesome-5" color="#fff" style={{fontSize: 40, padding: 0, margin: 0}} onPress={userToggle}/>
            </View>
            <Overlay isVisible={menu} onBackdropPress={menuToggle} transparent={ true } overlayStyle={styles.menu} backdropStyle={styles.backdrop}>
                <View>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title onPress={ goHome }>Home</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title onPress={ goArticles }>Best practices</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title onPress={ goForum }>Forum</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    <ListItem>
                        <ListItem.Content>
                            <ListItem.Title onPress={ goAboutUs }>About us</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </Overlay>
            <Overlay isVisible={user} onBackdropPress={userToggle} transparent={ true } overlayStyle={styles.user} backdropStyle={styles.backdrop}>
                <View>
                    {
                        userInfo.name && 
                        <ListItem>
                            <ListItem.Content>
                                <ListItem.Title style={styles.username}>{userInfo.name}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    }
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title onPress={ goChat }>Chatroom</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                    {
                        userInfo.token &&
                        <>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title onPress={ goSettings }>Settings</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem>
                            <ListItem.Content>
                                <ListItem.Title onPress={ goLogout }>Log out</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        </>
                    }
                    {
                        !userInfo.token &&
                        <>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title onPress={ goLogin }>Log in</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem>
                            <ListItem.Content>
                                <ListItem.Title onPress={ goRegister }>Register</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        </>
                    }
                </View>
            </Overlay>
        </View>
    );
}

export default TechHeader;