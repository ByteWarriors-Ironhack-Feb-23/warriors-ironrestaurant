const express = require("express");
const mongoose = require("mongoose");
const hbs = require("hbs");
const bodyParser = require('body-parser');


const Pizza = require("./models/Pizza.model.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); //config body-parser

app.set("views", __dirname + "/views"); //tells our Express app where to look for our views
app.set("view engine", "hbs"); //sets HBS as the template engine


// Make everything inside of public/ available
app.use(express.static('public'));


hbs.registerPartials(__dirname + "/views/partials"); //tell HBS which directory we use for partials


//connect to DB
mongoose
  .connect('mongodb://127.0.0.1/warriors-bites')
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch( e => {
    console.log("error connecting to DB", e);
  })



/***********/
/* ROUTES */
/***********/



//Route for homepage
app.get("/", (req, res, next) => {
    res.render("home");
});


//Route for contact page
app.get("/contact", (req, res, next) => {
    res.render("contact-page");
})


//GET /pizzas
app.get("/pizzas", (req, res, next) => {

    let maxPrice = req.query.maxPrice;
    // const {maxPrice} = req.query;

    maxPrice = Number(maxPrice); //convert to a number


    let filter = {};
    if(maxPrice){
        filter = {price: {$lte: maxPrice}};
    }


    Pizza.find(filter)
        .then( pizzasArr => {
            
            const data = {
                pizzas: pizzasArr
            };

            res.render("product-list", data);
        })
        .catch(e => {
            console.log("error getting list of pizzas from DB", e)
        });

});



//GET /pizzas/:pizzaName
app.get("/pizzas/:pizzaName", (req, res, next) => {
    
    const nameOfMyPizza = req.params.pizzaName;

    Pizza.findOne({name: nameOfMyPizza})
        .then( (pizzaDetails) => {
            console.log(pizzaDetails)
            res.render("product", pizzaDetails);
        } )
        .catch(e => {
            console.log("error getting pizza details from DB", e)
        });

});


//POST /login
app.post("/login", (req, res, next) => {

    const {email, pw} = req.body;

    if(pw === "1234"){
        res.send("all good, you're logged in my friend!");
    } else {
        res.send(`Hello ${email} we've received your request to login but we don't like your password.`);
    }


    res.send("processing your request to login...");
});


app.listen(3001, () => { console.log("server listening on port 3001")});