import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid'; // Importe o pacote uuid

export default function criarLista() {
    const navigation = useNavigation();

    const [tituloLista, setTituloLista] = useState('');
    const [listaCompras, setListaCompras] = useState('');

    const saveList = async (title, items) => {
        try {
            const currentDate = new Date();
            const dateString = currentDate.toLocaleDateString();
            const timeString = currentDate.toLocaleTimeString();
            const id = uuid.v4(); // Gere um ID único
            const newList = { id, title, items, date: dateString, time: timeString }; // Adicione o ID à nova lista
            const lists = await AsyncStorage.getItem('savedLists');
            const parsedLists = lists ? JSON.parse(lists) : [];
            parsedLists.push(newList);
            await AsyncStorage.setItem('savedLists', JSON.stringify(parsedLists));
            // Limpar os campos de entrada após salvar a lista
            setTituloLista('');
            setListaCompras('');
            // Atualizar a lista de listas salvas
            navigation.navigate('noLista');
        } catch (error) {
            console.error('Erro ao salvar lista:', error);
        }
    };

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

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                saveList(tituloLista, listaCompras);
                                // navigation.goBack(); // Não é necessário mais, pois estamos navegando para 'noLista' depois de salvar
                            }}
                        >
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
                            style={[styles.input, { height: 450, textAlignVertical: 'top' }]}
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
        width: 20,
        height: 20
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
        padding: 10,

    }
});
