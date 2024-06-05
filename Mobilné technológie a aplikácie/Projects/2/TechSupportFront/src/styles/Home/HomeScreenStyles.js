import { StyleSheet } from "react-native";

const HomeScreenStyles = StyleSheet.create({
    imageStyle: {
      width: '100%', 
      height: 150, 
      marginTop: 20
    },
    titleWrapper: {
      flexDirection: 'row', 
      alignItems: 'center', 
      marginTop: 30, 
      marginBottom: 30
    },
    titleLine: {
      flex: 1, 
      height: 1, 
      backgroundColor: '#00557A'
    },
    titleStyle: {
      width: 180, 
      textAlign: 'center', 
      color: '#00557A', 
      fontSize: 20
    },
    loadingStyle: {
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center", 
      height: 200 
    },
    answersWrapper: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      width: '100%',
      margin: 0, 
      padding: 0
    },
    answers: {
      backgroundColor: '#00557A',
      borderRadius: 20,
      borderWidth: 2,
      borderColor: '#000',
      justifyContent: "center",
      alignItems: "center",
      overflow: 'hidden',
      width: '45%',
      height: 100,
      padding: 5,
      margin: 5,
    },
    answersTitle: {
      flex: 1, 
      color: '#fff',
      flexWrap: 'wrap'
    },
    answersDetails: {
      flex: 1,
      flexWrap: 'wrap',
      fontStyle: 'italic',
      alignSelf: 'flex-start',
      color: '#fff',
      marginStart: 5
    },
    more: {
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      color: '#00557A',
      alignSelf: 'center',
      marginTop: 10,
      marginBottom: 40
    },
    categoriesTitle: {
      fontWeight: 'bold',
      color: '#00557A',
      fontSize: 25,
      marginBottom: 20
    },
    categoriesWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
        margin: 0, 
        padding: 0,
        marginBottom: 30
      },
    bestPractices: {
      borderRadius: 20,
      backgroundColor: '#00557A',
      width: '60%',
      margin: 5,
      height: 75,
      alignItems: 'center',
      justifyContent: 'center'
    },
    chat: {
      borderRadius: 20,
      backgroundColor: '#00557A',
      width: '30%',
      margin: 5,
      height: 75,
      alignItems: 'center',
      justifyContent: 'center'
    },
    aboutUs: {
      borderRadius: 20,
      backgroundColor: '#00557A',
      width: '40%',
      margin: 5,
      height: 75,
      alignItems: 'center',
      justifyContent: 'center'
    },
    forum: {
      borderRadius: 20,
      backgroundColor: '#00557A',
      width: '50%',
      margin: 5,
      height: 75,
      alignItems: 'center',
      justifyContent: 'center'
    },
    category: {
      color: '#fff',
      fontSize: 22,
      fontStyle: 'italic',
    }
  });

  export { HomeScreenStyles }