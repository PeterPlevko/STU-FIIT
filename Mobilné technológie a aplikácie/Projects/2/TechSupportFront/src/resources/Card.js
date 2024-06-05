import { Card } from "react-native-elements";
import { ScrollView, StyleSheet, View } from 'react-native';


const CardTextOnly = ({text, width}) => {
    const styles = StyleSheet.create({
        card: {
            backgroundColor: '#00557A',
            width: width,
        }
    });

    return (
        <Card style={styles.card}>
            {text}
        </Card>
    );
};

export default CardTextOnly;