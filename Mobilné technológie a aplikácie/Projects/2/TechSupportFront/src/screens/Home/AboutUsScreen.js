import Layout from "../../layouts/Main";
import { View, Text } from "react-native";
import { Icon, Image, Button } from 'react-native-elements';
import { AboutUsStyles } from "../../styles/Home/AboutUsStyles";


const AboutUsScreen = ({navigation}) => {

    const back = () => {
        navigation.goBack();
    }
    
    return (
        <Layout>            
            <View style={AboutUsStyles.titleWrapper}>
                <View style={AboutUsStyles.titleLine} />
                    <Text style={AboutUsStyles.titleStyle}>About Us</Text>
                <View style={AboutUsStyles.titleLine} />
            </View>

            <View style={AboutUsStyles.buttonWrapper}>
                <Button 
                    icon={<Icon name="arrow-left" type="font-awesome-5" size={30} color="#00557A"/>} 
                    type="clear" 
                    onPress={ back }
                />
            </View>

            <View style={AboutUsStyles.infoWrapper}>
                <Text style={AboutUsStyles.streetTitleStyle}>Where can you find us?</Text>
                <Text style={AboutUsStyles.infoStyle}>
                    TechSupport company{'\n'}
                    Support Street 14{'\n'}
                    Bratislava{'\n'}
                    12345
                </Text>

                <Text style={AboutUsStyles.contactTitleStyle}>Contact</Text>
                <Text style={AboutUsStyles.infoStyle}>
                    +421 918 123 456{'\n'}
                    tech@support.com{'\n'}
                </Text>
            </View>
            
            <Image source={require('../../../assets/splash.png')} style={AboutUsStyles.imageStyle}/>
        </Layout>
    )
};

export default AboutUsScreen;