
import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Input, Button } from 'react-native-elements';
import {connect} from 'react-redux';


function HomeScreen(props) {
    const [userName, setUserName] = useState('');

    const onButtonPress = () => {
        props.navigation.navigate('BottomNavigation', {screen: 'GalleryScreen'});
        props.onPressSaveUserName(userName);
    }

    return(
    <ImageBackground source={require('../assets/home.jpg')} style={styles.background}>
    <View style={styles.container}>
        <Input
            inputContainerStyle={styles.input}
            placeholder='Enter user name'
            leftIcon={{ type: 'font-awesome', name: 'user' , color:'#009788'}}
            onChangeText={(e)=> setUserName(e) }
            value={userName}
        />
        <Button
            title="Go to Gallery"
            buttonStyle={styles.btn}
            onPress={() => onButtonPress()}
        >
            Go to Gallery
        </Button>
    </View>
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    background: {
        flex:1,
    },
    btn: {
        backgroundColor:'#009788',
        color: '#FFFFFF'
    },
    input: {
        width: '60%',
        marginRight:'auto',
        marginLeft:'auto'
    }
  });

function mapDispatchToProps(dispatch) {
    return {
      onPressSaveUserName: function(userName) {
          dispatch( {type: 'saveUserName', userName} )
      }
    }
}
    
export default connect(null,mapDispatchToProps)(HomeScreen);