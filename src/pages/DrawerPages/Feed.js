import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { getUsuario } from '../../Service/User';
import { SafeAreaView } from 'react-navigation';
import { Slider } from 'react-native-elements';
import {
  Form,
  Input
} from './styles';
import {
  AdMobBanner
} from 'expo-ads-admob';
import {
  Avatar,
  Button,
  Card,
  Title, Snackbar, Divider,
  Paragraph, Dialog, Portal, Provider,
  TextInput, DataTable, ProgressBar, Colors,
  Caption, Appbar, ActivityIndicator, Chip
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Video } from 'expo-av';
import * as firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';
import { Camera } from 'expo-camera';
import { Modal, Linking } from 'react-native';
import { Tooltip } from 'react-native-elements';
import { ImageBackground } from 'react-native';
import { margin } from 'polished';

const { width: screenWidth } = Dimensions.get('window');

export default function Feed({ navigation }) {
  const carouselRef = useRef(null);
  const [text, setText] = React.useState("")
  const [ativar, setAtivar] = React.useState(false)
  const [emogi, setEmogi] = React.useState("")
  const [ativarTip, setAtivarTip] = React.useState(false)
  const [valor, setText2] = React.useState(null)
  const [ENTRIES1, setEntries] = React.useState([]);
  const [tips, setTips] = React.useState([]);
  const [tipsTemp, setTipsTemp] = React.useState(null);

  const [play, setPlay] = React.useState(false)
  const [volume, setVolume] = React.useState(1)
  const [repetir, setRepetir] = React.useState(false)
  const [userTemp, setUserTemp] = React.useState()
  const [emoji, setAtivarEmoji] = React.useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoExibe, setVideoExibe] = useState(null);
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const onDismissSnackBar = () => setVisible(false);
  const hashid = getUsuario().params.hash;
  async function salvarGastos() {
    var banco = firebase.database().ref('/data/feed/');

    let chave = ENTRIES1.length;

    banco.child(chave).set({
      id: chave,
      tomates: 0,
      subtitle: text,
      video: video,
      tips: tips,
      illustrationLocal: image,
      illustration: valor,
      data: new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear(),
      user: getUsuario().params.name,
      image: getUsuario().params.picture.data.url,
      ord: -1 * new Date().getTime()
    });
    var banco2 = firebase.database().ref('/data/feed/');
    banco2.child(chave + "/users/" + getUsuario().params.hash).update({
      like: true
    });
  }
  async function getUserTemp(hash) {
    await firebase.database().ref('/' + hash).on('value', (snapshot) => {
      if (snapshot.val() != null && typeof snapshot.val() != "undefined") {
        setUserTemp(snapshot.val());
        console.log(userTemp)
      }
    });
  }

  function like(id, qtd) {
    var banco = firebase.database().ref('/data/feed/');
    banco.child(id).update({
      tomates: qtd + 1
    });

    var banco2 = firebase.database().ref('/data/feed/');
    banco2.child(id + "/users/" + getUsuario().params.hash).update({
      like: true
    });
  }
  function activity() {
    return (<ActivityIndicator animating={true} color={Colors.red800} />)
  };
  async function listAll() {
    await firebase.database().ref('/data/feed/').on('value', (snapshot) => {
      if (snapshot.val() != null && typeof snapshot.val() != "undefined") {
        setEntries(snapshot.val().slice(0).reverse());
      }
    });
  }

  useEffect(() => {
    setEntries(ENTRIES1);
    listAll();
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
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

  };
  function geraCor() {
    return ('rgb(' + Math.floor(Math.random() * (170) + 120)) + ',' + (Math.floor(Math.random() * (170) + 120)) + ',' + (Math.floor(Math.random() * (170) + 120) + ')')
  }
  const addTip = async () => {
    let cor = geraCor();
    await tips.push({
      descricao: tipsTemp,
      color: cor
    });

    setTips(tips)
    listAll()
  }

  const pickCamera = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result.uri);

    let file = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });

    file = 'data:video/mp4;base64,' + file
    console.log(file)
    setVideo(file);

  };

  function addEmogi(emogi) {
    let emogiTemp = emogi
    let texto = text

    setText(texto + emogiTemp)
  }

  function removeTips(tip) {
    tips.splice(tips.indexOf(tip), 1)
    setTips(tips)
    listAll()
  }
  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    });

    console.log(result.uri);

    setVideoExibe(result.uri);
    let file = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });

    file = 'data:video/mp4;base64,' + file
    console.log(file)
    setVideo(file);

  };
  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <SafeAreaView>
        <View style={styles.item}>
          <ParallaxImage
            source={{ uri: item.illustration }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.1}
            {...parallaxProps}
          />
          <View style={styles.item2}>
            <Title style={styles.title} numberOfLines={3}>
              {item.title}
            </Title>
            <Caption style={{
              color: 'white',
              textAlign: "center",
            }} numberOfLines={3}>
              {item.subtitle + '\nPor: ' + item.user}
            </Caption>
          </View>
        </View>
      </SafeAreaView>
    );
  };

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
        <Card style={{ height: Dimensions.get('window').height }}>

          <Card.Title title={'Ops!'} subtitle={'Você nao pode usar essa função com o usuario offline!'} />
          <Card.Cover style={{ height: 300 }} source={require("./../../resources/undrawn/error.png")} />
          <Card.Title subtitle={'Tente criar uma conta com um usuario normal.'} />
        </Card>
      </View>
      :
      <ScrollView>
        <View >

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
          <View style={{ height: 95, width: 377, alignItems: 'center' }}>
            <AdMobBanner
              bannerSize="smartBannerPortrait"
              adUnitID="ca-app-pub-9891647271376872/3398082789" />
          </View>

          <SafeAreaView style={styles.item2}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false)
              }}
            >
              <View style={styles.container}>
                <Camera style={styles.camera} type={type}>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        setType(
                          type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                      }}>
                      <Text style={styles.text}> Flip </Text>
                    </TouchableOpacity>
                  </View>
                  <Button onPress={() => { setModalVisible(true) }}
                    icon={({ color, size }) => (
                      <Icon
                        name="camera"
                        color={'white'}
                        size={80}
                      />
                    )}
                  >
                  </Button>
                </Camera>
              </View>
            </Modal>

          </SafeAreaView>
          <View style={styles.container}>
            <View style={styles.centeredView}>
              

                <View style={styles.perfil, { marginHorizontal: 5, flexDirection: 'row' }}>
                  <Avatar.Image
                    source={{ uri: getUsuario().params.picture.data.url }}
                    size={50}
                  />
                  <View>
                    <Paragraph>{' ' + getUsuario().params.name}</Paragraph>
                    <Caption>{'   ' + getUsuario().params.email + '\n'}</Caption>
                  </View>
                </View>
                <View>
                <Input
                  mode='outlined'
                  label="Digite algo!"
                  multiline
                  numberOfLines={4}
                  style={styles.input, { marginLeft: 20 }}
                  placeholder="Sua postagem aqui!"
                  autoCorrect={false}
                  onChangeText={text => setText(text)}
                  defaultValue={text}
                />
                {ativar ?
                  <Input
                    mode='outlined'
                    label="Imagem"
                    style={styles.input, { marginLeft: 20 }}
                    placeholder="Adicione o link de uma imagem"
                    autoCorrect={false}
                    onChangeText={text => setText2(text)}
                  />
                  :
                  null}
                {ativarTip ?
                  <View style={{ flexDirection: 'row' }}>
                    <Input
                      mode='outlined'
                      label="Imagem"
                      style={styles.input, { marginRight: 0, marginLeft: 20 }}
                      placeholder="Adicione uma tag aqui"
                      autoCorrect={false}
                      onChangeText={text => setTipsTemp(text)}
                    />
                    <Button onPress={() => { addTip() }}
                      icon={({ color, size }) => (
                        <Icon
                          name="plus"
                          color={color}
                          size={30}
                        />
                      )}
                    />
                  </View>
                  :
                  null}
                {video && <View>
                  <TouchableOpacity onPress={() => { setVideo(null) }}>
                  <Icon
                    name="file-video"
                    color='green'
                    size={30}
                  />
                  <ImageBackground source={{ uri: videoExibe }} style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    height: 200,
                    borderRadius: 5,
                    backgroundColor: '#FFF',
                    alignSelf: 'stretch',
                    marginBottom: 10,
                    marginHorizontal: 20,
                    fontSize: 14,
                    borderWidth: 5,
                    borderColor: '#dfddfa',
                  }} >
                    <Icon
                    name="close-circle"
                    color='black'
                    size={30}
                  />
                  </ImageBackground>
                  </TouchableOpacity>
                  </View>}
                {image && <View>
                  <TouchableOpacity onPress={() => { setImage(null) }}>
                  <Icon
                    name="image"
                    color='green'
                    size={30}
                  />
                  <ImageBackground source={{ uri: image }} style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    height: 200,
                    borderRadius: 5,
                    backgroundColor: '#FFF',
                    alignSelf: 'stretch',
                    marginBottom: 10,
                    marginHorizontal: 20,
                    fontSize: 14,
                    borderWidth: 1,
                    borderColor: '#CCC',
                  }} >
                    <Icon
                    name="close-circle"
                    color='black'
                    size={30}
                  />
                  </ImageBackground>
                  </TouchableOpacity>
                </View>}
                {tips ?

                  <View style={{ flexDirection: 'row' }}>
                    {tips.map(tip => {
                      return (
                        <Chip icon="cancel" style={{ backgroundColor: tip.color }} onPress={() => removeTips(tip)}>{tip.descricao}</Chip>
                      )
                    })}
                  </View>
                  : console.log("nao entrou!")}
                {emoji ?
                  <ScrollView style={{ height: 400 }}>
                    <EmojiSelector
                      category={Categories.emotion}
                      columns={9}
                      onEmojiSelected={emogi => addEmogi(emogi)}
                    />
                  </ScrollView>
                  : null}
                <View style={{ flex: 8, backgroundColor: '#dfddfa', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginTop: 10, marginBottom: 10 }}>
                  <View style={{ flexDirection: 'row' }}>
                    {ativar ?
                      <Button onPress={() => { setAtivar(false) }}
                        icon={({ color, size }) => (
                          <Icon
                            name="link-box-variant"
                            color={color}
                            size={30}
                          />

                        )}
                      />
                      :
                      <Button onPress={() => { setAtivar(true) }}
                        icon={({ color, size }) => (
                          <Icon
                            name="link-box-outline"
                            color={color}
                            size={30}
                          />

                        )}
                      />
                    }
                    <Button onPress={() => { pickImage() }}
                      icon={({ color, size }) => (
                        <Icon
                          name="folder-image"
                          color={color}
                          size={30}
                        />
                      )}
                    >
                    </Button>
                    <Button style={{ width: 20 }} onPress={() => { emoji ? setAtivarEmoji(false) : setAtivarEmoji(true) }}
                      icon={({ color, size }) => (
                        <Icon
                          name="sticker-emoji"
                          color={color}
                          size={30}
                        />
                      )}
                    >
                    </Button>

                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Button onPress={() => { pickVideo() }}
                      icon={({ color, size }) => (
                        <Icon
                          name="file-video"
                          color={color}
                          size={30}
                        />
                      )}
                    >
                    </Button>
                    <Button onPress={() => { ativarTip ? setAtivarTip(false) : setAtivarTip(true) }}
                      icon={({ color, size }) => (
                        <Icon
                          name="tag"
                          color={color}
                          size={30}
                        />
                      )}
                    />

                    <Button
                      icon={({ color, size }) => (
                        <Icon
                          name="send"
                          color={'green'}
                          size={30}
                        />
                      )}
                      onPress={() => {
                        salvarGastos(); setVisible(true)
                      }}></Button>

                  </View>

                </View>
              </View>
              <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                  label: 'Fechar',
                  onPress: () => {
                    // Do something
                  },
                }}>
                🐷 Post enviado com sucesso! 🐑
      </Snackbar>
            </View>
          </View>
          {typeof ENTRIES1 === null || typeof ENTRIES1 === 'undefined' || ENTRIES1 == [] || ENTRIES1.length == 0 ? (
            <View style={styles.centeredView}>
              <Text>{'Tentando carregar posts aguarde...\n'}</Text>
              <ActivityIndicator animating={true}></ActivityIndicator>
            </View>
          ) :
            <View />
          }
          {ENTRIES1 === null && typeof ENTRIES1 === "undefined" ? (
            listAll()) : (
              ENTRIES1.map(item => {
                return (
                  <SafeAreaView style={{ alignItems: 'center' }}>
                    <View>
                      <View style={styles.item2}>
                        <Card>
                          <Card.Title left={(props) =>
                            <Tooltip popover={
                              userTemp ?
                                <View style={{ marginLeft: 150, width: 300, height: 50 }}>
                                  <Card>

                                    <Card.Title title={userTemp.nome} subtitle={'Você nao pode usar essa função com o usuario offline!'} />
                                    <Card.Cover source={require("./../../resources/undrawn/error.png")} />
                                    <Card.Title subtitle={'Tente criar uma conta com um usuario normal.'} />
                                  </Card>
                                </View>
                                :
                                getUserTemp(item.id)
                            }>

                              <Avatar.Image
                                source={{ uri: item.image }}
                                size={50}
                              />
                            </Tooltip>
                          } title={item.user} subtitle={item.data} />
                          <Card.Content>
                            <Paragraph>{item.subtitle}</Paragraph>
                          </Card.Content>
                          {item.illustration ? (
                            <Card.Cover source={{ uri: item.illustration }} />
                          ) : console.log("")}
                          {item.illustrationLocal ? (
                            <Card.Cover source={{ uri: item.illustrationLocal }} />
                          ) : console.log("")}
                          {item.video ? (
                            <View>
                              <Video
                                source={{ uri: item.video }}

                                rate={1.0}
                                volume={volume}
                                isMuted={false}
                                resizeMode="cover"
                                shouldPlay={play}
                                isLooping={repetir}
                                inFullscreen={false}
                                showControlsOnLoad={false}
                                showFullscreenButton={false}
                                style={{ height: 300, width: screenWidth - 20 }}
                              />
                              <ProgressBar progress={0.5} color={Colors.red800} />

                              <View style={{ flex: 3, backgroundColor: '#dfddfa', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', borderRadius: 5, marginTop: 10, marginBottom: 10 }}>
                                <Button onPress={() => { volume == 0 ? setVolume(1) : setVolume(0) }} style={{ width: 50, alignSelf: 'center' }}
                                  icon={({ color, size }) => (
                                    volume == 0
                                      ?
                                      <Icon
                                        name="volume-high"
                                        color={color}
                                        size={30}
                                      />
                                      :
                                      <Icon
                                        name="volume-off"
                                        color={color}
                                        size={30}
                                      />
                                  )}
                                />
                                <Button onPress={() => { play ? setPlay(false) : setPlay(true) }} style={{ width: 50, alignSelf: 'center' }}
                                  icon={({ color, size }) => (
                                    !play ?
                                      <Icon
                                        name="play"
                                        color={color}
                                        size={30}
                                      />
                                      :
                                      <Icon
                                        name="pause"
                                        color={color}
                                        size={30}
                                      />
                                  )}
                                />
                                <Button onPress={() => { repetir ? setRepetir(false) : setRepetir(true) }} style={{ width: 50, alignSelf: 'center' }}
                                  icon={({ color, size }) => (
                                    <Icon
                                      name="refresh"
                                      color={color}
                                      size={30}
                                    />

                                  )}
                                />
                              </View>
                            </View>

                          ) : null}
                          {item.tips ?
                            <SafeAreaView style={{ flexDirection: 'row' }}>
                              {item.tips.map(tip => {
                                return (
                                  <Chip icon="alert-decagram" style={{ backgroundColor: tip.color, marginHorizontal: 4 }} onPress={() => Linking.openURL('https://www.google.com/search?q=' + tip.descricao
                                  )}>{tip.descricao}</Chip>
                                )
                              })}
                            </SafeAreaView>
                            : console.log("nao entrou!")}
                          <Divider style={{ marginTop: 5, marginHorizontal: 20 }} />
                          <Card.Actions>
                            {!item.hasOwnProperty("users") || !item.users.hasOwnProperty(hashid) ? (
                              <TouchableOpacity
                                onPress={() => {
                                  like(item.id, item.tomates)
                                }}
                              >
                                <Avatar.Image
                                  style={{ backgroundColor: '#fff' }}
                                  source={require('../../resources/tomate.png')}
                                  size={30}
                                />
                              </TouchableOpacity>

                            ) : (<Avatar.Image
                              style={{ backgroundColor: '#fff' }}
                              source={require('../../resources/tomate.png')}
                              size={30}
                            />)}

                            {item.tomates ? (
                              <Text>    {item.tomates}</Text>
                            ) : <Text>    0</Text>}
                          </Card.Actions>
                        </Card>
                      </View>

                    </View>
                  </SafeAreaView>
                )
              })
            )}

        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    width: screenWidth - 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop:22,
    marginVertical:40
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    width: screenWidth - 20,
    height: screenWidth - 80,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    marginBottom: 22,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  title: {
    color: 'white',
    fontSize: 16,
    textAlign: "center",

  },
  input: {
    backgroundColor: '#ffffff',
    width: 300,
    color: '#222',
    height: 50,
  },
  item: {
    backgroundColor: '#008c97',
    width: screenWidth - 60,
    height: screenWidth - 80,
    borderRadius: 10,
  },
  item2: {
    backgroundColor: '#ffff',
    width: screenWidth - 20,
    marginBottom: 12,
    borderRadius: 10,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  perfil: {
    flexDirection: 'row'
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: screenWidth - 1000,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});