import { StyleSheet } from "react-native";

const ForumIndexStyles = StyleSheet.create({
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
      flex: 1, 
      flexDirection: 'row', 
      flexWrap: "wrap", 
      alignItems: "stretch", 
      justifyContent: "space-between", 
      marginBottom: 20, 
      padding: 10
    },
    loadingStyle: {
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center", 
      height: 200
    },
    entryWrapper: {
      backgroundColor: 'white',
      borderRadius: 20,
      borderWidth: 2,
      borderColor: '#00557A',
      justifyContent: "center",
      alignItems: "flex-start",
      overflow: 'hidden',
      width: '100%',
      height: 100,
      padding: 10,
      paddingLeft: 20,
      marginBottom: 15,
      paddingTop: 0
    },
    entryTitle: {
      fontSize: 17,
      fontWeight: 'bold',
      marginVertical: 5,
      alignSelf: 'flex-start',
      flexWrap: 'wrap',
      maxWidth: '80%'
    },
    searchWrapper: {
      borderWidth: 2, 
      borderRadius: 20, 
      borderColor: '#00557A', 
      width: '70%',
      maxHeight: '60%',
      flexDirection: 'row',
      paddingHorizontal: 10, 
      fontSize: 20,
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    buttonStyle: { 
      color: "#00557A",
      marginRight: 20,
      marginTop: 2,
      borderRadius: 20
    },
    inputStyle: { 
      color: "#00557A",
      marginLeft: 15,
      maxWidth: '100%'
    },
    entryDetails: {
      fontSize: 15, 
      fontStyle: 'italic'
    }
  });

  export { ForumIndexStyles }