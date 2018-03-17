import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { Alert, View } from 'react-native';
import {createRootNavigator} from "./Routes";
import {isSignedIn} from './auth/auth'
import store from './store';

export default class App extends Component{

    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            checkedSignIn: false
        };
    }

    componentWillMount() {
        isSignedIn()
            .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
            .catch(err => Alert.alert("An error occurred"));
    }

    render() {
        const { checkedSignIn, signedIn } = this.state;

        if (!checkedSignIn) { return null;}

        const Layout = createRootNavigator(signedIn);
        return (<Provider store={store}>
                    <Layout />
                </Provider>);
    }
}
