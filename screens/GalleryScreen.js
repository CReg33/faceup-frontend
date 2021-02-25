import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import {connect} from 'react-redux';

function GalleryScreen(props) {

    const displayUserGallery = props.personListForGallery.map((person, i)=> {
        return(
            <Card key={i} containerStyle={styles.card}>
                <Card.Image source={{uri: person.pictureUrl}}></Card.Image>
                <View style={{padding:10}}>
                <Badge status="success" value={person.age} />
                <Badge status="success" value={person.gender} />
                <Badge status="success" value={person.beard} />
                <Badge status="success" value={person.hair} />
                <Badge status="success" value={person.glasses} />
                <Badge status="success" value={person.smile} />
                </View>
            </Card>
        )});

    return(
        <View style={styles.container}>
            <Text style={styles.pageTitle}>{props.userName}'s Gallery</Text>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {props.personListForGallery.length>0 
                ? displayUserGallery 
                : <Text style={{flex:1, color:'#000000'}}>No pictures yet. Snap your first picture !</Text>}
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      backgroundColor: '#f2f2f2'
    },
    pageTitle: {
      fontWeight: 'bold', 
      fontSize: 24,
      textAlign:'center',
      padding: 10
    },
    cardsContainer: {
      alignItems:'center'
    }, 
    card: {
        padding:0,
        width:'90%',
        borderColor: '#FFFFFF',
    }
  });

function mapStateToProps(state) {
    return { personListForGallery: state.person, userName: state.userName }
}
export default connect(mapStateToProps, null)(GalleryScreen);