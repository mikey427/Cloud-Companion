require("dotenv").config();
const express = require("express");
const axios = require("axios");
var cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

// Forecast request to weather API
const currentReq = {
  method: "GET",
  url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
  params: { q: "", days: "3" },
  headers: {
    "X-RapidAPI-Key": process.env.API_Key,
    "X-RapidAPI-Host": process.env.API_Host,
  },
};

// Search request to weather API
const searchReq = {
  method: "GET",
  url: "https://weatherapi-com.p.rapidapi.com/search.json",
  params: { q: "" },
  headers: {
    "X-RapidAPI-Key": process.env.API_Key,
    "X-RapidAPI-Host": process.env.API_Host,
  },
};

// GET endpoint for weather data
app.get("/location/:location", async (req, res) => {
  try {
    currentReq.params.q = req.params.location;
    const response = await axios.request(currentReq);
    const data = response.data;
    res.json(data);
  } catch (error) {
    res.send({
      status: "Error",
      message: error,
    });
  }
});

// GET endpoint for search results
app.get("/search/:search", async (req, res) => {
  try {
    searchReq.params.q = req.params.search;
    const response = await axios.request(searchReq);
    const data = await response.data;
    res.json(data);
  } catch (error) {
    res.send({
      status: "Error",
      message: "No search results",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
