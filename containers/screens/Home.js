/**
 * Created by jocelio on 14/02/18.
 */
import React, {Component} from "react";
import { connect } from 'react-redux';
import {Text, View, ListView, ActivityIndicator, StyleSheet, Alert} from "react-native";
import {Button, Container, Content} from 'native-base'
import MenuSettings from "../common/MenuSettings";
import CustomHeader from '../common/CustomHeader'
import {onSignOut} from "../../auth/auth";

import { getData } from '../../actions';

class Home extends Component {

    static navigationOptions = MenuSettings({label:'Home',iconName:'home'});

    constructor(props) {
        super(props);
        this.state = {loading:false};

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            ds: ds
        };
    }

    componentDidMount() {
        this.props.getData();
    }

    render() {

        const comp = (this.props.loading) ?
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator
                    animating={true}
                    style={[{height: 80, width:80}]}
                    size="large"
                />
            </View>
            :
            <View style={{flex:1, backgroundColor: '#F5F5F5', paddingTop:20}}>
                <ListView enableEmptySections={true}
                          dataSource={this.state.ds.cloneWithRows(this.props.data)}
                          renderRow={this.renderRow.bind(this)}/>
            </View>

        return (
            <Container>

                <CustomHeader title={Home.navigationOptions.tapBarLabel} drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />

                <Content contentContainerStyle={{ flex: 2, alignItems: 'center', justifyContent: 'center', padding: 10 }}>

                    <Text>Home Screen :D</Text>

                    <Button onPress={() => onSignOut().then(() => this.props.navigation.navigate("SignedOut"))}
                    full>
                        <Text style={{ color: 'white' }}>Sair</Text>
                    </Button>

                    {comp}

                </Content>

            </Container>
        );
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <View style={styles.row} key={rowData.description}>
                <Text style={styles.title}>
                    {(parseInt(rowID) + 1)}{". "}{rowData.title}
                </Text>
                <Text style={styles.description}>
                    {rowData.description}
                </Text>
            </View>
        )
    }

}

function mapStateToProps(state) {
    return {
        loading: state.dataReducer.loading,
        data: state.dataReducer.data
    }
}

export default connect(mapStateToProps, { getData })(Home)


const styles = StyleSheet.create({
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
        padding: 10
    },

    title:{
        fontSize: 15,
        fontWeight: "600"
    },

    description:{
        marginTop: 5,
        fontSize: 14,
    }
});

