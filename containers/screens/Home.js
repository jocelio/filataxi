/**
 * Created by jocelio on 14/02/18.
 */
import React, {Component} from "react";
import { connect } from 'react-redux';
import {Text, View, ListView, ActivityIndicator, StyleSheet, Alert,TouchableHighlight} from "react-native";
import {Button, Container, Content} from 'native-base'
import MenuSettings from "../common/MenuSettings";
import CustomHeader from '../common/CustomHeader'
import {onSignOut} from "../../auth/auth";
import SortableListView from 'react-native-sortable-listview'

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

        const order = Object.keys(this.props.data)
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
                <SortableListView
                  style={{ flex: 1 }}
                  data={this.props.data}
                  order={order}
                  onRowMoved={e => {
                    console.log(e.to, e.from)
                    order.splice(e.to, 0, order.splice(e.from, 1)[0])
                    this.forceUpdate()
                  }}
                  renderRow={(row, some) => this.renderRow(row, some)}
                />
            </View>

        return (
            <Container>

                <CustomHeader title={Home.navigationOptions.tapBarLabel} drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />

                <Content contentContainerStyle={{ flex: 2, alignItems: 'center', justifyContent: 'center', padding: 10}}
                alwaysBounceVertical={false}>

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

    renderRow(rowData, some){
      console.log(some)
      return (
        <TouchableHighlight underlayColor={'green'} style={{backgroundColor: "#F8F8F8"}}>
          <View style={styles.row}>
            <View style={styles.boxNumber} >
               <Text style={styles.titleNumber}>
                   {(1)}
               </Text>
            </View>
             <View style={styles.boxText} >
                <Text style={styles.title}>
                     {rowData.title}
                 </Text>

             </View>
         </View>

      </TouchableHighlight>


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