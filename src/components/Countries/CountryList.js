import React, { Component } from 'react';

import css from './country-list.module.css';

import CountryItem from './CountryItem';

export default class CountryList extends Component {
  render() {
    const { countries } = this.props;
   

    return (
      <div className={css.container}>
        <h2 className="title">Países</h2>

        <ul className={css.ulContainer}>
          {countries.map((country) => {
            const { id } = country;

            return (
              
              <li key={id} className={css.liContainer}>
                <CountryItem country={country} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
