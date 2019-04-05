import React, { Component } from 'react';
import styles from './City.module.css';

import { ReactComponent as Heart } from '../../img/heart.svg';

class City extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favorite: false
    };
  }

  favoriteCity = () => this.setState(state => ({ favorite: !state.favorite }))

  render() {
    return (
      <div className={styles.city}>
        <Heart
          className={`${styles.heart} ${
            this.state.favorite ? styles.active : ''
          }`}
          onClick={this.favoriteCity}
        />
        <span className={styles.cityName}>{this.props.name}</span>
      </div>
    );
  }
}

export default City;
