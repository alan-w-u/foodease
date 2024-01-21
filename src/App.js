import './App.css';
import { createChat } from './openai'
import './googlemaps.js'
import React, { useState } from 'react';
import downarrow from './downarrow.svg';
import refresharrow from './refresh-arrow.png'
import Cuisine from './components/Cuisine';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown'
import { MultiSelect } from 'primereact/multiselect';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { type } from '@testing-library/user-event/dist/type';
import Restaurant from './components/Restaurant';
import { googleKey } from './secrets.js';

function App() {
  const [weather, setWeather] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
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

  // const typesOfMeals = [
  //   { name: 'Breakfast', code: 'BR' },
  //   { name: 'Lunch', code: 'LU' },
  //   { name: 'Dinner', code: 'DI' },
  //   { name: 'Dessert', code: 'DE' },
  //   { name: 'Snack', code: 'SN' }
  // ];

  const [submitted, setSubmitted] = useState(false);

  const [cuisine1, setCuisine1] = useState("");
  const [cuisine2, setCuisine2] = useState("");
  const [cuisine3, setCuisine3] = useState("");
  const [dish1, setDish1] = useState("");
  const [dish2, setDish2] = useState("");
  const [dish3, setDish3] = useState("");
  const [cuisineLoaded, setCuisineLoaded] = useState(false);

  const [cuisineChosen, setCuisineChosen] = useState(false);
  const [chosenCuisine, setChosenCuisine] = useState("");
  const [chosenDish, setChosenDish] = useState("");

  const [iframeLoaded, setIframeLoaded] = useState(false);

  const [restaurantName, setRestaurantName] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);

  const cuisineChoice = (cuisine, dish) => {
    setCuisineChosen(true);
    setChosenCuisine(cuisine);
    setChosenDish(dish);
  };

  const receiveNameOfRestaurant = (name) => {
    setRestaurantName(name);
    setIframeLoaded(true);
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => setCurrentLocation(pos.coords.latitude + "," + pos.coords.longitude));
  }

  return (
    <div className="app">
      <section id="home">
        <div className="blur center">
          <h1>Foodease</h1>
          <a href="#filters" id="start"><p>Where To?</p></a>
          <a href="#filters"><img src={downarrow} className="downarrow" alt="downarrow" /></a>
        </div>
      </section>
      <section id="filters">
        <h2>Filters</h2>
        <div>
          <p className="filter">Weather: <Dropdown value={weather} onChange={(e) => setWeather(e.value)} options={typesOfWeather} optionLabel="name" placeholder="How is the Weather?" /></p>
          <p className="filter">Temperature (°C): <InputNumber value={temperature} onValueChange={(e) => setTemperature(e.value)} useGrouping={false} /></p>
          <p className="filter">Type of People: <MultiSelect value={peopleType} onChange={(e) => setPeopleType(e.value)} options={typesOfPeople} optionLabel="name" placeholder="Who is Going?" maxSelectedLabels={3} /></p>
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
            <div className="radioButton">
              <RadioButton inputId="snack" name="meal" value="Snack" onChange={(e) => setMealType(e.value)} checked={mealType === 'Snack'} />
              <label htmlFor="snack"> Snack</label>
            </div>
          </div>
          {/* <p className="filter">Meal Type: <Dropdown value={mealType} onChange={(e) => setMealType(e.value)} options={typesOfMeals} optionLabel="name" placeholder="What Meal is It?" /></p> */}
          <p className="filter">Location: <InputText value={location} onChange={(e) => setLocation(e.target.value)} /></p>
          <p className="filter">Budget: $<InputNumber value={budget} onValueChange={(e) => setBudget(e.value)} useGrouping={false} /></p>
          <p className="filter">Additional Info: <InputTextarea value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} rows={1} cols={30} autoResize placeholder="ex: I'm feeling some soup" spellcheck="false" data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" /></p>
        </div>
        <a href="#recommended">
          <Button label="Submit" onClick={() => {
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
              });
          }} />
        </a>
      </section>
      {
        submitted ?
          <><section id="recommended">
            <h2>Choose a Recommended Cuisine</h2>
            {
            cuisineLoaded ?
              <div className="choices">
                <a href="#restaurant"><Cuisine cuisine={cuisine1} dish={dish1} callback={cuisineChoice} /></a>
                <a href="#restaurant"><Cuisine cuisine={cuisine2} dish={dish2} callback={cuisineChoice} /></a>
                <a href="#restaurant"><Cuisine cuisine={cuisine3} dish={dish3} callback={cuisineChoice} /></a>
                {/* <Cuisine cuisine={cuisine1} dish={dish1} callback={cuisineChoice} />
                <Cuisine cuisine={cuisine2} dish={dish2} callback={cuisineChoice} />
                <Cuisine cuisine={cuisine3} dish={dish3} callback={cuisineChoice} /> */}
              </div>
            : <></>
            }
            {/* <a href="#filters"><img src={refresharrow} className="refresh" alt="refresharrow" /></a> */}
          </section>
          <section id="restaurant">
        <h2>Restaurant</h2>
        {cuisineChosen ? <Restaurant cuisine={chosenCuisine} dish={chosenDish} location={location} callback={receiveNameOfRestaurant} /> : <></>}
        </section><section id="directions">
            <h2>Directions</h2>
            {
            iframeLoaded ?
              currentLocation ?
                <iframe
                  title="Directions to Restaurant"
                  width="720"
                  height="500"
                  frameborder="0"
                  style={{ border: 0, borderRadius: "1rem" }}
                  referrerpolicy="no-referrer-when-downgrade"
                  src={"https://www.google.com/maps/embed/v1/directions?key=" + googleKey + "&origin=" + encodeURIComponent(currentLocation) + "&destination=" + encodeURIComponent(restaurantName)}>
                </iframe> :
                <iframe
                  title="Restaurant Location"
                  width="720"
                  height="500"
                  frameborder="0"
                  style={{ border: 0 }}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={"https://www.google.com/maps/embed/v1/place?key=" + googleKey + "&q=" + encodeURIComponent(restaurantName)}>
                </iframe>
            : <></>
            }
          </section></> 
        : <></>
      }

        {/* {
        cuisineChosen ?
          <><section id="restaurant">
            <h2>Restaurant</h2>
            {cuisineChosen ? <Restaurant cuisine={chosenCuisine} dish={chosenDish} callback={receiveNameOfRestaurant} /> : <></>}
          </section><section id="directions">
              <h2>Directions</h2>
              {
              iframeLoaded ?
                currentLocation ?
                  <iframe
                    title="Directions to Restaurant"
                    width="720"
                    height="500"
                    frameborder="0"
                    style={{ border: 0 }}
                    referrerpolicy="no-referrer-when-downgrade"
                    src={"https://www.google.com/maps/embed/v1/directions?key=" + googleKey + "&origin=" + encodeURIComponent(currentLocation) + "&destination=" + encodeURIComponent(restaurantName)}>
                  </iframe> :
                  <iframe
                    title="Restaurant Location"
                    width="720"
                    height="500"
                    frameborder="0"
                    style={{ border: 0 }}
                    referrerPolicy="no-referrer-when-downgrade"
                    src={"https://www.google.com/maps/embed/v1/place?key=" + googleKey + "&q=" + encodeURIComponent(restaurantName)}>
                  </iframe>
              : <></>
              }
            </section></>
        :<></>
      } */}

    </div>
  );
}

export default App;
