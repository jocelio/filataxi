/**
 * Created by jocelio on 14/02/18.
 */
import React, {Component} from "react";
import { connect } from 'react-redux';
import {Text, View, ListView, ActivityIndicator, StyleSheet, TouchableHighlight, Alert} from "react-native";
import {Button, Container, Content, List, ListItem, Card, Form, Picker, Item} from 'native-base'
import MenuSettings from "../common/MenuSettings"
import CustomHeader from '../common/CustomHeader'
import { getFila, move, changeStatus, moveHead } from "../../actions/fila"
import SortableListView from 'react-native-sortable-listview'


class Fila extends Component {

    static navigationOptions = MenuSettings({label:'Fila',iconName:'toc'});

    constructor(props) {
        super(props);
        this.state = {loading:false};

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            ds: ds
        };
    }

    componentDidMount() {
        this.setState( prev => ({loading: !prev.loading}))
        this.props.getFila().then(r => {
            this.setState( prev => ({loading: !prev.loading}));
        });
    }

    render() {
        const order = Object.keys(this.props.filaList)
        const comp = (this.state.loading) ?
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator
                    animating={true}
                    style={[{height: 80, width:80}]}
                    size="large"
                />
            </View>
            :
            <View style={{backgroundColor: '#F5F5F5', paddingTop:20, height:'100%' }}>
                <SortableListView
                 moveOnPressIn={true}
                 limitScrolling={true}
                  style={{ flex: 1 }}
                  data={this.props.filaList}
                  order={order}
                  onRowMoved={e => {

                    if(e.to === 0 || e.to > e.from) return;
                    Alert.alert(
                      'Movimentação',
                      'Deseja realmente realizar essa movimentação?',
                      [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => {
                          const {id} = e.row.data
                          this.props.move({id, positions: e.from-e.to})
                          order.splice(e.to, 0, order.splice(e.from, 1)[0])
                          //this.forceUpdate()
                        }},
                      ],
                      { cancelable: false }
                    )
                  }}
                  renderRow={(row) => this.renderRow(row)}
                />

            </View>

        return (
            <Container>

                <CustomHeader title={Fila.navigationOptions.tapBarLabel} drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />

                <Content alwaysBounceVertical={false}>

                    {comp}

                </Content>

            </Container>
        );
    }

    renderRow(rowData){
      return (
        <TouchableHighlight underlayColor={'green'} style={{backgroundColor: "#F8F8F8"}}>
          <Card style={styles.row}>
            <View style={styles.boxNumber} >
               <Text style={styles.titleNumber}>
                   {rowData.index}
               </Text>
            </View>
            <View style={styles.boxText} >
                <Text style={styles.title}>
                     {rowData.driver.name}
                 </Text>
            </View>

            <View style={styles.boxOpt} >
                  <Button style={{width:'100%', justifyContent: 'center'}}>
                      <Picker
                        textStyle={{color:'white', fontWeight:'bold', fontSize:12}}
                        mode="dropdown"
                        placeholder={rowData.status}
                        iosHeader="Status"
                        mode="dropdown"
                        selectedValue={rowData.status}
                        onValueChange={value => this.onValueChange(value, rowData)}
                      >
                        {rowData.index === 1 && rowData.status === 'RODANDO'? this.renderStatusSuper() : this.renderStatusItems()}
                      </Picker>
                  </Button>

            </View>
         </Card>
      </TouchableHighlight>
      )
    }

    renderStatusSuper(){
        return [ <Item label="RODANDO" value="RODANDO" />
                , <Item label="CHEGOU" value="CHEGOU" />]
    }

    renderStatusItems(){
        return [ <Item label="AGUARDANDO" value="AGUARDANDO" />
                , <Item label="RODANDO" value="RODANDO" /> ]
    }

    onValueChange(value, rowData){
        if(value === "CHEGOU"){
          this.props.changeStatus(rowData.id).then(() =>  {
            this.props.moveHead()
          })
          return;
        }

        this.props.changeStatus(rowData.id).then(() => {
          this.props.getFila()
        })
    }

}

function mapStateToProps(state) {
    return {
        filaList: state.filaReducer.filaList || []
    }
}

export default connect(mapStateToProps, { getFila, move, changeStatus, moveHead })(Fila)


const styles = StyleSheet.create({
    boxNumber:{
      alignItems: 'center',
      justifyContent: 'center',
      width: '14%',
      padding: 4,
      backgroundColor: '#1B9CFC'
    },
    boxText:{
      padding:3,
      justifyContent: 'center',
      width: '50%', backgroundColor: '#F1F1F1'
    },
    boxOpt:{
      padding:3,
      justifyContent: 'center',
      width: '36%', backgroundColor: '#F1F1F1'
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
        padding: 0,
        flex: 1,
        flexDirection: 'row'
    },
    title:{
        fontSize: 15,
        fontWeight: "700"
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
