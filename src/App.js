import downarrow from './downarrow.svg';
import './App.css';

function App() {
  return (
    <div className="app">
      <section id="home">
      <div className="blur center">
        <h1 className="shadow">Foodease</h1>
        <a href="#filters" id="start" className="shadow"><p>Where to Go?</p></a>
        <img src={downarrow} href="#filters" className="downarrow" alt="downarrow" />
      </div>
      </section>
      <section id="filters">
        <h2>Filters</h2>
        <div>
          <p>Weather:</p>
          <p>Temperature:</p>
          <p>Location:</p>
          <p>Background:</p>
        </div>
      </section>
      <section>
        <h2></h2>
      </section>
      <section>
        <h2></h2>
      </section>
      </div>
  );
}

export default App;
