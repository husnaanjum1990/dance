const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}
const port = 8000;

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String,
  });
// our schema into model
const contact = mongoose.model('contact', contactSchema);

// For serving static files
app.use('/static', express.static('static'))
app.use(express.urlencoded())

// Set the template engine as pug
app.set('view engine', 'pug')

// Set the views directory
app.set('views', path.join(__dirname, 'views'))
 
//endpoints
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
})
})
//start the server
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
})
