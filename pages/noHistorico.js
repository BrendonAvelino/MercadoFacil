import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

export default function noHistorico() {
    const navigation = useNavigation();
    const [historyLists, setHistoryLists] = useState([]);


    const deleteList = async (index) => {
        try {
            const updatedLists = [...historyLists];
            const deletedList = updatedLists.splice(index, 1)[0];
            
            // Adicionando a lista excluída ao histórico
            const historyLists = await AsyncStorage.getItem('historyLists');
            let parsedHistoryLists = historyLists ? JSON.parse(historyLists) : [];
            parsedHistoryLists.push(deletedList);
            
            // Verificar e remover listas antigas se o histórico ultrapassar 5
            if (parsedHistoryLists.length > 5) {
                parsedHistoryLists.splice(-1, 1); // Remove o último elemento (o mais antigo)
            }
    
            await AsyncStorage.setItem('historyLists', JSON.stringify(parsedHistoryLists));
            setSavedLists(updatedLists);
        } catch (error) {
            console.error('Erro ao excluir lista:', error);
        }
    };


    useEffect(() => {
        const getHistoryLists = async () => {
            try {
                let history = await AsyncStorage.getItem('historyLists');
                if (history) {
                    // Se o histórico tiver mais de 5 listas, mantenha apenas as últimas 5
                    const parsedHistory = JSON.parse(history);
                    if (parsedHistory.length > 5) {
                        history = JSON.stringify(parsedHistory.slice(-5));
                        await AsyncStorage.setItem('historyLists', history);
                    }
                    setHistoryLists(parsedHistory);
                } else {
                    setHistoryLists([]);
                }
            } catch (error) {
                console.error('Erro ao recuperar histórico:', error);
            }
        };
        getHistoryLists();
    }, []);

    const viewList = (list) => {
        // Implemente a lógica para exibir a lista conforme necessário
        navigation.navigate('historicoLista', { list });
    };
    return (
        <View style={styles.container}>
            <View style={styles.containerHeader}>
                <TouchableOpacity onPress={() => navigation.navigate('bemVindo')}>
                    <Image
                        source={require("../assets/icone_voltar.png")}
                        style={styles.imageVoltar}
                    />
                </TouchableOpacity>
                <Text style={styles.message}>Histórico de Compras</Text>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                {historyLists.length === 0 ? (
                    <Text style={styles.noHistoryText}>Seu histórico está vazio...</Text>
                ) : (
                    historyLists.map((list, index) => (
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
                                </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    containerHeader: {
        marginTop: '4%',
        marginBottom: '8%',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    message: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#3D4751',
    },
    imageVoltar: {
        marginRight: 12,
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 20,
    },
    listBox: {
        backgroundColor: '#F2F6DF',
        padding: 10,
        marginTop: 20,
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
    noHistoryText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3D4751',
        textAlign: 'center',
        marginTop: 270,
    },
});

