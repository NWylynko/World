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

export default function SimpleTable({ fetch }: { fetch: string }) {

  const { data, error, loading, extraData } = useFetch('http://localhost:3001/' + fetch)

  const [headers, setHeaders] = useState<string[]>([])

  useEffect(() => {
    if (data && !loading && !error) {
      let Cells = Object.keys(data[0])
      // console.log(Cells)
      setHeaders(Cells)
    }
  }, [data, loading, error])

  if (loading) {
    return <><Title text={fetch} /><h2>loading...</h2></>
  }

  if (error) {
    return <><Title text={fetch} /><h2>Error: {error}</h2></>
  }

  return (
    <>
      <Title text={fetch} />
      <Typography style={{color: 'grey', maxWidth: '80vw', marginBottom: 30}}>SQL: {extraData.sql}</Typography>
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
  return (
    <Typography variant="h3">
      {capital_letter(text.replace(/_/g, ' '))}
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