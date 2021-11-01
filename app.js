const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
const PORT = process.env.PORT || 5000;

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res)=>{

    const city = req.body.cityname;
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=cff3d7837b7e2863e615f2c06e9f539f";

    https.get(url, (response)=>{
        response.on("data", (data)=>{
            const ans = JSON.parse(data);
            res.render("result",{
                name: ans.name,
                wmain: ans.weather[0].main,
                tem: ans.main.temp,
                icon: ans.weather[0].icon,
                mitem: ans.main.temp_min,
                matem: ans.main.temp_max,
                wind: ans.wind.speed,
                humidity: ans.main.humidity
            })
        })
    })
});

app.listen(PORT, ()=>{
    console.log(`Server is up and running in ${PORT}`);
});