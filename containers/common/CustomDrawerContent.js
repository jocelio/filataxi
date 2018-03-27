import React, {Component} from 'react';
import { DrawerItems } from 'react-navigation';
import {Text, Image, StyleSheet, Platform, AsyncStorage, ActivityIndicator, View} from "react-native";
import { Container, Content, Header, Body } from 'native-base'
import { connect } from "react-redux";

class CustomDrawerContent extends Component {

    constructor(props) {
        super(props);
        this.state = {loading:true};
    }

   componentDidMount(){
         this.setState({userInfo: this.props.userInfoData, loading: false})
   }

    render(){

        if(this.state.loading){
          return( <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator
                    animating={true}
                    style={[{height: 80, width:80}]}
                    size="large"
                />
            </View>)
          }

        const {userInfo} = this.state

        return (<Container>
                <Header style={styles.drawerHeader}>
                    <Body>
                      <Image
                          style={styles.drawerImage}
                          source={{uri: userInfo.picture }}/>
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>{userInfo.nickname} {this.props.isUserAdmin && "*"}</Text>
                      <Text style={{fontSize: 20}}>{userInfo.name}</Text>
                    </Body>
                </Header>
                <Content>
                    <DrawerItems {...this.props} />
                </Content>
        </Container>)
    }

}

function mapStateToProps(state) {
    return {
        userInfoData: state.loginReducer.userInfo,
        isUserAdmin: state.loginReducer.isUserAdmin
    }
}


export default connect(mapStateToProps, null)(CustomDrawerContent)

const styles = StyleSheet.create({
  activityIndicatorContainer:{
      backgroundColor: "#fff",
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
  },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawerHeader: {
        height: 200,
        backgroundColor: '#7f8c8d'
    },
    drawerImage: {
        height: 100,
        width: 100,
        borderRadius: Platform.OS === 'ios' ? 50 : 75,
    }
})
