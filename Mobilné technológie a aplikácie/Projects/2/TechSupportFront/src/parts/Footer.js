import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';

class TechFooter extends Component {
    render() {
        const styles = StyleSheet.create({
            header: {
                borderTopEndRadius: 30,
                borderTopStartRadius: 30,
                marginHorizontal: 10,
                backgroundColor: '#00203E',
                height: 60,
                width: '95%',
                paddingTop: 10
            },
            text: {
                color: '#fff',
                justifyContent: 'center', 
                alignSelf: 'center', 
                alignItems: 'center', 
                fontSize: 15, 
                fontWeight: 'bold'
            }
        });

        return (
            <>
                <View style={styles.header}>
                    <Text style={styles.text}>
                        TechSupport
                    </Text>
                    <Text style={styles.text}>
                        © 2022
                    </Text>
                </View>
            </>
        );
    };
}

export default TechFooter;