import React, { Component } from 'react';

import CountryList from './components/Countries/CountryList';

import Header from './header/Header';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      allCountries: [],
      filteredCountries: [] ,
      filteredPopulation: 0 ,
      filter: '',
    };
  }

  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();

    const countries = json.map((item) => {
      const { name, flag, numericCode, population, area } = item;

      return {
        id: numericCode,
        nameFilter: name.toLowerCase(),
        name,
        flag,
        population,
        area,
      };
    });

    const filteredPopulation = this.calculateTotalPopulationFrom(countries);
    this.setState({
      allCountries: countries,
      filteredCountries : countries,
      filteredPopulation,
    });
  }

  calculateTotalPopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((accmulator, current) =>{

      return accmulator + current.population
    }, 0   );

    return totalPopulation
  }

  handleChangeFilter= (newText) =>{

    this.setState({ filter: newText });


    const filterLowerCase = newText.toLowerCase();
    const filteredCountries = this.state.allCountries.filter((country) => {
      return country.nameFilter.includes(filterLowerCase);      
    })

    const filteredPopulation = this.calculateTotalPopulationFrom(filteredCountries);
    this.setState({ filteredCountries, filteredPopulation });
  }

  render() {    
    const { filteredCountries, filter, filteredPopulation} = this.state;


    return (
      <div className="container">
        <h1 style={styles.centeredTitle}>React Countries</h1>
       <Header 
       filter ={filter} 
       countryCount = {filteredCountries.length}
       totalPopulation = {filteredPopulation}
       
       onChangeFilter = {this.handleChangeFilter}/>
        <CountryList countries={filteredCountries} />

      </div>
    );
  }
}

const styles = {
  centeredTitle:{

    textAlign: 'center'
  }
}