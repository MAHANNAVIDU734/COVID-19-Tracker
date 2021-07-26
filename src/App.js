import React, { useState, useEffect } from "react";

import "./App.css";
import { MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core";
// import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";

import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Map from "./Map";
// import Table from "./Table";
// import { sortData } from "./util";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  // const [tableData, setTableData] = useState([]);
  
 useEffect (() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then(data => {
      setCountryInfo(data);
    });
    
  },[]);

  useEffect(() => {
    
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response)=> response.json())
      .then((data)=> {
        const countries = data.map((country) => (
          {
          name: country.country,
          value: country.countryInfo.iso2,
          }));

      //  const sortedData = sortedData(data);
      //   setTableData(sortedData);
         setCountries(countries);
      });
    };
    getCountriesData();
  }, []);

  
 


 const onCountryChange = async(event) => {
   const countryCode = event.target.value;
   
    const url = 
       countryCode === "worldwide" 
           ? "https://disease.sh/v3/covid-19/all" 
           : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
           
    await fetch(url)
       .then(response => response.json())
       .then(data => {
         setCountryInfo(data);
         setCountry(countryCode);
         //All of the data from the country response
       })
    // console.log("Country Info >>>", countryCode);
    };
   

  return (
    <div className="app">
       <div className="app__left">
          <div className="app__header">
       <h1>Covid-19 Tracker</h1>
       <FormControl className="app__dropdown">
       <Select varient="outlined"  value={country} onChange={onCountryChange}>
       <MenuItem value="worldwide">worldwide</MenuItem>
       {countries.map((country) => (
         <MenuItem value={country.value}>{country.name}</MenuItem>
       ))}
       </Select>
       </FormControl>
           </div>
             <div className="app__stats">
                <InfoBox title="CornonaVirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
                <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
                <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
             </div>
            
         <Map />
        </div>
    <Card className="app__right">
    <CardContent>
       <h3>Live Cases By Country</h3>
       {/* <Table countries={tableData}  /> */}
       <h3>worldwide new Cases</h3>
       <LineGraph />
    </CardContent>
    </Card>
    </div>
  );
}

export default App;
