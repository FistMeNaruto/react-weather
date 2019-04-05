import React, { Component } from 'react';
import styles from './CityList.module.css';

import Collapse from '@kunukn/react-collapse';
import City from '../City/City';

import cityListData from '../../data/cityList';
import countryCodesData from '../../data/countryCodes';

class CityList extends Component {
  constructor(props) {
    super(props);

    const listData = cityListData
      .map(city => {
        const countryName = countryCodesData.filter(country => {
          return country.Code === city.country;
        });

        return {
          id: city.id,
          coord: city.coord,
          name: city.name,
          countryId: city.country,
          countryName: countryName.shift().Name
        };
      })
      .reduce((total, current) => {
        total[current.countryId] = total[current.countryId] || [];
        total[current.countryId].push(current);
        return total;
      }, {});

    this.state = {
      listOpen: false,
      accordionIndex: null,
      listData
    };
  }

  toggleList = () => this.setState(state => ({ listOpen: !state.listOpen }));

  toggleAccordion = index =>
    this.setState(state => ({
      accordionIndex: state.accordionIndex === index ? null : index
    }));

  render() {
    const listItems = Object.keys(this.state.listData).map(country => {
      const cityItems = this.state.listData[country].map(city => {
        return <City name={city.name} key={city.id} />;
      });

      return (
        <div className={styles.country} key={country}>
          <button
            className={styles.listButton}
            onClick={() => this.toggleAccordion(country)}
          >
            <span>
              <img
                className={styles.flag}
                src={`https://www.countryflags.io/${country}/flat/24.png`}
                alt="flag"
              />
              {this.state.listData[country][0].countryName}
            </span>
            <span className={styles.listIndicator}>
              {this.state.accordionIndex === country ? '-' : '+'}
            </span>
          </button>
          <Collapse
            className={styles.listInner}
            isOpen={this.state.accordionIndex === country}
          >
            {cityItems}
          </Collapse>
        </div>
      );
    });

    return (
      <div
        className={`${styles.listContainer} ${
          this.state.listOpen ? styles.open : ''
        }`}
      >
        <div className={styles.hamburger} onClick={this.toggleList} />
        <input className={styles.search} type="text" placeholder="Search" />
        <div className={styles.list}>{listItems}</div>
      </div>
    );
  }
}

export default CityList;
