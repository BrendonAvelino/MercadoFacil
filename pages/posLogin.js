import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';

export default function AfterLoginPage() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo à sua página principal!</Text>
            <Text style={styles.subtitle}>Você está logado com sucesso.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('entrada')} style={styles.button}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#880000',
        borderRadius: 50,
        paddingVertical: 12,
        paddingHorizontal: 40,
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
});