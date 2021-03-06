import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import db from "./db";
const app = express();
app.use(cors())
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
  // probs not correct
  sql(`SELECT *
  FROM City, Country
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
  sql(`SELECT Language.Name as Language, Language.Percentage, Country.Name as Country
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

app.get("/international_mobile_satellite_organization", (req, res, sql) => {
  sql(`SELECT Country.name as Country, Country.Population, Organization.Name as Organisation
  FROM Country, isMember, Organization
  WHERE Organization.Abbreviation = "Intelsat"
  AND Organization.Abbreviation = isMember.Organization
  AND isMember.Country = Country.Code`)
})

app.get("/europe_countries", (req, res, sql) => {
  sql(`SELECT Country.Name, Country.Population
  FROM Country
  INNER JOIN encompasses
  WHERE encompasses.Continent = "Europe"
  AND Country.Code = encompasses.Country
  ORDER BY Country.Population DESC`)
})

app.get("/sample_cities_venezuela", (req, res, sql) => {
  sql(`SELECT Country.name, City.name, City.population
  FROM Country
  INNER JOIN City
  WHERE Country.code = City.country
  AND Country.name = "Venezuela"
  ORDER BY City.population DESC`)
})

app.get("/sample_continents", (req, res, sql) => {
  sql(`SELECT * FROM Continent`)
})

app.get("/sample_country", (req, res, sql) => {
  sql(`SELECT * FROM Country
  WHERE name = "${req.query.country}"`)
})

app.get("/sample_country_city", (req, res, sql) => {
  sql(`SELECT City.name, City.province, City.population FROM City
  INNER JOIN Country
  WHERE City.country = Country.code
  AND Country.name = "${req.query.country}"
  ORDER BY City.population DESC`)
})

app.get("/sample_population_costa_rica", (req, res, sql) => {
  sql(`SELECT name, population
  FROM Country
  WHERE name="Costa Rica"`)
})

app.get("/raw", (req, res, sql) => {
  sql(req.query.sql)
})

app.use(async (sql: string, req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(sql)
    let result = await db().all(sql)
    res.json({ success: true, data: result, sql })
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