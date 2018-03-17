/**
 * Created by jocelio on 15/02/18.
 */
import React from 'react';
import {DrawerNavigator, StackNavigator, TabNavigator} from 'react-navigation';
import FirstScreen from './containers/screens/FirstScreen'
import AppLogin from './containers/screens/AppLogin'
import Home from './containers/screens/Home'
import CustomDrawerContent from './containers/common/CustomDrawerContent'
import Fila from "./containers/screens/Fila";

const SignedIn = DrawerNavigator(
    {
        Home:{
            path:'/home',
            screen: Home,
        },
        First:{
            path:'/first',
            screen: FirstScreen,
        },
        Fila:{
            path:'/fila',
            screen: Fila,
        }

    },
    {
        initialRouteName:'Home',
        drawerPosition:'left',
        drawerWidth: 300,
        contentOptions:{
            activeTintColor:'red'
        },
        contentComponent: CustomDrawerContent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle'
    }
);

const SignedOut = DrawerNavigator({ Login:{path:'/login', screen: AppLogin}}, {initialRouteName:'Login'});

export const createRootNavigator = (signedIn = false) => {
    return StackNavigator({
            SignedIn: {
                screen: SignedIn,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
            SignedOut: {
                screen: SignedOut,
                navigationOptions: {
                    gesturesEnabled: false
                }
            }
        },
        {
            headerMode: "none",
            mode: "modal",
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    );
};