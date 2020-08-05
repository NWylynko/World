import express, { Request, Response, NextFunction } from "express";
import db from "./db";
// import SQL from "sql-template-strings";
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/mountains_of_the_world", (req, res, sql) => {
  sql(`SELECT * FROM Mountain`)
})

app.get("/shallow_seas", (req, res, sql) => {
  sql(`SELECT * FROM Sea
  WHERE depth < 3000`)
})

app.get("/small_countries", (req, res, sql) => {
  sql(`SELECT Name, Capital, Area, Population
  FROM Country
  WHERE population < 10000`)
})

app.get("/rivers_by_length", (req, res, sql) => {
  sql(`SELECT Name, Length
  FROM River
  ORDER BY length DESC`)
})

app.get("/cities_Ni", (req, res, sql) => {
  sql(`SELECT Name, Country, Population
  FROM City
  WHERE Name LIKE "Ni%"`)
})

app.get("/cities_country", (req, res, sql) => {
  sql(`SELECT * FROM City
  INNER JOIN Country
  WHERE Country.Code = City.Country`)
})

app.get("/cities_of_china", (req, res, sql) => {
  sql(`SELECT City.Name, City.Country, City.Province, City.Population
  FROM City
  INNER JOIN Country
  WHERE City.Country = Country.Code
  AND Country.Name = "China"`)
})

app.get("/world_languages", (req, res, sql) => {
  // both tables have the label `Name` so its broken
  sql(`SELECT Language.Name, Language.Percentage, Country.Name
  FROM Language
  INNER JOIN Country
  WHERE Language.Country = Country.Code
  AND Percentage > 80`)
})

app.get("/all_the_stans", (req, res, sql) => {
  sql(`SELECT name, capital, area, population
  FROM country
  WHERE name LIKE "%stan"
  ORDER BY area DESC`)
})

app.get("/biggest_cities", (req, res, sql) => {
  sql(`SELECT name, capital, area, population 
  FROM country
  ORDER BY population DESC 
  LIMIT 20`)
})

app.get("/large_deserts", (req, res, sql) => {
  sql(`SELECT name, area
  FROM desert
  ORDER BY area DESC
  LIMIT 5`)
})

app.get("/deep_lakes", (req, res, sql) => {
  sql(`SELECT name, area, depth, Altitude
  FROM lake
  ORDER BY depth DESC
  LIMIT 15`)
})

// app.get("/insmarsat", (req, res, sql) => {
//   sql(``)
// })

// app.get("/", (req, res, sql) => {
//   sql(``)
// })

// app.get("/", (req, res, sql) => {
//   sql(``)
// })


app.use(async (sql: string, req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(sql)
    let result = await db().all(sql)
    res.json({ success: true, data: result })
  } catch (err) {
    next(err)
  }
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ "error": err.message, "success": false })
})

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`)
})