import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Platform,
} from 'react-native';
import { ListItem, Header } from 'react-native-elements';
import axios from 'axios';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      url: 'http://localhost:5000/',
    };
  }

  componentDidMount() {
    this.getPlanets();
  }

  getPlanets = async () => {
    const { url } = this.state;

    await axios
      .get(url)
      .then((response) => {
        //console.log(response.data.data);
        return this.setState({ listData: response.data.data });
      })
      .catch((error) => {
        alert(error);
      });
  };

  renderItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={`Planet : ${item.name}`}
      subtitle={`Distance from earth : ${item.distance_from_earth}`}
      titleStyle={styles.title}
      containerStyle={styles.listContainer}
      bottomDivider
      chevron
      onPress={() =>
        this.props.navigation.navigate('PlanetDetails', {
          planet_name: item.name,
        })
      }
    />
  );

  keyExtractor = (item, index) => index.toString();

  render() {
    const { listData } = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View>
          <Header
            centerComponent={{
              text: 'Planets App',
              style: {
                fontSize: 30,
                fontWeight: 'bold',
                color: '#132743',
              },
            }}
            backgroundColor={'#edc988'}
          />
        </View>
        <View style={styles.lowerContainer}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.listData}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edc988',
  },

  lowerContainer: {
    flex: 0.9,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainerText: {
    fontSize: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d7385e',
  },
  listContainer: {
    backgroundColor: '#eeecda',
  },
});
