const express = require("express");
const mongoose = require("mongoose");
const hbs = require("hbs");

const Pizza = require("./models/Pizza.model.js");

const app = express();

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
app.get("/", (request, response, next) => {
    response.render("home");
});


//Route for contact page
app.get("/contact", (request, response, next) => {
    response.render("contact-page");
})


//GET /pizzas
app.get("/pizzas", (request, response, next) => {
    
    //BONUS ;)
    //BONUS ;)

    const data = {
        pizzas: pizzasArr
    }

    response.render("product-list", data);

});


//GET /pizzas/:pizzaName
app.get("/pizzas/:pizzaName", (request, response, next) => {
    
    const nameOfMyPizza = request.params.pizzaName;

    Pizza.findOne({name: nameOfMyPizza})
        .then( (pizzaDetails) => {
            console.log(pizzaDetails)
            response.render("product", pizzaDetails);
        } )
        .catch(e => {
            console.log("error getting pizza details from DB", e)
        });

});



app.listen(3001, () => { console.log("server listening on port 3001")});