import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as Animatable from 'react-native-animatable';

export default function Bem_Vindo() {

    const navigation = useNavigation();

    return (
        <View style={styles.container} >
            <View style={styles.containerLogo}>
                <Animatable.Image
                    delay={900}
                    animation="flipInY"
                    source={require("../assets/logo_mercado.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
            <Animatable.View delay={550} animation='fadeInUp' style={styles.containerForm}>
                <Image
                    delay={900}
                    animation="flipInY"
                    source={require("../assets/background/Back.png")}
                    style={styles.back}/>
                <TouchableOpacity
                    onPress={() => navigation.navigate('bemVindo')}
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        Vamos as compras!
                    </Text>
                    <Image
                    delay={900}
                    animation="flipInY"
                    source={require("../assets/icone_arrow.png")}
                    style={styles.icone}/>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    containerLogo: {
        flex: 2,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: '1000%',
        paddingTop: 190,
        marginTop: 50
    },
    containerForm: {
        flex: 1,
        display: 'flex',
    },
    back: {
        width: '100%',
        height: '100%',
    },
    button: {
        position: 'absolute',
        backgroundColor: '#FFF',
        borderRadius: 20,
        paddingVertical: 12,
        width: '80%',
        alignSelf: 'center',
        bottom: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: 22,
        color: '#3D4751',
        fontWeight: 'normal',
        marginRight: 20,
        fontWeight: 'bold'
    },
    icone: {
        alignItems: 'center'
    }
})