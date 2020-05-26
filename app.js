const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true}); //Creating a new database named contactDance
const port = 8000;

//Define mongoose schema(defining all the fields)
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

//Compiling the model
var Contact = mongoose.model('Contact', contactSchema); //Collection named contacts(plural of Contact in small case will be created)

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{ //Renders the contact when when requested by user
    res.status(200).render('contact.pug');
}) 

app.post('/contact', (req, res)=>{ 
    var myData = new Contact(req.body); //Put all data entered by user(as request) in myData by creating a new object of Our model Contact
    myData.save().then(()=>{// Save all data to the database
        res.send("This item has been saved to the database") //Send a response if data entry is successful
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database") //Send an error if something bad happens
    });
    //res.status(200).render('contact.pug');
})

app.get('/about', (req, res)=>{
    const params = { }
    res.status(200).render('about.pug', params);
})
app.get('/gallery', (req, res)=>{
    const params = { }
    res.status(200).render('gallery.pug', params);
})
app.get('/videos', (req, res)=>{
    const params = { }
    res.status(200).render('videos.pug', params);
})









// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});