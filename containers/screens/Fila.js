/**
 * Created by jocelio on 14/02/18.
 */
import React, {Component} from "react";
import { connect } from 'react-redux';
import {Text, View, ListView, ActivityIndicator, StyleSheet, TouchableHighlight, Alert} from "react-native";
import {Button, Container, Content, List, ListItem, Card, Form, Picker, Item, ActionSheet} from 'native-base'
import MenuSettings from "../common/MenuSettings"
import CustomHeader from '../common/CustomHeader'
import _ from 'lodash'
import { getFila, move, changeStatus, moveHead } from "../../actions/fila"
import SortableListView from 'react-native-sortable-listview'


class Fila extends Component {

    static navigationOptions = MenuSettings({label:'Fila',iconName:'toc'});

    constructor(props) {
        super(props);
        this.state = {loading:false};
    }

    componentDidMount() {
        this.setState( prev => ({loading: !prev.loading}))
        this.props.getFila().then(r => {
            if(_.isEmpty(this.props.filaList)){
              Alert.alert('Fila não organizada','Enfileirar motoristas para iniciar trabalho.')
            }
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

    renderRow(position){
      return (
        <TouchableHighlight underlayColor={'green'} style={{backgroundColor: "#F8F8F8"}} key={position.id}>
          <Card style={styles.row}>
            <View style={styles.boxNumber} >
               <Text style={styles.titleNumber}>
                   {position.index}
               </Text>
            </View>
            <View style={styles.boxText} >
                <Text style={styles.title}>
                     {position.driver.name}
                 </Text>
            </View>

            <View style={styles.boxOpt} >
                  <Button style={{width:'100%', justifyContent: 'center'}}
                  onPress={() => ActionSheet.show(
                      {
                        options: position.index === 1? this.renderStatusSuper(position) : this.renderStatusItems(position),
                        cancelButtonIndex: 3,
                        title: "Ações"
                      },
                      buttonIndex => {
                        this.onValueChange(buttonIndex, position)
                      }
                    )}>
                      <Text>{position.status}</Text>
                  </Button>
            </View>
         </Card>
      </TouchableHighlight>
      )
    }

    renderStatusSuper(position){
        return [ position.status === 'AGUARDANDO' ? 'RODANDO': 'CHEGOU', 'Cancelar' ]
    }

    renderStatusItems(position){
        return [ position.status === 'AGUARDANDO' ? 'RODANDO': 'AGUARDANDO', 'Cancelar' ]
    }

    onValueChange(value, position){
      console.log('value',value)
        if(value == 1) return;

        this.props.changeStatus(position.id).then(() => {
           if(position.index === 1 && position.status == "RODANDO")
            this.props.moveHead()
           else
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
