import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from "react-redux";
import { fetchCrypto, fetchMoreCrypto } from "../actions/home";
import moment from 'moment';
import Loader from "../components/Loader";

export class Home extends React.Component {
    state = {
        data: [],
        start: 1,
        clicked: false,
        refreshing: false,
    }

    async componentDidMount() {
        await this.props.fetchCrypto()
        this.setState({
            data: this.props.data,
            start: 1,
            clicked: false
        })
    }

    more = async () => {
        this.setState({
            clicked: true
        })
        await this.props.fetchMoreCrypto(this.state.start + 10)
        this.setState({
            more: this.props.activeMore,
            start: this.state.start + 10,
            data: this.state.data.concat(this.props.dataMore),
            clicked: false
        })
    }

    _onRefresh = async () => {
        this.setState({ refreshing: true });
        await this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    reload = () => {
        this.componentDidMount();
        this.setState({
            clicked: true
        })
    }

    render() {
        const { data } = this.state;
        return (
            <View>
                <Header
                    containerStyle={styles.header}
                    centerComponent={{ text: 'Crypt', style: { color: '#fff', fontSize: 24 } }}
                />
                {
                    this.props.data === null ?
                        <Loader />
                        :
                        <View>
                            {this.props.error ?
                                <View style={styles.error}>
                                    <Text style={styles.errorText}>{this.props.data[0]}</Text>
                                    <TouchableOpacity
                                        onPress={this.reload}
                                        style={styles.btn}
                                    >
                                        {
                                            this.state.clicked ?
                                                <Text style={styles.btnText}>Loading...</Text>
                                                :
                                                <Text style={styles.btnText}>Reload</Text>
                                        }
                                    </TouchableOpacity>
                                </View>
                                :
                                <ScrollView
                                    contentContainerStyle={styles.body}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={this.state.refreshing}
                                            onRefresh={this._onRefresh}
                                        />
                                    }
                                >
                                    {data.map((data, index) =>
                                        <View style={styles.card} key={index}>
                                            <Text style={styles.title}>{data.symbol}</Text>
                                            <View style={styles.divider}></View>
                                            <View style={styles.cardTop}>
                                                <View style={styles.row}>
                                                    <Text style={styles.label}>Cryptocurrency:</Text>
                                                    <Text style={styles.value}> {data.name}</Text>
                                                </View>
                                                <View style={styles.row}>
                                                    <Text style={styles.label}>Symbol:</Text>
                                                    <Text style={styles.value}> {data.symbol}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.rowSingle}>
                                                <Text style={styles.label}>Last updated:</Text>
                                                <Text style={styles.value}> {moment(data.quote.USD.last_updated).format('MMM Do YYYY, h:mm:ss a')}</Text>
                                            </View>
                                            <View style={styles.rowSingle}>
                                                <Text style={styles.label}>Price:</Text>
                                                <Text style={styles.value}> ${Math.round(data.quote.USD.price * 100) / 100}</Text>
                                            </View>
                                            <View style={styles.cardBody}>
                                                <View style={styles.row}>
                                                    <Text style={styles.label}>% change in 1h:</Text>
                                                    <Text style={styles.value}> {Math.round(data.quote.USD.percent_change_1h * 100) / 100}</Text>
                                                </View>
                                                <View style={styles.row}>
                                                    <Text style={styles.label}>% change in 24h:</Text>
                                                    <Text style={styles.value}> {Math.round(data.quote.USD.percent_change_24h * 100) / 100}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                    <TouchableOpacity
                                        onPress={this.more}
                                        style={styles.btn}
                                    >
                                        {
                                            this.state.clicked ?
                                                <Text style={styles.btnText}>Loading...</Text>
                                                :
                                                <Text style={styles.btnText}>Show more</Text>
                                        }
                                    </TouchableOpacity>
                                </ScrollView>
                            }
                        </View>
                }
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCrypto: () => dispatch(fetchCrypto()),
    fetchMoreCrypto: (start) => dispatch(fetchMoreCrypto(start)),
});

const mapStateToProps = state => ({
    data: state.home.data,
    dataMore: state.home.dataMore,
    error: state.home.error
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#1B2845',
        justifyContent: 'space-around',
        borderBottomColor: '#1B2845',
        elevation: 10
    },
    body: {
        paddingTop: 25,
        paddingRight: 25,
        paddingLeft: 25,
        paddingBottom: 180
    },
    title: {
        color: '#fff',
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10
    },
    divider: {
        borderWidth: 0.4,
        borderBottomColor: '#304D6D',
        marginBottom: 10
    },
    card: {
        borderRadius: 8,
        padding: 15,
        marginBottom: 25,
        backgroundColor: '#1B2845',
        overflow: 'hidden'
    },
    cardTop: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardBody: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowSingle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    label: {
        color: '#A7CCED',
        fontSize: 12,
    },
    value: {
        color: '#fff',
        fontSize: 16,
    },
    btn: {
        backgroundColor: '#1B2845',
        borderRadius: 8,
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    btnText: {
        color: '#fff',
        fontSize: 14,
        textAlign: "center"
    },
    error: {
        justifyContent: 'center',
        height: '93%',
        padding: 25
    },
    errorText: {
        alignSelf: 'center',
        color: '#fff',
        marginBottom: 30
    }
});
