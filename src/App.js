import React, { useState, useEffect } from "react";
import "./App.css";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=> response.json())
      .then((data)=> {
        const countries = data.map((country) => (
          {
          name: country.country,
          value: country.countryInfo.iso2,
          }
          ));
        setCountries(countries);
      });
    };
    getCountriesData();
  }, []);
 
   const onCountryChange = (event) => {
     const countryCode = event.target.value;

     console.log("Yooo >>>", countryCode);
   //  setCountry(countryCode);
   };

  return (
    <div className="app">
    <div className="app__header">
    <div className="app__left">
       <h1>Covid-19 Tracker</h1>
       {/* Header */}  {/* title * select input dropdown field */}
       {/* InfoBox */} {/* InfoBox */} {/* InfoBox */} {/* Table */}
       {/* Map */}                                     {/* Graph */}
       <FormControl className="app__dropdown">
       <Select varient="outlined" onChange={onCountryChange} value="abc">
       {/* <Select varient="outlined" value={country}> */}
       <MenuItem value="worldwide">worldwide</MenuItem>
       {countries.map((country) => (
         <MenuItem value={country.value}>{country.name}</MenuItem>
       ))}
       {/* Loop through all the countries and show a drop down list of all the options */}
       </Select>
       </FormControl>
    </div>
    <div className="app__stats">
        <InfoBox title="CornonaVirus Cases" cases={1234} total={2000}/>
        <InfoBox title="Recovered" cases={1234} total={3000}/>
        <InfoBox title="Deaths" cases={1234} total={4000}/>
    </div>
    <Map />
    </div>
    <Card className="app__right">
    <CardContent>
       <h3>Live Cases By Country</h3>
       <h3>worldwide new Cases</h3>
    </CardContent>
    </Card>
    </div>
  );
}

export default App;
