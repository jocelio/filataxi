/**
 * Created by jocelio on 17/02/18.
 */
import React, {Component} from 'react'
import { StyleSheet, View, TextInput, Text, Alert, AsyncStorage, ActivityIndicator} from 'react-native'
import { Button, Container, Content} from 'native-base'
import { connect } from 'react-redux';
import MenuSettings from '../containers/common/MenuSettings'
import CustomHeader from '../containers/common/CustomHeader'
import { saveDriver, updateDriver } from '../actions/driver'
import _ from 'lodash'

class DriverNew extends Component {

    constructor(props){
        super(props)
        this.state = { loading: false, driver: {name:'', email:''}}
    }

    componentWillMount(){
      const {driver} = this.props.navigation.state.params
      // if(driver)
      this.setState({driver})
    }

    render() {

       return (<Container>

           <Content alwaysBounceVertical={false}>

           <View style={styles.container}>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder='Nome'
                        returnKeyType='next'
                        onSubmitEditing={() => this.emailInput.focus()}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(name) => this.setState({ driver:{...this.state.driver, name: name}})}
                        value={this.state.driver.name}

                    />
                    <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        returnKeyType='next'
                        ref={(input) => this.emailInput = input}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(email) => this.setState({ driver:{...this.state.driver, email: email}})}
                        value={this.state.driver.email}

                    />
                </View>
                <View style={{backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}>
                    <Button title={'Salvar'}
                            disabled={this.state.loading}
                            onPress={() => this.save()} full>
                        {(this.state.loading)
                          ?  <ActivityIndicator
                              animating={true}
                              style={[{height: 80, width:80}]}
                              size="small"/>
                              : <Text style={styles.button}>{'Salvar'} </Text>}
                    </Button>
                </View>
            </View>

           </Content>

       </Container>)

    }

    save(){
        const { driver } = this.state

        if(_.isNil(driver.name) || _.isNil(driver.email)){
          Alert.alert('Nome e email são obrigatórios')
          return;
        }

        if(driver.id){
          this.props.updateDriver(driver).then(() => this.back())
          return;
        }
        this.props.saveDriver(driver).then(()=> this.back())
    }

    back(){
      this.props.navigation.navigate('Driver')
    }


}

function mapStateToProps(state, props) {
    return {
    }
}

export default connect(mapStateToProps, { saveDriver, updateDriver })(DriverNew)

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
        , color:'#000'
        , paddingHorizontal:10
        , fontSize: 20
    }
})
