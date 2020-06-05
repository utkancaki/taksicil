import React from 'react';
import { View, StyleSheet, Text, ImageBackground, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SwipeScreen = ({ navigation }) => {
    return (
        <Swiper
            showsButtons = { true }
            dotColor = {'#D5DFE0'}
            activeDotColor = {'#005662'}
            showsButtons = { false }
            loop = { false }
        >

            <View>
                <ImageBackground source={require('../../assets/swipe1.png')} style={styles.backgroundImage}/>
            </View>

            <View>
                <ImageBackground source={require('../../assets/swipe2.png')} style={styles.backgroundImage}>
                    <View style={{flex:1, justifyContent:'flex-end'}}>
                        <TouchableOpacity style={styles.button} onPress = {() => navigation.navigate('Login')}>
                            <Text style={{ color: "#005662", fontWeight: "700", fontSize: 15}}>BAŞLAYIN</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </Swiper>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height, 
    },
    button: {
        borderColor: '#005662',
        borderWidth: 2.5,
        marginHorizontal: 140,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        marginBottom: 50,
        borderRadius: 6,
        marginHorizontal: 130
    }
  })

export default SwipeScreen;