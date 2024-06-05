import { StyleSheet } from "react-native";

const SettingScreenStyles = StyleSheet.create({
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
        width: 130, 
        textAlign: 'center', 
        color: '#00557A', 
        fontSize: 20
    },
    buttonWrapper: {
        margin: 10, 
        flex: 1, 
        alignItems: 'flex-start'
    },
    screenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputWrapperEnabled: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 10, 
        marginBottom: 20
    },
    inputWrapperDisabled: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 10
    },
    settingsEntryStyle: {
        flex: 1, 
        textAlign: 'left', 
        color: '#00557A', 
        fontSize: 15
    },
    separatorLine: {
        borderWidth: 0.5, 
        width: "100%", 
        borderColor: '#00557A', 
        marginTop: 5
    },
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000',
        backgroundColor: '#006D9B',
        color: 'white',
        padding: 5,
    },
    settingsWrapper: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    link: {
        color: '#00557A',
        textDecorationLine: 'underline',
        fontStyle: 'italic',
    },
    buttonStyle: {
        backgroundColor: '#00557A',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginTop: 20,
        marginBottom: 40
    },
    buttonTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
    }
  });

export { SettingScreenStyles }