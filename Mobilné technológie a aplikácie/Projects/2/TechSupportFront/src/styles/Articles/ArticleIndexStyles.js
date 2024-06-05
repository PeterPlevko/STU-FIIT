import { StyleSheet } from "react-native";

const ArticleIndexStyles = StyleSheet.create({
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
        justifyContent: "space-between", 
        padding: 10
    },
    howtoTitle: {
        fontSize: 20, 
        fontStyle: 'italic', 
        marginTop: 20, 
        marginLeft: 15, 
        marginBottom: 15
    },
    loadingStyle: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        height: 200
    },
    entryWrapper: {
        width: '100%', 
        borderColor: '#00557A', 
        borderWidth: 2, 
        borderRadius: 20, 
        margin: 5, 
        alignSelf: 'center', 
        padding: 10, 
        paddingLeft: 20, 
        paddingBottom: 15, 
        minHeight: 110
    },
    entryTitle: {
        fontSize: 17, 
        fontWeight: 'bold',
        marginVertical: 5, 
        alignSelf: 'flex-start', 
        flexWrap: 'wrap', 
        maxWidth: '80%'
    },
    entryEdit: {
        textDecorationLine: 'underline', 
        color: "#00557A", 
        fontStyle: 'italic', 
        fontSize: 15, 
        alignSelf: 'flex-start', 
        marginEnd: 15, 
        marginVertical: 5
    },
    viewMoreLink: {
        fontSize: 15, 
        textDecorationLine: 'underline', 
        textAlign: 'center', 
        marginVertical: 15, 
        color: "#00557A"
    },
    messageStyle: {
        fontSize: 15, 
        textAlign: 'center', 
        fontStyle: 'italic', 
        marginTop: 20, 
        color: "black"
    },
    messageLinkStyle: {
        fontSize: 15, 
        textDecorationLine: 'underline', 
        textAlign: 'center', 
        marginVertical: 5, 
        color: "#00557A"
    },
    tipsTitle: {
        fontSize: 20, 
        fontStyle: 'italic', 
        marginTop: 30, 
        marginLeft: 15, 
        marginBottom: 15
    },
    buttonWrapper: {
        justifyContent: 'space-between', 
        flex: 1, 
        flexDirection: 'row'
    }
});

export { ArticleIndexStyles }