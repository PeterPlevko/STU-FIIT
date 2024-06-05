import { StyleSheet } from "react-native";

const ArticleShowStyles = StyleSheet.create({
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
        justifyContent: "space-between"
    },
    loadingStyle: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        height: 200
    },
    articleWrapper: {
        marginTop: 10, 
        marginBottom: 20
    },
    articleTitle: {
        fontSize: 25, 
        fontWeight: 'bold', 
        fontStyle: 'italic', 
        marginTop: 20
    },
    autorStyle: {
        fontSize: 15, 
        color: '#909090', 
        fontStyle: 'italic', 
        marginVertical: 10, 
        marginTop: 20
    },
    articleText: {
        fontSize: 15, 
        fontStyle: 'italic', 
        marginTop: 35, 
        marginBottom: 35
    },
    progressText: {
        fontSize: 20, 
        color: '#404040', 
        fontWeight: 'bold'
    },
    imageTitle: {
        fontSize: 25, 
        fontWeight: 'bold', 
        textAlign: 'left'
    },
    imageStyle: {
        width: '100%',  
        aspectRatio: 1, 
        resizeMode:'contain' 
    },
    fileStyle: {
        fontSize: 23, 
        fontWeight: 'bold'
    }
});

export { ArticleShowStyles }