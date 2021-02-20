import React, { useState, useEffect } from "react";

import {
  View, Image, ScrollView, StyleSheet, Alert, Modal, TouchableHighlight, TouchableOpacity, Button, Dimensions
} from 'react-native';
import {
  AdMobBanner
} from 'expo-ads-admob';
import {
  Card, Title, Paragraph, Searchbar, Text, List, Avatar, Divider, ActivityIndicator, Colors, Appbar
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
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
import { getUsuario } from "../../Service/User";
export default function Agenda({ navigation }) {

  const [date, setDate] = useState(new Date(1598051730000));
  const [dataAtual, setDataAtual] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [titulo, setTitulo] = useState();
  const [descricao, setDescricao] = useState();

  const [agendas, setAgendas] = useState();

  const { width: screenWidth } = Dimensions.get('window');

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  useEffect(() => {
    listAll()
  }, []);

  function salvar() {
    if (agendas != null) {
      var chave = Number(agendas.length + 1)
    } else {
      var chave = 0
    }
    var banco = firebase.database().ref(getUsuario().params.hash + '/agenda/');
    banco.child(chave).set({
      chave: chave,
      descricao: descricao,
      titulo: titulo,
      data: date.getDate().toString().padStart(2, '0') + '/' + (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getFullYear(),
      dataPostagem: dataAtual.getDate().toString().padStart(2, '0') + '/' + (dataAtual.getMonth() + 1).toString().padStart(2, '0') + '/' + dataAtual.getFullYear(),
    });
    banco.child(chave + "/svg/").set({
      fill: geraCor()
    });
  }
  async function listAll() {
    await firebase.database().ref(getUsuario().params.hash + '/agenda/').on('value', (snapshot) => {
      if (snapshot.val() != null && typeof snapshot.val() != "undefined") {
        setAgendas(snapshot.val().slice(0).reverse());
        console.log(agendas)
      }
    });
  }
  function geraCor() {
    return ('rgb(' + Math.floor(Math.random() * (170) + 120)) + ',' + (Math.floor(Math.random() * (170) + 120)) + ',' + (Math.floor(Math.random() * (170) + 120) + ')')
  }
  return (
    <ScrollView>
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
      <Card>
        <Card.Content>
          <View style={{ height: 95, width: 377, alignItems: 'center' }}>
            <AdMobBanner
              bannerSize="smartBannerPortrait"
              adUnitID="ca-app-pub-9891647271376872/3398082789" />
          </View>
          <Image style={{ height: 200, width: 377 }} source={require('./../../resources/undrawn/agenda.png')} />
          <Title>Agenda</Title>
          <Paragraph>Aqui você pode fazer anotações de coisas do seu dia a dia e coisas novas</Paragraph>
        </Card.Content>
      </Card>

      <Form style={{ alignItems: 'center' }}>
        <Text style={styles.title}>Cadastrar nova anotação</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
          <Text style={styles.description}>{'Faça suas anotações aqui!\n'}</Text>
        </View>
        <View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View>
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
      </Form>
      <View style={{ flexDirection: 'row', flex: 1, marginHorizontal: 20, marginVertical: 10, }}>
        <TouchableOpacity style={{ alignItems: 'center', borderRadius: 10, height: 50 }} onPress={showDatepicker}>
          <Image
            style={styles.imgFormater}
            source={require('./../../resources/icons/agenda.png')}
          />
        </TouchableOpacity>
        <Text style={{ marginHorizontal: 10, marginVertical: 11, fontSize: 16, fontStyle: 'bold' }}>{date.getDate().toString().padStart(2, '0') + '/' + (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getFullYear()}</Text>
      </View>
      <View style={{ alignItems: 'center' }}>

        <TouchableOpacity
          style={{ backgroundColor: '#7c79f0', padding: 10, alignItems: 'center', borderRadius: 50, width: 250, marginBottom: 20 }}
          onPress={() => {
            salvar();
          }}
        ><Text style={{ color: '#fff' }}>Salvar</Text></TouchableOpacity>
        <Searchbar
          placeholder="Procurar"
          onChangeText={onChangeSearch}
          loading={1}
          value={searchQuery}
        />
      </View>
      {agendas === null || typeof agendas === "undefined" ? (
        listAll(),
        <ActivityIndicator animating={true} color={Colors.red800} />
      ) : (
          agendas.map(val => {
            return (
              <View>
                <Card>
                  <Card.Title
                    title={val.titulo}
                    subtitle={'Publicado: ' + val.dataPostagem}
                    left={(props) => <Avatar.Icon {...props} icon="cow" style={{ backgroundColor: val.svg.fill }} />}
                  />
                  <Card.Content>
                    <Title>{'Descrição'}</Title>
                    <Paragraph>{val.data}</Paragraph>
                    <Paragraph>{val.descricao}</Paragraph>
                  </Card.Content>
                </Card>
              </View>
            )
          })
        )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  description: {
    color: '#999',
    fontSize: 12,
    marginTop: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  imgFormater: {
    width: 40,
    height: 40,
  },
}
);
