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

  const { data, error, loading }: { data: any[], error: string | null, loading: boolean } = useFetch('http://localhost:3001/' + fetch)

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
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map(cell => <TableCell>{cell}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((value, index) => <Row value={value} key={index} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

function Title({ text }: { text: string }) {
  return (
    <Typography>
      <h1>{capital_letter(text.replace(/_/g, ' '))}</h1>
    </Typography>
  )
}

function Row({ value}: { value: any }) {
  return (
    <TableRow key={value.name}>
      {Object.keys(value).map((item: string) =>
        (<TableCell>{value[item]}</TableCell>)
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