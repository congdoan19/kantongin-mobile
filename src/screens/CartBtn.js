import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    minWidth: 50,
    minHeight: '100%',
    marginTop: 10,
  },
  btn: {
    height: 28,
    width: 28,
    padding: 15,
    opacity: 0.4,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    minWidth: 20,
    height: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD542A'
  },
  badgeTextStyle: {
    color: '#fff',
  }
});

const shoppingCartImage = require('../assets/icons/shopping-cart.png');

class CartBtn extends Component {
  static propTypes = {
    cart: PropTypes.shape({
      amount: PropTypes.number,
    })
  };

  renderBadge = () => {
    const { cart } = this.props;
    if (!cart.amount) {
      return null;
    }

    return (
      <TouchableOpacity
        style={styles.badge}
        onPress={() => {
          Navigation.showModal({
            screen: 'Cart',
          });
        }}
      >
        <Text style={styles.badgeTextStyle}>
          {cart.amount}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          Navigation.showModal({
            screen: 'Cart',
          });
        }}
      >
        <Image
          source={shoppingCartImage}
          style={styles.btn}
        />
        {this.renderBadge()}
      </TouchableOpacity>
    );
  }
}

export default connect(state => ({
  cart: state.cart,
}))(CartBtn);
