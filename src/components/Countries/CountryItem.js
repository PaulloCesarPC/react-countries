import React, { Component } from 'react';

import css from './country-item.module.css';
import { formatNumber, limitSizeName } from '../../helpers/format-helpers';

export default class CountryItem extends Component {
  render() {
    const { country } = this.props;
    const { name, flag , population } = country;
    
    
    return (
      <div className={css.countryItemContainer} id={country.id}>
        <img className={css.flag} src={flag} alt={name} />
        {limitSizeName(name)} <br></br> Pop:  {formatNumber(population)}
      </div>
    );
  }
}
