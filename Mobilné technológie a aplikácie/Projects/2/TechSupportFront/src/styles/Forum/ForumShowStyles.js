import { StyleSheet } from "react-native";

const ForumShowStyles = StyleSheet.create({
    noCommentsWrapper: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        height: 20
    },
    commentControls: {
        flexDirection: 'row', 
        justifyContent: "flex-end", 
        alignItems: "flex-end", 
        marginTop: 10
    },
    commentData: {
        flex: 1, 
        color: 'white', 
        maxWidth: "90%",
        textAlign: "left"
    },
    commentsWrapper: {
        flexDirection: 'column', 
        justifyContent: "flex-end", 
        alignItems: "flex-end" 
    },
    entryWrapper: {
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: "flex-start", 
        alignItems: "flex-start", 
        backgroundColor: 'grey', 
        borderRadius: 10, 
        minHeight: 80, 
        marginBottom: 20, 
        padding: 10, textAlign: "left", textAlignVertical: "center"
    },
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
        width: 120, 
        textAlign: 'center', 
        color: '#00557A', 
        fontSize: 20
    },
    controlsWrapper: {
        flexDirection: 'row', 
        flex: 1, 
        flexWrap: 'wrap', 
        justifyContent: "space-between", 
        alignItems: 'stretch'
    },
    questionTitle: {
        fontSize: 25, 
        fontWeight: 'bold', 
        fontStyle: 'italic', 
        marginTop: 20
    },
    questionDetails: {
        fontSize: 15, 
        color: '#909090', 
        fontStyle: 'italic', 
        marginVertical: 10, 
        marginTop: 20
    },
    questionText: {
        fontSize: 15, 
        fontStyle: 'italic', 
        marginTop: 35, 
        marginBottom: 40
    },
    progressBar: {
        fontSize: 20, 
        color: '#404040', 
        fontWeight: 'bold'
    },
    imageStyle: {
        fontSize: 20, 
        fontWeight: 'bold', 
        textAlign: 'left',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    addCommentStyle: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 50
    },
    commentTitleStyle: {
        flex: 1, 
        fontSize: 20, 
        fontWeight: 'bold', 
        fontStyle: 'italic'
    },
    commentInputStyle: {
        backgroundColor: 'white', 
        borderColor: '#00557A', 
        borderRadius: 10, 
        borderWidth: 2, 
        padding: 10, 
        marginBottom: 20
    },
    inputContainerStyle: {
        flex: 1, 
        maxHeight: 100, 
        textAlign: 'left'
    },
    sendCommentButtonStyle: {
        maxHeight: 60, 
        justifyContent: 'flex-end', 
        alignContent: 'flex-end'
    },
    loadingStyle: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        height: 200
    },
    editButtonTitleStyle: {
        fontStyle: 'italic', 
        fontSize: 15, 
        textDecorationLine: 'underline', 
        color: '#00557A'
    }
});

export { ForumShowStyles }