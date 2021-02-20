import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, FlatList, Modal } from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {
  FAB, Divider, useTheme, Avatar,
  Title,
  Caption,
  Paragraph,
  TouchableRipple,
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Switch, Button
} from 'react-native-paper';

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//pages

import Inicio from "./Inicio";
import Cultivo from "./DrawerPages/Cultivo";
import Financas from "./DrawerPages/Grafico";
import Sobre from "./DrawerPages/Sobre";
import Feed from "./DrawerPages/Feed";
import Maps from "./DrawerPages/maps";
import Login from "./../../src/pages/Login";
import Perfil from "./DrawerPages/Perfil";
import Agenda from "./DrawerPages/Agenda";
import App from "./../../App";
import { setUsuario } from '../Service/User';
import { getUsuario } from '../Service/User';
import { Subtitle } from 'native-base';

const Drawer = createDrawerNavigator();

export default function Home({ route, navigation }) {

  setUsuario(route)

  const [modalVisible, setModalVisible] = useState(false);

  function CustomDrawerContent(props) {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View style={styles.viewCenter}>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <TouchableOpacity onPress={() => { props.navigation.navigate("Perfil") }}>
                  <Avatar.Image
                    source={{ uri: route.params.picture.data.url }}
                    size={50}
                  />
                </TouchableOpacity>
                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                  <Title style={styles.title}>{route.params.name}</Title>
                  <Caption style={styles.caption}>{route.params.email}</Caption>
                </View>
              </View>
              <Text style={styles.title}>{'\n\nMenu\n'}</Text>


            </View>
            <Divider style={{ backgroundColor: '#91a192', }} />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="home"
                  color={color}
                  size={size}
                />
              )}
              label="Inicio"
              onPress={() => { props.navigation.navigate("Inicio") }} />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="face-profile"
                  color={'purple'}
                  size={size}
                />
              )}
              label="Perfil"
              onPress={() => { props.navigation.navigate("Perfil") }} />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="newspaper"
                  color={color}
                  size={size}
                />
              )}
              label="Feed"
              onPress={() => { props.navigation.navigate("Feed") }} />
              <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="book"
                  color={color}
                  size={size}
                />
              )}
              label="Agenda"
              onPress={() => { props.navigation.navigate("Agenda") }} />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="chart-bar-stacked"
                  color={color}
                  size={size}
                />
              )}
              label="Finanças"
              onPress={() => { props.navigation.navigate("Financas") }} />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="flower-tulip-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Cultivo"
              onPress={() => { props.navigation.navigate("Cultivo") }} />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="map-marker"
                  color={color}
                  size={size}
                />
              )}
              label="Maps"
              onPress={() => { props.navigation.navigate('Maps') }} />
            <Divider style={{ backgroundColor: '#91a192', }} />
            <Caption>   Mais</Caption>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="information-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Sobre"
              onPress={() => { props.navigation.navigate('Sobre') }} />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="cancel"
                  color={color}
                  size={size}
                />
              )}
              label="Sair"
              onPress={() => {props.navigation.navigate('Login') }} />
          </View>
        </DrawerContentScrollView>
      </View>
    );
  }
  return (

    <PaperProvider>
      <NavigationContainer independent={true}>
        <Drawer.Navigator
          drawerContent={props => <CustomDrawerContent {...props} />}
          drawerStyle={{
            backgroundColor: '#fff',
            width: 240,
            borderColor: '#4682B4',
          }}
        >
          <Drawer.Screen name="Inicio" component={Inicio} />
          <Drawer.Screen name="Financas" component={Financas} />
          <Drawer.Screen name="Cultivo" component={Cultivo} />
          <Drawer.Screen name="Feed" component={Feed} />
          <Drawer.Screen name="Sobre" component={Sobre} />
          <Drawer.Screen name="Maps" component={Maps} />
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Perfil" component={Perfil} />
          <Drawer.Screen name="Agenda" component={Agenda} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  email: {
    fontWeight: 'bold',
    fontSize: 10,
    backgroundColor: 'transparent',
  },

  img: {

    padding: 20,
    borderRadius: 100,
    width: 100,
    height: 100,
    alignItems: 'center',
  },
  viewCenter: {
    alignItems: 'center',
  },
  botaoMenu: {
    color: '#222',
    fontSize: 17,
    padding: 10,
  },

  ViewIni: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  ViewSec: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  txtBtnSaibaMais: {
    color: '#c6cbef',
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 9,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

}
);
