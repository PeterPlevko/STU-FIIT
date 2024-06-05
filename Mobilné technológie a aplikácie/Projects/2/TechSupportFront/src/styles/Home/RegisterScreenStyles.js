import { StyleSheet } from "react-native";

const RegisterScreenStyles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    titleWrapper: {
      flexDirection: 'row',
      alignItems: 'center', 
      marginTop: 20, 
      marginBottom: 20
    },
    titleLine: {
      flex: 1, 
      height: 1, 
      backgroundColor: '#00557A'
    },
    titleStyle: {
      width: 120, 
      textAlign: 'center', 
      color: '#00557A', 
      fontSize: 20
    },
    input: {
      fontSize: 20,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#00557A',
      backgroundColor: '#006D9B',
      color: '#fff',
      padding: 5,
      marginTop: 5
    },
    wrapper: {
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center'
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
      paddingHorizontal: 40,
      marginTop: 10
    },
    buttonTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20
    }
  });

  export { RegisterScreenStyles }