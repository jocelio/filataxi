/**
 * Created by jocelio on 14/02/18.
 */
import React, { Component } from "react";
import { connect } from 'react-redux';
import { View, ActivityIndicator, StyleSheet, Alert, TouchableHighlight, Image, RefreshControl } from "react-native";
import { Text, Container, Content, List, ListItem, Body, Right, Fab, ActionSheet } from 'native-base'
import _ from 'lodash'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MenuSettings from "../common/MenuSettings";
import CustomHeader from '../common/CustomHeader'
import { getDrivers, removeDriver, toggleStatus } from "../../actions/driver"
import Images from '../../assets/images'


class Driver extends Component {

    static navigationOptions = MenuSettings({label:'Motoristas',iconName:'group'});

    constructor(props) {
        super(props);
        this.state = {loading:false};
    }

    componentDidMount() {
        this.setState({loading:true})
        this.props.getDrivers().then(() => {
            this.setState({loading:false})
        });
    }

    render() {

      const { navigate } = this.props.navigation;

      const comp = (this.state.loading) ?
          <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator
                  animating={true}
                  style={[{height: 80, width:80}]}
                  size="large"
              />
          </View>
          :<List
          dataArray={this.props.driverList}
          renderRow={ driver =>
             <ListItem key={driver.id}>

               <Image style={{width:60, height:60}} source={Images.loginLogo} />
               <Body>
                 <Text>{driver.name}</Text>
                 <Text note>{driver.email} - {driver.enabled?'Ativo':'Inativo'} </Text>
               </Body>
               <Right>
                  {this.props.isUserAdmin &&
                  <TouchableHighlight underlayColor={'gray'}
                      onPress={() => ActionSheet.show(
                          {
                            options: ["Editar", "Excluir", driver.enabled? "Desativar": 'Ativar',"Cancel"],
                            cancelButtonIndex: 4,
                            title: "Ações"
                          },
                          buttonIndex => {
                            this.action(buttonIndex, driver)
                          }
                        )}>
                    <MaterialIcons name='settings' size={24} style={{color:'black'}}/>
                  </TouchableHighlight>
                  }
               </Right>
              </ListItem>
          }/>


        return (
            <Container>

                <CustomHeader title={Driver.navigationOptions.tapBarLabel} drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />

                <Content contentContainerStyle={{alignItems: 'center', justifyContent: 'center', padding: 10}}
                alwaysBounceVertical={true}>

                  <View style={{width:'100%'}}>
                    {comp}
                  </View>

                </Content>
                {this.props.isUserAdmin &&
                  <Fab
                  active={this.state.active}
                  direction="up"
                  containerStyle={{ }}
                  style={{ backgroundColor: '#5067FF' }}
                  position="bottomRight"
                  onPress={() => navigate('DriverNew', { name: 'Jane' }) }>
                   <MaterialIcons name='add' size={24} />
                  </Fab>
               }
            </Container>
        );
    }

    action(value, driver){
      switch (value) {
          case 0:
              this.props.navigation.navigate('DriverNew', { driver });
          break;
          case 1:
              Alert.alert(
                'Exclusão',
                'Deseja realmente excuir?',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'OK', onPress: () => {
                    this.props.removeDriver(driver)
                  }},
                ],
                { cancelable: false }
              )
          break;
          case 2:
          Alert.alert(
            driver.enabled?`Desativar`:`Ativar` + ` ${driver.name}?` ,
            driver.enabled?'Desativar o status removerá o motorista da fila, confirma essa ação?':'Confirma alteração do status?',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => {
                this.props.toggleStatus(driver)
              }},
            ],
            { cancelable: false }
          )

          break;
        }


    }
}

function mapStateToProps(state) {
    return {
        loading: state.dataReducer.loading,
        driverList: state.driverReducer.driverList,
        isUserAdmin: state.loginReducer.isUserAdmin
    }
}

export default connect(mapStateToProps, { getDrivers, removeDriver, toggleStatus })( Driver )

const styles = StyleSheet.create({
    boxNumber:{
      alignItems: 'center',
      justifyContent: 'center',
      width: '20%',
      padding: 4,
      backgroundColor: '#1B9CFC'
    },
    input:{
          height:50
        , backgroundColor:'rgba(255,255,255,0.3)'
        , marginBottom: 20
        , color:'#FFF'
        , paddingHorizontal:10
        , fontSize: 20
    },
    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

});
