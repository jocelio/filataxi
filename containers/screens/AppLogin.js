/**
 * Created by jocelio on 14/02/18.
 */
import React, { Component } from 'react';
import { Image, View, StyleSheet, Text } from "react-native";
import { Container, Content} from 'native-base'
import MenuSettings from '../common/MenuSettings'
import Images from '../../assets/images'
import LoginForm from '../../components/LoginForm'


export default class AppLogin extends Component {

    static navigationOptions = MenuSettings({label:'Login',iconName:'account-box'});

    render() {
        return (
            <Container>

                <Content contentContainerStyle={styles.content}>

                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={Images.loginLogo}
                        />
                        <Text style={styles.text}>FilaTaxi</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <LoginForm navigation={this.props.navigation}/>
                    </View>

                </Content>

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    content:{
          flex: 1
        , flexGrow:1
        , alignItems: 'center'
        , justifyContent: 'center'
        , padding: 10
        , backgroundColor:'#f1c40f'
    },
    logo:{
          width:180
        , height:180
    },
    text:{
        color:'#000'
        , marginTop:10
        , fontSize:22
        , fontWeight: 'bold'
        , fontFamily: 'Zapfino'
    },
    logoContainer:{
         alignItems: 'center'
        , justifyContent: 'center'
    },
    formContainer:{
        width: '100%'
    }
});
