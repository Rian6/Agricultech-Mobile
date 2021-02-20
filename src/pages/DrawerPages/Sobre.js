import React from 'react';
import { Title , Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, } from 'react-native';

export default function Graficos({ navigation }) {
  return (
    <ScrollView style={styles.fundo}>
      
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
      <View style={styles.tab}>
      </View>
      <View style={styles.tab}>
        <Title>Quem somos</Title>
        <View style={styles.bar1}>
          <Image source={require('./../../resources/Creditos/rian.png')}
            style={styles.img3}
          />
          <Image source={require('./../../resources/Creditos/yuji.jpeg')}
            style={styles.img3}
          />
          <Image source={require('./../../resources/Creditos/suellen.jpeg')}
            style={styles.img3}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  img3: {
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  bar1: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  tab: {
    alignItems: 'center',
    backgroundColor: "#caf1f1",
    borderRadius: 30,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 20,
    marginVertical: 20,
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
  fundo: {
    backgroundColor: '#90EE90',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
}
);
