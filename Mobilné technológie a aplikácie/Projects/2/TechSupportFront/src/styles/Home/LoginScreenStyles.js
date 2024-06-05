import { StyleSheet } from "react-native";

const LoginScreenStyles = StyleSheet.create({
    input: {
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000',
        backgroundColor: '#006D9B',
        color: '#fff',
        padding: 5,
        marginTop: 5
    },
    imageStyle: {
        width: 300, 
        height: 150, 
        marginTop: 40
    },
    lineStyle: {
        backgroundColor: '#00557A', 
        marginVertical: 20, 
        width: '100%', 
        height: 2
    },
    loginWrapper: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    screenContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    linkWrapper: {
        alignItems: 'center', 
        marginTop: 20
    },
    link: {
        color: '#00557A',
        textDecorationLine: 'underline',
        fontStyle: 'italic'
    },
    buttonStyle: {
        backgroundColor: '#00557A',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 40
    },
    buttonTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20
    }
  });

  export { LoginScreenStyles }