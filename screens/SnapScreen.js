import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import { Camera } from 'expo-camera';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'; 
import { useIsFocused } from '@react-navigation/native';
import {connect} from 'react-redux';

function SnapScreen(props) {
    const isFocused = useIsFocused();
    // if(isFocused) { console.log('on SnapScreen'); }
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    let camera = useRef(null);
    // Overlay
    const [visible, setVisible] = useState(false);

    const onSnapPress = async () => {
        setVisible(true);
        if (camera) {
            const photo = await camera.takePictureAsync({quality: 0.3, base64: true, exif: true});
            const data = new FormData();
                data.append('snap', {
                    uri: photo.uri,
                    type: 'image/jpeg',     
                    name: 'snap.jpg',
                });
            const response = await fetch('http://192.168.1.15:3000/upload', {
                method: 'post',
                body: data
            });
            const dataResponse = await response.json();
            const uploadResult = dataResponse.message;
            if (uploadResult) {
                setVisible(false);  
                props.onSnapPressResponseFromBackend(dataResponse.person);
            }
        }
    }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
                setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission) {
        return (
          <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={type} flashMode={flash} ref={ref=>(camera = ref)}>
            <View style={styles.commandContainer}>
                <TouchableOpacity
                    style={styles.command}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                    }}
                >
                    <MaterialIcons name="flip-camera-ios" size={30} color="#FFFFFF" />
                    <Text style={{color:'#FFFFFF'}}>Flip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.command}
                    onPress={()=> {
                        setFlash(
                            flash === Camera.Constants.FlashMode.off
                            ? Camera.Constants.FlashMode.torch
                            : Camera.Constants.FlashMode.off
                            );
                    }}
                >
                    <MaterialIcons name="flash-on" size={30} color="#FFFFFF" />
                    <Text style={{color:'#FFFFFF'}}>Flash</Text>
                </TouchableOpacity>
            </View>
            <Button title='Snap'
                    buttonStyle={{backgroundColor:'#009788'}}  
                    icon={<FontAwesome name="snapchat-ghost" size={24} color="#FFFFFF" />}
                    onPress={()=> onSnapPress()}      
            />
            <Overlay isVisible={visible}>
                <Text>Loading picture...</Text>
            </Overlay>
            </Camera>
          </View>  ) 
    } else {
        return <View style={{ flex: 1, justifyContent:'center', alignItems:'center' }}>
            <Text>Use of your camera was not allowed.</Text>
        </View>;
    }  
}
const styles = StyleSheet.create({
    commandContainer: {
        flex:1,
        width: '40%',
        flexDirection:'row',
        alignItems:'flex-end'
    },
    command: {
        paddingBottom:10,
        flex:1,
        flexDirection:'column',
        alignItems:'center'
    }
})

function mapDispatchToProps(dispatch) {
    return {
      onSnapPressResponseFromBackend: function(person) {
          dispatch( {type: 'addPersonToGallery', person} )
    } 
}}
export default connect(null,mapDispatchToProps)(SnapScreen);
