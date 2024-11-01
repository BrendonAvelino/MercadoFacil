import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as Animatable from 'react-native-animatable';

export default function Acesso() {

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container} >
        <View style={styles.containerBack2}>
          <Image
            source={require("../assets/background/Back2.png")}
            style={styles.Back2}
          />
        </View>
        <Animatable.Text
          style={styles.titulo}
          delay={300}
          animation="fadeIn"
        >
          Bem-Vindo!
        </Animatable.Text>
        <View style={styles.containerLogo}>
          <Animatable.Image
            delay={300}
            animation="fadeIn"
            source={require("../assets/logo_mercado_semtexto.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>


        <View style={styles.buttonsDeBaixo}>
          <Animatable.View style={styles.buttonContainer}
            delay={300}
            animation="fadeIn">


            <TouchableOpacity
              style={styles.button1}
              onPress={() => navigation.navigate('noProduto')}>
              <Image
                source={require("../assets/icone_produtos.png")}
                style={[styles.buttonIcon, styles.produtoIcon]}
              />
              <Text style={styles.buttonText}
              >
                Produtos
              </Text>
            </TouchableOpacity>




            <TouchableOpacity
              style={styles.button2}
              onPress={() => navigation.navigate('noLista')}>
              <Image
                source={require("../assets/icone_lista.png")}
                style={[styles.buttonIcon, styles.listaIcon]}
              />
              <Text style={[styles.buttonText, styles.buttonTextLineBreak]}
              >
                Lista de{"\n"}Compras
              </Text>
            </TouchableOpacity>
          </Animatable.View>




          <Animatable.View
            delay={300}
            animation="fadeIn">
            <TouchableOpacity

              style={[styles.button3, { marginBottom: 50 }]}
              onPress={() => navigation.navigate('noHistorico')}>
              <Image
                source={require("../assets/icone_historico.png")}
                style={styles.buttonIcon}
              />
              <Text style={[styles.buttonText, { color: 'white' }]}
              >
                Histórico de Compras
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  buttonsDeBaixo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginBottom: 15,
  },
  button1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5DF89A',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    width: '49%', // Definindo largura fixa
  },
  button2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5DF89A',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,
    width: '49%', // Definindo largura fixa
  },
  button3: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#004A9E',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 8,

  },

  produtoIcon: {
    width: 37,
    height: 42,
  },

  listaIcon: {
    width: 35,
    height: 42,
  },

  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    marginLeft: 5,
    color: '#3D4751',
    fontWeight: 'bold',
    fontSize: 16,
    flexWrap: 'wrap', // Quebra de linha
    textAlign: 'center', // Alinhamento do texto
  },
  buttonTextLineBreak: {

    lineHeight: 20, // Espaçamento entre as linhas
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  Back2: {
    position: 'relative',
    width: '100%',
    height: 400,
    zIndex: 1,
  },
  containerBack2: {
    flex: 2,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -25,
  },
  containerLogo: {
    flex: 2,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20, // Movendo para cima
  },
  logo: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    paddingTop: 10,
    top: -175,
    left: 0,
  },
  titulo: {
    position: 'relative',
    top: -230, // Movendo para cima
    left: 90,
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#004A9E',
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: -20, // Movendo para cima
  },
})

