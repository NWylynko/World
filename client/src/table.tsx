import React, { useState, useEffect } from 'react';
import useFetch from './useFetch'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Redirect} from "react-router-dom";

export default function SimpleTable({ fetch }: { fetch: string }) {

  const { data, error, loading, extraData } = useFetch('http://localhost:3001/' + fetch)

  const [headers, setHeaders] = useState<string[]>([])
  const [sql, setSQL] = useState('')
  const [redirect, setRedirect] = useState(<></>)

  const onClick = () => {
    setRedirect(<Redirect push to={`/raw?sql=${sql}`} />)
  }

  useEffect(() => {
    if (data && !loading && !error) {
      let Cells = Object.keys(data[0])
      // console.log(Cells)
      setHeaders(Cells)
      setSQL(extraData.sql)
    }
  }, [data, loading, error])

  if (loading) {
    return <><Title text={fetch} /><Typography variant="h4">loading...</Typography></>
  }

  if (error) {
    return <><Title text={fetch} /><Typography variant="h4">Error: {error}</Typography></>
  }

  return (
    <>
      {redirect}
      <Title text={fetch} />
      <Typography style={{color: 'grey', display: 'contents'}}>SQL: </Typography>
      <TextField style={{color: 'grey', width: '70vw', marginBottom: 30}} value={sql} onChange={event => setSQL(event.target.value)} />
      <Button onClick={onClick} variant="contained">Run</Button>
      <TableContainer component={Paper} style={{minWidth: '80vw'}}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((cell, index) => <TableCell key={index} >{cell}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((value: any, index: number) => <Row value={value} key={index} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

function Title({ text }: { text: string }) {

  if (text.search('raw') === 0) return <></>

  return (
    <Typography variant="h3">
      {capital_letter(text.replace('/', '').replace(/_/g, ' ').replace('?country=', ' - '))}
    </Typography>
  )
}

function Row({ value }: { value: any }) {
  return (
    <TableRow>
      {Object.keys(value).map((item: string, index: number) =>
        (<TableCell key={index}>{value[item]}</TableCell>)
      )}
    </TableRow>
  )
}

// https://www.w3resource.com/javascript-exercises/javascript-basic-exercise-50.php
function capital_letter(text: string) {
  let str: string[] = text.split(" ");

  for (let i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }

  return str.join(" ");
}