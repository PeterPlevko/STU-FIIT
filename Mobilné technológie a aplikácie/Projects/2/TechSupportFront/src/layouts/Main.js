import { ScrollView, StyleSheet, View } from 'react-native';
import TechHeader from '../parts/Header';
import TechFooter from '../parts/Footer';


const Layout = ({ children }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            width: '100%',
            height: '100%',
            alignItems: 'center'
        },
        scroll: {
            width: '90%'
        }
    });

    return (
        <View style={styles.container}>
            <TechHeader/>
                <ScrollView style={styles.scroll}>
                    { children }
                </ScrollView>
            <TechFooter/>
        </View>
    );
}

export default Layout;