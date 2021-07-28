import React, { useState, useEffect } from "react";
import "./App.css";
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Map from "./Map";
import Table from "./Table";
import "leaflet/dist/leaflet.css";
import { sortData, prettyPrintStat } from "./util";
// import numeral from "numeral";

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
            .then((response) => response.json())
            .then(data => {
                setCountryInfo(data);
            });

    }, []);

    useEffect(() => {
        const getCountriesData = async() => {
            await fetch("https://disease.sh/v3/covid-19/countries")
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }));

                     let sortedData = sortData(data);
                    setTableData(sortedData);
                    setCountries(countries);
                    setMapCountries(data);
                });
        };
        getCountriesData();
    }, []);

console.log(casesType);



    const onCountryChange = async(e) => {
        const countryCode = e.target.value;

        const url =
            countryCode === "worldwide" ?
            "https://disease.sh/v3/covid-19/all" :
            `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url)
            .then((response) => response.json())
            .then((data)=> {
                setCountryInfo(data);
                setCountry(countryCode);
                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setMapZoom(4);
            })
            // console.log("Country Info >>>", countryCode);
    };


    return ( 
    <div className = "app" >
            <div className = "app__left" >
            <div className = "app__header" >
            <h1 > Covid - 19 Tracker < /h1>
             <FormControl className = "app__dropdown">
            <Select varient = "outlined" value={country} onChange={onCountryChange}>
            <MenuItem value = "worldwide" > worldwide </MenuItem> 
            {countries.map((country) => ( 
                <MenuItem value = { country.value } > { country.name } </MenuItem>
            ))} 
        </Select> 
        </FormControl > 
        </div>
         <div className = "app__stats" >
       <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
         <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          /> 
         <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
    </div>

        <Map
        countries={mapCountries}
        casesType={casesType}
        center={mapCenter}
        zoom={mapZoom}
        />
        </div> 
        <Card className = "app__right" >
        <CardContent >
        <div className="app__information">
        <h3 className="app__graphtitle"> Live Cases By Country </h3> 
         <Table countries={tableData}/>  
          <h3 className="app__graphtitle"> worldwide new {casesType} </h3> 
        <LineGraph casesType={casesType} className="app__graph"/>
        </div>
    </CardContent> 
    </Card> 
    </div>
    )
};


export default App;