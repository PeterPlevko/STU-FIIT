import { StyleSheet } from "react-native";

const ForumAddStyles = StyleSheet.create({
    titleWrapper: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 15
    },
    titleLine: {
        flex: 1, 
        height: 1, 
        backgroundColor: '#00557A', 
        marginTop: 20
    },
    titleStyle: {
        width: 100, 
        textAlign: 'center', 
        color: '#00557A', 
        fontSize: 20, 
        marginTop: 20
    },
    controlsWrapper: {
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: "wrap", 
        alignItems: "stretch", 
        justifyContent: "space-between", 
        marginBottom: 20
    },
    buttonTitleStyle: {
        fontStyle: 'italic', 
        fontSize: 20, 
        textDecorationLine: 'underline', 
        color: '#00557A'
    },
    inputStyle: {
        fontSize: 20, 
        borderWidth: 1, 
        borderRadius: 10, 
        borderColor: '#00557A', 
        padding: 5, 
        marginTop: 5, 
        marginBottom: 5
    },
    container: {
      flex: 1,
      alignItems: "center",
      marginBottom: 25
    }
});

export { ForumAddStyles }