/**
 * Created by jocelio on 14/02/18.
 */
import React, { Component } from "react";
import { connect } from 'react-redux';
import { Text, View, ListView, ActivityIndicator, StyleSheet, Alert, TouchableHighlight } from "react-native";
import { Button, Container, Content } from 'native-base'
import MenuSettings from "../common/MenuSettings";
import CustomHeader from '../common/CustomHeader'
import { onSignOut } from "../../auth/auth";
import SortableListView from 'react-native-sortable-listview'

import { enqueueDrivers, initDrivers } from "../../actions/driver"

import { getData } from '../../actions';

class Home extends Component {

    static navigationOptions = MenuSettings({label:'Home',iconName:'home'});

    constructor(props) {
        super(props);
        this.state = {loading:false};
    }

    render() {

        return (
            <Container>

                <CustomHeader title={Home.navigationOptions.tapBarLabel} drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />

                <Content contentContainerStyle={{ flex: 2, alignItems: 'center', justifyContent: 'center', padding: 10}}
                alwaysBounceVertical={false}>

                    <Text>Home Screen :D</Text>

                    <Button onPress={() => onSignOut().then(() => this.props.navigation.navigate("SignedOut"))}
                    full style={{marginBottom: 4}}>
                        <Text style={{ color: 'white' }}>Sair</Text>
                    </Button>

                    <Button onPress={() => onSignOut().then(() => this.props.initDrivers().then(() => Alert.alert("Feito")) )}
                    full style={{marginBottom: 4}}>
                        <Text style={{ color: 'white' }}>Init </Text>
                    </Button>

                    <Button onPress={() => onSignOut().then(() => this.props.enqueueDrivers().then(() => Alert.alert("Feito")))}
                    full style={{marginBottom: 4}}>
                        <Text style={{ color: 'white' }}>Enfileirar</Text>
                    </Button>

                </Content>

            </Container>


        );
    }

}

function mapStateToProps(state) {
    return {
        loading: state.dataReducer.loading,
        data: state.dataReducer.data
    }
}

export default connect(mapStateToProps, { getData, enqueueDrivers, initDrivers })(Home)


const styles = StyleSheet.create({
    boxNumber:{
      alignItems: 'center',
      justifyContent: 'center',
      width: '20%',
      padding: 4,
      backgroundColor: '#1B9CFC'
    },
    boxText:{
      padding:3,
      justifyContent: 'center',
      width: '80%', backgroundColor: '#25CCF7'
    },
    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    row:{
        borderBottomWidth: 1,
        borderColor: "#ccc",
        // height: 50,
        padding: 0,
        flex: 1,
        flexDirection: 'row'
    },
    title:{
        fontSize: 15,
        fontWeight: "600"
    },
    titleNumber:{
      fontSize: 25,
      fontWeight: "600"
    },
    description:{
        marginTop: 5,
        fontSize: 14,
    }
});
