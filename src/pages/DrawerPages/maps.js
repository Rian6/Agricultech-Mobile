import React, { useState, useEffect } from 'react';
import { ScrollView, Button, View, Text, StyleSheet, Dimensions, Image, Modal, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import {
  Avatar,
  Card,
  Title,
  Paragraph, Dialog, Portal, Provider,
  TextInput, DataTable, Appbar } from 'react-native-paper';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Geolocation from 'react-native-geolocation-service';

import {
  Container,
  AnnotationContainer,
  AnnotationText,
  NewButtonContainer,
  ButtonsWrapper,
  CancelButtonContainer,
  SelectButtonContainer,
  ButtonText,
  Marker,
  ModalContainer,
  ModalImagesListContainer,
  ModalImagesList,
  ModalImageItem,
  ModalButtons,
  CameraButtonContainer,
  CancelButtonText,
  ContinueButtonText,
  TakePictureButtonContainer,
  TakePictureButtonLabel,
  DataButtonsWrapper,
  MarkerContainer,
  MarkerLabel,
  Form,
  Input,
  DetailsModalFirstDivision,
  DetailsModalSecondDivision,
  DetailsModalThirdDivision,
  DetailsModalBackButton,
  DetailsModalPrice,
  DetailsModalRealtyTitle,
  DetailsModalRealtySubTitle,
  DetailsModalRealtyAddress,
} from './styles';
import * as firebase from 'firebase';
import { getUsuario } from '../../Service/User';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function Maps({ navigation }) {
  const [position, setPosition] = useState({
    latitude: 12,
    longitude: 50,
  });

  const [localizacoes, setLocalizacoes] = useState([]);

  const [titulo, setTitulo] = useState();
  const [descricao, setDescricao] = useState();

  async function listAll() {
    await firebase.database().ref('/data/maps/').on('value', (snapshot) => {
      if (snapshot.val() != null && typeof snapshot.val() != "undefined") {
        setLocalizacoes(snapshot.val().slice(0).reverse());
      }
    });
  }

  useEffect(() => {
    setLocalizacoes(localizacoes);
    listAll();

    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Não conseguimos acessar sua localização :(');
      }

      let location = await Location.getCurrentPositionAsync({});
      setPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      console.log(location.coords);
    })();
  }, []);


  function salvar() {
    if (localizacoes != null) {
      var chave = Number(localizacoes.length)
    } else {
      var chave = 0
    }
    var banco = firebase.database().ref('/data/maps/');
    banco.child(chave).set({
      titulo: titulo,
      usuario: getUsuario().params.name,
      descricao: descricao,
      image: getUsuario().params.picture.data.url,
      latitude: position.latitude,
      longitude: position.longitude,
      data: new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear(),
    });
  }
  return (
    getUsuario().params.hash == 0 ? 
    <View>
    <Appbar.Header>
      <Appbar.Action
        icon={({ color, size }) => (
          <Icon
            name="dots-vertical"
            color={color}
            size={size}
          />
        )}
        onPress={navigation.openDrawer}
      />
      <Appbar.Content
        title="Agricultech"
      />
    </Appbar.Header>
    <Card style={{height:Dimensions.get('window').height}}>
  
  <Card.Title title={'Ops!'} subtitle={'Você nao pode usar essa função com o usuario offline!'} />
  <Card.Cover style={{height:300}} source={require("./../../resources/undrawn/error.png")} />
  <Card.Title subtitle={'Tente criar uma conta com um usuario normal.'} />
  </Card>
    </View>
      :
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: position.latitudeDelta,
          longitudeDelta: position.longitudeDelta,
        }}
        style={styles.mapView}
        rotateEnabled={true}
        scrollEnabled={true}
        zoomEnabled={true}
        showsPointsOfInterest={false}
        showBuildings={false}
      >
        
        <MapView.Marker
          coordinate={{
            latitude: position.latitude,
            longitude: position.longitude,
          }}
          title={'Você'}
          description={'Essa é sua localização e seus marcadores aparecerão aki'}
        >
          <Avatar.Image backgroundColor="green" size={40} source={{ uri: getUsuario().params.picture.data.url }} />
        </MapView.Marker>
        {localizacoes === null && typeof localizacoes === "undefined" ? (
          listAll()) : (
            localizacoes.map(place => (
              <MapView.Marker
                ref={mark => place.mark = mark}
                title={place.titulo}
                description={place.descricao}
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
                }}
              >
                <Avatar.Icon backgroundColor="green" size={25} icon='corn' />
              </MapView.Marker>
            )))}
      </MapView>

      <View style={styles.place}>
        
        <Text style={styles.title}>Pontos Compartilhados</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={styles.description}>Compartilhe lugares com outras pessoas!</Text>
        </View>
        <Form style={{ alignItems: 'center' }}>
          <Input
            placeholder="Titulo"
            onChangeText={titulo => { setTitulo(titulo) }}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            placeholder="Descrição"
            onChangeText={descricao => { setDescricao(descricao) }}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            style={{ backgroundColor: '#7c79f0', padding: 10, alignItems: 'center', borderRadius: 50, width: 250 }}
            onPress={() => {
              salvar();
            }}
          ><Text style={{ color: '#fff' }}>Salvar</Text></TouchableOpacity>
        </Form>

      </View>

    </View>
  );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  logo: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 15,
    elevation: 5,
    marginTop: -730,
    alignSelf: 'center',
    marginRight: 10,
    flexDirection: 'row',
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  positonBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    opacity: 0.75,
    marginTop: -170,
    marginHorizontal: 40,
    padding: 25,
    shadowColor: '#000',
    elevation: 5,
  },
  positonBoxTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  positonBoxLatLon: { flexDirection: 'row', justifyContent: 'space-between' },
  locationButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 150,
    marginTop: -25,
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 8,
  },
  botao: {
    borderRadius: 10,
    backgroundColor: '#b3fac5',
    alignItems: "center",
    padding: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },

  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  placesContainer: {
    width: '100%',
    maxHeight: 200,
  },

  place: {
    width: width - 40,
    height: height / 2.6,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: 'transparent',
  },

  description: {
    color: '#999',
    fontSize: 12,
    marginTop: 5,
  },
  saldo: {
    backgroundColor: "#caf1f1",
    borderRadius: 30,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
