import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { useState } from 'react';
import { adicionarUsuario } from '../hooks/bancoSenhas';

export default function Cadastre_se({ navigation }) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [confirmSenhaVisivel, setConfirmSenhaVisivel] = useState(false);

    const handleCadastro = () => {
        adicionarUsuario(email, senha);

        navigation.navigate('entrada');
    }

    const toggleSenhaVisivel = () => {
        setSenhaVisivel(!senhaVisivel);
    }

    const toggleConfirmSenhaVisivel = () => {
        setConfirmSenhaVisivel(!confirmSenhaVisivel);
    }

    return (

        <KeyboardAvoidingView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                        <Text style={styles.message}>Faça seu cadastro !</Text>
                    </Animatable.View>
                    <Animatable.View animation="fadeInUp" style={styles.containerForm}>
                        <Text style={styles.title}>
                            E-mail
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="E-mail"
                            onChangeText={text => setEmail(text)}
                            value={email}
                             autoCapitalize="none"
                        />
                        <Text style={styles.title}>
                            Senha
                        </Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Senha"
                                onChangeText={text => setSenha(text)}
                                value={senha}
                                secureTextEntry={!senhaVisivel}
                            />
                            <TouchableOpacity onPress={toggleSenhaVisivel}>
                                <Text style={styles.toggleButtonText}>{senhaVisivel ? 'Ocultar' : 'Mostrar'}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.title}>Confirme sua senha</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Confirme sua senha"
                                onChangeText={text => setConfirmSenha(text)}
                                value={confirmSenha}
                                secureTextEntry={!confirmSenhaVisivel}
                            />
                            <TouchableOpacity onPress={toggleConfirmSenhaVisivel}>
                                <Text style={styles.toggleButtonText}>{confirmSenhaVisivel ? 'Ocultar' : 'Mostrar'}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={(handleCadastro)} style={styles.returnButton}>
                            <Text style={styles.returnButtonText}>Fazer o Login</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#880000'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: "#FFF"
    },
    containerForm: {
        backgroundColor: "#FFF",
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: "5%",
        paddingEnd: "5%"
    },
    title: {
        fontSize: 20,
        marginTop: 28,
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16
    },
    button: {
        backgroundColor: '#880000',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center'
    },
    registerText: {
        color: '#a1a1a1'
    },
    returnButton: {
        marginTop: 20,
        backgroundColor: '#880000',
        borderRadius: 4,
        padding: 10,
        alignSelf: 'center'
    },
    returnButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    }
})