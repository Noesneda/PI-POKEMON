import './App.css';
import {BrowserRouter,Route,Switch} from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home';
import PokemonCreated from './components/PokemonCreated/PokemonCreated.jsx';
import Details from './components/Details/Details';
// import Loading from './components/Loading/Loading';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        {/* <Route exact path='/' component={Loading}/> */}
        <Route exact path='/' component={LandingPage}/>
        <Route path= '/home'component={Home}/>
        <Route exact path= '/pokemons' component={PokemonCreated}/>
        <Route exact path="/pokemons/:id" component= {Details}></Route>
      </Switch>    
    </div>
    </BrowserRouter>
  );
}

export default App;
