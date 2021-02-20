import React from 'react';
import { FlatList, View, Modal, TouchableHighlight, StyleSheet, Text, ScrollView, Image, Dimensions } from 'react-native';
// Import getNews function from news.js
import { getNews } from '../news';
// We'll get to this one later
import Article from '../Article';
import { Button, Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Inicio extends React.Component {
    constructor(props) {
        super(props);
        this.state = { articles: [], refreshing: true };
        this.fetchNews = this.fetchNews.bind(this);
    }
    state = {
        modalVisible: false
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    // Called after a component is mounted
    componentDidMount() {
        this.fetchNews();
    }

    fetchNews() {
        getNews()
            .then(articles => this.setState({ articles, refreshing: false }))
            .catch(() => this.setState({ refreshing: false }));
    }

    handleRefresh() {
        this.setState(
            {
                refreshing: true
            },
            () => this.fetchNews()
        );
    }
    render() {

        const { modalVisible } = false;
        return (
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
                        onPress={this.props.navigation.openDrawer}
                    />
                    <Appbar.Content
                        title="Agricultech"
                    />
                </Appbar.Header>
                <FlatList
                    data={this.state.articles}
                    renderItem={({ item }) => <Article article={item} />}
                    keyExtractor={item => item.url}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh.bind(this)}
                />
            </View>
        );
    }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderBottomEndRadius: 10,
        borderBottomLeftRadius: 10,
        padding: 10,
        elevation: 2
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    img: {
        padding: 20,
        borderBottomStartRadius: 10,
        width: 360,
        alignContent: "center",
        height: 240,
        marginVertical: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    bannerContainer: {
        width: '100%',
        maxHeight: 600,
    },
    banner: {
        width: width - 40,
        maxHeight: 260,
        backgroundColor: '#2196F3',
        marginHorizontal: 20,
        marginVertical: 50,
        padding: 5,
        borderRadius: 10,
    },
});