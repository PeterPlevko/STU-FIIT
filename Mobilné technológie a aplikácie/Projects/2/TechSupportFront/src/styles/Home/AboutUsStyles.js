import { StyleSheet } from "react-native";

const AboutUsStyles = StyleSheet.create({
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
    titleWrapper: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 30
    },
    buttonWrapper: {
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: "wrap", 
        alignItems: "stretch", 
        justifyContent: "space-between", 
        padding: 10
    },
    infoWrapper: {
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        marginTop: 20, 
        marginLeft: 10
    },
    streetTitleStyle: {
        fontWeight: 'bold', 
        fontSize: 18, 
        marginBottom: 10
    },
    contactTitleStyle: {
        fontWeight: 'bold', 
        fontSize: 18, 
        marginBottom: 10, 
        marginTop: 40
    },
    infoStyle: {
        textAlign: 'left', 
        fontSize: 15
    },
    imageStyle: {
        width: '100%', 
        height: 100, 
        marginTop: 30
    }
});

export { AboutUsStyles }