import './App.css';
import React, { useState } from 'react';
import { createChat } from './openai'
import { googleKey } from './secrets.js';
import './googleplaces.js'
import Cuisine from './components/Cuisine';
import Restaurant from './components/Restaurant';
import downarrow from './images/downarrow.svg';

import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-cyan/theme.css';


function App() {
  // Conditional rendering constants
  const [submitted, setSubmitted] = useState(false);
  const [cuisineLoaded, setCuisineLoaded] = useState(false);
  const [cuisineChosen, setCuisineChosen] = useState(false);
  const [iframeLoaded, setiFrameLoaded] = useState(false);

  // Filters constants
  const [weather, setWeather] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [budget, setBudget] = useState(null);
  const [peopleType, setPeopleType] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(null);
  const [mealType, setMealType] = useState(null);

  const typesOfWeather = [
    { name: 'Sunny', code: 'SU' },
    { name: 'Cloudy', code: 'CL' },
    { name: 'Rainy', code: 'RA' },
    { name: 'Snowy', code: 'CO' }
  ];

  const typesOfPeople = [
    { name: 'Myself', code: 'MY' },
    { name: 'Friend(s)', code: 'FR' },
    { name: 'Family', code: 'FA' },
    { name: 'Significant Other', code: 'SO' },
    { name: 'Coworker(s)', code: 'CO' },
    { name: 'Client(s)', code: 'CL' },
    { name: 'New', code: 'NE' }
  ];

  const [loading, setLoading] = useState(false);

  // Recommended constants
  const [cuisine1, setCuisine1] = useState('');
  const [cuisine2, setCuisine2] = useState('');
  const [cuisine3, setCuisine3] = useState('');
  const [dish1, setDish1] = useState('');
  const [dish2, setDish2] = useState('');
  const [dish3, setDish3] = useState('');

  const [chosenCuisine, setChosenCuisine] = useState('');
  const [chosenDish, setChosenDish] = useState('');

  const cuisineChoice = (cuisine, dish) => {
    setCuisineChosen(true);
    setChosenCuisine(cuisine);
    setChosenDish(dish);
  };

  // Restaurant constants
  const [restaurantName, setRestaurantName] = useState('');
  const [currentLocation, setCurrentLocation] = useState(null);

  const receiveNameOfRestaurant = (name) => {
    setRestaurantName(name);
    setiFrameLoaded(true);
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => setCurrentLocation(pos.coords.latitude + ',' + pos.coords.longitude));
  }

  return (
    <div className="app">
      <section id="home">
        <div className="blur center">
          <h1>Foodease</h1>
          <a href="#filters" id="start"><p>Where To?</p></a>
          <a href="#filters" id="downarrow"><img src={downarrow} className="downarrow" alt="downarrow" /></a>
        </div>
      </section>
      <section id="filters">
        <h2>Filters</h2>
        <div className="filtersList">
          <p className="filter">Weather: <Dropdown value={weather} onChange={(e) => setWeather(e.value)} options={typesOfWeather} optionLabel="name" placeholder="How is the Weather?" /></p>
          <p className="filter">Temperature (°C): <InputNumber value={temperature} onValueChange={(e) => setTemperature(e.value)} useGrouping={false} /></p>
          <p className="filter">Who is Going: <MultiSelect value={peopleType} onChange={(e) => setPeopleType(e.value)} options={typesOfPeople} optionLabel="name" placeholder="Who is Going?" maxSelectedLabels={3} /></p>
          <p className="filter">Number of People: <InputNumber value={numberOfPeople} onValueChange={(e) => setNumberOfPeople(e.value)} useGrouping={false} /></p>
          <p className="filter">Meal Type: </p>
          <div>
            <div className="radioButton">
              <RadioButton inputId="breakfast" name="meal" value="Breakfast" onChange={(e) => setMealType(e.value)} checked={mealType === 'Breakfast'} />
              <label htmlFor="breakfast"> Breakfast</label>
            </div>
            <div className="radioButton">
              <RadioButton inputId="lunch" name="meal" value="Lunch" onChange={(e) => setMealType(e.value)} checked={mealType === 'Lunch'} />
              <label htmlFor="lunch"> Lunch</label>
            </div>
            <div className="radioButton">
              <RadioButton inputId="dinner" name="meal" value="Dinner" onChange={(e) => setMealType(e.value)} checked={mealType === 'Dinner'} />
              <label htmlFor="dinner"> Dinner</label>
            </div>
            <div className="radioButton">
              <RadioButton inputId="dessert" name="meal" value="Dessert" onChange={(e) => setMealType(e.value)} checked={mealType === 'Dessert'} />
              <label htmlFor="dessert"> Dessert</label>
            </div>
          </div>
          <p className="filter">Location: <InputText value={location} onChange={(e) => setLocation(e.target.value)} /></p>
          <p className="filter">Budget: $ <InputNumber value={budget} onValueChange={(e) => setBudget(e.value)} useGrouping={false} /></p>
          <p className="filter">Additional Info:</p>
          <InputTextarea value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} rows={2} cols={50} autoResize placeholder="ex: I'm feeling some soup" spellcheck="false" data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" />
        </div>
        <a href>
          <Button label="Submit" loading={loading} onClick={() => {
            setLoading(true);
            setSubmitted(true);
            createChat(weather.name, temperature, peopleType.name, numberOfPeople, mealType, additionalInfo)
              .then((res) => {
                setCuisine1(res[0]);
                setDish1(res[1]);
                setCuisine2(res[2]);
                setDish2(res[3]);
                setCuisine3(res[4]);
                setDish3(res[5]);
                setCuisineLoaded(true);
                setLoading(false);
                document.getElementById('recommended').scrollIntoView();
              });
          }} />
        </a>
      </section>
      {
        submitted ?
          <>
            <section id="recommended">
              <h2>Choose a Recommended Cuisine</h2>
              {
                cuisineLoaded ?
                  <div className="choices">
                    <Cuisine cuisine={cuisine1} dish={dish1} callback={cuisineChoice} />
                    <Cuisine cuisine={cuisine2} dish={dish2} callback={cuisineChoice} />
                    <Cuisine cuisine={cuisine3} dish={dish3} callback={cuisineChoice} />
                  </div> : <></>
              }
            </section>
            <section id="restaurant">
              <h2>Restaurant</h2>
              { cuisineChosen ? <Restaurant cuisine={chosenCuisine} dish={chosenDish} location={location} priceLevel={budget} callback={receiveNameOfRestaurant} /> : <></> }
            </section><section id="directions">
              <h2>Directions</h2>
              {
                iframeLoaded ?
                  <>
                    {
                      currentLocation ?
                        <iframe
                          title="Directions to Restaurant"
                          width="720"
                          height="500"
                          frameborder="0"
                          style={{ border: 0, borderRadius: "1rem" }}
                          referrerpolicy="no-referrer-when-downgrade"
                          src={"https://www.google.com/maps/embed/v1/directions?key=" + googleKey + "&origin=" + encodeURIComponent(currentLocation) + "&destination=" + encodeURIComponent(restaurantName)}>
                        </iframe>
                        :
                        <iframe
                          title="Restaurant Location"
                          width="720"
                          height="500"
                          frameborder="0"
                          style={{ border: 0 }}
                          referrerPolicy="no-referrer-when-downgrade"
                          src={"https://www.google.com/maps/embed/v1/place?key=" + googleKey + "&q=" + encodeURIComponent(restaurantName)}>
                        </iframe>
                    }
                  </> : <></>
              }
            </section>
          </> : <></>
      }
    </div>
  );
}

export default App;
