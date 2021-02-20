import React, { Component, useState, useEffect } from 'react';

import {
  View,
  Image,
  ScrollView, Text, FlatList,
  StyleSheet, Alert, Modal, TouchableHighlight, TouchableOpacity, Dimensions, SafeAreaView
} from 'react-native';
import { getUsuario } from '../../Service/User';
import { setUsuario } from '../../Service/User';
import * as firebase from 'firebase';
import {
  FAB, Divider, useTheme, Avatar,
  Title,
  Caption,
  Paragraph,
  TouchableRipple,
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme, Card, Colors,
  Switch, Button, List, Appbar, ActivityIndicator
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Perfil({ navigation }) {

  const [data2, setData2] = React.useState([0])
  const [image, setImage] = React.useState();
  const [gastos, setGastos] = React.useState();
  const [data, setData] = React.useState([0])
  const [agendas, setAgendas] = useState();
  const [dataValor, setDataValor] = React.useState({
    labels: [""],
    datasets: [
      {
        data: [0]
      }
    ]
  })

  useEffect(() => {
    listAll();
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result.uri);

    let file = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });

    file = 'data:image/' + result.type + ';base64,' + file
    console.log(file)
    setImage(file);
    saveImage();
    console.log(image)
  };

  async function saveImage() {

    var banco = await firebase.database().ref('/');
    banco.child(getUsuario().params.hash).update({
      image: image
    });
    getUsuario().params.picture.data.url = image
  }

  async function listAll() {
    await firebase.database().ref(getUsuario().params.hash + '/agenda/').on('value', (snapshot) => {
      if (snapshot.val() != null && typeof snapshot.val() != "undefined") {
        setAgendas(snapshot.val().slice(0).reverse());
      }
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
    <SafeAreaView>
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

      <SafeAreaView style={styles.cardp1}>
        <Card.Title title={"Perfil"} />
        <TouchableOpacity onPress={() => {pickImage()}}>
        <Image
          style={styles.image}
          source={{ uri: getUsuario().params.picture.data.url }}
          size={200}
        />
        </TouchableOpacity>
        <View style={styles.cardp1}>
          <Paragraph stry>{getUsuario().params.name}</Paragraph>
          <Caption>{getUsuario().params.email}</Caption>
        </View>

        <SafeAreaView style={styles.card2}>
          <Card.Title style={{ borderRadius: 10, backgroundColor: '#3da9e3' }} title={"Resumo da agenda"} />
            <ScrollView
              style={{
                width: '100%',
                maxHeight: 800,
              }}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              {agendas === null || typeof agendas === "undefined" ? (
                listAll(),
                <ActivityIndicator animating={true} color={Colors.red800} />
              ) : (
                  agendas.map(val => {
                    return (

                      <View style={{
                        width: width - 50,
                        maxHeight: 100,
                        marginHorizontal: 10,
                        marginVertical: 20,
                        borderRadius: 10,
                        padding: 20,
                      }}>
                                          <Card.Title
                    title={val.titulo}
                    subtitle={'Publicado: ' + val.dataPostagem}
                    left={(props) => <Avatar.Icon {...props} icon="cow" style={{ backgroundColor: val.svg.fill }} />}
                  />
                      </View>

                    )
                  })
                )}
            </ScrollView>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>

  );
};
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  cardp1: {
    flexDirection: 'column',
    marginHorizontal: 10,
    padding: 5,
    },
  cardp2: {

  },
  image: {
    borderWidth: 2,
    borderColor: 'black',
    height: 200,
    width: 200,
    borderRadius: 50,
  },
  card2: {

    backgroundColor: "#9fcaf1",
    borderRadius: 10,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    marginBottom: 30,
    marginTop: 30
  }
});
