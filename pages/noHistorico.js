import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Alert, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function noHistorico() {

    const navigation = useNavigation();

    return (

        <KeyboardAvoidingView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <Animatable.View animation="fadeInLeft" delay={100} style={styles.containerHeader}>
                        <TouchableOpacity onPress={() => navigation.navigate('bemVindo')}>
                            <Image
                                source={require("../assets/icone_voltar.png")}
                                style={styles.imageVoltar}
                            />
                        </TouchableOpacity>
                        <Text style={styles.message}>Histórico de Compras</Text>
                    </Animatable.View>
                    <View style={styles.noProductsContainer}>
                        <Text style={styles.noProductsText}>Seu histórico está vazio</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    containerHeader: {
        marginTop: '4%',
        marginBottom: '8%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingStart: 30
    },
    message: {
        fontSize: 22,
        fontWeight: 'bold',
        color: "#3D4751"
    },
    imageVoltar: {
        marginRight: 15,
    },
    noProductsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50
    },
    noProductsText: {
        fontSize: 24,
        color: '#3D4751',
        fontWeight: 'bold'
    },
})