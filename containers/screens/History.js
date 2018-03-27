/**
 * Created by jocelio on 14/02/18.
 */
import React, { Component } from "react";
import { connect } from 'react-redux';
import { Text, View, ListView, ActivityIndicator, StyleSheet, Alert, TouchableHighlight } from "react-native";
import { Button, Container, Content,  List, ListItem, Body } from 'native-base'
import MenuSettings from "../common/MenuSettings";
import CustomHeader from '../common/CustomHeader'

import { getHistory } from '../../actions/history';

class History extends Component {

    static navigationOptions = MenuSettings({label:'History',iconName:'home'});

    constructor(props) {
        super(props);
        this.state = {loading:false};
    }

    componentDidMount() {
        this.setState({loading:true})
        this.props.getHistory().then(() => {
            this.setState({loading:false})
        });
    }

    render(){

    const comp = (this.state.loading) ?
        <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator
                animating={true}
                style={[{height: 80, width:80}]}
                size="large"
            />
        </View>
        :<List
        dataArray={this.props.historyList}
        renderRow={ history =>
           <ListItem key={history.id}>
             <Body>
               <Text>{history.description}</Text>
             </Body>
            </ListItem>
        }/>

        return (
            <Container>

                <CustomHeader title={History.navigationOptions.tapBarLabel} drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />

                <Content contentContainerStyle={{ flex: 2, alignItems: 'center', padding: 10}}
                alwaysBounceVertical={false}>

                    <Text>Historico</Text>

                    <View style={{width:'100%'}}>
                      {comp}
                    </View>

                </Content>

            </Container>


        );
    }

}

function mapStateToProps(state) {
    return {
        historyList: state.historyReducer.historyList
    }
}

export default connect(mapStateToProps, { getHistory })(History)


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
