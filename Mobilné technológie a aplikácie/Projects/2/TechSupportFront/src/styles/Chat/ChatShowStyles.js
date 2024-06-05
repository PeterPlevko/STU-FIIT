import { StyleSheet } from "react-native";

const ChatShowStyles = StyleSheet.create({
    titleWrapper: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 30
    },
    titleLine: {
        flex: 1, 
        height: 1, 
        backgroundColor: '#00557A'
    },
    titleStyle: {
        width: 150, 
        textAlign: 'center', 
        color: '#00557A', 
        fontSize: 20
    },
    controlsWrapper: {
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: "wrap", 
        alignItems: "center", 
        justifyContent: "space-between",
    },
    buttonWrapper: {
        margin: 10, 
    },
    messageSendWrapper: {
        backgroundColor: 'white', 
        borderColor: '#00557A', 
        borderRadius: 10, 
        borderWidth: 2, 
        padding: 10, 
        marginBottom: 20
    },
    messageWrapperFrom: {
        //flexDirection: 'column', 
        alignItems: 'flex-start', 
        justifyContent: 'flex-start', 
        backgroundColor: 'white',
        borderColor: '#00557A', 
        borderWidth: 2,
        padding: 20, 
        marginTop: 30, 
        borderRadius: 15,
        width: "70%"
    },
    loadingStyle: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        height: 200
    },
    inputStyle: {
        flex: 1, 
        maxHeight: 100, 
        textAlign: 'left',
    },
    sendButtonStyle: {
        maxHeight: 60, 
        justifyContent: 'flex-end', 
        alignContent: 'flex-end'
    },
    messageWrapperTo: { 
        alignItems: 'flex-end', 
        justifyContent: 'flex-end', 
        backgroundColor: 'white',
        borderColor: '#00557A', 
        borderWidth: 2,
        padding: 20, 
        marginTop: 30, 
        borderRadius: 15,
        width: "70%"
    },
    messageSender: {
        textAlign: 'left', 
        marginLeft: 30, 
        fontWeight: 'bold', 
        fontSize: 15, 
        marginBottom: 10
    },
    unreadMessages: {
        color: 'white', 
        backgroundColor: '#00557A', 
        margin: 0, 
        borderRadius: 30,
        minWidth:25, 
        padding: 1, 
        textAlign: 'center', 
        marginLeft: 10
    }
});

export { ChatShowStyles }