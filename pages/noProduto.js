import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, ScrollView, Alert } from 'react-native';
import ProductModal from '../components/modal';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NoProduto() {
    const [modalVisible, setModalVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const savedProducts = await AsyncStorage.getItem('products');
            if (savedProducts !== null) {
                setProducts(JSON.parse(savedProducts));
            }
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    };

    const saveProducts = async (products) => {
        try {
            await AsyncStorage.setItem('products', JSON.stringify(products));
        } catch (error) {
            console.error('Erro ao salvar produtos:', error);
        }
    };

    const handleAddProduct = (productName, productValue, quantity) => {
        const newProduct = {
            name: productName,
            value: parseFloat(productValue),
            quantity: parseInt(quantity),
        };
        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        saveProducts(updatedProducts);
        setModalVisible(false);
    };

    const handleDeleteProduct = (index) => {
        const updatedProducts = [...products];
        updatedProducts.splice(index, 1);
        setProducts(updatedProducts);
        saveProducts(updatedProducts);
    };

    const handleEditProduct = (index) => {
        const productToEdit = products[index];
        setEditProduct({ ...productToEdit, index });
        setModalVisible(true);
    };

    const handleEditSubmit = (index, name, value, quantity) => {
        const updatedProducts = [...products];
        updatedProducts[index] = { name, value: parseFloat(value), quantity: parseInt(quantity) };
        setProducts(updatedProducts);
        saveProducts(updatedProducts);
        setEditProduct(null);
    };

    const calculateTotal = () => {
        return products.reduce((total, product) => total + (product.value * product.quantity), 0);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <View style={styles.containerHeader}>
                        <TouchableOpacity onPress={() => navigation.navigate('bemVindo')}>
                            <Image
                                source={require("../assets/icone_voltar.png")}
                                style={styles.imageVoltar}
                            />
                        </TouchableOpacity>
                        <Text style={styles.message}>Produtos</Text>

                        <TouchableOpacity onPress={() => {
                            Alert.alert(
                                'Excluir Todos os Produtos',
                                'Tem certeza de que deseja excluir todos os produtos?',
                                [
                                    {
                                        text: 'Cancelar',
                                        onPress: () => console.log('Botão de cancelar foi pressionado'),
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Sim',
                                        onPress: async () => {
                                            // Limpa os produtos da state
                                            setProducts([]);
                                            // Limpa os produtos do AsyncStorage
                                            try {
                                                await AsyncStorage.removeItem('products');
                                            } catch (error) {
                                                console.error('Erro ao excluir produtos do AsyncStorage:', error);
                                            }
                                        },
                                    },
                                ],
                                { cancelable : false }
                            );
                        }}>
                            <Text style={styles.excluirTudo}>Excluir Tudo</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerForm}>
                        <View style={styles.button}>
                            <Text style={[styles.buttonText, styles.totalText]}>
                                TOTAL: R${calculateTotal().toFixed(2)}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('noLista')}>
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
                    <ScrollView style={{ flex: 1, marginBottom: 20, marginTop: 12, backgroundColor: '#E4ECB7', marginLeft: 18, marginRight: 18, borderRadius: 10 }}>
                        {products.map((product, index) => (
                            <View key={index} style={styles.productContainer}>
                                <View style={styles.productInfo}>
                                    <Text style={styles.productName}>{product.name}</Text>

                                    <Text style={styles.productPrice}>R${product.value.toFixed(2)}</Text>
                                    <Text style={styles.quantityText}>Quantidade: {product.quantity}</Text>

                                    <TouchableOpacity style={styles.editButton} onPress={() => handleEditProduct(index)}>
                                        <Text style={styles.editButtonText}>Editar informações</Text>
                                    </TouchableOpacity>

                                </View>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteProduct(index)}>
                                    <Image
                                        style={styles.deleteButtonIcon}
                                        source={require("../assets/icone_removerProduct.png")}
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}
                        {products.length === 0 && (
                            <View style={styles.noProductsContainer}>
                                <Text style={styles.noProductsText}>Não há produtos ainda...</Text>
                            </View>
                        )}
                    </ScrollView>
                    <ProductModal
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        onAdd={handleAddProduct}
                        editProduct={editProduct}
                        onEdit={(index, name, value, quantity) => handleEditSubmit(index, name, value, quantity)}
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
        marginRight: 12,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    buttonText: {
        color: "#3D4751",
        fontSize: 16,
        fontWeight: 'bold',
    },
    returnButton: {
        width: '85%',
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#F2F6DF',
        borderRadius: 10,
        padding: 10,
        alignSelf: 'center',
        textAlign: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
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
    productContainer: {
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: '#F2F6DF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderRadius: 10,
    },

    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 18,
        color: '#333',
    },
    quantityText: {
        fontSize: 18,
        color: '#666',

    },
    editButton: {
        backgroundColor: '#5DF4A5',
        padding: 5,
        borderRadius: 5,
        marginTop: 5,
        alignItems: 'center',
    },
    editButtonText: {
        color: '#3D4751',
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        padding: 10,
    },
    deleteButtonIcon: {
        width: 43,
        height: 40,
    },
    noProductsContainer: {
        marginTop: 180,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noProductsText: {
        fontSize: 24,
        color: '#3D4751',
        fontWeight: 'bold',
        marginTop: 50,
    },
    excluirTudo: {
        marginLeft: 130,
        backgroundColor: '#5DF4A5',
        padding: 5,
        borderRadius: 8,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#3D4751',
    },
});
