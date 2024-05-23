import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';

export default function NoLista() {
    const navigation = useNavigation();
    const [savedLists, setSavedLists] = useState([]);

    const getSavedLists = async () => {
        try {
            const lists = await AsyncStorage.getItem('savedLists');
            if (lists) {
                setSavedLists(JSON.parse(lists));
            } else {
                setSavedLists([]);
            }
        } catch (error) {
            console.error('Erro ao recuperar listas:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getSavedLists();
        });
        return unsubscribe;
    }, [navigation]);

    const viewList = (list) => {
        navigation.navigate('EditarLista', { list }); // Navega para a página de edição, passando a lista como parâmetro
    };

    const deleteList = async (index) => {
        try {
            const updatedLists = [...savedLists];
            const deletedList = updatedLists.splice(index, 1)[0];
            const historyLists = await AsyncStorage.getItem('historyLists');
            const parsedHistoryLists = historyLists ? JSON.parse(historyLists) : [];
            parsedHistoryLists.unshift(deletedList); // Adiciona a lista excluída no início do histórico
            
            // Verificar e remover listas antigas se o histórico ultrapassar 5
            if (parsedHistoryLists.length > 5) {
                parsedHistoryLists.pop(); // Remove a lista mais antiga do histórico
            }
    
            await AsyncStorage.setItem('historyLists', JSON.stringify(parsedHistoryLists));
            await AsyncStorage.setItem('savedLists', JSON.stringify(updatedLists));
            setSavedLists(updatedLists);
        } catch (error) {
            console.error('Erro ao excluir lista:', error);
        }
    };
    

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.containerHeader}>
                        <TouchableOpacity onPress={() => navigation.navigate('bemVindo')}>
                            <Image
                                source={require("../assets/icone_voltar.png")}
                                style={styles.imageVoltar}
                            />
                        </TouchableOpacity>
                        <Text style={styles.message}>Lista de Compras</Text>
                    </View>
                    <View style={styles.containerForm}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('criarLista')}>
                            <Text style={styles.buttonText}>CRIAR LISTA</Text>
                        </TouchableOpacity>
                    </View>
                    {savedLists.length === 0 ? (
                        <View style={styles.noProductsContainer}>
                            <Text style={styles.noProductsText}>Não há listas feitas...</Text>
                        </View>
                    ) : (
                        savedLists.map((list, index) => (
                            <View key={index} style={styles.listBox}>
                                <Text style={styles.listTitle}>{list.title}</Text>
                                <View style={styles.listInfo}>
                                    <Text>Data: {list.date}</Text>
                                    <Text>Hora: {list.time}</Text>
                                </View>
                                <View style={styles.listActions}>
                                    <TouchableOpacity onPress={() => viewList(list)}>
                                        <Image
                                            source={require('../assets/icone_verLista.png')} // Adicione o caminho do seu ícone "ver lista"
                                            style={[styles.icon, styles.iconLarge]} // Adicionado styles.iconLarge
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteList(index)}>
                                        <Image
                                            source={require('../assets/icone_excluirLista.png')} // Adicione o caminho do seu ícone "excluir lista"
                                            style={[styles.icon, styles.iconLarge]} // Adicionado styles.iconLarge
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    )}
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
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
        marginRight: 12,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    buttonText: {
        color: "#3D4751",
        fontSize: 16,
        fontWeight: 'bold'
    },
    listBox: {
        backgroundColor: '#F2F6DF',
        padding: 10,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        borderRadius: 10,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    listInfo: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        marginBottom: 5, // Reduzido o espaçamento inferior
    },
    listActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // Alinhado para a direita
    },
    icon: {
        width: 32, // Aumentado o tamanho dos ícones
        height: 32, // Aumentado o tamanho dos ícones
        marginRight: 10, // Espaçamento entre os ícones e o texto
        marginTop: -40,
    },
    iconLarge: {
        width: 35, // Tamanho maior
        height: 35, // Tamanho maior
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
});

