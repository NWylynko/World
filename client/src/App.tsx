import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import Table from './table';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:id" children={<Page />} />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

function Page() {
  let { id } = useParams();
  return <Table fetch={id} />
}

function Home() {
  return (
    <>
      <Typography variant="h2">
        World
      </Typography>
      <Typography>
        <Link to="/mountains_of_the_world">Mountains Of The World</Link>
        <Link to="/shallow_seas">Shallow Seas</Link>
        <Link to="/small_countries">Small Countries</Link>
        <Link to="/rivers_by_length">Rivers By Length</Link>
        <Link to="/cities_Ni">Cities Ni</Link>
        <Link to="/cities_country">Cities Country</Link>
        <Link to="/cities_of_china">Cities Of China</Link>
        <Link to="/world_languages">World Languages</Link>
        <Link to="/all_the_stans">All The Stans</Link>
        <Link to="/biggest_cities">Biggest Cities</Link>
        <Link to="/large_deserts">Large Deserts</Link>
        <Link to="/deep_lakes">Deep Lakes</Link>
        {/* <Link to="/insmarsat">insmarsat</Link> */}
        <Link to="/europe_countries">Europe Countries</Link>
        <Link to="/sample_cities_venezuela">Sample Cities Venezuela</Link>
        <Link to="/sample_continents">Sample Continents</Link>
        {/* <Link to="/sample_country">Sample Country</Link> */}
        {/* <Link to="/sample_country_city">Sample Country City</Link> */}
        <Link to="/sample_population_costa_rica">Sample Population Costa Rica</Link>
      </Typography>
    </>
  );
}