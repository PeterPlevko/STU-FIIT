import { StyleSheet } from "react-native";

const ArticleIndexAllStyles = StyleSheet.create({
    titleWrapper: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    titleLine: {
        flex: 1, 
        height: 1, 
        backgroundColor: '#00557A', 
        marginTop: 20
    },
    titleStyle: {
        width: 180, 
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
        justifyContent: "flex-start", 
        marginTop: 20
    },
    inputStyle: {
        color: "#00557A",
        marginLeft: 15,
        width: '100%'
    },
    buttonStyle: {
        color: "#00557A",
        marginRight: 20,
        marginTop: 2,
        borderRadius: 20
    },
    searchWrapper: {
        flex: 2,
        borderWidth: 2, 
        borderRadius: 20, 
        borderColor: '#00557A', 
        maxWidth: '70%',
        maxHeight: '60%',
        flexDirection: 'row',
        paddingHorizontal: 10, 
        fontSize: 20,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    loadingStyle: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        height: 200
    },
    articleWrapper: {
        width: '100%', 
        borderColor: '#00557A', 
        borderWidth: 2, 
        borderRadius: 20, 
        margin: 5, 
        alignSelf: 'center', 
        padding: 10
    },
    articleTitleWrapper: {
        justifyContent: 'space-between', 
        flex: 1, 
        flexDirection: 'row'
    },
    articleTitle: {
        fontSize: 20, 
        fontWeight: 'bold', 
        marginVertical: 5, 
        alignSelf: 'flex-start', 
        flexWrap: 'wrap', 
        maxWidth: '80%'
    },
    editButton: {
        textDecorationLine: 'underline', 
        fontStyle: 'italic', 
        fontSize: 17, 
        alignSelf: 'flex-start', 
        marginEnd: 30, 
        marginVertical: 5
    },
    autorStyle: {
        fontSize: 15, 
        fontStyle: 'italic'
    }
});

export { ArticleIndexAllStyles }