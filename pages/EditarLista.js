// editarLista.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditarLista() {
    const navigation = useNavigation();
    const route = useRoute();
    const { list } = route.params;

    const [tituloLista, setTituloLista] = useState(list.title);
    const [listaCompras, setListaCompras] = useState(list.items);

    const saveList = async () => {
        try {
            const currentDate = new Date();
            const dateString = currentDate.toLocaleDateString();
            const timeString = currentDate.toLocaleTimeString();
            const updatedList = { ...list, title: tituloLista, items: listaCompras, date: dateString, time: timeString };
    
            // Recupere todas as listas salvas
            const savedLists = await AsyncStorage.getItem('savedLists');
            let parsedSavedLists = savedLists ? JSON.parse(savedLists) : [];
    
            // Encontre a lista específica na qual você está trabalhando
            const index = parsedSavedLists.findIndex(item => item.id === list.id);
    
            // Atualize apenas a lista específica
            if (index !== -1) {
                parsedSavedLists[index] = updatedList;
            }
    
            // Salve as listas atualizadas no AsyncStorage
            await AsyncStorage.setItem('savedLists', JSON.stringify(parsedSavedLists));
    
            // Navegue de volta para a página noLista
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
                            onPress={saveList}
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
