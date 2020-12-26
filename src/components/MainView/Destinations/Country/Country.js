import React from 'react';
import * as s from './Country.styles';

const Country = (props) => {
  const country = props.match.params.country;
  const countries = {
    india: {
      img: '/images/countries/india.jpg',
      description: 'India is awesome',
    },
    canada: {
      img: '/images/countries/canada.jpg',
      description: 'Canada is chilly',
    },
    spain: {
      img: '/images/countries/spain.jpg',
      description: 'spain is beautiful',
    },
    brazil: {
      img: '/images/countries/brazil.jpg',
      description: 'brazil is mesmerizing',
    },
  };

  return (
    <s.CountryContainer>
      <s.CountryImage img={countries[country]['img']} />
      <s.CountryDescription>
        {countries[country]['description']}
      </s.CountryDescription>
    </s.CountryContainer>
  );
};

export default Country;
