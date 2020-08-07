import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  Redirect
} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
  // return <Table fetch={id} />
  return <Table fetch={id + window.location.search} />
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
        <Link to="/international_mobile_satellite_organization">International Mobile Satellite Organization</Link>
        <Link to="/europe_countries">Europe Countries</Link>
        <Link to="/sample_cities_venezuela">Sample Cities Venezuela</Link>
        <Link to="/sample_continents">Sample Continents</Link>
        <Link to="/sample_population_costa_rica">Sample Population Costa Rica</Link>
      </Typography>
      <Input link="/sample_country">Sample Country</Input>
      <Input link="/sample_country_city">Sample Country City</Input>
      <RawSQLInput />
    </>
  );
}

function Input({ children, link }: { children: string, link: string }) {

  const [country, setCountry] = useState("");
  const [redirect, setRedirect] = useState(<></>);

  const onClick = () => {
    console.log(link, country)
    setRedirect(<Redirect push to={`${link}?country=${country}`} />)
  }

  return (
    <>
    {redirect}
    <div style={{ margin: 5, display: 'list-item', color: 'rgb(30, 105, 139)' }}>
      <TextField label={children} placeholder="Greece" value={country} onChange={event => setCountry(event.target.value)} />
      <Button onClick={onClick} variant="contained">Lookup</Button>
    </div>
    </>
  )
}

function RawSQLInput() {

  const [sql, setSQL] = useState("");
  const [redirect, setRedirect] = useState(<></>);

  const onClick = () => {
    setRedirect(<Redirect push to={`/raw?sql=${sql}`} />)
  }

  return (
    <>
    {redirect}
    <div style={{ margin: 5, display: 'list-item', color: 'rgb(30, 105, 139)' }}>
      <TextField label="Raw SQL" placeholder="Greece" value={sql} onChange={event => setSQL(event.target.value)} />
      <Button onClick={onClick} variant="contained">Lookup</Button>
    </div>
    </>
  )
}