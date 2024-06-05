import { StyleSheet } from 'react-native';

const ArticleAddStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      marginBottom: 25
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
    titleWrapper: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 15
    },
    buttonWrapper: {
        flex: 1, 
        flexDirection: 'row', 
        flexWrap: "wrap", 
        alignItems: "stretch", 
        justifyContent: "space-between", 
        marginBottom: 20
    },
    inputs: {
        fontSize: 18, 
        borderWidth: 1, 
        borderRadius: 10, 
        borderColor: '#00557A', 
        padding: 5, 
        marginTop: 10
    },
    saveTitle: {
        fontStyle: 'italic', 
        fontSize: 15, 
        textDecorationLine: 'underline', 
        color: '#00557A'
    },
    categoryStyle: {
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
        fontSize: 10
    },
    btnTitleStyle: {
        textDecorationLine: 'underline', 
        fontStyle: 'italic', 
        fontSize: 20, 
        color: '#00557A', 
        marginBottom: 30
    }
});

export { ArticleAddStyles }