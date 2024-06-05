import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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

    const register = (name, email, password, password_confirmation, navigation) => {
        setIsLoading(true);
        const device_name = 'Device';

        axios.post(`${BASE_URL}/register`, {
            name,
            email,
            password,
            password_confirmation,
            device_name
        })
        .then(res => {
            AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
            setUserInfo(res.data);
            navigation.navigate("Home");
        })
        .catch(e => {
            throwError(e, false, "");
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const login = (email, password, navigation) => {
        setIsLoading(true);
        let device_name = 'Device';

        axios.post(`${BASE_URL}/token`, {
            email,
            password,
            device_name
        }).then(res => {
            AsyncStorage.setItem('userInfo', JSON.stringify(res.data));
            setUserInfo(res.data);
            navigation.navigate("Home");
        }).catch(e => {
            throwError(e, false, "");
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const logout = () => {
        setIsLoading(true);

        axios.post(`${BASE_URL}/logout`, {}, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        }).then(() => {
            AsyncStorage.removeItem('userInfo');
            setUserInfo({});
        }).catch(e => {
            throwError(e, false, "");
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const settings = (name, email, password, password_confirmation) => {
        setIsLoading(true);

        axios.post(`${BASE_URL}/users`, {
            name, email, password, password_confirmation
        }, {headers: {Authorization: `Bearer ${userInfo.token}`}}).then(res => {
            let user = res.data;
            user.token = userInfo.token;
            AsyncStorage.removeItem('userInfo');
            AsyncStorage.setItem('userInfo', JSON.stringify(user));
            setUserInfo(user);
        }).catch(e => {
            throwError(e, false, "");
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const isLoggedIn = async () => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if (userInfo)
                setUserInfo(userInfo);
        } catch (e) {
            throwError(e, true, "We are sorry, but there has been an internal error. Try again later.")
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
        value={{
            isLoading,
            userInfo,
            register,
            login,
            logout,
            settings,
        }}>
        {children}
        </AuthContext.Provider>
    );
};