import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button, Header } from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state={
      gameState: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
      ],
      currentPlayer: 1,
    }
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame=()=> {
    this.setState({gameState:
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]

    ],
    currentPlayer:1,
    });
  }

  getWinner =()=>{
    const NUM_TILES=3;
    var arr= this.state.gameState;
    var sum;

    //verifica los recuadros para ver si hay un ganador
    for (var i=0; i<NUM_TILES;i++){
      sum=arr[i][0]+arr[i][1]+arr[i][2];
      if(sum==3){return 1; }
      else if(sum==-3){return -1; };
    }

    //verifica las columnas
    for (var i=0;i<NUM_TILES; i++ ){
      sum= arr[0][i]+arr[1][i]+arr[2][i];
      if(sum==3){return 1; }
      else if(sum==-3){return -1; };
    }

    //chequea los diagonales
    sum= arr[0][0]+arr[1][1]+arr[2][2];
    if(sum==3){return 1; }
    else if(sum==-3){return -1; };

    sum= arr[2][0]+arr[1][1]+arr[0][2];
    if(sum==3){return 1; }
    else if(sum==-3){return -1; };

    //no hay ganadores
    return 0;
  }

  onTilePress = (row, col)=> {
    //esto nos permitira que no cambie el valor al presionar varias veces el mismo cuadro
    var value= this.state.gameState[row][col];
    if(value!==0){return; }

    //jugador actual
    var currentPlayer=this.state.currentPlayer;

    //presionar el recuadro que se quiere
    var arr= this.state.gameState.slice();
    arr[row][col]=currentPlayer;
    this.setState({gameState: arr});

    //cambio de jugador...
    var nextPlayer= (currentPlayer==1)?-1:1;
    this.setState({currentPlayer: nextPlayer});

    //verifica el ganador
    var winner= this.getWinner();
    if(winner==1){
      Alert.alert("Gana el Jugador 1");
      this.initializeGame();
    }else if (winner ==-1){
      Alert.alert("Gana el jugador 2");
      this.initializeGame();
     }
  }

  onNewGamePress=()=>{
    this.initializeGame();
  }


  renderIcon=(row,col)=>{
    var value=this.state.gameState[row][col];
    switch(value)
    {
      case 1: return <Icon name="close" style={styles.tileX}/>;
      case -1: return <Icon name="circle-outline" style={styles.tileO}/>;
      default: return <View />;
    }
  }


  render() {
    return (
      <View style={styles.container}>
     
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            <TouchableOpacity onPress={()=>this.onTilePress(0,0)} style={[styles.tile, { borderLeftWidth:0, borderTopWidth:0, }]}>
            {this.renderIcon(0,0)}
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.onTilePress(0,1)} style={[styles.tile, { borderTopWidth:0 }]}>
            {this.renderIcon(0,1)}
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.onTilePress(0,2)} style={[styles.tile, { borderTopWidth:0, borderRightWidth:0, }]}>
            {this.renderIcon(0,2)}
            </TouchableOpacity>
          </View>

        <View style={{flexDirection: "row"}}>
            <TouchableOpacity onPress={()=>this.onTilePress(1,0)} style={[styles.tile, { borderLeftWidth:0, }]}>
            {this.renderIcon(1,0)}
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.onTilePress(1,1)} style={[styles.tile,{ }]}>
            {this.renderIcon(1,1)}
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.onTilePress(1,2)} style={[styles.tile,{borderRightWidth:0, }]}>
            {this.renderIcon(1,2)}
            </TouchableOpacity>
          </View>

        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={()=>this.onTilePress(2,0)} style={[styles.tile, { borderLeftWidth:0, borderBottomWidth:0, }]}>
          {this.renderIcon(2,0)}
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>this.onTilePress(2,1)} style={[styles.tile, { borderBottomWidth:0,}]}>
          {this.renderIcon(2,1)}
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>this.onTilePress(2,2)} style={[styles.tile, { borderBottomWidth:0, borderRightWidth:0, }]}>
          {this.renderIcon(2,2)}
          </TouchableOpacity>
          </View>

          <View style={styles.reset}/>
          <Button title="Nuevo Juego" onPress={this.onNewGamePress} color="#9C27B0"/>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffa0bd',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile:{
    borderWidth:10,
    width:100,
    height:100,
    alignItems:"center",
    justifyContent:"center",
  },

  tileX:{
    color:"#ff1f88",
    fontSize:60,
  },

  tileO: {
    color: "#791c3f",
    fontSize:60,
  },

  reset:{
    marginTop: 80,
    
  },

});
