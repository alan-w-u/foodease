// import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import './App.css';
import downarrow from './downarrow.svg';
import Cuisine from './components/Cuisine';

function App() {
  return (
    <div className="app">
      <section id="home">
      <div className="blur center">
        <h1>Foodease</h1>
        <a href="#filters" id="start"><p>Where To?</p></a>
        <a href="#filters"><img src={downarrow} href="#filters" className="downarrow" alt="downarrow" /></a>
        {/* <img src={downarrow} href="#filters" className="downarrow" alt="downarrow" /> */}
      </div>
      </section>
      <section id="filters">
        <h2>Filters</h2>
        <div>
          <p>Weather:</p>
          <p>Temperature:</p>
          <p>Location:</p>
          <p>Background:</p>
          <p>Budget:</p>
          <p>Type of People:</p>
          <p>Number of People:</p>
          <p>Type of Meal:</p>
        </div>
      </section>
      <section id="recommended">
        <h2>Choose a Recommended Cuisine</h2>
        <div className="choices">
          <Cuisine cuisine="Italian" dish="Magherita Pizza"/>
          <Cuisine cuisine="Korean" dish="Fried Chicken"/>
          <Cuisine cuisine="Japanese" dish="Sushi"/>
        </div>
      </section>
      <section>
        <h2>Restaurant</h2>
      </section>
      <section>
        <h2>Directions</h2>
      </section>
      </div>
  );
}

export default App;
