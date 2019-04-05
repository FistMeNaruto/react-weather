import React from 'react';

import CityList from './components/CityList/CityList'
import WeatherMap from './components/WeatherMap/WeatherMap'

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.App}>
      <CityList />
      <WeatherMap />
    </div>
  );
}

export default App;
