/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, StatusBar, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle,setToggle] = useState(false);

  const handleChangeToggle = () => {
    if(toggle) {
      setToggle(false);
    }else { setToggle(true)}
  }

  useEffect( ()=> {
    // liga e desliga o flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect( ()=> {
    // Quando o celular for chaqualhado o toggle ativa ou desativa
    // true e false
    const subscription = RNShake.addListener( ()=> {
      if(toggle) {
        setToggle(false);
      }else { setToggle(true)}
    });

    return ()=> { subscription.remove() }; 
  }, []);

  return(
    <SafeAreaView style={ toggle ? style.containerlight : style.container}>
      <StatusBar 
        backgroundColor={ toggle ? 'white' : 'black'} 
        barStyle={ toggle ? 'dark-content' : 'light-content'}/>
      <TouchableOpacity onPress={handleChangeToggle}>
        <View>
            <Image style={toggle ? style.lighttingOn : style.lighttingOff}
            source={
              toggle ? 
                require('./assets/icons/eco-light.png')
              :
                require('./assets/icons/eco-light-off.png')
              }/>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default App;

const style = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerlight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lighttingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lighttingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },  


});