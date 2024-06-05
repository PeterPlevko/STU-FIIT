import { StyleSheet } from "react-native";

const ForumEditStyles = StyleSheet.create({
    titleWrapper: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 15
    },
    titleLine: {
        flex: 1, 
        height: 1, 
        backgroundColor: '#00557A', 
        marginTop: 30
    },
    titleStyle: {
        width: 100, 
        textAlign: 'center', 
        color: '#00557A', 
        fontSize: 20, 
        marginTop: 30
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
        fontSize: 15, 
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
    addButtonTitleStyle: {
        textDecorationLine: 'underline', 
        fontStyle: 'italic', 
        fontSize: 20, 
        color: '#00557A'
    },
    addButtonStyle: {
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        marginTop: 20
    }
});

export { ForumEditStyles }