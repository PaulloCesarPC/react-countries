import React ,{ useState, useEffect} from 'react';

import CountryList from './components/Countries/CountryList';

import Header from './header/Header';



const doFetchCountries = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const json = await res.json();

  return json.map((item) => {
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
};


export default function App() {
  const [allCountries, setAllCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filteredPopulation, setFilteredPopulation] = useState(0)
  const [usefilter, setUseFilter] = useState('')

  useEffect(() => {
    const getCountries = async()=> {
      const allCountries = await doFetchCountries();
      setAllCountries(allCountries)
      setFilteredCountries(Object.assign([],allCountries))
      
    }
    
    getCountries();
  }, [])


 const calculateTotalPopulationFrom = (countries) => {
    const totalPopulation = countries.reduce((accmulator, current) =>{

      return accmulator + current.population
    }, 0   );

    return totalPopulation;
  };

  
  const handleChangeFilter= (newText) =>{

    setUseFilter(newText);
    const filterLowerCase = newText.toLowerCase();
    const filteredCountries = allCountries.filter((country) => {
      return country.nameFilter.includes(filterLowerCase);      
    })

    setFilteredPopulation(calculateTotalPopulationFrom(filteredCountries));
    
    setFilteredCountries(filteredCountries)
  }

  return (
    <div className="container">
      <h1 style={styles.centeredTitle}>React Countries</h1>
     <Header 
     filter ={usefilter} 
     countryCount = {filteredCountries.length}
     totalPopulation = {filteredPopulation}
     
     onChangeFilter = {handleChangeFilter}/>
      <CountryList countries={filteredCountries} />

    </div>
  )  
}

const styles = {
  centeredTitle:{

    textAlign: 'center'
  }
}