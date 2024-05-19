import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function criarLista() {
    const navigation = useNavigation();

    const [tituloLista, setTituloLista] = useState('');
    const [listaCompras, setListaCompras] = useState('');

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <View style={styles.containerHeader}>
                        <TouchableOpacity onPress={() => navigation.navigate('noLista')}>
                            <Image
                                source={require("../assets/icone_fechar.png")}
                                style={styles.imageVoltar}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Salvar Lista</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Título:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o título da lista"
                            value={tituloLista}
                            onChangeText={setTituloLista}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Lista de Compras:</Text>
                        <TextInput
                            style={[styles.input, { height: 450 }]}
                            placeholder="Digite sua lista de compras..."
                            multiline
                            value={listaCompras}
                            onChangeText={setListaCompras}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F6DF',
        padding: 20
    },
    containerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    imageVoltar: {
        width: 24,
        height: 24
    },
    button: {
        backgroundColor: '#BEA76D',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    },
    buttonText: {
        color: '#444242',
        fontWeight: 'bold'
    },
    inputContainer: {
        marginBottom: 20
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10
    }
});
