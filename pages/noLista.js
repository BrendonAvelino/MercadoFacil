import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Alert, Image } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function noLista() {

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
                        <Text style={styles.message}>Lista de Compras</Text>
                    </Animatable.View>
                    <View style={styles.containerForm}>
                        <TouchableOpacity style={styles.button}
                        onPress={() => navigation.navigate('noHistorico')}>
                            <Text style={styles.buttonText}>
                                CRIAR LISTA
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.noProductsContainer}>
                        <Text style={styles.noProductsText}>Não há listas feitas...</Text>
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
    containerForm: {
        backgroundColor: "#FFF",
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#5DF4A5',
        width: '40%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000', // Cor da sombra (preto)
        shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
        shadowOpacity: 0.25, // Opacidade da sombra
        shadowRadius: 3.84, // Raio de desfoque da sombra
        elevation: 10, // Sombra no Android (elevação
    },
    buttonText: {
        color: "#3D4751",
        fontSize: 16,
        fontWeight: 'bold'
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