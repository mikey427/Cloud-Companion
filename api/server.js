require("dotenv").config();
const express = require("express");
const axios = require("axios");
var cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

const currentReq = {
  method: "GET",
  url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
  params: { q: "", days: "3" },
  headers: {
    "X-RapidAPI-Key": process.env.API_Key,
    "X-RapidAPI-Host": process.env.API_Host,
  },
};

const searchReq = {
  method: "GET",
  url: "https://weatherapi-com.p.rapidapi.com/search.json",
  params: { q: "" },
  headers: {
    "X-RapidAPI-Key": process.env.API_Key,
    "X-RapidAPI-Host": process.env.API_Host,
  },
};

app.get("/location/:location", async (req, res) => {
  try {
    console.log(req.params.location);
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
