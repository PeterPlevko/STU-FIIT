import { StyleSheet } from "react-native";

const ChatIndexStyles = StyleSheet.create({
    titleWrapper: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 20
    },
    titleStyle: {
        width: 150, 
        textAlign: 'center',
        color: '#00557A', 
        fontSize: 20
    },
    titleLine: {
        flex: 1,
        height: 1, 
        backgroundColor: '#00557A'
    },
    controlsWrapper: {
        flexDirection: 'row'
    },
    loadingStyle: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        height: 200
    },
    entryWrapper: {
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        justifyContent: 'center', 
        backgroundColor: 'white',
        borderColor: '#00557A', 
        borderWidth: 2,
        paddingTop: 20, 
        paddingBottom: 20, 
        marginTop: 30, 
        borderRadius: 15
    },
    messageSender: {
        textAlign: 'left', 
        marginLeft: 30, 
        fontWeight: 'bold', 
        fontSize: 15, 
        marginBottom: 10
    },
    messageTextStyle: {
        textAlign: 'left', 
        marginLeft: 30
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
    },
    messageWrapper: {
        flexDirection: 'row', 
        alignItems: 'baseline', 
        justifyContent: 'center'
    }
  });

  export { ChatIndexStyles }