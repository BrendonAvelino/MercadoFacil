import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import ProductModal from '../components/modal';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function noProduto() {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const handleAddProduct = (productName) => {
        Alert.alert('Produto Adicionado', `Produto: ${productName}`);
        // Aqui você pode adicionar lógica para salvar o produto na lista
    };

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
                        <Text style={styles.message}>Produtos</Text>
                    </Animatable.View>
                    <View style={styles.containerForm}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                TOTAL: R$0,00
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.button}
                            onPress={() => navigation.navigate('noLista')}>
                            <Text style={styles.buttonText}>
                                LISTA DE COMPRAS
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.returnButton} onPress={() => setModalVisible(true)}>
                        <Text style={styles.returnButtonText}>Adicionar Produto</Text>
                        <Image
                            source={require("../assets/icone_adicionar.png")}
                            style={styles.imageButton}
                        />
                    </TouchableOpacity>
                    <View style={styles.noProductsContainer}>
                        <Text style={styles.noProductsText}>Não há produtos ainda...</Text>
                    </View>
                    <Image
                        delay={1000}
                        animation="flipInY"
                        source={require("../assets/background/Back3.png")}
                        style={styles.back}
                    />
                    <ProductModal
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        onAdd={handleAddProduct}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
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
        paddingStart: "6%",
        paddingEnd: "6%",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#5DF4A5',
        width: '48%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000', // Cor da sombra (preto)
        shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
        shadowOpacity: 0.25, // Opacidade da sombra
        shadowRadius: 3.84, // Raio de desfoque da sombra
        elevation: 10, // Sombra no Android (elevação)
    },
    buttonText: {
        color: "#3D4751",
        fontSize: 16,
        fontWeight: 'bold'
    },
    returnButton: {
        width: '85%',
        marginTop: 30,
        backgroundColor: '#F2F6DF',
        borderRadius: 10,
        padding: 10,
        alignSelf: 'center',
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: '#000', // Cor da sombra (preto)
        shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
        shadowOpacity: 0.25, // Opacidade da sombra
        shadowRadius: 3.84, // Raio de desfoque da sombra
        elevation: 10, // Sombra no Android (elevação)

    },
    returnButtonText: {
        color: '#3D4751',
        fontSize: 22,
        marginTop: 3
    },
    imageButton: {
        marginEnd: 20,
        width: 43,
        height: 40
    },
    noProductsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noProductsText: {
        fontSize: 24,
        color: '#3D4751',
        fontWeight: 'bold'
    },
});
