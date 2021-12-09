import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Platform,
} from 'react-native';
import { Card, Icon } from 'react-native-elements';

import axios from 'axios';

export default class PlanetDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      imagePath: '',
      url: `'http://localhost:5000/planet?name=${this.props.navigation.getParam(
        'planet_name'
      )}`,
    };
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails = async () => {
    const { url } = this.state;
    await axios
      .get(url)
      .then((response) => {
        return this.setDetails(response.data.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  setDetails = (planetDetails) => {
    const planetType = planetDetails.planet_type;
    let imagePath = '';
    switch (planetType) {
      case 'Gas Giant':
        imagePath = require('../planet_image_assets/gas_giant.png');
        break;
      case 'Terrestrial':
        imagePath = require('../planet_image_assets/terrestrial.png');
        break;
      case 'Super Earth':
        imagePath = require('../planet_image_assets/super_earth.png');
        break;
      case 'Neptune Like':
        imagePath = require('../planet_image_assets/neptune_like.png');
        break;
      default:
        imagePath = require('../planet_image_assets/gas_giant.png');
    }

    this.setState({
      details: planetDetails,
      imagePath: imagePath,
    });
  };

  render() {
    const { details, imagePath } = this.state;
    if (details) {
      return (
        <View style={styles.container}>
          <Card
            title={details.name}
            image={imagePath}
            imageProps={{ resizeMode: 'contain', width: '100%' }}>
            <View>
              <Text
                style={
                  styles.cardItem
                }>{`Distance from Earth : ${details.distance_from_earth}`}</Text>
              <Text
                style={
                  styles.cardItem
                }>{`Distance from Sun : ${details.distance_from_their_sun}`}</Text>
              <Text
                style={styles.cardItem}>{`Gravity : ${details.gravity}`}</Text>
              <Text
                style={
                  styles.cardItem
                }>{`Orbital Period : ${details.orbital_period}`}</Text>
              <Text
                style={
                  styles.cardItem
                }>{`Orbital Speed : ${details.orbital_speed}`}</Text>
              <Text
                style={
                  styles.cardItem
                }>{`Planet Mass : ${details.planet_mass}`}</Text>
              <Text
                style={
                  styles.cardItem
                }>{`Planet Radius : ${details.planet_radius}`}</Text>
              <Text
                style={
                  styles.cardItem
                }>{`Planet Type : ${details.planet_type}`}</Text>

              <Text>
                {details.specifications
                  ? `Specifications : ${details.specifications}`
                  : 'Unknown'}
              </Text>
            </View>
          </Card>
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardItem: {
    marginBottom: 10,
  },
});
