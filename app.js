const express = require("express");
const path = require("path"); 
const app = express();
var mongoose = require('mongoose');
const bodyparser = require('body-parser')
mongoose.connect('mongodb://localhost/registrationgym', {useNewUrlParser: true});
const port = 8000;



//define mongoose schema

var registrationSchema = new mongoose.Schema({
    name: String,
    gender: String,
    email: String,
    phone: String,
    place: String,
    more: String
  });

var registration = mongoose.model('Registration', registrationSchema);


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
app.get('/registration', (req, res)=>{ 
    const params = { }
    res.status(200).render('registration.pug', params);
})

app.post('/registration', (req, res)=>{ 
    var myData = new registration(req.body)
    myData.save().then(()=>{
        res.send("This Item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item is not saved to the database")
    });

    //res.status(200).render('registration.pug');
})
app.get('/about', (req, res)=>{ 
    const params = { }
    res.status(200).render('about.pug', params);
})
app.get('/services', (req, res)=>{ 
    const params = { }
    res.status(200).render('services.pug', params);
})
app.get('/classinfo', (req, res)=>{ 
    const params = { }
    res.status(200).render('classinfo.pug', params);
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});