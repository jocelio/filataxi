import React, {Component} from 'react';
import { DrawerItems } from 'react-navigation';
import {Text, Image, StyleSheet, Platform} from "react-native";
import { Container, Content, Header, Body } from 'native-base'
import { connect } from "react-redux";

class CustomDrawerContent extends Component {

    render(){

        const {userInfo} = this.props
    if(!userInfo) return null;
        const {picture = ''} = userInfo
        return (<Container>
            <Header style={styles.drawerHeader}>
                <Body>
                <Image
                    style={styles.drawerImage}
                    source={{uri: picture }}/>
                <Text style={{fontWeight: 'bold', fontSize: 20}}>{userInfo.nickname}</Text>
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
        userInfo: state.loginReducer.userInfo
    }
}


export default connect(mapStateToProps, null)(CustomDrawerContent)

const styles = StyleSheet.create({
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

