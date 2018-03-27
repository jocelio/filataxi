/**
 * Created by jocelio on 17/02/18.
 */
import React, {Component} from 'react'
import {StyleSheet, View, TextInput, Text, Alert, AsyncStorage, ActivityIndicator} from 'react-native'
import _ from 'lodash'
import { Button } from 'native-base'
import { login, userInfo, loggedDriver, isAdmin } from "../actions/login";
import { connect } from "react-redux";

class LoginForm extends Component {

    constructor(props){
        super(props)
        this.state = {user:'', loading: false}
    }

    render() {
       return <View style={styles.container}>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    returnKeyType='next'
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={(user) => this.setState({user})}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Senha'
                    returnKeyType='go'
                    secureTextEntry
                    ref={(input) => this.passwordInput = input}
                    onChangeText={(password) => this.setState({password})}
                />
            </View>
            <View style={{backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}>
                <Button title={'Login'}
                        disabled={this.state.loading}
                        onPress={() => this.doLogin()} full>
                    {(this.state.loading)
                      ?  <ActivityIndicator
                          animating={true}
                          style={[{height: 80, width:80}]}
                          size="small"/>
                          : <Text style={styles.button}>{'Login'} </Text>}
                </Button>
            </View>
        </View>
    }

    doLogin(){
        this.props.login({
            "username": this.state.user || 'jclls@hotmail.com',
            "password": this.state.password || 'zgyMTNjYjI3Yzc5ZjA'
        }).then(() => {
            if (!this.props.loginData || !this.props.loginData.access_token) {
                Alert.alert("Usuário ou senha incorretos.")
                throw "Usuário ou senha incorretos."
            }

            return this.props.isAdmin(this.props.loginData.id_token)
        }).then(() => {
            return AsyncStorage.multiSet([["access_token",this.props.loginData.access_token],["admin", this.props.isUserAdmin? "true":"false"]])
        }).then(() => {
            return this.props.userInfo()
        }).then(() => {
            return AsyncStorage.setItem("userInfo", JSON.stringify(this.props.userInfoData))
        }).then(() => {
            return this.props.loggedDriver(this.props.userInfoData.name.replace(".com",""))
        }).then(() => {
            return AsyncStorage.setItem("driver", JSON.stringify(this.props.appDriver || ''))
        }).then(() => {
            this.setState({loading: false})
            return this.props.navigation.navigate("SignedIn")
        }).catch( e =>{
            this.setState({loading: false})
            console.log(e)
        })
        this.setState({loading: true})
    }

}

function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        userInfoData: state.loginReducer.userInfo,
        loginData: state.loginReducer.loginData,
        appDriver:  state.loginReducer.appDriver,
        isUserAdmin: state.loginReducer.isUserAdmin
    }
}


export default connect(mapStateToProps, { login, userInfo, loggedDriver, isAdmin })(LoginForm)


const styles = StyleSheet.create({
    button:{
        color:'#FFF'
        , alignItems: 'center'
        , justifyContent: 'center'
        , paddingHorizontal:10

    },
    input:{
          height:50
        , backgroundColor:'rgba(255,255,255,0.3)'
        , marginBottom: 20
        , color:'#FFF'
        , paddingHorizontal:10
        , fontSize: 20
    }
})
