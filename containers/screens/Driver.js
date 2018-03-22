/**
 * Created by jocelio on 14/02/18.
 */
import React, { Component } from "react";
import { connect } from 'react-redux';
import { View, ListView, ActivityIndicator, StyleSheet, Alert, TextInput } from "react-native";
import { Text, Button, Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Fab } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MenuSettings from "../common/MenuSettings";
import CustomHeader from '../common/CustomHeader'
import { getDrivers } from "../../actions/driver"



class Driver extends Component {

    static navigationOptions = MenuSettings({label:'Motoristas',iconName:'home'});

    constructor(props) {
        super(props);
        this.state = {loading:false};
    }

    componentDidMount() {
        this.setState({loading:true})
        this.props.getDrivers().then(() => this.setState({loading:false}));
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
          renderRow={ r =>
             <ListItem>
             <Thumbnail square size={80} source={{ uri: 'https://conteudo.startse.com.br/wp-content/uploads/2016/02/6208_2_L.jpg' }} />
               <Body>
                 <Text>{r.name}</Text>
                 <Text note> Usuário Ativo </Text>
               </Body>
               <Right>
                 <Text note>3:43 pm</Text>
               </Right>
              </ListItem>
          }/>


        return (
            <Container>

                <CustomHeader title={Driver.navigationOptions.tapBarLabel} drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />

                <Content contentContainerStyle={{alignItems: 'center', justifyContent: 'center', padding: 10}}
                alwaysBounceVertical={false}>

                  <View style={{width:'100%'}}>
                    {comp}
                  </View>

                </Content>
                <Fab
                active={this.state.active}
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={() => navigate('DriverNew', { name: 'Jane' }) }>
                 <MaterialIcons name='add' size={24} />
                </Fab>
            </Container>
        );
    }

}

function mapStateToProps(state) {
    return {
        loading: state.dataReducer.loading,
        driverList: state.driverReducer.driverList
    }
}

export default connect(mapStateToProps, { getDrivers })( Driver )

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
