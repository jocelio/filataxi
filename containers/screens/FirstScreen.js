/**
 * Created by jocelio on 14/02/18.
 */
import React, { Component } from 'react';
import { Text } from "react-native";
import { Button, Container, Content} from 'native-base'
import MenuSettings from '../common/MenuSettings'
import CustomHeader from '../common/CustomHeader'
import Home from './Home'

export default class FirstScreen extends Component {

    static navigationOptions = MenuSettings({label:'First Screen',iconName:'change-history'});

    render() {
        return (
            <Container>

                <CustomHeader title={FirstScreen.navigationOptions.tapBarLabel} drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />

                <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>

                    <Text>First Screen</Text>

                    <Button onPress={() => this.props.navigation.navigate('Home')} full>
                        <Text style={{ color: 'white' }}>Go To Home Screen</Text>
                    </Button>
                </Content>

            </Container>
        );
    }
}

