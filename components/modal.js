import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Image, Keyboard } from 'react-native';

const ProductModal = ({ visible, onClose, onAdd, editProduct, onEdit }) => {

    const [productName, setProductName] = useState('');
    const [productValue, setProductValue] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [quantity, setQuantity] = useState('1');

    const handleAdd = () => {
        if (productName.trim() === '' || productValue.trim() === '') {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        if (editIndex !== -1) {
            onEdit(editIndex, productName, productValue, quantity);
        } else {
            onAdd(productName, productValue, quantity);
        }
        setProductName('');
        setProductValue('');
        setQuantity('1');
        setEditIndex(-1);
        onClose();
    };

    useEffect(() => {
        if (editProduct && editProduct.index !== undefined) {
            setEditIndex(editProduct.index);
            setProductName(editProduct.name);
            setProductValue(String(editProduct.value));
            setQuantity(String(editProduct.quantity));
        }
    }, [editProduct]);

    const handleIncrement = () => {
        setQuantity((prevQuantity) => String(parseInt(prevQuantity) + 1));
    };

    const handleDecrement = () => {
        if (parseInt(quantity) > 1) {
            setQuantity((prevQuantity) => String(parseInt(prevQuantity) - 1));
        }
    };

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Image
                                source={require("../assets/icone_fechar.png")}
                            />
                        </TouchableOpacity>
                        <Text style={styles.modalText}>Adicionar Produto</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do Produto"
                            value={productName}
                            onChangeText={setProductName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Valor Unitário"
                            value={productValue}
                            onChangeText={setProductValue}
                            keyboardType="numeric"
                        />
                        <Text style={styles.quantityText}>Quantidade:</Text>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity style={styles.quantityButton} onPress={handleDecrement}>
                                <Image
                                    style={styles.quantityButtonText}
                                    source={require("../assets/icone_remover.png")}
                                />
                            </TouchableOpacity>
                            <Text style={styles.quantityNumber}>{quantity}</Text>
                            <TouchableOpacity style={styles.quantityButton} onPress={handleIncrement}>
                                <Image
                                    style={styles.quantityButtonText}
                                    source={require("../assets/icone_adicionar.png")}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                            <Text style={styles.addButtonText}>Adicionar Produto</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#103758'
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#103758',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
        color: '#103758'
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#103758'
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    quantityButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginHorizontal: 10,
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    quantityNumber: {
        fontSize: 32,
        fontWeight: 'bold',
        paddingLeft: 14,
        paddingRight: 14,
        color: '#103758'
    },
    addButton: {
        width: '100%',
        backgroundColor: '#5DF89A',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#103758',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProductModal;
