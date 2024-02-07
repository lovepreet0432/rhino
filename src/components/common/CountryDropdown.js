import React from 'react';
import Select from 'react-select';
import countries from 'countries-list';

const countryOptions = Object.keys(countries.countries).map(countryCode => ({
  value: countryCode,
  label: countries.countries[countryCode].name,
}));

const defaultCountry = 'US'; 

const CountryDropdown = ({ selectedCountry, onChange }) => {
  return (
    <Select
      options={countryOptions}
      value={countryOptions.find(option => option.value === selectedCountry) || countryOptions.find(option => option.value === defaultCountry)}
      onChange={option => onChange(option.value)}
    />
  );
};
export default CountryDropdown;