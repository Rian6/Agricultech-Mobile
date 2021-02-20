import React, { useState, useEffect } from "react";

import Constants from 'expo-constants';
import { List } from 'react-native-paper';
import {
  View, Image, ScrollView, StyleSheet, Alert, Modal, TouchableHighlight, TouchableOpacity
} from 'react-native';
import * as scale from 'd3-scale';
import {
  Circle, G, Line, Rect,
  Defs,
  LinearGradient,
  Stop, Text
} from 'react-native-svg'
import * as shape from 'd3-shape'
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph, Dialog, Portal, Provider,
  TextInput, DataTable, ProgressBar, Colors, ActivityIndicator, Appbar
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  LineChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
  BarChart
} from "react-native-chart-kit";
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  PieChart,
  XAxis,
  Grid, YAxis, ProgressCircle, AreaChart
} from 'react-native-svg-charts';

import {
  AdMobBanner
} from 'expo-ads-admob';

import * as firebase from 'firebase';
import { getUsuario } from "../../Service/User";
import { Dimensions } from "react-native";
//import * as SQLite from 'expo-sqlite';

//const db = SQLite.openDatabase("db.db");

export default function Grafico({ navigation }) {


  const screenWidth = Dimensions.get("window").width;

  const [text, setText] = React.useState(null)
  const [valor, setText2] = React.useState(null)
  const [gastos, setGastos] = React.useState();
  const [viewDate, setViewDate] = React.useState(false)
  const [ganhos, setGanhos] = React.useState();
  const [grafico, setGrafico] = React.useState([0])
  const [data, setData] = React.useState([0])
  const [debitos, setDebitos] = React.useState(0);
  const [creditos, setCreditos] = React.useState(0);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');

  const [debitosPrc, setDebitosPrc] = React.useState(0);
  const [creditosPrc, setCreditosPrc] = React.useState(0);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setViewDate(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    setViewDate(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const dataSale = {
    labels: ["Ganhos", "Gastos"], // optional
    data: [creditosPrc, debitosPrc]
  };

  React.useEffect(() => {
    setDebitos(gastos != null ? (gastos.reduce(getTotal, 0)) : (0));
    setCreditos(ganhos != null ? (ganhos.reduce(getTotal, 0)) : (0));

    if (debitos > 0 && creditos > 0) {
      let total = debitos + creditos;
      setDebitosPrc(debitos / total);
      setCreditosPrc(creditos / total);
    }
  });

  const [dataValor, setDataValor] = React.useState({
    labels: [""],
    datasets: [
      {
        data: [0]
      }
    ]
  })
  const [data2, setData2] = React.useState([0])
  const [dataValor2, setDataValor2] = React.useState({
    labels: [""],
    datasets: [
      {
        data: [0]
      }
    ]
  })
  function geraCor() {
    return ('rgb(' + Math.floor(Math.random() * (170) + 120)) + ',' + (Math.floor(Math.random() * (170) + 120)) + ',' + (Math.floor(Math.random() * (170) + 120) + ')')
  }

  function salvarGastos() {
    if (gastos != null) {
      var chave = Number(gastos.length)
    } else {
      var chave = 0
    }
    var banco = firebase.database().ref(getUsuario().params.hash + '/gastos/');
    banco.child(chave).set({
      descricao: text,
      valor: valor,
      data: new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear(),
    });
    banco.child(chave + "/svg/").set({
      fill: geraCor()
    });
  }
  async function listAll() {
    await firebase.database().ref(getUsuario().params.hash + '/gastos/').on('value', (snapshot) => {
      if (snapshot.val() != null && typeof snapshot.val() != "undefined") {
        setGastos(snapshot.val());
      }
    });
  }

  function getTotal(total, item) {
    return Number(total) + Number(item.valor);
  }

  function salvarGanhos() {
    if (ganhos != null) {
      var chave = Number(ganhos.length)
    } else {
      var chave = 0
    }
    var banco = firebase.database().ref(getUsuario().params.hash + '/ganhos/');
    banco.child(chave).set({
      descricao: text,
      valor: valor,
      data: new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear(),
    });
    banco.child(chave + "/svg/").set({
      fill: geraCor()
    });
  }
  async function listAllGanhos() {
    await firebase.database().ref(getUsuario().params.hash + '/ganhos/').on('value', (snapshot) => {
      if (snapshot.val() != null && typeof snapshot.val() != "undefined") {
        setGanhos(snapshot.val());

        console.log(grafico)
      }
    });
  }

  const LeftContent = props => <Avatar.Icon {...props} icon="chart-line" />

  const [modalVisible, setModalVisible] = useState(false);
  const [modalGanhoVisible, setModalGanhoVisible] = useState(false);
  /*
      const pieData = dados.valor
      .filter((value) => value > 0)
      .map((value, index) => ({
          value,
          svg: {
              fill: randomColor(),
              onPress: () => console.log('press', index),
          },
          key: `pie-${index}`,
      }))
  */
  const Labels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;
      return (
        <Text
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={'black'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={14}
          stroke={'black'}
          strokeWidth={0.2}
        >
          {data.descricao + ' (R$' + data.valor + ')'}
        </Text>
      )
    })
  }

  const CUT_OFF = 20
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Title>Cadastrar novo gasto</Title>
            <TextInput
              mode='outlined'
              label="Descrição"
              style={styles.input}
              placeholder="Descrição do item"
              autoCorrect={false}


              onChangeText={text => setText(text)}

              value={text}
            />
            <TextInput
              mode='outlined'
              label="Valor"
              style={styles.input}
              placeholder="Valor do item"
              autoCorrect={false}

              onChangeText={text => setText2(text)}

            />
            <Button onPress={() => {
              salvarGastos();
              setModalVisible(!modalVisible);
            }}>Cadastrar</Button>
            <Button onPress={() => {
              setModalVisible(!modalVisible);
            }}>Sair</Button>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalGanhoVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Title>Cadastrar novo ganho</Title>
            <TextInput
              mode='outlined'
              label="Descrição"
              style={styles.input}
              placeholder="Descrição do item"
              autoCorrect={false}
              onChangeText={text => setText(text)}

              value={text}
            />
            <TextInput
              mode='outlined'
              label="Valor"
              style={styles.input}
              placeholder="Valor do item"
              autoCorrect={false}

              onChangeText={text => setText2(text)}

            />
            <Button onPress={() => {
              salvarGanhos();
              setModalGanhoVisible(!modalGanhoVisible);
            }}>Cadastrar</Button>
            <Button onPress={() => {
              setModalGanhoVisible(!modalGanhoVisible);
            }}>Sair</Button>
          </View>
        </View>
      </Modal>

      <Card>
        <Card.Content>
          <View style={{ height: 95, width: 377, alignItems: 'center' }}>
            <AdMobBanner
              bannerSize="smartBannerPortrait"
              adUnitID="ca-app-pub-9891647271376872/3398082789" />
          </View>
          <Image style={{ height: 200, width: 377 }} source={require('./../../resources/bannerfinancas.png')} />
          <Title>Finanças</Title>
          <Paragraph>Vizualize todos os seus gastos aqui</Paragraph>
        </Card.Content>
      </Card>

      <View>

        <Card style={styles.saldo}>
          <Card.Content>
            <View style={{ flexDirection: 'row', color: 'red' }}>
              <Title>Saldo: R$ </Title>
              <Title style={(debitos > creditos) ? { color: 'red' } : { color: 'green' }}>{(creditos - debitos).toFixed(2)}</Title>
            </View>
            <ProgressChart
              data={dataSale}
              width={350}
              height={200}
              strokeWidth={30}
              radius={50}
              chartConfig={{
                backgroundGradientFrom: "#caf1f1",
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: "#caf1f1",
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 0) => `rgba(0, 105, 163, ${opacity})`,
                useShadowColorFromDataset: false // optional
              }}
              hideLegend={false}
            />
            <View style={{ flexDirection: 'row' }}>
              <Paragraph>Gastos: R$ </Paragraph>
              <Paragraph style={{ color: 'red' }}>{debitos.toFixed(2)}</Paragraph>
              <Paragraph>   Ganhos: R$ </Paragraph>
              <Paragraph style={{ color: 'green' }}>{creditos.toFixed(2)}</Paragraph>
            </View>

          </Card.Content>
          <Card.Actions>
            <View>
              {viewDate ?
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                /> : null}
            </View>
            <Button onPress={() => {
              setModalVisible(true);
            }}>Novo gasto</Button >
            <Button onPress={() => {
              setModalGanhoVisible(true);
            }}>Novo ganho</Button>
          </Card.Actions>
        </Card>
          <View style={{backgroundColor:'#caf1f1', borderRadius:20, flexDirection: 'row', flex: 1,padding: 8, marginHorizontal: 20   }}>
            <TouchableOpacity style={{ alignItems: 'center', borderRadius: 10 }} onPress={showDatepicker}>
              <Image
                style={styles.imgFormater}
                source={require('./../../resources/icons/agenda.png')}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 16 ,fontStyle: 'bold', color:'black', width:60  }}>asdasdasddasadasdasdsa</Text>
            <Text style={{   fontSize: 16, fontStyle: 'bold' }}>{date.getDate().toString().padStart(2, '0') + '/' + (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getFullYear()}</Text>
            <TouchableOpacity style={{ alignItems: 'center', borderRadius: 10}} onPress={showDatepicker}>
              <Image
                style={styles.imgFormater}
                source={require('./../../resources/icons/agenda.png')}
              />
            </TouchableOpacity>
          </View>
          
      </View>
      <Card>
        <Card.Title title="Gráfico" subtitle="Gráfico de rosquinha" left={LeftContent} />
        <Card.Content>
          <Title>Gastos</Title>
        </Card.Content>
        <PieChart
          style={{ height: 400 }}
          valueAccessor={({ item }) => item.valor}
          data={data}
          spacing={0}
          outerRadius={'95%'}>
          <Labels />
        </PieChart>
        <List.Section>
          <List.Accordion
            title="Listar todos"

            left={props => <List.Icon {...props} icon="cow" />}>

            {gastos != null && typeof gastos != "undefined" && data != null && data != "undefined" && dataValor != null && dataValor != "undefined" ? (

              data.length = 0,
              dataValor.labels.length = 0,
              dataValor.datasets['0'].data.length = 1,
              gastos.map(val => {
                return (
                  data.push(val),
                  dataValor.labels.push(val.data),
                  dataValor.datasets['0'].data.push(val.valor),
                  <List.Item

                    title={val.descricao + ' - R$ ' + val.valor}
                    description={val.data}
                    style={{ backgroundColor: val.svg.fill }}
                    left={props => <List.Icon {...props} icon="corn" />}
                  />
                )
              })) : (<ActivityIndicator animating={true} color={Colors.red800} />, listAll())}
          </List.Accordion>
        </List.Section>

        <Paragraph>Todos os gastos cadastrados</Paragraph>
      </Card>
      <Card>
        <Card.Title title="Gráfico" subtitle="Gráfico de rosquinha" left={LeftContent} />
        <Card.Content>
          <Title>Ganhos</Title>
        </Card.Content>
        <PieChart
          style={{ height: 400 }}
          valueAccessor={({ item }) => item.valor}
          data={data2}
          spacing={0}
          outerRadius={'95%'}>
          <Labels />
        </PieChart>
        <List.Section>
          <List.Accordion
            title="Listar todos"

            left={props => <List.Icon {...props} icon="cow" />}>

            {ganhos != null && typeof ganhos != "undefined" && data2 != null && data2 != "undefined" && dataValor2 != null && dataValor2 != "undefined" ? (

              data2.length = 0,
              dataValor2.labels.length = 0,
              dataValor2.datasets['0'].data.length = 1,
              ganhos.map(val => {
                return (
                  data2.push(val),
                  dataValor2.labels.push(val.data),
                  dataValor2.datasets['0'].data.push(val.valor),
                  <List.Item

                    title={val.descricao + ' - R$ ' + val.valor}
                    description={val.data}
                    style={{ backgroundColor: val.svg.fill }}
                    left={props => <List.Icon {...props} icon="corn" />}
                  />
                )
              })) : (listAllGanhos())}
          </List.Accordion>
        </List.Section>

        <Paragraph>Todos os gastos cadastrados</Paragraph>
      </Card>

      <Card>
        <Card.Title title="Gráfico" subtitle="Gráfico de Linha" left={LeftContent} />
        <Card.Content>
          <Title>Historico de gastos</Title>
        </Card.Content>
        <View>
          <LineChart
            data={dataValor}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="R$ "
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "blue",
              backgroundGradientFrom: "white",
              backgroundGradientTo: "white",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 0.2) => `rgba(255, 3, 14, 1.0)`,
              labelColor: (opacity = 20) => `black`,
              style: {
                borderRadius: 0
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffff"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
        <Paragraph>Todos os seus custos listados</Paragraph>
      </Card>
      <Card>
        <Card.Title title="Gráfico" subtitle="Gráfico de Linha" left={LeftContent} />
        <Card.Content>
          <Title>Historico de ganhos</Title>
        </Card.Content>
        <View>
          <LineChart
            data={dataValor2}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="R$ "
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "blue",
              backgroundGradientFrom: "white",
              backgroundGradientTo: "white",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 0.2) => `rgba(0, 210, 188, 1.0)`,
              labelColor: (opacity = 20) => `black`,
              style: {
                borderRadius: 0
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffff"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
        <Paragraph>Todos os seus ganhos listados</Paragraph>
      </Card>
      <Card>
        <Card.Title title="Gráfico" subtitle="Gráfico de Barra" left={LeftContent} />
        <Card.Content>
          <Title>Historico de gastos</Title>
        </Card.Content>
        <BarChart
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
          data={dataValor}
          width={Dimensions.get("window").width}
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: "blue",
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 0.2) => `rgba(255, 3, 14, 1.0)`,
            labelColor: (opacity = 0.2) => `#350002`,
            style: {
              borderRadius: 0
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          verticalLabelRotation={30}
        />
        <Paragraph>Todos os seus custos</Paragraph>
      </Card>
      <Card>
        <Card.Title title="Gráfico" subtitle="Gráfico de Barra" left={LeftContent} />
        <Card.Content>
          <Title>Historico de ganhos</Title>
        </Card.Content>
        <BarChart
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
          data={dataValor2}
          width={Dimensions.get("window").width}
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: "blue",
            backgroundGradientFrom: "white",
            backgroundGradientTo: "white",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `#0058ca`,
            labelColor: (opacity = 1) => `black`,
            style: {
              borderRadius: 0
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          verticalLabelRotation={30}
        />
        <Paragraph>Todos os seus ganhos</Paragraph>
      </Card>
    </ScrollView>
  );
};

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Constants.statusBarHeight
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  flexRow: {
    flexDirection: "row"
  },
  input: {
    borderColor: "#4630eb",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8
  },
  listArea: {
    backgroundColor: "#f0f0f0",
    flex: 1,
    paddingTop: 16
  },
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16
  },
  sectionHeading: {
    fontSize: 18,
    marginBottom: 8
  },
  input: {
    backgroundColor: '#ffffff',
    width: 300,
    color: '#222',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 80,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  btnSubmit: {
    backgroundColor: '#35AAFF',
    width: 150,
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  btnSubmit2: {
    backgroundColor: '#FFA500',
    width: 150,
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  imgFormater: {
    width: 40,
    height: 40,
  },
  botaoMenu: {
    width: 200,
    height: 150,
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

  Titulo: {
    color: '#2F4F4F',
    fontSize: 30,
  },
  SubTitulo: {
    color: '#2F4F4F',
    fontSize: 20,
  },
  Texto: {
    color: '#2F4F4F',
    fontSize: 14,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  ordenarPorLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fundo: {
    backgroundColor: '#ffff',
  },
  saldo: {
    backgroundColor: "#caf1f1",
    borderRadius: 10,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 20,
    marginVertical: 20,
  },
}
);
