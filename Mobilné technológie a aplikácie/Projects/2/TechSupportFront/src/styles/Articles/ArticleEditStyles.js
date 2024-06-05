import { StyleSheet } from "react-native";

const ArticleEditStyles = StyleSheet.create({
    titleWrapper: {
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop: 20
    },
    titleLine: {
        flex: 1, 
        height: 1, 
        backgroundColor: '#00557A'
    },
    titleStyle: {
        width: 180, 
        textAlign: 'center', 
        color: '#00557A', 
        fontSize: 20, 
        fontWeight: 'bold'
    },
    buttonStyle: {
        justifyContent: 'flex-start'
    },
    buttonTitleStyle: {
        fontStyle: 'italic', 
        fontSize: 15, 
        textDecorationLine: 'underline', 
        color: '#00557A'
    },
    controlsWrapper: {
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: "wrap", 
        alignItems: "stretch", 
        justifyContent: "space-between",
        marginTop: 20
    },
    inputStyle: {
        fontSize: 20, 
        borderWidth: 1, 
        borderRadius: 10, 
        borderColor: '#00557A', 
        padding: 5
    },
    categoryWrapper: {
        flex: 1,
        alignItems: "center"
    },
    categoryTitle: {
        textAlign: 'left', 
        alignSelf: 'flex-start', 
        marginLeft: 15, 
        color: '#848484', 
        fontWeight: 'bold', 
        fontSize: 16, 
        margin: 0
    },
    pickerWrapper: {
        borderWidth: 1, 
        borderColor: '#00557A',
        width: '95%', 
        margin: 10, 
        borderRadius: 10, 
        fontSize: 30, 
        padding: 10
    },
    textInput: {
        fontSize: 20, 
        borderWidth: 1, 
        borderRadius: 10, 
        borderColor: '#00557A', 
        padding: 5
    },
    fileButtonStyle: {
        alignItems: 'flex-start', 
        justifyContent: 'flex-start',
        marginBottom: 20
    },
    fileButtonTitleStyle: {
        textDecorationLine: 'underline', 
        fontStyle: 'italic', 
        fontSize: 20, 
        color: '#00557A',
        marginLeft: 10
    }
});

export { ArticleEditStyles }