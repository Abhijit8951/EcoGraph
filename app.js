// const express = require("express");
// const path = require("path");
// const expressLayouts = require("express-ejs-layouts");
// const app = express();

// app.set("view engine", "ejs");

// app.set("views", path.join(__dirname, "views"));


// app.use(expressLayouts);
// app.set("layout", "layouts/boilerplate");


// app.get("/", (req, res) => {
//     res.render("listings/index");
// });



// app.listen(8080, () => {
//     console.log("Server started on 8080");
// });






const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const axios = require("axios");
const cors = require("cors");
const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.json());
app.use(expressLayouts);
app.set("layout", "layouts/boilerplate");

// Route to fetch financial data from Yahoo Finance API and render it in the index.ejs template
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/AAPL,TSLA,GOOGL",
      {
        headers: {
          'x-rapidapi-key': '49fed5d059mshd29baf0bc4db61cp127023jsn458e5560bba0',
          'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com'
        }
      }
    );
    console.log(response.data);
    const marketData = response.data.body; // Access the body array
    res.render("listings/index", { marketData });
  } catch (error) {
    console.error("Error fetching market data:", error);
    res.status(500).json({ error: "Failed to fetch market data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});